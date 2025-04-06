

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAdminOrders, updateOrderStatus } from '../../Redux/Actions/cartAction';
// import { getToken } from '../../utils/sqliteToken';
// import { useNotifications } from '../../Services/useNotification'; 
// import * as Notifications from 'expo-notifications'; 

// const OrderManagement = () => {
//   const dispatch = useDispatch();
//   const { loading, orders, error } = useSelector((state) => state.cart.adminOrders);
//   const { loading: updating, error: updateError } = useSelector(
//     (state) => state.cart.updateOrderStatus
//   );
//   const [token, setToken] = useState(null);
//   const [localOrders, setLocalOrders] = useState([]); 

//   const { notification, resendToken } = useNotifications();
  
//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         const storedToken = await getToken();
//         setToken(storedToken?.token);
//         if (storedToken?.token) {
//           dispatch(fetchAdminOrders(storedToken.token));
//         } else {
//           Alert.alert('Error', 'Authentication token not found.');
//         }
//       } catch (error) {
//         console.error('Error retrieving token from SQLite:', error);
//         Alert.alert('Error', 'Failed to retrieve authentication token.');
//       }
//     };

//     fetchToken();
//   }, [dispatch]);

//   useEffect(() => {
//     if (orders) {
//       const sortedOrders = [...orders].sort((a, b) => {
//         const dateA = new Date(a.createdAt || a.date);
//         const dateB = new Date(b.createdAt || b.date);
//         return dateB - dateA;
//       });
//       setLocalOrders(sortedOrders);
//     }
//   }, [orders]);

//   useEffect(() => {
//     if (updateError) {
//       Alert.alert('Error', updateError);
//     }
//   }, [updateError]);

//   useEffect(() => {
//     if (notification) {
//       // Alert.alert('New Notification', notification.request.content.body || 'You have a new notification.');
//       // Optionally, refresh orders or perform other actions
//       if (token) {
//         dispatch(fetchAdminOrders(token));
//       }
//     }
//   }, [notification, token, dispatch]);

  
//   const handleUpdateStatus = async (orderId, newStatus, orderNumber, userId) => {
//     if (!token) {
//       Alert.alert('Error', 'Authentication token not found.');
//       return;
//     }
  
//     try {
//       const userEmail = localOrders.find((order) => order._id === orderId)?.user?.email || 'Unknown Email';
//       await dispatch(updateOrderStatus(orderId, newStatus, token));

//       setLocalOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === orderId ? { ...order, status: newStatus } : order
//         )
//       );
  

//       await Notifications.scheduleNotificationAsync({
//         content: {
//           title: 'Order Status Updated',
//           body: `Order Number: ${orderNumber}\nUser: ${userEmail}\nStatus: ${newStatus}`,
//           data: { orderNumber, userEmail, newStatus }, 
//         },
//         trigger: null, 
//       });
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       Alert.alert('Error', 'Failed to update order status.');
//     }
//   };

//   const renderOrderItem = ({ item }) => (
//     <View style={styles.orderCard}>
//       <View style={styles.orderHeader}>
//         <Text style={styles.orderId}>Order #{item.orderNumber}</Text>
//         <Text style={styles.orderDate}>{item.date}</Text>
//       </View>
//       <Text style={styles.customerName}>
//         {item.user?.firstName} {item.user?.email}
//       </Text>
//       <Text style={styles.orderTotal}>Total: ₱{item.total.toFixed(2)}</Text>
//       <Text style={styles.orderStatus}>Status: {item.status}</Text>

//       <View style={styles.itemsContainer}>
//         {item.cartItems.map((product, index) => (
//           <Text key={index} style={styles.itemText}>
//             {product.quantity}x {product.productId?.name}
//           </Text>
//         ))}
//       </View>

