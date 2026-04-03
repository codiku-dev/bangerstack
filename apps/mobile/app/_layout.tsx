import '../styles/global.css';

import { Providers } from '@/providers';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

if (__DEV__) {
  require('../Reactotron.config.js');
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Providers>
        <StatusBar />
        <Stack
          initialRouteName="index"
          screenOptions={{
            headerShown: false,
          }}
        />
      </Providers>
    </SafeAreaProvider>
  );
}
