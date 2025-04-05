// // import React from 'react'

// // const Carts = () => {
// //     return (
// //         <>
// //             {/* <div>Cart to</div> */}
// //         </>
// //     )
// // }

// // export default Carts

// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   FlatList, 
//   Image, 
//   TouchableOpacity, 
//   SafeAreaView,
//   ActivityIndicator
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { SwipeRow } from 'react-native-swipe-list-view';
// import { useNavigation } from '@react-navigation/native';

// // This would typically come from your API or context
// const initialCartItems = [
//   {
//     id: '1',
//     productId: '101',
//     name: 'Beaded Bracelet',
//     price: 19.99,
//     image: 'https://via.placeholder.com/100',
//     quantity: 2,
//     color: 'Blue',
//     size: 'Medium'
//   },
//   {
//     id: '2',
//     productId: '102',
//     name: 'Crystal Necklace',
//     price: 34.99,
//     image: 'https://via.placeholder.com/100',
//     quantity: 1,
//     color: 'Silver',
//     size: 'Standard'
//   },
//   {
//     id: '3',
//     productId: '103',
//     name: 'Gemstone Earrings',
//     price: 24.50,
//     image: 'https://via.placeholder.com/100',
//     quantity: 1,
//     color: 'Green',
//     size: 'Small'
//   }
// ];

// const Cart = () => {
//   const navigation = useNavigation();
//   const [cartItems, setCartItems] = useState(initialCartItems);
//   const [loading, setLoading] = useState(false);
  
//   // Calculate subtotal
//   const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
//   const shipping = cartItems.length > 0 ? 5.99 : 0;
//   const total = (parseFloat(subtotal) + shipping).toFixed(2);

//   const handleRemoveItem = (id) => {
//     setCartItems(cartItems.filter(item => item.id !== id));
//   };

//   const handleQuantityChange = (id, change) => {
//     setCartItems(cartItems.map(item => {
//       if (item.id === id) {
//         const newQuantity = Math.max(1, item.quantity + change); // Ensure quantity is at least 1
//         return { ...item, quantity: newQuantity };
//       }
//       return item;
//     }));
//   };

//   const handleCheckout = () => {
//     if (cartItems.length === 0) return;
    
//     setLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       setLoading(false);
//       navigation.navigate('Checkout', { cartItems, subtotal, shipping, total });
//     }, 1000);
//   };

//   const renderCartItem = ({ item }) => (
//     <SwipeRow
//       rightOpenValue={-75}
//       leftOpenValue={0}
//     >
//       {/* Hidden View - shown when swiped */}
//       <View style={styles.hiddenContainer}>
//         <TouchableOpacity
//           style={styles.deleteButton}
//           onPress={() => handleRemoveItem(item.id)}
//         >
//           <Icon name="trash-outline" color="#fff" size={24} />
//         </TouchableOpacity>
//       </View>

//       {/* Visible View */}
//       <View style={styles.cartItemContainer}>
//         <Image source={{ uri: item.image }} style={styles.productImage} />
//         <View style={styles.productDetails}>
//           <Text style={styles.productName}>{item.name}</Text>
//           <View style={styles.variantContainer}>
//             <Text style={styles.variantText}>Color: {item.color}</Text>
//             <Text style={styles.variantText}>Size: {item.size}</Text>
//           </View>
//           <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
//         </View>
//         <View style={styles.quantityContainer}>
//           <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)}>
//             <Icon name="remove-circle-outline" size={28} color="#584e51" />
//           </TouchableOpacity>
//           <Text style={styles.quantityText}>{item.quantity}</Text>
//           <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)}>
//             <Icon name="add-circle-outline" size={28} color="#584e51" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SwipeRow>
//   );

//   const renderEmptyCart = () => (
//     <View style={styles.emptyCartContainer}>
//       <Icon name="cart-outline" size={80} color="#ccc" />
//       <Text style={styles.emptyCartText}>Your cart is empty</Text>
//       <Text style={styles.emptyCartSubtext}>Looks like you haven't added any items to your cart yet.</Text>
//       <TouchableOpacity 
//         style={styles.shopNowButton}
//         onPress={() => navigation.navigate('Home')}
//       >
//         <Text style={styles.shopNowButtonText}>Shop Now</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>My Cart</Text>
//       </View>
      
//       {cartItems.length > 0 ? (
//         <>
//           <FlatList
//             data={cartItems}
//             renderItem={renderCartItem}
//             keyExtractor={item => item.id}
//             contentContainerStyle={styles.listContainer}
//           />
          