//       <View style={styles.actionsContainer}>
//         {item.status === 'Pending' && (
//           <>
//            <TouchableOpacity
//             style={styles.actionButton}
//             onPress={() => handleUpdateStatus(item._id, 'Shipped', item.orderNumber, item.user?._id)}
//           >
//             <Icon name="send-outline" size={18} color="#fff" />
//             <Text style={styles.actionButtonText}>Mark as Shipped</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.cancelButton}
//             onPress={() => handleUpdateStatus(item._id, 'Cancelled', item.orderNumber, item.user?._id)}
//           >
//             <Icon name="close-outline" size={18} color="#fff" />
//             <Text style={styles.actionButtonText}>Cancel Order</Text>
//           </TouchableOpacity>
//           </>
//         )}
//         {item.status === 'Shipped' && (
//           <>
//             <TouchableOpacity
//               style={styles.actionButton}
//               onPress={() => handleUpdateStatus(item._id, 'Delivered')}
//             >
//               <Icon name="checkmark-done-outline" size={18} color="#fff" />
//               <Text style={styles.actionButtonText}>Mark as Delivered</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.cancelButton}
//               onPress={() => handleUpdateStatus(item._id, 'Cancelled')}
//             >
//               <Icon name="close-outline" size={18} color="#fff" />
//               <Text style={styles.actionButtonText}>Cancel Order</Text>
//             </TouchableOpacity>
//           </>
//         )}
//       </View>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#584e51" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Error: {error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {updating && (
//         <View style={styles.updatingContainer}>
//           <ActivityIndicator size="small" color="#584e51" />
//           <Text>Updating order status...</Text>
//         </View>
//       )}
//       <FlatList
//         data={localOrders}
//         renderItem={renderOrderItem}
//         keyExtractor={(item) => item._id}
//         contentContainerStyle={styles.listContainer}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   listContainer: {
//     padding: 10,
//   },
//   orderCard: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   orderHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   orderId: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   orderDate: {
//     fontSize: 14,
//     color: '#666',
//   },
//   customerName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 5,
//   },
//   orderTotal: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 5,
//   },
//   orderStatus: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#584e51',
//     marginBottom: 10,
//   },
//   itemsContainer: {
//     marginBottom: 10,
//   },
//   itemText: {
//     fontSize: 14,
//     color: '#555',
//   },
//   actionsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#584e51',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//     marginLeft: 10,
//   },
//   cancelButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#d9534f', 
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//     marginLeft: 10,
//   },
//   actionButtonText: {
//     color: '#fff',
//     fontSize: 14,
//     marginLeft: 5,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   updatingContainer: {
//     padding: 10,
//     alignItems: 'center',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//   },
// });

// export default OrderManagement;

//WORKING CODE WITH CORRECT NOTIF
// import axios from 'axios'; // Import axios for backend requests
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAdminOrders, updateOrderStatus } from '../../Redux/Actions/cartAction';
// import { getToken } from '../../utils/sqliteToken';
// import * as Notifications from 'expo-notifications';
// import baseURL from '../../assets/common/baseUrl';
// import { useNotifications } from '../../Services/useNotification'; 
// import { useNavigation } from '@react-navigation/native';

// const OrderManagement = () => {
//   const dispatch = useDispatch();
//   const { loading, orders, error } = useSelector((state) => state.cart.adminOrders);
//   const { loading: updating, error: updateError } = useSelector(
//     (state) => state.cart.updateOrderStatus
//   );
//   const [token, setToken] = useState(null);
//   const [localOrders, setLocalOrders] = useState([]);
//   const { sendNotification } = useNotifications();
//   const { expoPushToken } = useNotifications(); 

//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         const storedToken = await getToken();
//         setToken(storedToken?.token);
//         if (storedToken?.token) {
//           dispatch(fetchAdminOrders(storedToken.token));
//         } else {
//           Alert.alert('Error', 'Authentication token not found.');
//         }
//       } catch (error) {
//         console.error('Error retrieving token from SQLite:', error);
//         Alert.alert('Error', 'Failed to retrieve authentication token.');
//       }
//     };

//     fetchToken();
//   }, [dispatch]);

