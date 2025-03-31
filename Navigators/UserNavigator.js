import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfile from '../Screens/User/UserProfile';
import OrderHistory from '../Screens/User/OrderHistory';
import EditProfile from '../Screens/User/EditProfile';
import Settings from '../Screens/User/Settings';

const Stack = createStackNavigator();

const UserNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="UserProfile"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#584e51',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen 
        name="UserProfile" 
        component={UserProfile} 
        options={{ title: "My Profile" }} 
      />
      <Stack.Screen 
        name="OrderHistory" 
        component={OrderHistory} 
        options={{ title: "My Orders" }} 
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfile} 
        options={{ title: "Edit Profile" }} 
      />
      <Stack.Screen 
        name="Settings" 
        component={Settings} 
        options={{ title: "Settings" }} 
      />
    </Stack.Navigator>
  );
};

export default UserNavigator;