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

const OrderManagement = () => {
  const dispatch = useDispatch();
  const { loading, orders, error } = useSelector((state) => state.cart.adminOrders);
  const { loading: updating, error: updateError } = useSelector(
    (state) => state.cart.updateOrderStatus
  );
  const [token, setToken] = useState(null);
  const [localOrders, setLocalOrders] = useState([]); // Local state for orders

  // Fetch token and orders
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

 // Sync local orders with fetched orders and sort them
useEffect(() => {
  if (orders) {
    // Sort orders by date in descending order
    const sortedOrders = [...orders].sort((a, b) => {
      // Parse dates to compare them
      const dateA = new Date(a.createdAt || a.date);
      const dateB = new Date(b.createdAt || b.date);
      // Sort in descending order (newest first)
      return dateB - dateA;
    });
    setLocalOrders(sortedOrders);
  }
}, [orders]);

  // Show error alert only when there's an update error
  useEffect(() => {
    if (updateError) {
      Alert.alert('Error', updateError);
    }
  }, [updateError]);

  // Handle order status update
  const handleUpdateStatus = async (orderId, newStatus) => {
    if (!token) {
      Alert.alert('Error', 'Authentication token not found.');
      return;
    }
  
    try {
      await dispatch(updateOrderStatus(orderId, newStatus, token));
      // Update local state to reflect the new status
      setLocalOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      Alert.alert('Success', `Order status updated to ${newStatus}.`);
    } catch (error) {
      console.error('Error updating order status:', error);
      Alert.alert('Error', 'Failed to update order status.');
    }
  };
  
  // Render each order item
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
              onPress={() => handleUpdateStatus(item._id, 'Shipped')}
            >
              <Icon name="send-outline" size={18} color="#fff" />
              <Text style={styles.actionButtonText}>Mark as Shipped</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleUpdateStatus(item._id, 'Cancelled')}
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
              onPress={() => handleUpdateStatus(item._id, 'Delivered')}
            >
              <Icon name="checkmark-done-outline" size={18} color="#fff" />
              <Text style={styles.actionButtonText}>Mark as Delivered</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleUpdateStatus(item._id, 'Cancelled')}
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
    backgroundColor: '#d9534f', // Red color for cancel button
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