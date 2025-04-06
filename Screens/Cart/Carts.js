
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { SwipeRow } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  setCartItems,
} from '../../Redux/Actions/cartAction';
import { useAuth } from '../../Context/Auth'; 

const Cart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useAuth(); 
  const { cartItems } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const storageKey = `cart_${user?.id}`;
  const userCartItems = cartItems.filter((item) => item.userId === user?.id);

  useEffect(() => {
    const loadCartFromStorage = async () => {
      try {
        const storedCart = await AsyncStorage.getItem(storageKey);
        if (storedCart) {
          dispatch(setCartItems(JSON.parse(storedCart)));
        }
      } catch (error) {
        console.error('Failed to load cart from AsyncStorage:', error);
      }
    };

    if (user?.id) {
      loadCartFromStorage();
    }
  }, [storageKey, dispatch, user?.id]);

  useEffect(() => {
    const saveCartToStorage = async () => {
      try {
        await AsyncStorage.setItem(storageKey, JSON.stringify(cartItems));
      } catch (error) {
        console.error('Failed to save cart to AsyncStorage:', error);
      }
    };

    if (user?.id) {
      saveCartToStorage();
    }
  }, [cartItems, storageKey, user?.id]);

  const subtotal = userCartItems
    .filter((item) => selectedItems[item.id])
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const shipping = Object.keys(selectedItems).length > 0 ? 150 : 0;
  const total = (parseFloat(subtotal) + shipping).toFixed(2);

  const hasSelectedItems = Object.values(selectedItems).some((value) => value);

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
    const updatedSelectedItems = { ...selectedItems };
    delete updatedSelectedItems[id];
    setSelectedItems(updatedSelectedItems);
  };

  const handleRemoveSelected = () => {
    if (!hasSelectedItems) return;

    Alert.alert('Remove Items', 'Are you sure you want to remove the selected items?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          Object.keys(selectedItems).forEach((id) => {
            if (selectedItems[id]) {
              dispatch(removeFromCart(id));
            }
          });
          setSelectedItems({});
        },
      },
    ]);
  };

  const handleQuantityChange = (id, change) => {
    const item = userCartItems.find((item) => item.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change); 
      dispatch(updateQuantity(id, newQuantity));
    }
  };

  const toggleItemSelection = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleSelectAll = () => {
    if (hasSelectedItems) {
      setSelectedItems({});
    } else {
      const allSelected = {};
      userCartItems.forEach((item) => {
        allSelected[item.id] = true;
      });
      setSelectedItems(allSelected);
    }
  };
  const handleCheckout = () => {
    if (!hasSelectedItems) {
      Alert.alert('Selection Required', 'Please select at least one item to checkout');
      return;
    }
  
    setLoading(true);
    const selectedCartItems = userCartItems.filter((item) => selectedItems[item.id]);

    const selectedSubtotal = selectedCartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
    const selectedShipping = selectedCartItems.length > 0 ? 150 : 0;
    const selectedTotal = (parseFloat(selectedSubtotal) + selectedShipping).toFixed(2);
  
    setTimeout(() => {
      setLoading(false);
  
      navigation.navigate('Checkout', {
        cartItems: selectedCartItems,
        subtotal: selectedSubtotal,
        shipping: selectedShipping,
        total: selectedTotal,
      });
  
      selectedCartItems.forEach((item) => {
        dispatch(removeFromCart(item.id));
      });
  
      setSelectedItems({});
    }, 1000);
  };

  const renderCartItem = ({ item }) => (
    <SwipeRow rightOpenValue={-75} leftOpenValue={0}>
      <View style={styles.hiddenContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemoveItem(item.id)}>
          <Icon name="trash-outline" color="#fff" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.cartItemContainer}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => toggleItemSelection(item.id)}
        >
          <Icon
            name={selectedItems[item.id] ? 'checkbox-outline' : 'square-outline'}
            size={24}
            color={selectedItems[item.id] ? '#584e51' : '#ccc'}
          />
        </TouchableOpacity>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <View style={styles.variantContainer}>
            <Text style={styles.variantText}>Category: {item.category}</Text>
          </View>
          <Text style={styles.productPrice}>₱{item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)}>
            <Icon name="remove-circle-outline" size={28} color="#584e51" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)}>
            <Icon name="add-circle-outline" size={28} color="#584e51" />
          </TouchableOpacity>
        </View>
      </View>
    </SwipeRow>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <Icon name="cart-outline" size={80} color="#ccc" />
      <Text style={styles.emptyCartText}>No added item</Text>
      <Text style={styles.emptyCartSubtext}>Start adding items to complete your purchase</Text>
      <TouchableOpacity style={styles.shopNowButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.shopNowButtonText}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      {userCartItems.length > 0 ? (
        <>
          <View style={styles.selectionHeader}>
            <View style={styles.selectionContainer}>
              <TouchableOpacity onPress={toggleSelectAll} style={styles.checkboxContainer}>
                <Icon
                  name={
                    hasSelectedItems && Object.keys(selectedItems).length === userCartItems.length
                      ? 'checkbox-outline'
                      : 'square-outline'
                  }
                  size={24}
                  color={
                    hasSelectedItems && Object.keys(selectedItems).length === userCartItems.length
                      ? '#584e51'
                      : '#ccc'
                  }
                />
              </TouchableOpacity>
              <Text style={styles.selectAllText}>
                {hasSelectedItems && Object.keys(selectedItems).length === userCartItems.length
                  ? 'Deselect All'
                  : 'Select All'}
              </Text>
            </View>
            {hasSelectedItems && (
              <TouchableOpacity onPress={handleRemoveSelected} style={styles.removeSelectedButton}>
                <Icon name="trash-outline" size={18} color="#FF3B30" />
                <Text style={styles.removeSelectedText}>Remove Selected</Text>
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            data={userCartItems}
            renderItem={renderCartItem}
            keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
            contentContainerStyle={styles.listContainer}
          />

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Subtotal</Text>
              <Text style={styles.summaryValue}>₱{subtotal}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Shipping</Text>
              <Text style={styles.summaryValue}>₱{shipping.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalValue}>₱{total}</Text>
            </View>

            <TouchableOpacity
              style={[styles.checkoutButton, !hasSelectedItems && styles.disabledButton]}
              onPress={handleCheckout}
              disabled={loading || !hasSelectedItems}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.checkoutButtonText}>
                  {hasSelectedItems ? 'Proceed to Checkout' : 'Select Items to Checkout'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      ) : (
        renderEmptyCart()
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 15,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  selectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  selectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    padding: 5,
    marginRight: 10,
  },
  selectAllText: {
    fontWeight: '500',
    fontSize: 14,
  },
  removeSelectedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  removeSelectedText: {
    color: '#FF3B30',
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 4,
  },
  listContainer: {
    paddingVertical: 10,
  },
  cartItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  variantContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  variantText: {
    fontSize: 12,
    color: '#777',
    marginRight: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#584e51',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '500',
    marginHorizontal: 10,
    minWidth: 20,
    textAlign: 'center',
  },
  hiddenContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#ff3b30',
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  deleteButton: {
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 5,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#584e51',
  },
  checkoutButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#a9a9a9',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCartText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  emptyCartSubtext: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  shopNowButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  shopNowButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Cart;