//   useEffect(() => {
//     if (orders) {
//       const sortedOrders = [...orders].sort((a, b) => {
//         const dateA = new Date(a.createdAt || a.date);
//         const dateB = new Date(b.createdAt || b.date);
//         return dateB - dateA;
//       });
//       setLocalOrders(sortedOrders);
//     }
//   }, [orders]);

//   useEffect(() => {
//     if (updateError) {
//       Alert.alert('Error', updateError);
//     }
//   }, [updateError]);

//   useEffect(() => {
//     const setupNotificationChannel = async () => {
//       if (Platform.OS === 'android') {
//         await Notifications.setNotificationChannelAsync('default', {
//           name: 'Default',
//           importance: Notifications.AndroidImportance.MAX,
//           sound: 'default', // Ensure sound is enabled
//         });
//         console.log('Android notification channel set up');
//       }
//     };
  
//     setupNotificationChannel();
//   }, []);

//   const handleUpdateStatus = async (orderId, newStatus, orderNumber, userId) => {
//     if (!token) {
//       Alert.alert('Error', 'Authentication token not found.');
//       return;
//     }
  
//     try {
//       // Check notification permissions
//       const { status } = await Notifications.getPermissionsAsync();
//       if (status !== 'granted') {
//         const { status: newStatus } = await Notifications.requestPermissionsAsync();
//         if (newStatus !== 'granted') {
//           console.log('Notification permissions not granted!');
//           Alert.alert('Error', 'Notification permissions are required to display notifications.');
//           return;
//         }
//       }
  
//       // Retrieve the user's push token from the backend
//       const response = await axios.get(`${baseURL}/user/push-token/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       const userPushToken = response.data.pushToken;
  
//       // Log the fetched push token
//       console.log('Fetched Push Token for User:', userPushToken);
  
//       if (!userPushToken) {
//         Alert.alert('Error', 'User push token not found.');
//         return;
//       }
  
//       // Update the order status in the backend
//       await dispatch(updateOrderStatus(orderId, newStatus, token));
  
//       // Update the local state
//       setLocalOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === orderId ? { ...order, status: newStatus } : order
//         )
//       );
  
//       // Send a push notification to the user's device
//       console.log('Sending push notification to user...');
//       await fetch('https://exp.host/--/api/v2/push/send', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           to: userPushToken,
//           sound: 'default',
//           title: 'Order Status Updated',
//           body: `Order Number: ${orderNumber}\nStatus: ${newStatus}`,
//           data: { orderNumber, newStatus },
//         }),
//       });
//       console.log('Push notification sent successfully!');
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       Alert.alert('Error', 'Failed to update order status.');
//     }
//   };

//   const renderOrderItem = ({ item }) => (
//     <View style={styles.orderCard}>
//       <View style={styles.orderHeader}>
//         <Text style={styles.orderId}>Order #{item.orderNumber}</Text>
//         <Text style={styles.orderDate}>{item.date}</Text>
//       </View>
//       <Text style={styles.customerName}>
//         {item.user?.firstName} {item.user?.email}
//       </Text>
//       <Text style={styles.orderTotal}>Total: ₱{item.total.toFixed(2)}</Text>
//       <Text style={styles.orderStatus}>Status: {item.status}</Text>

//       <View style={styles.itemsContainer}>
//         {item.cartItems.map((product, index) => (
//           <Text key={index} style={styles.itemText}>
//             {product.quantity}x {product.productId?.name}
//           </Text>
//         ))}
//       </View>

