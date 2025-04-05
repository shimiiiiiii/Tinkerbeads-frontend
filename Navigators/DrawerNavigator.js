// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/Ionicons';
// import FilterScreen from '../Screens/SearchFilter/FilterScreen';
// import SearchScreen from '../Screens/SearchFilter/SearchScreen';
// import FilterByPriceScreen from '../Screens/SearchFilter/FilterByPriceScreen';
// import FilterByCategoryScreen from '../Screens/SearchFilter/FilterByCategoryScreen';

// const Drawer = createDrawerNavigator();

// const DrawerNavigator = () => {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         drawerStyle: {
//           backgroundColor: '#f5f5f5',
//           width: 240,
//         },
//         drawerActiveTintColor: '#584e51',
//         drawerInactiveTintColor: 'gray',
//         headerStyle: {
//           backgroundColor: '#584e51',
//         },
//         headerTintColor: 'white',
//       }}
//     >
//       <Drawer.Screen
//         name="Filter"
//         component={FilterScreen}
//         options={{
//           drawerIcon: ({ color }) => (
//             <Icon name="filter-sharp" size={20} color={color} />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Search"
//         component={SearchScreen}
//         options={{
//           drawerIcon: ({ color }) => (
//             <Icon name="search-sharp" size={20} color={color} />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Filter by Price"
//         component={FilterByPriceScreen}
//         options={{
//           drawerIcon: ({ color }) => (
//             <Icon name="pricetag-sharp" size={20} color={color} />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Filter by Category"
//         component={FilterByCategoryScreen}
//         options={{
//           drawerIcon: ({ color }) => (
//             <Icon name="list-sharp" size={20} color={color} />
//           ),
//         }}
//       />
//     </Drawer.Navigator>
//   );
// };

// export default DrawerNavigator;


import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProductContainer from '../Screens/Product/ProductContainer';
import OrderDetails from '../Screens/User/OrderDetails';
// Import other screens as needed

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Products" component={ProductContainer} />
            <Stack.Screen 
            name="OrderDetails" 
            component={OrderDetails} 
            options={{ title: "Order Details" }}
                />
            {/* Add other screens here */}
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;