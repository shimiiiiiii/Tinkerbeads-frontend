import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommonActions } from '@react-navigation/native';

const OrderConfirmation = ({ route, navigation }) => {
  const { orderNumber, total } = route.params;
  
  const goToHome = () => {
    // Reset navigation to home
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  };
  
  const viewOrders = () => {
    // Navigate to order history
    navigation.navigate('User', {
      screen: 'OrderHistory',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.checkCircle}>
          <Icon name="checkmark" size={60} color="#fff" />
        </View>
        
        <Text style={styles.title}>Order Confirmed!</Text>
        
        <Text style={styles.message}>
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </Text>
        
        <View style={styles.orderDetails}>
          <View style={styles.orderItem}>
            <Text style={styles.orderLabel}>Order Number:</Text>
            <Text style={styles.orderValue}>{orderNumber}</Text>
          </View>
          
          <View style={styles.orderItem}>
            <Text style={styles.orderLabel}>Total Amount:</Text>
            <Text style={styles.orderValue}>₱{total}</Text>
          </View>
          
          <View style={styles.orderItem}>
            <Text style={styles.orderLabel}>Estimated Delivery:</Text>
            <Text style={styles.orderValue}>3-5 business days</Text>
          </View>
        </View>
        
        <Text style={styles.emailMessage}>
          We've sent a confirmation email with order details to your email address.
        </Text>
      </View>
      
      <View style={styles.buttons}>
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]}
          onPress={goToHome}
        >
          <Text style={styles.primaryButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]}
          onPress={viewOrders}
        >
          <Text style={styles.secondaryButtonText}>View Orders</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3cb371', // Success green
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 24,
  },
  orderDetails: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderLabel: {
    fontSize: 15,
    color: '#666',
  },
  orderValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  emailMessage: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  buttons: {
    marginTop: 30,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: '#584e51',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#584e51',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#584e51',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OrderConfirmation;