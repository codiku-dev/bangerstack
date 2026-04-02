// import '../styles/global.css';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { Providers } from '@/providers';

import { Providers } from "@/providers";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
