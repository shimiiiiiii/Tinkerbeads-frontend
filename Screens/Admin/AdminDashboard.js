import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const AdminDashboard = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalProducts: 0,
    lowStockProducts: 0,
    totalRevenue: 0,
    totalUsers: 0,
    recentOrders: [],
  });

  // Mock data for demo
  const mockDashboardData = {
    totalOrders: 158,
    pendingOrders: 23,
    totalProducts: 75,
    lowStockProducts: 12,
    totalRevenue: 8756.50,
    totalUsers: 345,
    recentOrders: [
      {
        id: 'TB-574839',
        customerName: 'Alex Johnson',
        date: '2025-03-28',
        amount: 159.99,
        status: 'Processing'
      },
      {
        id: 'TB-574838',
        customerName: 'Maria Garcia',
        date: '2025-03-27',
        amount: 84.50,
        status: 'Shipped'
      },
      {
        id: 'TB-574837',
        customerName: 'James Wilson',
        date: '2025-03-27',
        amount: 219.95,
        status: 'Delivered'
      },
      {
        id: 'TB-574836',
        customerName: 'Sarah Lee',
        date: '2025-03-26',
        amount: 45.75,
        status: 'Delivered'
      }
    ],
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = () => {
    // Simulate API call
    setTimeout(() => {
      setDashboardData(mockDashboardData);
      setLoading(false);
      setRefreshing(false);
    }, 1000);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#584e51" />
      </View>
    );
  }

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Processing': return '#f0ad4e'; // Warning/orange
      case 'Shipped': return '#5bc0de'; // Info/blue
      case 'Delivered': return '#5cb85c'; // Success/green
      case 'Cancelled': return '#d9534f'; // Danger/red
      default: return '#777';
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Admin Menu Cards */}
      <View style={styles.menuGrid}>
        <TouchableOpacity 
          style={styles.menuCard}
          onPress={() => navigation.navigate('ProductManagement')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#584e51' }]}>
            <Icon name="cube-outline" size={28} color="#fff" />
          </View>
          <Text style={styles.menuCardTitle}>Products</Text>
          <Text style={styles.menuCardText}>Manage products</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuCard}
          onPress={() => navigation.navigate('OrderManagement')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#584e51' }]}>
            <Icon name="cart-outline" size={28} color="#fff" />
          </View>
          <Text style={styles.menuCardTitle}>Orders</Text>
          <Text style={styles.menuCardText}>Track orders</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuCard}
          // onPress={() => navigation.navigate('UserManagement')}
          onPress={() => alert('User feature coming soon!')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#584e51' }]}>
            <Icon name="people-outline" size={28} color="#fff" />
          </View>
          <Text style={styles.menuCardTitle}>Users</Text>
          <Text style={styles.menuCardText}>Manage users</Text>
          
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuCard}
          onPress={() => alert('Analytics feature coming soon!')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#584e51' }]}>
            <Icon name="stats-chart-outline" size={28} color="#fff" />
          </View>
          <Text style={styles.menuCardTitle}>Analytics</Text>
          <Text style={styles.menuCardText}>View stats</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Summary */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Icon name="cart" size={20} color="#584e51" />
            <Text style={styles.statTitle}>Orders</Text>
          </View>
          <Text style={styles.statNumber}>{dashboardData.totalOrders}</Text>
          <Text style={styles.statInfo}>
            {dashboardData.pendingOrders} pending
          </Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Icon name="cube" size={20} color="#584e51" />
            <Text style={styles.statTitle}>Products</Text>
          </View>
          <Text style={styles.statNumber}>{dashboardData.totalProducts}</Text>
          <Text style={styles.statInfo}>
            {dashboardData.lowStockProducts} low stock
          </Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Icon name="cash" size={20} color="#584e51" />
            <Text style={styles.statTitle}>Revenue</Text>
          </View>
          <Text style={styles.statNumber}>₱{dashboardData.totalRevenue.toFixed(2)}</Text>
          <Text style={styles.statInfo}>
            Total earnings
          </Text>
        </View>
      </View>

      {/* Recent Orders */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity onPress={() => navigation.navigate('OrderManagement')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {dashboardData.recentOrders.map((order) => (
          <TouchableOpacity 
            key={order.id}
            style={styles.orderCard}
            onPress={() => navigation.navigate('OrderDetails', { orderId: order.id })}
          >
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>{order.id}</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(order.status) }
              ]}>
                <Text style={styles.statusText}>{order.status}</Text>
              </View>
            </View>
            
            <View style={styles.orderDetails}>
              <Text style={styles.customerName}>{order.customerName}</Text>
              <Text style={styles.orderDate}>{order.date}</Text>
            </View>
            
            <View style={styles.orderFooter}>
              <Text style={styles.orderAmount}>${order.amount.toFixed(2)}</Text>
              <Icon name="chevron-forward" size={16} color="#999" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('ProductForm')}
          >
            <Icon name="add-circle-outline" size={24} color="#584e51" />
            <Text style={styles.actionText}>Add Product</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => alert('Feature under development')}
          >
            <Icon name="pricetag-outline" size={24} color="#584e51" />
            <Text style={styles.actionText}>Add Promotion</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => alert('Feature under development')}
          >
            <Icon name="mail-outline" size={24} color="#584e51" />
            <Text style={styles.actionText}>Send Newsletter</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('AdminSettings')}
          >
            <Icon name="settings-outline" size={24} color="#584e51" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
  },
  menuCard: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  menuCardText: {
    fontSize: 12,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  statCard: {
    backgroundColor: '#fff',
    width: '31%',
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  statInfo: {
    fontSize: 11,
    color: '#999',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  viewAllText: {
    fontSize: 12,
    color: '#584e51',
  },
  orderCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 10,
    marginBottom: 5,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '500',
  },
  orderDetails: {
    marginBottom: 5,
  },
  customerName: {
    fontSize: 13,
    color: '#555',
  },
  orderDate: {
    fontSize: 12,
    color: '#999',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderAmount: {
    fontSize: 15,
    fontWeight: '600',
    color: '#584e51',
  },
  quickActionsContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  actionButton: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  actionText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
  }
});

export default AdminDashboard;