import React, { useState, useEffect } from 'react';
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

// Mock data for orders - replace with real API data
const mockOrders = [
  {
    id: '1',
    customerName: 'Jane Doe',
    total: 59.99,
    status: 'Pending',
    date: '2025-03-28',
    items: [
      { name: 'Crystal Beaded Bracelet', quantity: 1 },
      { name: 'Gemstone Necklace', quantity: 1 },
    ],
  },
  {
    id: '2',
    customerName: 'John Smith',
    total: 34.99,
    status: 'Shipped',
    date: '2025-03-27',
    items: [{ name: 'Pearl Earrings', quantity: 2 }],
  },
  {
    id: '3',
    customerName: 'Alice Johnson',
    total: 19.99,
    status: 'Delivered',
    date: '2025-03-25',
    items: [{ name: 'Turquoise Anklet', quantity: 1 }],
  },
];

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching orders from an API
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    Alert.alert('Success', `Order status updated to ${newStatus}`);
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order #{item.id}</Text>
        <Text style={styles.orderDate}>{item.date}</Text>
      </View>
      <Text style={styles.customerName}>{item.customerName}</Text>
      <Text style={styles.orderTotal}>Total: ${item.total.toFixed(2)}</Text>
      <Text style={styles.orderStatus}>Status: {item.status}</Text>

      <View style={styles.itemsContainer}>
        {item.items.map((product, index) => (
          <Text key={index} style={styles.itemText}>
            {product.quantity}x {product.name}
          </Text>
        ))}
      </View>

      <View style={styles.actionsContainer}>
        {item.status === 'Pending' && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleUpdateStatus(item.id, 'Shipped')}
          >
            <Icon name="send-outline" size={18} color="#fff" />
            <Text style={styles.actionButtonText}>Mark as Shipped</Text>
          </TouchableOpacity>
        )}
        {item.status === 'Shipped' && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleUpdateStatus(item.id, 'Delivered')}
          >
            <Icon name="checkmark-done-outline" size={18} color="#fff" />
            <Text style={styles.actionButtonText}>Mark as Delivered</Text>
          </TouchableOpacity>
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

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
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
});

export default OrderManagement;