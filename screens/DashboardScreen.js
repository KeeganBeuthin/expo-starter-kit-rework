// screens/DashboardScreen.js
import { useKindeAuth } from '@kinde/expo';
import { getUserProfile } from '@kinde/expo/utils';
import * as Linking from 'expo-linking';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardScreen({ navigation }) {
  const { isAuthenticated } = useKindeAuth();
  const [user, setUser] = useState(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUser(profile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [isAuthenticated]);

  const contentToExplore = [
    { title: "Sign up and sign in", link: "https://docs.kinde.com/developer-tools/sdks/mobile/expo-sdk/#sign-up-and-sign-in" },
    { title: "Authentication Methods", link: "https://docs.kinde.com/developer-tools/sdks/mobile/expo-sdk/#authentication-methods" },
    { title: "Using Utility Functions", link: "https://docs.kinde.com/developer-tools/sdks/mobile/expo-sdk/#using-utility-functions" },
  ];

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.section}>
          <Text style={[styles.title, isDark && styles.textDark]}>
            Your authentication is all sorted!
          </Text>
          
          {isAuthenticated && user ? (
            <View style={styles.profileContainer}>
              <View style={styles.profileRow}>
                <View style={[styles.fieldLabel, isDark && styles.fieldLabelDark]}>
                  <Text style={styles.fieldLabelText}>id</Text>
                </View>
                <View style={[styles.fieldValue, isDark && styles.fieldValueDark]}>
                  <Text style={[styles.fieldValueText, isDark && styles.textDark]} numberOfLines={1}>{user.id}</Text>
                </View>
              </View>
              
              <View style={styles.profileRow}>
                <View style={[styles.fieldLabel, isDark && styles.fieldLabelDark]}>
                  <Text style={styles.fieldLabelText}>email</Text>
                </View>
                <View style={[styles.fieldValue, isDark && styles.fieldValueDark]}>
                  <Text style={[styles.fieldValueText, isDark && styles.textDark]} numberOfLines={1}>{user.email}</Text>
                </View>
              </View>
              
              <View style={styles.profileRow}>
                <View style={[styles.fieldLabel, isDark && styles.fieldLabelDark]}>
                  <Text style={styles.fieldLabelText}>given_name</Text>
                </View>
                <View style={[styles.fieldValue, isDark && styles.fieldValueDark]}>
                  <Text style={[styles.fieldValueText, isDark && styles.textDark]} numberOfLines={1}>{user.given_name || '-'}</Text>
                </View>
              </View>
              
              <View style={styles.profileRow}>
                <View style={[styles.fieldLabel, isDark && styles.fieldLabelDark]}>
                  <Text style={styles.fieldLabelText}>family_name</Text>
                </View>
                <View style={[styles.fieldValue, isDark && styles.fieldValueDark]}>
                  <Text style={[styles.fieldValueText, isDark && styles.textDark]} numberOfLines={1}>{user.family_name || '-'}</Text>
                </View>
              </View>
              
              <Pressable
                style={[styles.button, isDark && styles.buttonDark]}
                onPress={() => Linking.openURL('https://docs.kinde.com/developer-tools/sdks/mobile/expo-sdk/')}
              >
                <Text style={[styles.buttonText, isDark && styles.buttonTextDark]}>See full Expo SDK docs</Text>
              </Pressable>
            </View>
          ) : (
            <Text style={[styles.loadingText, isDark && styles.textDark]}>Loading user data...</Text>
          )}
        </View>
        
        <View style={[styles.divider, isDark && styles.dividerDark]} />
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
            Get started with our Expo SDK
          </Text>
          
          <View style={styles.topicsContainer}>
            {contentToExplore.map((topic, index) => (
              <Pressable
                key={index}
                style={[styles.topicButton, isDark && styles.topicButtonDark]}
                onPress={() => Linking.openURL(topic.link)}
              >
                <Text style={[styles.topicText, isDark && styles.textDark]}>{topic.title}</Text>
              </Pressable>
            ))}
          </View>
          
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, isDark && styles.buttonDark]}
              onPress={() => navigation.navigate('Topics')}
            >
              <Text style={[styles.buttonText, isDark && styles.buttonTextDark]}>Explore Topics</Text>
            </Pressable>
          </View>
        </View>
        
        <View style={[styles.divider, isDark && styles.dividerDark]} />
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
            View Your Profile
          </Text>
          
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, isDark && styles.buttonDark]}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={[styles.buttonText, isDark && styles.buttonTextDark]}>Go to Profile</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginVertical: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 36,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    color: '#000',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#64748b',
  },
  profileContainer: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 400,
    gap: 12,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fieldLabel: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  fieldLabelDark: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
  },
  fieldLabelText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#000',
  },
  fieldValue: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  fieldValueDark: {
    backgroundColor: '#000',
    borderColor: '#334155',
  },
  fieldValueText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#334155',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 16,
  },
  dividerDark: {
    backgroundColor: '#1e293b',
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  topicButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    backgroundColor: '#fff',
  },
  topicButtonDark: {
    backgroundColor: '#000',
    borderColor: '#334155',
  },
  topicText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#000',
    minWidth: 200,
    alignItems: 'center',
  },
  buttonDark: {
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  buttonTextDark: {
    color: '#000',
  },
  textDark: {
    color: '#fff',
  },
});