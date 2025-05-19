import { Auth } from '@/components/Auth';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useKindeAuth } from '@kinde/expo';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const kinde = useKindeAuth();
  const [isAuth, setIsAuth] = useState(kinde.isAuthenticated);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();
  
  useEffect(() => {
    setIsAuth(kinde.isAuthenticated);
    
    // Redirect to dashboard if already authenticated
    if (kinde.isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [kinde.isAuthenticated]);

  return (
    <ScrollView 
      style={styles.scrollView} 
      contentContainerStyle={styles.scrollContent}
    >
      <ThemedView style={[styles.container, { paddingBottom: insets.bottom + 20 }]}>
        <ThemedText style={styles.mainHeading}>
          Auth for{'\n'}modern{'\n'}applications
        </ThemedText>
        
        <ThemedView style={styles.instructionsContainer}>
          <ThemedView style={styles.firstThingsFirst}>
            <ThemedText style={styles.firstThingsFirstText}>
              First things first
            </ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.card}>
            <ThemedView style={styles.stepHeader}>
              <ThemedView style={styles.stepNumber}>
                <ThemedText style={styles.stepNumberText}>1</ThemedText>
              </ThemedView>
            </ThemedView>
            
            <ThemedView style={styles.stepContent}>
              <ThemedText style={styles.stepText}>
                A. In Kinde, go to <ThemedText style={styles.boldText}>Settings {'>'} Applications {'>'} [Your app] {'>'} View details</ThemedText>.
              </ThemedText>
              
              <ThemedText style={styles.stepText}>
                B. Add your <ThemedText style={styles.boldText}>callback URLs</ThemedText> in the relevant fields. For example:
              </ThemedText>
              
              <ThemedView style={styles.codeBlock}>
                <ThemedText style={styles.codeText}>exp://localhost:8081/--/</ThemedText>
                <ThemedText style={styles.codeText}>exp://192.168.X.X:8081/--/</ThemedText>
              </ThemedView>
              
              <ThemedView style={styles.codeBlock}>
                <ThemedText style={styles.codeText}>exp://localhost:8081</ThemedText>
                <ThemedText style={styles.codeText}>exp://192.168.X.X:8081</ThemedText>
              </ThemedView>
              
              <ThemedText style={styles.stepText}>
                C. Select <ThemedText style={styles.boldText}>Save</ThemedText>.
              </ThemedText>
            </ThemedView>
          </ThemedView>
          
          <ThemedView style={styles.card}>
            <ThemedView style={styles.stepHeader}>
              <ThemedView style={styles.stepNumber}>
                <ThemedText style={styles.stepNumberText}>2</ThemedText>
              </ThemedView>
              <ThemedText style={styles.stepTitle}>Get building!</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.authContainer}>
              <Auth />
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
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  mainHeading: {
    fontSize: 38,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 40,
    lineHeight: 42,
  },
  instructionsContainer: {
    width: '100%',
    gap: 12,
  },
  firstThingsFirst: {
    alignItems: 'center',
    marginBottom: 10,
  },
  firstThingsFirstText: {
    fontSize: 14,
    color: 'black',
    backgroundColor: '#f1f5f9',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 12,
    backgroundColor: 'white',
    overflow: 'hidden',
    marginBottom: 16,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  stepTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  stepContent: {
    padding: 16,
  },
  stepText: {
    color: '#64748b',
    marginBottom: 16,
    fontSize: 14,
  },
  boldText: {
    fontWeight: '600',
    color: 'black',
  },
  codeBlock: {
    backgroundColor: '#111827',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  codeText: {
    fontFamily: 'monospace',
    color: '#e2e8f0',
    fontSize: 14,
  },
  authContainer: {
    padding: 16,
  }
});
