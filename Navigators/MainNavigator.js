// // import React from 'react';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import Icon from 'react-native-vector-icons/Ionicons';

// // import CartNavigator from './CartNavigator';
// // import HomeNavigator from './HomeNavigator';
// // import SaveNavigator from './SaveNavigator';
// // import UserNavigator from './UserNavigator';
// // import DrawerNavigator from './DrawerNavigator'; 

// // const Tab = createBottomTabNavigator();

// // const MainNavigator = () => {
// //   return (
// //     <Tab.Navigator
// //       initialRouteName="Home"
// //       screenOptions={{
// //         tabBarHideOnKeyboard: true,
// //         tabBarShowLabel: false,
// //         tabBarStyle: { backgroundColor: '#584e51' },
// //         tabBarActiveTintColor: 'black',
// //         tabBarInactiveTintColor: 'white',
// //       }}
// //     >
// //       <Tab.Screen
// //         name="Home"
// //         component={HomeNavigator}
// //         options={{
// //           headerShown: false,
// //           tabBarIcon: ({ color }) => (
// //             <Icon name="home-sharp" style={{ position: 'relative' }} color={color} size={30} />
// //           ),
// //         }}
// //       />
// //       {/* <Tab.Screen
// //         name="Drawer"
// //         component={DrawerNavigator} 
// //         options={{
// //           tabBarIcon: ({ color }) => (
// //             <Icon name="menu-sharp" style={{ position: 'relative' }} color={color} size={30} />
// //           ),
// //         }}
// //       /> */}
// //       <Tab.Screen
// //         name="Save"
// //         component={SaveNavigator}
// //         options={{
// //           tabBarIcon: ({ color }) => (
// //             <Icon name="heart-sharp" style={{ position: 'relative' }} color={color} size={30} />
// //           ),
// //         }}
// //       />
// //       <Tab.Screen
// //         name="My Cart"
// //         component={CartNavigator}
// //         options={{
// //           tabBarIcon: ({ color }) => (
// //             <Icon name="cart-sharp" style={{ position: 'relative' }} color={color} size={30} />
// //           ),
// //         }}
// //       />
// //       <Tab.Screen
// //         name="User"
// //         component={UserNavigator}
// //         options={{
// //           tabBarIcon: ({ color }) => (
// //             <Icon name="person-sharp" style={{ position: 'relative' }} color={color} size={30} />
// //           ),
// //         }}
// //       />
// //     </Tab.Navigator>
// //   );
// // };

// // export default MainNavigator;

// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';

// import DrawerNavigator from './DrawerNavigator'; // Import DrawerNavigator
// import SaveNavigator from './SaveNavigator';
// import CartNavigator from './CartNavigator';
// import UserNavigator from './UserNavigator';

// const Tab = createBottomTabNavigator();

// const MainNavigator = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         tabBarHideOnKeyboard: true,
//         tabBarShowLabel: false,
//         tabBarStyle: { backgroundColor: '#584e51' },
//         tabBarActiveTintColor: 'black',
//         tabBarInactiveTintColor: 'white',
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={DrawerNavigator} // Use DrawerNavigator here
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ color }) => (
//             <Icon name="home-sharp" style={{ position: 'relative' }} color={color} size={30} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Save"
//         component={SaveNavigator}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Icon name="heart-sharp" style={{ position: 'relative' }} color={color} size={30} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="My Cart"
//         component={CartNavigator}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Icon name="cart-sharp" style={{ position: 'relative' }} color={color} size={30} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="User"
//         component={UserNavigator}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Icon name="person-sharp" style={{ position: 'relative' }} color={color} size={30} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default MainNavigator;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeNavigator from './HomeNavigator'; 
import SaveNavigator from './SaveNavigator';
import CartNavigator from './CartNavigator';
import UserNavigator from './UserNavigator';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: '#584e51' },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'white',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="home-sharp" style={{ position: 'relative' }} color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Save"
        component={SaveNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="heart-sharp" style={{ position: 'relative' }} color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Shopping Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cart-sharp" style={{ position: 'relative' }} color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="person-sharp" style={{ position: 'relative' }} color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;