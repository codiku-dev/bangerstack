const fs = require('fs');
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

function resolvePackageDir(name) {
  const dirs = [
    path.join(projectRoot, 'node_modules', name),
    path.join(monorepoRoot, 'node_modules', name),
  ];
  for (const dir of dirs) {
    if (fs.existsSync(path.join(dir, 'package.json'))) return dir;
  }
  throw new Error(`[metro] Could not resolve package "${name}" from mobile or monorepo root`);
}

/** Monorepo : forcer React / RN de l’app (évite invalid hook si le root a une autre version). */
config.resolver = config.resolver ?? {};
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  react: resolvePackageDir('react'),
  'react-dom': resolvePackageDir('react-dom'),
  'react-native': resolvePackageDir('react-native'),
};

module.exports = withNativewind(config);
