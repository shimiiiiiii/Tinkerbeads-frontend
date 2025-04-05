// import React from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// const OrderHistory = () => {
//   // Mock data for orders
//   const orders = [
//     { id: '1', date: '15 Mar 2025', total: '$124.99', status: 'Delivered' },
//     { id: '2', date: '28 Feb 2025', total: '$89.50', status: 'Delivered' },
//     { id: '3', date: '14 Feb 2025', total: '$212.30', status: 'Delivered' },
//     { id: '4', date: '02 Jan 2025', total: '$45.00', status: 'Cancelled' },
//   ];

//   const renderOrderItem = ({ item }) => {
//     return (
//       <TouchableOpacity style={styles.orderItem}>
//         <View style={styles.orderHeader}>
//           <Text style={styles.orderDate}>{item.date}</Text>
//           <Text style={[
//             styles.orderStatus, 
//             { color: item.status === 'Delivered' ? '#00C853' : '#FF3D00' }
//           ]}>
//             {item.status}
//           </Text>
//         </View>
//         <View style={styles.orderDetails}>
//           <Text style={styles.orderId}>Order #{item.id}</Text>
//           <Text style={styles.orderTotal}>{item.total}</Text>
//         </View>
//         <View style={styles.actionContainer}>
//           <TouchableOpacity style={styles.actionButton}>
//             <Text style={styles.actionText}>View Details</Text>
//           </TouchableOpacity>
//           {item.status === 'Delivered' && (
//             <TouchableOpacity style={[styles.actionButton, styles.reorderButton]}>
//               <Text style={styles.reorderText}>Buy Again</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={orders}
//         keyExtractor={item => item.id}
//         renderItem={renderOrderItem}
//         contentContainerStyle={styles.listContainer}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>No orders yet</Text>
//           </View>
//         }
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
//     padding: 15,
//   },
//   orderItem: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   orderHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   orderDate: {
//     color: '#666',
//     fontSize: 14,
//   },
//   orderStatus: {
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   orderDetails: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//     paddingBottom: 15,
//     marginBottom: 15,
//   },
//   orderId: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//   },
//   orderTotal: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#584e51',
//   },
//   actionContainer: {
//     flexDirection: 'row',
//   },
//   actionButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//     backgroundColor: '#f0f0f0',
//     marginRight: 10,
//   },
//   actionText: {
//     color: '#666',
//     fontSize: 14,
//   },
//   reorderButton: {
//     backgroundColor: '#584e51',
//   },
//   reorderText: {
//     color: '#fff',
//   },
//   emptyContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 50,
//   },
//   emptyText: {
//     color: '#999',
//     fontSize: 16,
//   },
// });

// export default OrderHistory;

//WORKING CODE
// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserOrders } from '../../Redux/Actions/cartAction';
// import { useAuth } from '../../Context/Auth'; // Import AuthContext

// const OrderHistory = () => {
//   const dispatch = useDispatch();
//   const { userOrders } = useSelector((state) => state.cart); // Access user orders from Redux state
//   const { token } = useAuth(); // Get the token from AuthContext

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchUserOrders(token)); // Fetch user orders on component mount
//     }
//   }, [dispatch, token]);

//   const renderOrderItem = ({ item }) => {
//     return (
//       <TouchableOpacity style={styles.orderItem}>
//         <View style={styles.orderHeader}>
//           <Text style={styles.orderDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
//           <Text
//             style={[
//               styles.orderStatus,
//               { color: item.status === 'Delivered' ? '#00C853' : '#FF3D00' },
//             ]}
//           >
//             {item.status || 'Pending'}
//           </Text>
//         </View>
//         <View style={styles.orderDetails}>
//           <Text style={styles.orderId}>Order #{item.orderNumber}</Text>
//           <Text style={styles.orderTotal}>₱{item.total.toFixed(2)}</Text>
//         </View>
//         <View style={styles.actionContainer}>
//           <TouchableOpacity style={styles.actionButton}>
//             <Text style={styles.actionText}>View Details</Text>
//           </TouchableOpacity>
//           {item.status === 'Delivered' && (
//             <TouchableOpacity style={[styles.actionButton, styles.reorderButton]}>
//               <Text style={styles.reorderText}>Buy Again</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   if (userOrders.loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#584e51" />
//       </View>
//     );
//   }

