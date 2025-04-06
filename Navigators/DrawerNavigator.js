
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProductContainer from '../Screens/Product/ProductContainer';
import OrderDetails from '../Screens/User/OrderDetails';

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
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;