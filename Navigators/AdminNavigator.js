import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Admin screens
import AdminDashboard from '../Screens/Admin/AdminDashboard';
import ProductManagement from '../Screens/Admin/ProductManagement';
import ProductForm from '../Screens/Admin/ProductForm';
import OrderManagement from '../Screens/Admin/OrderManagement';
import AdminSettings from '../Screens/Admin/AdminSettings';
// import OrderDetails from '../Screens/Admin/OrderDetails';
// import UserManagement from '../Screens/Admin/UserManagement';

const Stack = createStackNavigator();

const AdminNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#584e51',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerLeft: ({ onPress, canGoBack }) => 
          canGoBack ? (
            <TouchableOpacity 
              style={{ marginLeft: 15 }}
              onPress={onPress}
            >
              <Icon name="arrow-back" size={22} color="#fff" />
            </TouchableOpacity>
          ) : null
      })}
    >
      <Stack.Screen 
        name="AdminDashboard" 
        component={AdminDashboard} 
        options={{ 
          title: "Admin Dashboard",
          headerLeft: null
        }} 
      />
      <Stack.Screen 
        name="ProductManagement" 
        component={ProductManagement} 
        options={{ title: "Products" }} 
      />
      <Stack.Screen 
        name="ProductForm" 
        component={ProductForm} 
        options={({ route }) => ({ 
          title: route.params?.product ? "Edit Product" : "Add Product"
        })} 
      />
      <Stack.Screen 
        name="OrderManagement" 
        component={OrderManagement} 
        options={{ title: "Orders" }} 
      />
      <Stack.Screen 
        name="AdminSettings" 
        component={AdminSettings}
        options={{ headerShown: false }}
        />
      {/* <Stack.Screen 
        name="OrderDetails" 
        component={OrderDetails} 
        options={{ title: "Order Details" }} 
      /> */}
      {/* <Stack.Screen 
        name="UserManagement" 
        component={UserManagement} 
        options={{ title: "Users" }} 
      /> */}
    </Stack.Navigator>
  );
};

export default AdminNavigator;