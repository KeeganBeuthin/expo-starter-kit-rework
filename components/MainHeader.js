// components/MainHeader.js
import { useKindeAuth } from '@kinde/expo';
import * as Linking from 'expo-linking';
import React from 'react';
import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function MainHeader({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { login, register, logout, isAuthenticated } = useKindeAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleSignIn = async () => {
    try {
      await login({});
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignUp = async () => {
    try {
      await register({});
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout({ revokeToken: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View 
      style={[
        styles.header, 
        { paddingTop: insets.top + 8 },
        isDark ? styles.headerDark : styles.headerLight
      ]}
    >
      <View style={styles.logoContainer}>
        <Pressable 
          onPress={() => Linking.openURL('https://kinde.com')}
          style={styles.logoButton}
        >
          <Text style={[styles.logoText, isDark && styles.textDark]}>Kinde</Text>
        </Pressable>
        <Text style={[styles.divider, isDark && styles.textDark]}>/</Text>
        <Pressable
          onPress={() => Linking.openURL('https://expo.dev')}
          style={styles.logoButton}
        >
          <Text style={[styles.logoText, isDark && styles.textDark]}>Expo</Text>
        </Pressable>
      </View>

      {isAuthenticated ? (
        <Pressable
          style={[styles.button, styles.logoutButton, isDark && styles.buttonDark]}
          onPress={handleLogout}
        >
          <Text style={[styles.buttonText, isDark && styles.buttonTextDark]}>Log out</Text>
        </Pressable>
      ) : (
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.signInButton, isDark && styles.buttonUncontainedDark]}
            onPress={handleSignIn}
          >
            <Text style={[styles.buttonText, styles.signInText, isDark && styles.textDark]}>Sign in</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.signUpButton, isDark && styles.buttonDark]}
            onPress={handleSignUp}
          >
            <Text style={[styles.buttonText, isDark && styles.buttonTextDark]}>Register</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  headerDark: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderBottomColor: '#1e293b',
  },
  headerLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderBottomColor: '#f1f5f9',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoButton: {
    padding: 4,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  divider: {
    marginHorizontal: 8,
    fontSize: 18,
    color: '#64748b',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButton: {
    backgroundColor: '#f1f5f9',
  },
  signUpButton: {
    backgroundColor: '#000',
  },
  logoutButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  signInText: {
    color: '#000',
  },
  buttonTextDark: {
    color: '#000',
  },
  textDark: {
    color: '#fff',
  },
  buttonDark: {
    backgroundColor: '#fff',
  },
  buttonUncontainedDark: {
    backgroundColor: '#1e293b',
  },
});