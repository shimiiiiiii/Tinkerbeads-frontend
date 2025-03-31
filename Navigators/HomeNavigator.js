// import React from 'react';
// import { createStackNavigator } from "@react-navigation/stack";

// import ProductContainer from "../Screens/Product/ProductContainer";
// import ProductDetail from "../Screens/Product/ProductDetail"; 

// const Stack = createStackNavigator();

// function MyStack() {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen
//                 name='ProductContainer'
//                 component={ProductContainer}
//                 options={{
//                     headerShown: false,
//                 }}
//             />
//             <Stack.Screen
//                 name='ProductDetail' 
//                 component={ProductDetail}
//                 options={{
//                     headerShown: false,
//                 }}
//             />
//         </Stack.Navigator>
//     );
// }

// export default function HomeNavigator() {
//     return <MyStack />;
// }

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import ProductContainer from '../Screens/Product/ProductContainer';
import ProductDetail from '../Screens/Product/ProductDetail';
import CategoriesScreen from '../Screens/CategoriesScreen'; 
import Settings from '../Screens/User/Settings';
import UserProfile from '../Screens/User/UserProfile';
import EditProfile from '../Screens/User/EditProfile';
import OrdersScreen from '../Screens/User/OrderHistory';
import FilterScreen from '../Screens/FilterScreen'; 

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ProductStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductContainer"
        component={ProductContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function HomeNavigator() {
    return (
        <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#eae7e8', 
            width: 260,
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            paddingTop: 20,
            borderRightWidth: 1.5,
            borderTopWidth: 1.5,
            borderBottomWidth: 1.5,
            borderColor: '#000000', 
            shadowColor: '#000000',
            shadowOffset: { width: 3, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            elevation: 8,
          },
          drawerActiveTintColor: '#584e51', 
          drawerInactiveTintColor: '#6d6366', 
          drawerActiveBackgroundColor: 'rgba(88, 78, 81, 0.15)', 
          headerStyle: {
            backgroundColor: '#584e51',
            elevation: 5,
            shadowOpacity: 0.3,
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerLabelStyle: {
            marginLeft: -15,
            fontSize: 15,
            fontFamily: 'sans-serif-medium',
          },
          drawerItemStyle: {
            borderRadius: 10,
            paddingVertical: 5,
            marginVertical: 3,
            marginHorizontal: 10,
          }
        }}
        initialRouteName="Products"
      >
        <Drawer.Screen
        name="Products"
        component={ProductStack}
        options={{
            title: "TinkerBeads",
            drawerLabel: "Products",
            drawerIcon: ({ color }) => (
            <Icon name="pricetag-outline" size={22} color={color} style={{ marginRight: 10 }} />
            ),
        }}
        />
        <Drawer.Screen
        name="Profile"
        component={EditProfile}
        options={{
            drawerIcon: ({ color }) => (
            <Icon name="person-outline" size={22} color={color} style={{ marginRight: 10 }} />
            ),
        }}
        />
         <Drawer.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
            drawerIcon: ({ color }) => (
            <Icon name="receipt-outline" size={22} color={color} style={{ marginRight: 10 }} />
            ),
        }}
        />
            <Drawer.Screen
        name="Filter"
        component={FilterScreen}
        options={{
            drawerLabel: "Search Filter",
            drawerIcon: ({ color }) => (
            <Icon name="filter-outline" size={22} color={color} style={{ marginRight: 10 }} />
            ),
        }}
        />
        <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
            drawerIcon: ({ color }) => (
            <Icon name="settings-outline" size={22} color={color} style={{ marginRight: 10 }} />
            ),
        }}
        />
      </Drawer.Navigator>
    );
  }