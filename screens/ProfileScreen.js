// screens/ProfileScreen.js
import {
    getCurrentOrganization,
    getPermissions,
    getRoles,
    getUserProfile
} from '@kinde/expo/utils';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const [userProfile, setUserProfile] = useState(null);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [profile, userRoles, userPermissions, currentOrg] = await Promise.all([
          getUserProfile(),
          getRoles(),
          getPermissions(),
          getCurrentOrganization()
        ]);

        setUserProfile(profile);
        setRoles(userRoles || []);
        setPermissions(userPermissions || []);
        setOrganization(currentOrg);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
        <Text style={[styles.loadingText, isDark && styles.textDark]}>Loading profile data...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={[styles.section, isDark && styles.sectionDark]}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>User Profile</Text>
          {userProfile && (
            <View style={styles.profileInfo}>
              <View style={styles.infoRow}>
                <Text style={[styles.label, isDark && styles.labelDark]}>ID:</Text>
                <Text style={[styles.value, isDark && styles.textDark]}>{userProfile.id}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.label, isDark && styles.labelDark]}>Email:</Text>
                <Text style={[styles.value, isDark && styles.textDark]}>{userProfile.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.label, isDark && styles.labelDark]}>Name:</Text>
                <Text style={[styles.value, isDark && styles.textDark]}>
                  {userProfile.given_name} {userProfile.family_name}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={[styles.section, isDark && styles.sectionDark]}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Organization</Text>
          {organization ? (
            <View style={styles.profileInfo}>
              <View style={styles.infoRow}>
                <Text style={[styles.label, isDark && styles.labelDark]}>Name:</Text>
                <Text style={[styles.value, isDark && styles.textDark]}>{organization.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.label, isDark && styles.labelDark]}>ID:</Text>
                <Text style={[styles.value, isDark && styles.textDark]}>{organization.id}</Text>
              </View>
            </View>
          ) : (
            <Text style={[styles.noDataText, isDark && styles.noDataTextDark]}>
              No organization data available
            </Text>
          )}
        </View>

        <View style={[styles.section, isDark && styles.sectionDark]}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Roles</Text>
          {roles.length > 0 ? (
            <View>
              {roles.map((role, index) => (
                <View key={index} style={[styles.itemCard, isDark && styles.itemCardDark]}>
                  <Text style={[styles.itemName, isDark && styles.textDark]}>{role.name}</Text>
                  <Text style={[styles.itemId, isDark && styles.itemIdDark]}>{role.id}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={[styles.noDataText, isDark && styles.noDataTextDark]}>
              No roles assigned
            </Text>
          )}
        </View>

        <View style={[styles.section, isDark && styles.sectionDark]}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Permissions</Text>
          {permissions.length > 0 ? (
            <View>
              {permissions.map((permission, index) => (
                <View key={index} style={[styles.itemCard, isDark && styles.itemCardDark]}>
                  <Text style={[styles.itemName, isDark && styles.textDark]}>{permission.name}</Text>
                  <Text style={[styles.itemId, isDark && styles.itemIdDark]}>{permission.id}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={[styles.noDataText, isDark && styles.noDataTextDark]}>
              No permissions assigned
            </Text>
          )}
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
    padding: 16,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#64748b',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionDark: {
    backgroundColor: '#0f172a',
    borderColor: '#1e293b',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  profileInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  label: {
    width: 80,
    fontWeight: '500',
    color: '#666',
  },
  labelDark: {
    color: '#94a3b8',
  },
  value: {
    flex: 1,
    color: '#333',
  },
  itemCard: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    marginBottom: 8,
  },
  itemCardDark: {
    borderColor: '#1e293b',
  },
  itemName: {
    fontWeight: '500',
    color: '#333',
  },
  itemId: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  itemIdDark: {
    color: '#64748b',
  },
  noDataText: {
    color: '#999',
    fontStyle: 'italic',
  },
  noDataTextDark: {
    color: '#64748b',
  },
  textDark: {
    color: '#fff',
  },
});