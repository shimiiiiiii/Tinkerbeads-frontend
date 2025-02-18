import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


import Login from './Screens/User/Login'
import Register from './Screens/User/Register'
import MainNavigator from './Navigators/MainNavigator';


export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    // <Register />
    // <HomeScreen />
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>

    // <Login />
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
