#!/usr/bin/env bun
/**
 * Après `bun install` à la racine, copie chaque dépendance déclarée dans
 * `apps/mobile/package.json` (dependencies + devDependencies) depuis l’arbre
 * `node_modules` du monorepo vers `apps/mobile/node_modules` (fichiers réels).
 *
 * - En **postinstall** racine : ne refait pas `bun install` (déjà exécuté).
 * - Sinon : lance `bun install` à la racine puis synchronise (comportement « install + copie »).
 * - `bun run scripts/sync-mobile-node-modules.ts --no-install` : copie seulement.
 * - Si `apps/mobile` n’existe pas (retiré du workspace, CLI, etc.) : sortie 0, aucune action.
 */
import { createRequire } from 'node:module';
import { cpSync, existsSync, lstatSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const SCRIPT_NAME = 'sync-mobile-node-modules.ts';

function getRepoRoot(): string {
  const argv = process.argv;
  let scriptPath: string | undefined;
  if (argv[1]?.endsWith(SCRIPT_NAME)) {
    scriptPath = argv[1];
  } else if (argv[1] === 'run' && argv[2]?.includes(SCRIPT_NAME)) {
    scriptPath = resolve(process.cwd(), argv[2]);
  }
  if (scriptPath) return join(dirname(scriptPath), '..');
  return process.cwd();
}

const repoRoot = getRepoRoot();
const mobileRoot = join(repoRoot, 'apps', 'mobile');
const mobilePkgPath = join(mobileRoot, 'package.json');
const rootPkgPath = join(repoRoot, 'package.json');
const mobileNm = join(mobileRoot, 'node_modules');

type PkgJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

/** Ne jamais copier depuis la racine : le monorepo a souvent un autre React (ex. web en 19.2.x). */
const SKIP_COPY_FROM_ROOT = new Set(['react', 'react-dom']);

function pkgVersion(dir: string): string | null {
  const p = join(dir, 'package.json');
  if (!existsSync(p)) return null;
  try {
    const j = JSON.parse(readFileSync(p, 'utf8')) as { version?: string };
    return j.version ?? null;
  } catch {
    return null;
  }
}

function collectMobileDepNames(): string[] {
  const pkg = JSON.parse(readFileSync(mobilePkgPath, 'utf8')) as PkgJson;
  const names = new Set<string>();
  for (const k of Object.keys(pkg.dependencies ?? {})) names.add(k);
  for (const k of Object.keys(pkg.devDependencies ?? {})) names.add(k);
  return [...names].sort();
}

/**
 * better-auth importe `@better-auth/core/utils` etc. : il faut aligner les sous-paquets
 * sur la même version que l’entrée résolue à la racine (sinon un vieux `bun i` dans apps/mobile
 * peut laisser un `@better-auth/core` plus récent sans export `./utils`).
 */
function addBetterAuthSiblingPackages(names: Set<string>) {
  if (!names.has('better-auth')) return;
  const baDir = resolvePackageDir('better-auth');
  if (!baDir) return;
  try {
    const pj = JSON.parse(
      readFileSync(join(baDir, 'package.json'), 'utf8'),
    ) as { dependencies?: Record<string, string> };
    for (const dep of Object.keys(pj.dependencies ?? {})) {
      if (dep.startsWith('@better-auth/')) names.add(dep);
    }
  } catch {
    /* ignore */
  }
}

/**
 * Résolution d’abord depuis `apps/mobile` (graphe du workspace), puis racine.
 * Sinon `react` / `react-dom` finissent en 19.2.x du reste du monorepo alors que
 * Expo / RN imposent la même version que `react-native-renderer` (ex. 19.1.0).
 */
function resolvePackageDir(pkgName: string): string | null {
  for (const pkgJsonPath of [mobilePkgPath, rootPkgPath]) {
    if (!existsSync(pkgJsonPath)) continue;
    try {
      const req = createRequire(pkgJsonPath);
      const jsonPath = req.resolve(`${pkgName}/package.json`);
      return dirname(jsonPath);
    } catch {
      continue;
    }
  }
  return null;
}

function copyPackage(pkgName: string) {
  if (SKIP_COPY_FROM_ROOT.has(pkgName)) return;

  const src = resolvePackageDir(pkgName);
  if (src == null) {
    console.error(
      `[sync-mobile] Impossible de résoudre « ${pkgName} ». Lance \`bun install\` à la racine du repo.`,
    );
    process.exit(1);
  }

  const segments = pkgName.split('/');
  const relDest =
    pkgName.startsWith('@') && segments.length >= 2
      ? join(segments[0], segments[1])
      : pkgName;
  const dest = join(mobileNm, relDest);

  if (existsSync(dest)) {
    try {
      if (lstatSync(dest).isSymbolicLink()) {
        rmSync(dest, { recursive: true, force: true });
      } else if (pkgVersion(src) === pkgVersion(dest)) {
        return;
      } else {
        rmSync(dest, { recursive: true, force: true });
      }
    } catch {
      rmSync(dest, { recursive: true, force: true });
    }
  }

  mkdirSync(mobileNm, { recursive: true });
  cpSync(src, dest, { recursive: true, dereference: true, force: true });
  console.log(`[sync-mobile] ${pkgName} → apps/mobile/node_modules/${relDest}`);
}

const isPostinstall = process.env.npm_lifecycle_event === 'postinstall';
const noInstall = process.argv.includes('--no-install');

if (!isPostinstall && !noInstall) {
  console.log('[sync-mobile] bun install (racine)…');
  const proc = Bun.spawnSync(['bun', 'install'], {
    cwd: repoRoot,
    stdout: 'inherit',
    stderr: 'inherit',
  });
  if (proc.exitCode !== 0) process.exit(proc.exitCode ?? 1);
}

if (!existsSync(mobilePkgPath)) {
  console.log('[sync-mobile] Pas de apps/mobile — synchronisation ignorée.');
  process.exit(0);
}

const nameSet = new Set(collectMobileDepNames());
addBetterAuthSiblingPackages(nameSet);
const names = [...nameSet].sort();
for (const name of names) copyPackage(name);

realignReactForExpoIfNeeded();

console.log(`[sync-mobile] Terminé (${names.length} paquets).`);

/**
 * RN exige la même version que `react-native-renderer` (souvent 19.1.x avec Expo 54).
 * Si `react` sous apps/mobile ne correspond pas au `package.json`, on réinstalle via le workspace.
 */
function realignReactForExpoIfNeeded() {
  const pkg = JSON.parse(readFileSync(mobilePkgPath, 'utf8')) as PkgJson;
  const want =
    pkg.dependencies?.react ??
    pkg.devDependencies?.react ??
    undefined;
  if (!want || want.startsWith('^') || want.startsWith('~') || want.includes('*')) return;

  const target = want.replace(/^[=<>]/, '').trim();
  const reactDir = join(mobileNm, 'react');
  const have = pkgVersion(reactDir);
  if (have === target) return;

  console.log(
    `[sync-mobile] react était ${have ?? 'absent'} ; alignement sur ${target} (Expo / react-native-renderer)…`,
  );
  const proc = Bun.spawnSync(
    [
      'bun',
      'add',
      '--ignore-scripts',
      `react@${target}`,
      `react-dom@${target}`,
    ],
    { cwd: mobileRoot, stdout: 'inherit', stderr: 'inherit' },
  );
  if (proc.exitCode !== 0) process.exit(proc.exitCode ?? 1);
}