//           <View style={styles.summaryContainer}>
//             <View style={styles.summaryRow}>
//               <Text style={styles.summaryText}>Subtotal</Text>
//               <Text style={styles.summaryValue}>${subtotal}</Text>
//             </View>
//             <View style={styles.summaryRow}>
//               <Text style={styles.summaryText}>Shipping</Text>
//               <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
//             </View>
//             <View style={[styles.summaryRow, styles.totalRow]}>
//               <Text style={styles.totalText}>Total</Text>
//               <Text style={styles.totalValue}>${total}</Text>
//             </View>

//             <TouchableOpacity 
//               style={styles.checkoutButton}
//               onPress={handleCheckout}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator size="small" color="#fff" />
//               ) : (
//                 <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         </>
//       ) : (
//         renderEmptyCart()
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   header: {
//     padding: 15,
//     backgroundColor: '#584e51',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   listContainer: {
//     paddingVertical: 10,
//   },
//   cartItemContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     padding: 15,
//     marginHorizontal: 15,
//     marginVertical: 5,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   productImage: {
//     width: 70,
//     height: 70,
//     borderRadius: 5,
//   },
//   productDetails: {
//     flex: 1,
//     marginLeft: 15,
//     justifyContent: 'center',
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 5,
//   },
//   variantContainer: {
//     flexDirection: 'row',
//     marginBottom: 5,
//   },
//   variantText: {
//     fontSize: 12,
//     color: '#777',
//     marginRight: 10,
//   },
//   productPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#584e51',
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 10,
//   },
//   quantityText: {
//     fontSize: 18,
//     fontWeight: '500',
//     marginHorizontal: 10,
//     minWidth: 20,
//     textAlign: 'center',
//   },
//   hiddenContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     backgroundColor: '#ff3b30',
//     marginHorizontal: 15,
//     marginVertical: 5,
//     borderRadius: 10,
//   },
//   deleteButton: {
//     width: 75,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   summaryContainer: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#e0e0e0',
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   summaryText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   summaryValue: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   totalRow: {
//     marginTop: 5,
//     paddingTop: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#e0e0e0',
//   },
//   totalText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   totalValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#584e51',
//   },
//   checkoutButton: {
//     backgroundColor: '#584e51',
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   checkoutButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   emptyCartContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   emptyCartText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 20,
//   },
//   emptyCartSubtext: {
//     fontSize: 16,
//     color: '#777',
//     textAlign: 'center',
//     marginTop: 10,
//     marginBottom: 30,
//   },
//   shopNowButton: {
//     backgroundColor: '#584e51',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//   },
//   shopNowButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default Cart;

// import React from 'react'

// const Carts = () => {
//     return (
//         <>
//             {/* <div>Cart to</div> */}
//         </>
//     )
// }

// export default Carts

//WORKING CODE
// import React, { useState } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   FlatList, 
//   Image, 
//   TouchableOpacity, 
//   SafeAreaView,
//   ActivityIndicator
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { SwipeRow } from 'react-native-swipe-list-view';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector, useDispatch } from 'react-redux';
// import { 
//   removeFromCart, 
//   updateQuantity, 
//   clearCart 
// } from '../../Redux/Actions/cartAction';

// const Cart = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   // Access cart state from Redux
//   const { cartItems } = useSelector(state => state.cart);

//   const [loading, setLoading] = useState(false);

//   // Calculate subtotal
//   const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
//   const shipping = cartItems.length > 0 ? 5.99 : 0;
//   const total = (parseFloat(subtotal) + shipping).toFixed(2);

//   const handleRemoveItem = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const handleQuantityChange = (id, change) => {
//     const item = cartItems.find(item => item.id === id);
//     if (item) {
//       const newQuantity = Math.max(1, item.quantity + change); // Ensure quantity is at least 1
//       dispatch(updateQuantity(id, newQuantity));
//     }
//   };

//   const handleCheckout = () => {
//     if (cartItems.length === 0) return;

//     setLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       setLoading(false);
//       navigation.navigate('Checkout', { cartItems, subtotal, shipping, total });
//     }, 1000);
//   };

//   const renderCartItem = ({ item }) => (
//     <SwipeRow
//       rightOpenValue={-75}
//       leftOpenValue={0}
//     >
//       {/* Hidden View - shown when swiped */}
//       <View style={styles.hiddenContainer}>
//         <TouchableOpacity
//           style={styles.deleteButton}
//           onPress={() => handleRemoveItem(item.id)}
//         >
//           <Icon name="trash-outline" color="#fff" size={24} />
//         </TouchableOpacity>
//       </View>

//       {/* Visible View */}
//       <View style={styles.cartItemContainer}>
//         <Image source={{ uri: item.image }} style={styles.productImage} />
//         <View style={styles.productDetails}>
//           <Text style={styles.productName}>{item.name}</Text>
//           <View style={styles.variantContainer}>
//             <Text style={styles.variantText}>Category: {item.category}</Text>
//           </View>
//           <Text style={styles.productPrice}>₱{item.price.toFixed(2)}</Text>
//         </View>
//         <View style={styles.quantityContainer}>
//           <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)}>
//             <Icon name="remove-circle-outline" size={28} color="#584e51" />
//           </TouchableOpacity>
//           <Text style={styles.quantityText}>{item.quantity}</Text>
//           <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)}>
//             <Icon name="add-circle-outline" size={28} color="#584e51" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SwipeRow>
//   );

//   const renderEmptyCart = () => (
//     <View style={styles.emptyCartContainer}>
//       <Icon name="cart-outline" size={80} color="#ccc" />
//       <Text style={styles.emptyCartText}>No added item</Text>
//       <Text style={styles.emptyCartSubtext}>Looks like you haven't added any items to your cart yet.</Text>
//       <TouchableOpacity 
//         style={styles.shopNowButton}
//         onPress={() => navigation.navigate('Home')}
//       >
//         <Text style={styles.shopNowButtonText}>Shop Now</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>My Cart</Text>
//         {cartItems.length > 0 && (
//           <TouchableOpacity onPress={() => dispatch(clearCart())}>
//             <Text style={styles.clearCartText}>Clear Cart</Text>
//           </TouchableOpacity>
//         )}
//       </View>
      
//       {cartItems.length > 0 ? (
//         <>
//           <FlatList
//             data={cartItems}
//             renderItem={renderCartItem}
//             keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
//             contentContainerStyle={styles.listContainer}
//           />
          
//           <View style={styles.summaryContainer}>
//             <View style={styles.summaryRow}>
//               <Text style={styles.summaryText}>Subtotal</Text>
//               <Text style={styles.summaryValue}>₱{subtotal}</Text>
//             </View>
//             <View style={styles.summaryRow}>
//               <Text style={styles.summaryText}>Shipping</Text>
//               <Text style={styles.summaryValue}>₱{shipping.toFixed(2)}</Text>
//             </View>
//             <View style={[styles.summaryRow, styles.totalRow]}>
//               <Text style={styles.totalText}>Total</Text>
//               <Text style={styles.totalValue}>₱{total}</Text>
//             </View>

//             <TouchableOpacity 
//               style={styles.checkoutButton}
//               onPress={handleCheckout}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator size="small" color="#fff" />
//               ) : (
//                 <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         </>
//       ) : (
//         renderEmptyCart()
//       )}
//     </SafeAreaView>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   header: {
//     padding: 15,
//     backgroundColor: '#584e51',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   listContainer: {
//     paddingVertical: 10,
//   },
//   cartItemContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     padding: 15,
//     marginHorizontal: 15,
//     marginVertical: 5,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   productImage: {
//     width: 70,
//     height: 70,
//     borderRadius: 5,
//   },
//   productDetails: {
//     flex: 1,
//     marginLeft: 15,
//     justifyContent: 'center',
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 5,
//   },
//   variantContainer: {
//     flexDirection: 'row',
//     marginBottom: 5,
//   },
//   variantText: {
//     fontSize: 12,
//     color: '#777',
//     marginRight: 10,
//   },
//   productPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#584e51',
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 10,
//   },
//   quantityText: {
//     fontSize: 18,
//     fontWeight: '500',
//     marginHorizontal: 10,
//     minWidth: 20,
//     textAlign: 'center',
//   },
//   hiddenContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     backgroundColor: '#ff3b30',
//     marginHorizontal: 15,
//     marginVertical: 5,
//     borderRadius: 10,
//   },
//   deleteButton: {
//     width: 75,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   summaryContainer: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#e0e0e0',
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   summaryText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   summaryValue: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   totalRow: {
//     marginTop: 5,
//     paddingTop: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#e0e0e0',
//   },
//   totalText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   totalValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#584e51',
//   },
//   checkoutButton: {
//     backgroundColor: '#584e51',
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   checkoutButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   emptyCartContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   emptyCartText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 20,
//   },
//   emptyCartSubtext: {
//     fontSize: 16,
//     color: '#777',
//     textAlign: 'center',
//     marginTop: 10,
//     marginBottom: 30,
//   },
//   shopNowButton: {
//     backgroundColor: '#584e51',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//   },
//   shopNowButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   clearCartText: {
//     fontSize: 14,
//     color: '#FF3B30',
//     fontWeight: '600',
//     marginRight: 15,
//   },
// });

// export default Cart;

//WORKING WITH GOOD DESIGN
// import React, { useState } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   FlatList, 
//   Image, 
//   TouchableOpacity, 
//   SafeAreaView,
//   ActivityIndicator,
//   Alert
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { SwipeRow } from 'react-native-swipe-list-view';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector, useDispatch } from 'react-redux';
// import { 
//   removeFromCart, 
//   updateQuantity, 
//   clearCart 
// } from '../../Redux/Actions/cartAction';
// import { CheckBox } from 'react-native-elements';

// const Cart = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   // Access cart state from Redux
//   const { cartItems } = useSelector(state => state.cart);

//   const [loading, setLoading] = useState(false);
//   const [selectedItems, setSelectedItems] = useState({});

//   // Calculate subtotal for selected items only
//   const subtotal = cartItems
//     .filter(item => selectedItems[item.id])
//     .reduce((sum, item) => sum + (item.price * item.quantity), 0)
//     .toFixed(2);
    
//   const shipping = Object.keys(selectedItems).length > 0 ? 150 : 0;
//   const total = (parseFloat(subtotal) + shipping).toFixed(2);

//   // Check if any item is selected
//   const hasSelectedItems = Object.values(selectedItems).some(value => value);

//   const handleRemoveItem = (id) => {
//     dispatch(removeFromCart(id));
//     // Remove from selected items as well
//     const updatedSelectedItems = {...selectedItems};
//     delete updatedSelectedItems[id];
//     setSelectedItems(updatedSelectedItems);
//   };

//   const handleRemoveSelected = () => {
//     if (!hasSelectedItems) return;
    
//     Alert.alert(
//       "Remove Items",
//       "Are you sure you want to remove the selected items?",
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "Remove", style: "destructive", onPress: () => {
//           Object.keys(selectedItems).forEach(id => {
//             if (selectedItems[id]) {
//               dispatch(removeFromCart(id));
//             }
//           });
//           setSelectedItems({});
//         }}
//       ]
//     );
//   };

//   const handleQuantityChange = (id, change) => {
//     const item = cartItems.find(item => item.id === id);
//     if (item) {
//       const newQuantity = Math.max(1, item.quantity + change); // Ensure quantity is at least 1
//       dispatch(updateQuantity(id, newQuantity));
//     }
//   };

//   const toggleItemSelection = (id) => {
//     setSelectedItems(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const toggleSelectAll = () => {
//     if (hasSelectedItems) {
//       // If any items are selected, deselect all
//       setSelectedItems({});
//     } else {
//       // Select all items
//       const allSelected = {};
//       cartItems.forEach(item => {
//         allSelected[item.id] = true;
//       });
//       setSelectedItems(allSelected);
//     }
//   };

//   const handleCheckout = () => {
//     if (!hasSelectedItems) {
//       Alert.alert("Selection Required", "Please select at least one item to checkout");
//       return;
//     }

//     setLoading(true);
//     // Get only the selected items
//     const selectedCartItems = cartItems.filter(item => selectedItems[item.id]);
    
//     // Simulate API call
//     setTimeout(() => {
//       setLoading(false);
//       navigation.navigate('Checkout', { 
//         cartItems: selectedCartItems, 
//         subtotal, 
//         shipping, 
//         total 
//       });
//     }, 1000);
//   };

//   const renderCartItem = ({ item }) => (
//     <SwipeRow
//       rightOpenValue={-75}
//       leftOpenValue={0}
//     >
//       {/* Hidden View - shown when swiped */}
//       <View style={styles.hiddenContainer}>
//         <TouchableOpacity
//           style={styles.deleteButton}
//           onPress={() => handleRemoveItem(item.id)}
//         >
//           <Icon name="trash-outline" color="#fff" size={24} />
//         </TouchableOpacity>
//       </View>

//       {/* Visible View */}
//       <View style={styles.cartItemContainer}>
//         <CheckBox
//           checked={selectedItems[item.id] || false}
//           onPress={() => toggleItemSelection(item.id)}
//           checkedColor="#584e51"
//           containerStyle={styles.checkbox}
//         />
//         <Image source={{ uri: item.image }} style={styles.productImage} />
//         <View style={styles.productDetails}>
//           <Text style={styles.productName}>{item.name}</Text>
//           <View style={styles.variantContainer}>
//             <Text style={styles.variantText}>Category: {item.category}</Text>
//           </View>
//           <Text style={styles.productPrice}>₱{item.price.toFixed(2)}</Text>
//         </View>
//         <View style={styles.quantityContainer}>
//           <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)}>
//             <Icon name="remove-circle-outline" size={28} color="#584e51" />
//           </TouchableOpacity>
//           <Text style={styles.quantityText}>{item.quantity}</Text>
//           <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)}>
//             <Icon name="add-circle-outline" size={28} color="#584e51" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SwipeRow>
//   );

//   const renderEmptyCart = () => (
//     <View style={styles.emptyCartContainer}>
//       <Icon name="cart-outline" size={80} color="#ccc" />
//       <Text style={styles.emptyCartText}>No added item</Text>
//       <Text style={styles.emptyCartSubtext}>Looks like you haven't added any items to your cart yet.</Text>
//       <TouchableOpacity 
//         style={styles.shopNowButton}
//         onPress={() => navigation.navigate('Home')}
//       >
//         <Text style={styles.shopNowButtonText}>Shop Now</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>My Cart</Text>
//       </View>
      
//       {cartItems.length > 0 ? (
//         <>
//           <View style={styles.selectionHeader}>
//             <View style={styles.selectionContainer}>
//               <CheckBox
//                 checked={hasSelectedItems && Object.keys(selectedItems).length === cartItems.length}
//                 onPress={toggleSelectAll}
//                 title={hasSelectedItems && Object.keys(selectedItems).length === cartItems.length ? "Deselect All" : "Select All"}
//                 checkedColor="#584e51"
//                 containerStyle={styles.selectAllCheckbox}
//                 textStyle={styles.selectAllText}
//               />
//             </View>
//             {hasSelectedItems && (
//               <TouchableOpacity onPress={handleRemoveSelected} style={styles.removeSelectedButton}>
//                 <Icon name="trash-outline" size={18} color="#FF3B30" />
//                 <Text style={styles.removeSelectedText}>Remove Selected</Text>
//               </TouchableOpacity>
//             )}
//           </View>

//           <FlatList
//             data={cartItems}
//             renderItem={renderCartItem}
//             keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
//             contentContainerStyle={styles.listContainer}
//           />
          
//           <View style={styles.summaryContainer}>
//             <View style={styles.summaryRow}>
//               <Text style={styles.summaryText}>Subtotal</Text>
//               <Text style={styles.summaryValue}>₱{subtotal}</Text>
//             </View>
//             <View style={styles.summaryRow}>
//               <Text style={styles.summaryText}>Shipping</Text>
//               <Text style={styles.summaryValue}>₱{shipping.toFixed(2)}</Text>
//             </View>
//             <View style={[styles.summaryRow, styles.totalRow]}>
//               <Text style={styles.totalText}>Total</Text>
//               <Text style={styles.totalValue}>₱{total}</Text>
//             </View>

//             <TouchableOpacity 
//               style={[
//                 styles.checkoutButton,
//                 !hasSelectedItems && styles.disabledButton
//               ]}
//               onPress={handleCheckout}
//               disabled={loading || !hasSelectedItems}
//             >
//               {loading ? (
//                 <ActivityIndicator size="small" color="#fff" />
//               ) : (
//                 <Text style={styles.checkoutButtonText}>
//                   {hasSelectedItems ? "Proceed to Checkout" : "Select Items to Checkout"}
//                 </Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         </>
//       ) : (
//         renderEmptyCart()
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   header: {
//     padding: 15,
//     backgroundColor: '#584e51',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   selectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   selectionContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   selectAllCheckbox: {
//     backgroundColor: 'transparent',
//     borderWidth: 0,
//     padding: 0,
//     margin: 0,
//   },
//   selectAllText: {
//     fontWeight: '500',
//     fontSize: 14,
//   },
//   removeSelectedButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 8,
//   },
//   removeSelectedText: {
//     color: '#FF3B30',
//     fontWeight: '500',
//     fontSize: 14,
//     marginLeft: 4,
//   },
//   listContainer: {
//     paddingVertical: 10,
//   },
//   cartItemContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     padding: 15,
//     marginHorizontal: 15,
//     marginVertical: 5,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//     alignItems: 'center',
//   },
//   checkbox: {
//     padding: 0,
//     margin: 0,
//     backgroundColor: 'transparent',
//     borderWidth: 0,
//   },
//   productImage: {
//     width: 70,
//     height: 70,
//     borderRadius: 5,
//   },
//   productDetails: {
//     flex: 1,
//     marginLeft: 10,
//     justifyContent: 'center',
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 5,
//   },
//   variantContainer: {
//     flexDirection: 'row',
//     marginBottom: 5,
//   },
//   variantText: {
//     fontSize: 12,
//     color: '#777',
//     marginRight: 10,
//   },
//   productPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#584e51',
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 5,
//   },
//   quantityText: {
//     fontSize: 18,
//     fontWeight: '500',
//     marginHorizontal: 10,
//     minWidth: 20,
//     textAlign: 'center',
//   },
//   hiddenContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     backgroundColor: '#ff3b30',
//     marginHorizontal: 15,
//     marginVertical: 5,
//     borderRadius: 10,
//   },
//   deleteButton: {
//     width: 75,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   summaryContainer: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#e0e0e0',
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   summaryText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   summaryValue: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   totalRow: {
//     marginTop: 5,
//     paddingTop: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#e0e0e0',
//   },
//   totalText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   totalValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#584e51',
//   },
//   checkoutButton: {
//     backgroundColor: '#584e51',
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   disabledButton: {
//     backgroundColor: '#a9a9a9',
//   },
//   checkoutButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   emptyCartContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   emptyCartText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 20,
//   },
//   emptyCartSubtext: {
//     fontSize: 16,
//     color: '#777',
//     textAlign: 'center',
//     marginTop: 10,
//     marginBottom: 30,
//   },
//   shopNowButton: {
//     backgroundColor: '#584e51',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//   },
//   shopNowButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default Cart;

//FINAL WORKING CART WITH ASYNC
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
import { useAuth } from '../../Context/Auth'; // Import AuthContext

const Cart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useAuth(); // Retrieve user from AuthContext

  // Access cart state from Redux
  const { cartItems } = useSelector((state) => state.cart);

  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});

  // AsyncStorage key for the current user's cart
  const storageKey = `cart_${user?.id}`;

  // Filter cart items for the current user
  const userCartItems = cartItems.filter((item) => item.userId === user?.id);

  // Load cart data from AsyncStorage on component mount
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

  // Save cart data to AsyncStorage whenever cartItems change
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

  // Calculate subtotal for selected items only
  const subtotal = userCartItems
    .filter((item) => selectedItems[item.id])
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const shipping = Object.keys(selectedItems).length > 0 ? 150 : 0;
  const total = (parseFloat(subtotal) + shipping).toFixed(2);

  // Check if any item is selected
  const hasSelectedItems = Object.values(selectedItems).some((value) => value);

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
    // Remove from selected items as well
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
      const newQuantity = Math.max(1, item.quantity + change); // Ensure quantity is at least 1
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
      // If any items are selected, deselect all
      setSelectedItems({});
    } else {
      // Select all items
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
  
    // Get only the selected items
    const selectedCartItems = userCartItems.filter((item) => selectedItems[item.id]);
  
    // Recalculate subtotal, shipping, and total for selected items
    const selectedSubtotal = selectedCartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
    const selectedShipping = selectedCartItems.length > 0 ? 150 : 0;
    const selectedTotal = (parseFloat(selectedSubtotal) + selectedShipping).toFixed(2);
  
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
  
      // Navigate to the Checkout screen
      navigation.navigate('Checkout', {
        cartItems: selectedCartItems,
        subtotal: selectedSubtotal,
        shipping: selectedShipping,
        total: selectedTotal,
      });
  
      // Remove only the selected items from the cart
      selectedCartItems.forEach((item) => {
        dispatch(removeFromCart(item.id));
      });
  
      // Clear the selected items state
      setSelectedItems({});
    }, 1000);
  };

  const renderCartItem = ({ item }) => (
    <SwipeRow rightOpenValue={-75} leftOpenValue={0}>
      {/* Hidden View - shown when swiped */}
      <View style={styles.hiddenContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemoveItem(item.id)}>
          <Icon name="trash-outline" color="#fff" size={24} />
        </TouchableOpacity>
      </View>

      {/* Visible View */}
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
      <Text style={styles.emptyCartSubtext}>Looks like you haven't added any items to your cart yet.</Text>
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
    backgroundColor: '#584e51',
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