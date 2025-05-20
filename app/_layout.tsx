import { KindeAuthProvider } from '@kinde/expo';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, useTimeBasedTheme } from '../context/ThemeContext';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootLayoutContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function RootLayoutContent() {
  const { isDark, colorScheme } = useTimeBasedTheme();

  // Create themes
  const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#000000',
      card: '#000000',
    },
  };

  const CustomLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#ffffff',
      card: '#ffffff',
    },
  };

  return (
    <KindeAuthProvider
      config={{
        domain: Constants.expoConfig?.extra?.EXPO_PUBLIC_KINDE_DOMAIN,
        clientId: Constants.expoConfig?.extra?.EXPO_PUBLIC_KINDE_CLIENT_ID, 
        scopes: "openid profile email offline",
      }}
    >
      <NavigationThemeProvider value={isDark ? CustomDarkTheme : CustomLightTheme}>
        <View style={[styles.container, {backgroundColor: isDark ? '#000000' : '#ffffff'}]}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: isDark ? '#000000' : '#ffffff' },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style={isDark ? "light" : "dark"} />
        </View>
      </NavigationThemeProvider>
    </KindeAuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
