// screens/TopicsScreen.js
import React from 'react';
import { FlatList, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopicItem } from '../components/TopicItem';

// Similar to the NextJS topics data
const topicsData = [
  {
    label: "Get started",
    description: "Essential information for using and connecting to Kinde",
    docsLink: "https://docs.kinde.com/get-started/guides/first-things-first/",
  },
  {
    label: "Build on Kinde",
    description: "Set up all the important features under the hood",
    docsLink: "https://docs.kinde.com/build/set-up-options/kinde-business-model/",
  },
  {
    label: "SDKs and APIs",
    description: "Jump right in with our API-first developer tools",
    docsLink: "https://docs.kinde.com/developer-tools/about/our-sdks/",
  },
  {
    label: "Auth and access",
    description: "Configure user sign up, sign in, and security verification",
    docsLink: "https://docs.kinde.com/authenticate/about-auth/about-authentication/",
  },
  {
    label: "Plans and payments",
    description: "Build plans and pricing so that your users can pay you",
    docsLink: "https://docs.kinde.com/billing/about-payments-and-plans/",
  },
  {
    label: "Design",
    description: "Integrate your own brand elements for pages and screens",
    docsLink: "https://docs.kinde.com/design/brand/apply-branding-for-an-organization/",
  },
  {
    label: "Properties",
    description: "Store and use custom data about users and organizations",
    docsLink: "https://docs.kinde.com/properties/about-properties/",
  },
  {
    label: "Manage users",
    description: "Manage user profiles, including roles and permissions",
    docsLink: "https://docs.kinde.com/manage-users/about/",
  },
  {
    label: "Features and releases",
    description: "Take control of feature development and releases",
    docsLink: "https://docs.kinde.com/releases/about/about-feature-flags/",
  },
];

export default function TopicsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['bottom']}>
      <Text style={[styles.title, isDark && styles.textDark]}>
        Explore all you can do with Kinde
      </Text>
      
      <FlatList
        data={topicsData}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => <TopicItem topic={item} />}
        numColumns={1}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  containerDark: {
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    color: '#000',
  },
  listContent: {
    paddingBottom: 24,
  },
  separator: {
    height: 16,
  },
  textDark: {
    color: '#fff',
  },
});