const fs = require('fs');
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot);

// Monorepo : deps hoisted à la racine + sources dans packages/* — sans ça Metro ne résout ni
// reactotron-react-native ni @repo/trpc correctement avec Bun.
// @see https://docs.expo.dev/guides/monorepos/#manual-configuration-before-sdk-52
config.watchFolders = [monorepoRoot];
config.resolver = config.resolver ?? {};
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

/** Fichier sous node_modules (mobile puis racine monorepo). */
function resolveHoistedModule(relativeToNodeModules) {
  const candidates = [
    path.join(projectRoot, 'node_modules', relativeToNodeModules),
    path.join(monorepoRoot, 'node_modules', relativeToNodeModules),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

// reactotron : Metro choisit souvent le champ "module" (ESM) via package.exports → transform
// incompatible et _createClass undefined. Forcer l’entrée CommonJS.
const origResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'reactotron-react-native') {
    const filePath = resolveHoistedModule(
      'reactotron-react-native/dist/commonjs/index.js',
    );
    if (filePath != null) {
      return { type: 'sourceFile', filePath };
    }
  }
  if (typeof origResolveRequest === 'function') {
    return origResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativewind(config);
