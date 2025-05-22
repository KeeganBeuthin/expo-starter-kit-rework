// app/(tabs)/dashboard.tsx
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { UserProfile } from '@/components/UserProfile';
import { useKindeAuth } from '@kinde/expo';
import { useTimeBasedTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';
import { useEffect, useCallback } from 'react';
import { ScrollView, StyleSheet, Pressable, ActivityIndicator, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

export default function DashboardScreen() {
  const kinde = useKindeAuth();
  const { isDark } = useTimeBasedTheme();
  const insets = useSafeAreaInsets();
  
  // Safe authentication check with useFocusEffect for better navigation handling
  useFocusEffect(
    useCallback(() => {
      if (kinde?.isAuthenticated === false) {
        const timer = setTimeout(() => {
          try {
            router.replace('/');
          } catch (error) {
            console.error('Navigation error:', error);
          }
        }, 100);
        
        return () => clearTimeout(timer);
      }
    }, [kinde?.isAuthenticated])
  );

  const handleLogout = async () => {
    try {
      await kinde.logout({ revokeToken: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Show loading state while checking authentication
  if (kinde?.isLoading || kinde?.isAuthenticated === undefined) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
        <ThemedText style={styles.loadingText}>Loading...</ThemedText>
      </SafeAreaView>
    );
  }

  // Don't render anything if not authenticated
  if (!kinde.isAuthenticated) {
    return null;
  }

  // Using the original structure that works properly
  return (
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingBottom: insets.bottom + 20 }
      ]}
    >
      <ThemedView style={[styles.container, { width: '100%' }]}>
        <ThemedText style={styles.mainHeading}>
          Your authentication{'\n'}is all sorted!
        </ThemedText>
        
        <ThemedView style={[styles.card, { width: '100%' }]}>
          <ThemedText style={styles.cardTitle}>User Profile</ThemedText>
          <UserProfile showTitle={false} />
        </ThemedView>
        
        <ThemedView style={[styles.card, { width: '100%' }]}>
          <ThemedText style={styles.cardTitle}>Get started with Kinde</ThemedText>
          <ThemedText style={styles.cardText}>
            Now that you're authenticated, you can explore all the features Kinde has to offer.
          </ThemedText>
          
          <ThemedView style={styles.linkContainer}>
            <ThemedView style={styles.linkButton}>
              <ThemedText style={styles.linkText}>Manage Users</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.linkButton}>
              <ThemedText style={styles.linkText}>Authentication</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.linkButton}>
              <ThemedText style={styles.linkText}>Feature Flags</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
        
        <ThemedView style={styles.logoutButtonContainer}>
          <Pressable 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <ThemedText style={styles.logoutButtonText}>Sign Out</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollContent: {
    paddingTop: 50,
    paddingBottom: 40,
  },
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  mainHeading: {
    fontSize: 36,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 44,
  },
  card: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 12,
    backgroundColor: 'white',
    overflow: 'hidden',
    marginBottom: 20,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    marginBottom: 16,
  },
  cardText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  linkContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  linkButton: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 8,
  },
  linkText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 14,
  },
  logoutButtonContainer: {
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  loadingText: {
    color: 'white',
    marginTop: 16,
    fontSize: 16,
  }
});