//   if (userOrders.error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Error: {userOrders.error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={userOrders.orders}
//         keyExtractor={(item) => item._id}
//         renderItem={renderOrderItem}
//         contentContainerStyle={styles.listContainer}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>No orders yet</Text>
//           </View>
//         }
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
//     padding: 15,
//   },
//   orderItem: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   orderHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   orderDate: {
//     color: '#666',
//     fontSize: 14,
//   },
//   orderStatus: {
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   orderDetails: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//     paddingBottom: 15,
//     marginBottom: 15,
//   },
//   orderId: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//   },
//   orderTotal: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#584e51',
//   },
//   actionContainer: {
//     flexDirection: 'row',
//   },
//   actionButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//     backgroundColor: '#f0f0f0',
//     marginRight: 10,
//   },
//   actionText: {
//     color: '#666',
//     fontSize: 14,
//   },
//   reorderButton: {
//     backgroundColor: '#584e51',
//   },
//   reorderText: {
//     color: '#fff',
//   },
//   emptyContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 50,
//   },
//   emptyText: {
//     color: '#999',
//     fontSize: 16,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   errorText: {
//     color: '#FF3D00',
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

// export default OrderHistory;

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../../Redux/Actions/cartAction';
import { useAuth } from '../../Context/Auth'; // Import AuthContext
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const OrderHistory = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Initialize navigation
  const { userOrders } = useSelector((state) => state.cart); // Access user orders from Redux state
  const { token } = useAuth(); // Get the token from AuthContext

  useEffect(() => {
    if (token) {
      dispatch(fetchUserOrders(token)); // Fetch user orders on component mount
    }
  }, [dispatch, token]);

  const renderOrderItem = ({ item }) => {
    // Define colors for different statuses
    const statusColors = {
      Pending: '#FF9800', // Orange
      Shipped: '#2196F3', // Blue
      Delivered: '#00C853', // Green
      Cancelled: '#FF3D00', // Red
    };
  
    return (
      <TouchableOpacity style={styles.orderItem}>
        <View style={styles.orderHeader}>
          {/* <Text style={styles.orderDate}>{new Date(item.createdAt).toLocaleDateString()}</Text> */}
          <Text
            style={[
              styles.orderStatus,
              { color: statusColors[item.status] || '#000' }, // Default to black if status is unknown
            ]}
          >
            {item.status || 'Pending'}
          </Text>
        </View>
        <View style={styles.orderDetails}>
          <Text style={styles.orderId}>Order #{item.orderNumber}</Text>
          <Text style={styles.orderTotal}>₱{item.total.toFixed(2)}</Text>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('OrderDetails', { order: item })} // Navigate to OrderDetails
          >
            <Text style={styles.actionText}>View Details</Text>
          </TouchableOpacity>
          {item.status === 'Delivered' && (
            <TouchableOpacity style={[styles.actionButton, styles.reorderButton]}>
              <Text style={styles.reorderText}>Buy Again</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (userOrders.loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (userOrders.error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {userOrders.error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={userOrders.orders}
        keyExtractor={(item) => item._id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No orders yet</Text>
          </View>
        }
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
    padding: 15,
  },
  orderItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderDate: {
    color: '#666',
    fontSize: 14,
  },
  orderStatus: {
    fontWeight: '600',
    fontSize: 14,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 15,
    marginBottom: 15,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#584e51',
  },
  actionContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  actionText: {
    color: '#666',
    fontSize: 14,
  },
  reorderButton: {
    backgroundColor: 'black',
  },
  reorderText: {
    color: '#fff',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FF3D00',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OrderHistory;