//       <View style={styles.actionsContainer}>
//         {item.status === 'Pending' && (
//           <>
//             <TouchableOpacity
//               style={styles.actionButton}
//               onPress={() => handleUpdateStatus(item._id, 'Shipped', item.orderNumber, item.user?._id)}
//             >
//               <Icon name="send-outline" size={18} color="#fff" />
//               <Text style={styles.actionButtonText}>Mark as Shipped</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.cancelButton}
//               onPress={() => handleUpdateStatus(item._id, 'Cancelled', item.orderNumber, item.user?._id)}
//             >
//               <Icon name="close-outline" size={18} color="#fff" />
//               <Text style={styles.actionButtonText}>Cancel Order</Text>
//             </TouchableOpacity>
//           </>
//         )}
//         {item.status === 'Shipped' && (
//           <>
//             <TouchableOpacity
//               style={styles.actionButton}
//               onPress={() => handleUpdateStatus(item._id, 'Delivered', item.orderNumber, item.user?._id)}
//             >
//               <Icon name="checkmark-done-outline" size={18} color="#fff" />
//               <Text style={styles.actionButtonText}>Mark as Delivered</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.cancelButton}
//               onPress={() => handleUpdateStatus(item._id, 'Cancelled', item.orderNumber, item.user?._id)}
//             >
//               <Icon name="close-outline" size={18} color="#fff" />
//               <Text style={styles.actionButtonText}>Cancel Order</Text>
//             </TouchableOpacity>
//           </>
//         )}
//       </View>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#584e51" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Error: {error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {updating && (
//         <View style={styles.updatingContainer}>
//           <ActivityIndicator size="small" color="#584e51" />
//           <Text>Updating order status...</Text>
//         </View>
//       )}
//       <FlatList
//         data={localOrders}
//         renderItem={renderOrderItem}
//         keyExtractor={(item) => item._id}
//         contentContainerStyle={styles.listContainer}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   listContainer: {
//     padding: 10,
//   },
//   orderCard: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   orderHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   orderId: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   orderDate: {
//     fontSize: 14,
//     color: '#666',
//   },
//   customerName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 5,
//   },
//   orderTotal: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 5,
//   },
//   orderStatus: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#584e51',
//     marginBottom: 10,
//   },
//   itemsContainer: {
//     marginBottom: 10,
//   },
//   itemText: {
//     fontSize: 14,
//     color: '#555',
//   },
//   actionsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#584e51',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//     marginLeft: 10,
//   },
//   cancelButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#d9534f', 
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//     marginLeft: 10,
//   },
//   actionButtonText: {
//     color: '#fff',
//     fontSize: 14,
//     marginLeft: 5,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   updatingContainer: {
//     padding: 10,
//     alignItems: 'center',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//   },
// });

// export default OrderManagement;

