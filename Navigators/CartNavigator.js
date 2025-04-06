
import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Cart from '../Screens/Cart/Carts';
import Checkout from '../Screens/Cart/Checkout';
import OrderConfirmation from '../Screens/Cart/OrderConfirmation';
import OrderDetails from '../Screens/User/OrderDetails';
import OrderHistory from '../Screens/User/OrderHistory';

const Stack = createStackNavigator();

function MyStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name="Cart"
        component={Cart}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="Checkout"
        component={Checkout}
        options={{
          title: 'Checkout'
        }}
      />
      <Stack.Screen 
        name="OrderConfirmation"
        component={OrderConfirmation}
        options={{
          title: 'Order Confirmation',
          headerLeft: null
        }}
      />
      <Stack.Screen 
        name="OrderDetails"
        component={OrderDetails}
        options={{
          title: 'Order Details',
          headerLeft: null
        }}
      />
      <Stack.Screen 
        name="OrderHistory"
        component={OrderHistory}
        options={{
          title: 'Order History',
          headerLeft: null
        }}
      />
    </Stack.Navigator>
  )
}

export default function CartNavigator() {
  return <MyStack />
}