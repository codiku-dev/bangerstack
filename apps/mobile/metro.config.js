const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');

/**
 * Expo SDK 52+ : monorepo Metro est configuré par `expo/metro-config` — ne pas
 * redéfinir watchFolders, resolver.nodeModulesPaths, resolver.extraNodeModules.
 * @see https://docs.expo.dev/guides/monorepos/
 */
/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = withNativewind(config);