import axios from 'axios'; 
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminOrders, updateOrderStatus } from '../../Redux/Actions/cartAction';
import { getToken } from '../../utils/sqliteToken';
import * as Notifications from 'expo-notifications';
import baseURL from '../../assets/common/baseUrl';
import { useNotifications } from '../../Services/useNotification';
import { useNavigation } from '@react-navigation/native';

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); 
  const { loading, orders, error } = useSelector((state) => state.cart.adminOrders);
  const { loading: updating, error: updateError } = useSelector(
    (state) => state.cart.updateOrderStatus
  );
  const [token, setToken] = useState(null);
  const [localOrders, setLocalOrders] = useState([]);
  const { expoPushToken } = useNotifications(); 

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await getToken();
        setToken(storedToken?.token);
        if (storedToken?.token) {
          dispatch(fetchAdminOrders(storedToken.token));
        } else {
          Alert.alert('Error', 'Authentication token not found.');
        }
      } catch (error) {
        console.error('Error retrieving token from SQLite:', error);
        Alert.alert('Error', 'Failed to retrieve authentication token.');
      }
    };

    fetchToken();
  }, [dispatch]);

  useEffect(() => {
    if (orders) {
      const sortedOrders = [...orders].sort((a, b) => {
        const dateA = new Date(a.createdAt || a.date);
        const dateB = new Date(b.createdAt || b.date);
        return dateB - dateA;
      });
      setLocalOrders(sortedOrders);
    }
  }, [orders]);

  useEffect(() => {
    if (updateError) {
      Alert.alert('Error', updateError);
    }
  }, [updateError]);

  useEffect(() => {
    const setupNotificationChannel = async () => {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Default',
          importance: Notifications.AndroidImportance.MAX,
          sound: 'default', 
        });
        console.log('Android notification channel set up');
      }
    };

    setupNotificationChannel();
  }, []);

 useEffect(() => {
  const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
    console.log('Notification Response:', response);

    const { to } = response.notification.request.content.data;

    if (to === expoPushToken) {
      console.log('Notification is for the user. Navigating to OrderHistory...');
      navigation.navigate('OrderHistory'); 
    } else {
      console.log('Notification is not for the admin');
    }
  });

  return () => subscription.remove();
}, [navigation, expoPushToken]);

  const handleUpdateStatus = async (orderId, newStatus, orderNumber, userId) => {
    if (!token) {
      Alert.alert('Error', 'Authentication token not found.');
      return;
    }

    try {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          console.log('Notification permissions not granted!');
          Alert.alert('Error', 'Notification permissions are required to display notifications.');
          return;
        }
      }

      const response = await axios.get(`${baseURL}/user/push-token/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userPushToken = response.data.pushToken;

      console.log('Fetched Push Token for User:', userPushToken);

      if (!userPushToken) {
        Alert.alert('Error', 'User push token not found.');
        return;
      }

      await dispatch(updateOrderStatus(orderId, newStatus, token));

      setLocalOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      console.log('Sending push notification to user and admin...');
      const notificationPayload = {
        sound: 'default',
        title: 'Order Status Updated',
        body: `Order Number: ${orderNumber}\nStatus: ${newStatus}`,
        data: {}, 
      };

      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: userPushToken,
          ...notificationPayload,
        }),
      });

      if (expoPushToken) {
        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: expoPushToken,
            sound: 'default',
            title: 'Order Status Updated',
            body: `Order Number: ${orderNumber}\nStatus: ${newStatus}`,
          }),
        });
      }

      console.log('Push notifications sent successfully!');
    } catch (error) {
      console.error('Error updating order status:', error);
      Alert.alert('Error', 'Failed to update order status.');
    }
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order #{item.orderNumber}</Text>
        <Text style={styles.orderDate}>{item.date}</Text>
      </View>
      <Text style={styles.customerName}>
        {item.user?.firstName} {item.user?.email}
      </Text>
      <Text style={styles.orderTotal}>Total: ₱{item.total.toFixed(2)}</Text>
      <Text style={styles.orderStatus}>Status: {item.status}</Text>

      <View style={styles.itemsContainer}>
        {item.cartItems.map((product, index) => (
          <Text key={index} style={styles.itemText}>
            {product.quantity}x {product.productId?.name}
          </Text>
        ))}
      </View>

      <View style={styles.actionsContainer}>
        {item.status === 'Pending' && (
          <>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleUpdateStatus(item._id, 'Shipped', item.orderNumber, item.user?._id)}
            >
              <Icon name="send-outline" size={18} color="#fff" />
              <Text style={styles.actionButtonText}>Mark as Shipped</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleUpdateStatus(item._id, 'Cancelled', item.orderNumber, item.user?._id)}
            >
              <Icon name="close-outline" size={18} color="#fff" />
              <Text style={styles.actionButtonText}>Cancel Order</Text>
            </TouchableOpacity>
          </>
        )}
        {item.status === 'Shipped' && (
          <>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleUpdateStatus(item._id, 'Delivered', item.orderNumber, item.user?._id)}
            >
              <Icon name="checkmark-done-outline" size={18} color="#fff" />
              <Text style={styles.actionButtonText}>Mark as Delivered</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleUpdateStatus(item._id, 'Cancelled', item.orderNumber, item.user?._id)}
            >
              <Icon name="close-outline" size={18} color="#fff" />
              <Text style={styles.actionButtonText}>Cancel Order</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#584e51" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {updating && (
        <View style={styles.updatingContainer}>
          <ActivityIndicator size="small" color="#584e51" />
          <Text>Updating order status...</Text>
        </View>
      )}
      <FlatList
        data={localOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContainer: {
    padding: 10,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  orderTotal: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '500',
    color: '#584e51',
    marginBottom: 10,
  },
  itemsContainer: {
    marginBottom: 10,
  },
  itemText: {
    fontSize: 14,
    color: '#555',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#584e51',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d9534f',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updatingContainer: {
    padding: 10,
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default OrderManagement;