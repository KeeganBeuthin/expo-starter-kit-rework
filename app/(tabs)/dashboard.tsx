// app/(tabs)/dashboard.tsx
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { UserProfile } from '@/components/UserProfile';
import { useKindeAuth } from '@kinde/expo';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DashboardScreen() {
  const kinde = useKindeAuth();
  const insets = useSafeAreaInsets();
  
  // Check authentication on component mount and when auth state changes
  useEffect(() => {
    if (!kinde.isAuthenticated) {
      // Redirect to home if not authenticated
      router.replace('/');
    }
  }, [kinde.isAuthenticated]);

  // Don't render anything while checking auth
  if (!kinde.isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await kinde.logout({ revokeToken: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Using a similar structure to the index page that works properly
  return (
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
    >
      <ThemedView style={styles.container}>
        <ThemedText style={styles.mainHeading}>
          Your authentication{'\n'}is all sorted!
        </ThemedText>
        
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>User Profile</ThemedText>
          <UserProfile showTitle={false} />
        </ThemedView>
        
        <ThemedView style={styles.card}>
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
    paddingTop: 50, // Reduced from 150 to 100
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
    lineHeight: 44, // Ensuring proper line height
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
  }
});