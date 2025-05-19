// screens/AuthScreen.js
import { useKindeAuth } from '@kinde/expo';
import React from 'react';
import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthScreen() {
  const { login, register, isLoading } = useKindeAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleSignIn = async () => {
    try {
      const token = await login({});
      if (token) {
        console.log('User signed in successfully');
      }
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignUp = async () => {
    try {
      const token = await register({});
      if (token) {
        console.log('User registered successfully');
      }
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  return (
    <SafeAreaView 
      style={[
        styles.container, 
        isDark ? styles.containerDark : styles.containerLight
      ]}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={[styles.title, isDark && styles.textDark]}>Auth for modern applications</Text>
          <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
            Secure authentication for your Expo app
          </Text>
        </View>
        
        <View style={styles.instructionsContainer}>
          <View style={styles.instructionHeader}>
            <Text style={[styles.instructionHeaderText, isDark && styles.textDark]}>
              First things first
            </Text>
          </View>
          
          <View style={[styles.instructionCard, isDark && styles.instructionCardDark]}>
            <Text style={[styles.instructionTitle, isDark && styles.textDark]}>
              <Text style={[styles.stepNumber, isDark && styles.stepNumberDark]}>1</Text>
              Set callback URLs
            </Text>
            <Text style={[styles.instructionText, isDark && styles.textDark]}>
              In Kinde, go to Settings {'>'} Applications {'>'} [Your app] {'>'} View details
            </Text>
            <Text style={[styles.instructionText, isDark && styles.textDark]}>
              Add your callback URLs in the relevant fields:
            </Text>
            <View style={[styles.codeBlock, isDark && styles.codeBlockDark]}>
              <Text style={styles.codeText}>exp://localhost:8081/--/</Text>
              <Text style={styles.codeText}>exp://192.168.X.X:8081/--/</Text>
            </View>
          </View>
          
          <View style={[styles.instructionCard, isDark && styles.instructionCardDark]}>
            <Text style={[styles.instructionTitle, isDark && styles.textDark]}>
              <Text style={[styles.stepNumber, isDark && styles.stepNumberDark]}>2</Text>
              Get building!
            </Text>
            
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.signInButton, isDark && styles.signInButtonDark]}
                onPress={handleSignIn}
                disabled={isLoading}
              >
                <Text style={[styles.buttonText, styles.signInText, isDark && styles.signInTextDark]}>
                  Sign In
                </Text>
              </Pressable>
              
              <Pressable
                style={[styles.button, styles.signUpButton, isDark && styles.signUpButtonDark]}
                onPress={handleSignUp}
                disabled={isLoading}
              >
                <Text style={[styles.buttonText, isDark && styles.signUpTextDark]}>
                  Create Account
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  containerDark: {
    backgroundColor: '#000',
  },
  containerLight: {
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    maxWidth: '80%',
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    color: '#64748b',
    textAlign: 'center',
  },
  subtitleDark: {
    color: '#94a3b8',
  },
  instructionsContainer: {
    width: '100%',
    maxWidth: 500,
  },
  instructionHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  instructionHeaderText: {
    fontSize: 14,
    color: '#000',
    backgroundColor: '#f1f5f9',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  instructionCard: {
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  instructionCardDark: {
    backgroundColor: '#000',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
    color: '#000',
  },
  stepNumber: {
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: '#000',
    color: '#fff',
    textAlign: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  stepNumberDark: {
    backgroundColor: '#fff',
    color: '#000',
  },
  instructionText: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 8,
  },
  codeBlock: {
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 8,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  codeBlockDark: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#334155',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButton: {
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  signInButtonDark: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
  },
  signUpButton: {
    backgroundColor: '#000',
  },
  signUpButtonDark: {
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  signInText: {
    color: '#000',
  },
  signInTextDark: {
    color: '#fff',
  },
  signUpTextDark: {
    color: '#000',
  },
  textDark: {
    color: '#fff',
  },
});