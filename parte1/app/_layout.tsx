import { SessionProvider, useSession } from '@/context/SessionContext';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';

export default function Layout() {
  return (
    <SessionProvider>
      <RootNavigator />
    </SessionProvider>
  );
}

function RootNavigator() {
  const colorScheme = useColorScheme();
  const { isLoggedIn } = useSession();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: 'rgb(21, 137, 173)',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 22,
          },
        }}
      >
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name='products' options={{ title: 'Products' }} />
          <Stack.Screen
            name='product/[id]'
            options={{ title: 'Product Details' }}
          />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name='index' options={{ title: '' }} />
        </Stack.Protected>
      </Stack>

      <StatusBar style='light' />
    </ThemeProvider>
  );
}
