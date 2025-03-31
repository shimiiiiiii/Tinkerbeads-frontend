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


// import React from 'react';
// import { StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Toast from 'react-native-toast-message';

// import Login from './Screens/User/Login';
// import Register from './Screens/User/Register';
// import MainNavigator from './Navigators/MainNavigator';
// import AdminNavigator from './Navigators/AdminNavigator';
// import { AuthProvider } from './Context/Auth';

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="Login" component={Login} />
//           <Stack.Screen name="Register" component={Register} />
//           <Stack.Screen name="MainNavigator" component={MainNavigator} options={{ headerShown: false }} />
//           <Stack.Screen name="AdminNavigator" component={AdminNavigator} options={{ headerShown: false }} /> 
//         </Stack.Navigator>
//         <Toast />
//       </NavigationContainer>
//     </AuthProvider>
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
import { Provider } from 'react-redux'; 
import store from './Redux/store'; 

import Login from './Screens/User/Login';
import Register from './Screens/User/Register';
import MainNavigator from './Navigators/MainNavigator';
import AdminNavigator from './Navigators/AdminNavigator';
import { AuthProvider } from './Context/Auth';
// import { LogBox } from 'react-native';

const Stack = createStackNavigator();

// LogBox.ignoreLogs([
//   'Support for defaultProps will be removed from function components',
// ]);

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="MainNavigator" component={MainNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="AdminNavigator" component={AdminNavigator} options={{ headerShown: false }} />
          </Stack.Navigator>
          <Toast />
        </NavigationContainer>
      </AuthProvider>
    </Provider>
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