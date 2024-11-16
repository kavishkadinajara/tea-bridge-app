import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import '../global.css';
import 'expo-dev-client';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    // PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    // PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Prevent rendering until fonts are loaded
  }

  return (
    <ThemeProvider
      value={{
        ...(colorScheme === 'dark' ? DarkTheme : DefaultTheme),
        colors: {
          ...((colorScheme === 'dark' ? DarkTheme : DefaultTheme).colors),
          background: colorScheme === 'dark' ? '#121212' : '#ffffff',
          primary: '#22d607', // Highlight color (TeaBridge theme green)
          card: colorScheme === 'dark' ? '#1E1E1E' : '#f8f9fa',
          text: colorScheme === 'dark' ? '#ffffff' : '#333333',
          border: colorScheme === 'dark' ? '#272727' : '#cccccc',
        },
      }}
    >
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="+not-found"
          options={{
            title: 'Not Found',
            headerStyle: {
              backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#f8f9fa',
            },
            headerTintColor: colorScheme === 'dark' ? '#ffffff' : '#333333',
          }}
        />
      </Stack>
      <StatusBar
        style={colorScheme === 'dark' ? 'light' : 'dark'}
        backgroundColor={colorScheme === 'dark' ? '#121212' : '#ffffff'}
        translucent
      />
    </ThemeProvider>
  );
}
