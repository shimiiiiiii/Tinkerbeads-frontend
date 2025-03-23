// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';


// import Login from './Screens/User/Login'
// import Register from './Screens/User/Register'
// import MainNavigator from './Navigators/MainNavigator';

// const Stack = createStackNavigator();

// export default function App() {
//   return (

//     <NavigationContainer>
//       {/* <MainNavigator />  */}
//       <Login />
//       {/* <Register /> */}
//     </NavigationContainer>  

    
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

import Login from './Screens/User/Login';
import Register from './Screens/User/Register';
import MainNavigator from './Navigators/MainNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainNavigator" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="MainNavigator" component={MainNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});