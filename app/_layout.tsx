import { KindeAuthProvider } from '@kinde/expo';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  // Create a custom dark theme with black background
  const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#000000',
      card: '#000000',
    },
  };

  return (
    <SafeAreaProvider>
      <KindeAuthProvider
        config={{
          domain: Constants.expoConfig?.extra?.EXPO_PUBLIC_KINDE_DOMAIN,
          clientId: Constants.expoConfig?.extra?.EXPO_PUBLIC_KINDE_CLIENT_ID, 
          scopes: "openid profile email offline",
        }}
      >

        <ThemeProvider value={colorScheme === 'dark' ? CustomDarkTheme : DefaultTheme}>
          <View style={styles.container}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#000000' },
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="light" />
          </View>
        </ThemeProvider>
      </KindeAuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
