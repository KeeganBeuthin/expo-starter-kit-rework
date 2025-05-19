// navigation/AppStack.tsx
import { useKindeAuth } from '@kinde/expo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { MainHeader } from '../components/MainHeader';
import AuthScreen from '../screens/AuthScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TopicsScreen from '../screens/TopicsScreen';

type RootStackParamList = {
  Dashboard: undefined;
  Profile: undefined;
  Topics: undefined;
  Auth: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppStack() {
  const { isAuthenticated } = useKindeAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <MainHeader {...props} />,
      }}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Topics" component={TopicsScreen} />
        </>
      ) : (
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}