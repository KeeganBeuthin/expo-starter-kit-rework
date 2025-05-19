// navigation/AppStack.js
import { useKindeAuth } from '@kinde/expo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { MainHeader } from '../components/MainHeader';
import AuthScreen from '../screens/AuthScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TopicsScreen from '../screens/TopicsScreen';

const Stack = createNativeStackNavigator();

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