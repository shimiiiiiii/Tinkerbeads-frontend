// import React from 'react'
// import { createStackNavigator } from "@react-navigation/stack"

// import Carts from '../Screens/Cart/Carts';

// const Stack = createStackNavigator();


// function MyStack() {
//   return(
//       <Stack.Navigator>
//           <Stack.Screen 
//               name="Carts"
//               component={Carts}
//               options={{
//                   headerShown: false
//               }}
//           />
//           {/* <Stack.Screen 
//               name="Checkout"
//               component={CheckoutNavigator}
//               options={{
//                   title: 'Checkout'
//               }}
//           /> */}
//       </Stack.Navigator>
//   )
// }

// export default function CartsNavigator() {
//   return <MyStack />
// }


import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Cart from '../Screens/Cart/Carts';
import Checkout from '../Screens/Cart/Checkout';
import OrderConfirmation from '../Screens/Cart/OrderConfirmation';

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
    </Stack.Navigator>
  )
}

export default function CartNavigator() {
  return <MyStack />
}