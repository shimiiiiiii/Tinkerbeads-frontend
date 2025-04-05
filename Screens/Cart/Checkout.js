// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   ActivityIndicator
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// const Checkout = ({ route, navigation }) => {
//   const { cartItems, subtotal, shipping, total } = route.params;
//   const [loading, setLoading] = useState(false);
  
//   // Form state
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     zipCode: '',
//     country: '',
//     cardName: '',
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//   });
  
//   // Payment methods
//   const [paymentMethod, setPaymentMethod] = useState('credit');

//   const updateFormField = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   const validateForm = () => {
//     // Basic validation - check if required fields are filled
//     const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'zipCode', 'country'];
    
//     if (paymentMethod === 'credit') {
//       requiredFields.push('cardName', 'cardNumber', 'expiryDate', 'cvv');
//     }
    
//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         Alert.alert('Missing information', `Please fill in the ${formatFieldName(field)} field`);
//         return false;
//       }
//     }
    
//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       Alert.alert('Invalid email', 'Please enter a valid email address');
//       return false;
//     }
    
//     return true;
//   };

//   const formatFieldName = (field) => {
//     return field
//       .replace(/([A-Z])/g, ' $1')
//       .replace(/^./, str => str.toUpperCase());
//   };

//   const handlePlaceOrder = () => {
//     if (!validateForm()) return;
    
//     setLoading(true);
    
//     // Simulate order processing
//     setTimeout(() => {
//       setLoading(false);
      
//       // Navigate to order confirmation
//       navigation.navigate('OrderConfirmation', {
//         orderNumber: generateOrderNumber(),
//         total,
//       });
//     }, 2000);
//   };

//   const generateOrderNumber = () => {
//     return 'TB-' + Math.floor(100000 + Math.random() * 900000);
//   };

//   return (
//     <KeyboardAwareScrollView style={styles.container}>
//       {/* Shipping Information */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Shipping Information</Text>
        
//         <View style={styles.formRow}>
//           <View style={styles.formColumn}>
//             <Text style={styles.label}>First Name</Text>
//             <TextInput
//               style={styles.input}
//               value={formData.firstName}
//               onChangeText={(text) => updateFormField('firstName', text)}
//               placeholder="First name"
//             />
//           </View>
//           <View style={styles.formColumn}>
//             <Text style={styles.label}>Last Name</Text>
//             <TextInput
//               style={styles.input}
//               value={formData.lastName}
//               onChangeText={(text) => updateFormField('lastName', text)}
//               placeholder="Last name"
//             />
//           </View>
//         </View>
        
//         <View style={styles.formField}>
//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             style={styles.input}
//             value={formData.email}
//             onChangeText={(text) => updateFormField('email', text)}
//             placeholder="Email address"
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//         </View>
        
//         <View style={styles.formField}>
//           <Text style={styles.label}>Phone (optional)</Text>
//           <TextInput
//             style={styles.input}
//             value={formData.phone}
//             onChangeText={(text) => updateFormField('phone', text)}
//             placeholder="Phone number"
//             keyboardType="phone-pad"
//           />
//         </View>
        
//         <View style={styles.formField}>
//           <Text style={styles.label}>Address</Text>
//           <TextInput
//             style={styles.input}
//             value={formData.address}
//             onChangeText={(text) => updateFormField('address', text)}
//             placeholder="Street address"
//           />
//         </View>
        
//         <View style={styles.formRow}>
//           <View style={styles.formColumn}>
//             <Text style={styles.label}>City</Text>
//             <TextInput
//               style={styles.input}
//               value={formData.city}
//               onChangeText={(text) => updateFormField('city', text)}
//               placeholder="City"
//             />
//           </View>
//           <View style={styles.formColumn}>
//             <Text style={styles.label}>Zip Code</Text>
//             <TextInput
//               style={styles.input}
//               value={formData.zipCode}
//               onChangeText={(text) => updateFormField('zipCode', text)}
//               placeholder="ZIP / Postal code"
//             />
//           </View>
//         </View>
        
//         <View style={styles.formField}>
//           <Text style={styles.label}>Country</Text>
//           <TextInput
//             style={styles.input}
//             value={formData.country}
//             onChangeText={(text) => updateFormField('country', text)}
//             placeholder="Country"
//           />
//         </View>
//       </View>
      
//       {/* Payment Method */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Payment Method</Text>
        
//         <View style={styles.paymentOptions}>
//           <TouchableOpacity
//             style={[
//               styles.paymentOption,
//               paymentMethod === 'credit' && styles.selectedPaymentOption
//             ]}
//             onPress={() => setPaymentMethod('credit')}
//           >
//             <Icon
//               name="card-outline"
//               size={24}
//               color={paymentMethod === 'credit' ? '#584e51' : '#777'}
//             />
//             <Text style={[
//               styles.paymentOptionText,
//               paymentMethod === 'credit' && styles.selectedPaymentOptionText
//             ]}>Credit Card</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity
//             style={[
//               styles.paymentOption,
//               paymentMethod === 'paypal' && styles.selectedPaymentOption
//             ]}
//             onPress={() => setPaymentMethod('paypal')}
//           >
//             <Icon
//               name="logo-paypal"
//               size={24}
//               color={paymentMethod === 'paypal' ? '#584e51' : '#777'}
//             />
//             <Text style={[
//               styles.paymentOptionText,
//               paymentMethod === 'paypal' && styles.selectedPaymentOptionText
//             ]}>PayPal</Text>
//           </TouchableOpacity>
//         </View>
        
//         {paymentMethod === 'credit' && (
//           <View style={styles.creditCardForm}>
//             <View style={styles.formField}>
//               <Text style={styles.label}>Name on Card</Text>
//               <TextInput
//                 style={styles.input}
//                 value={formData.cardName}
//                 onChangeText={(text) => updateFormField('cardName', text)}
//                 placeholder="Name as it appears on card"
//               />
//             </View>
            
//             <View style={styles.formField}>
//               <Text style={styles.label}>Card Number</Text>
//               <TextInput
//                 style={styles.input}
//                 value={formData.cardNumber}
//                 onChangeText={(text) => updateFormField('cardNumber', text)}
//                 placeholder="XXXX XXXX XXXX XXXX"
//                 keyboardType="number-pad"
//                 maxLength={19}
//               />
//             </View>
            
//             <View style={styles.formRow}>
//               <View style={styles.formColumn}>
//                 <Text style={styles.label}>Expiry Date</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.expiryDate}
//                   onChangeText={(text) => updateFormField('expiryDate', text)}
//                   placeholder="MM/YY"
//                   keyboardType="number-pad"
//                   maxLength={5}
//                 />
//               </View>
//               <View style={styles.formColumn}>
//                 <Text style={styles.label}>CVV</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.cvv}
//                   onChangeText={(text) => updateFormField('cvv', text)}
//                   placeholder="CVV"
//                   keyboardType="number-pad"
//                   maxLength={4}
//                   secureTextEntry
//                 />
//               </View>
//             </View>
//           </View>
//         )}
        
//         {paymentMethod === 'paypal' && (
//           <View style={styles.paypalInfo}>
//             <Text style={styles.paypalInfoText}>
//               You'll be redirected to PayPal to complete your purchase securely.
//             </Text>
//           </View>
//         )}
//       </View>
      
//       {/* Order Summary */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Order Summary</Text>
        
//         <View style={styles.summaryItem}>
//           <Text style={styles.summaryItemText}>Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</Text>
//           <Text style={styles.summaryItemValue}>${subtotal}</Text>
//         </View>
        
//         <View style={styles.summaryItem}>
//           <Text style={styles.summaryItemText}>Shipping</Text>
//           <Text style={styles.summaryItemValue}>${shipping.toFixed(2)}</Text>
//         </View>
        
//         <View style={[styles.summaryItem, styles.totalItem]}>
//           <Text style={styles.totalText}>Total</Text>
//           <Text style={styles.totalValue}>${total}</Text>
//         </View>
//       </View>
      
//       {/* Place Order Button */}
//       <TouchableOpacity
//         style={styles.placeOrderButton}
//         onPress={handlePlaceOrder}
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator size="small" color="#fff" />
//         ) : (
//           <Text style={styles.placeOrderButtonText}>Place Order</Text>
//         )}
//       </TouchableOpacity>
//     </KeyboardAwareScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   section: {
//     backgroundColor: '#fff',
//     marginVertical: 10,
//     marginHorizontal: 15,
//     borderRadius: 10,
//     padding: 15,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.22,
//     shadowRadius: 2.22,
//     elevation: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 15,
//   },
//   formRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   formColumn: {
//     width: '48%',
//   },
//   formField: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 5,
//   },
//   input: {
//     backgroundColor: '#f9f9f9',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//   },
//   paymentOptions: {
//     flexDirection: 'row',
//     marginBottom: 15,
//   },
//   paymentOption: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#f9f9f9',
//     padding: 15,
//     margin: 5,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   selectedPaymentOption: {
//     borderColor: '#584e51',
//     backgroundColor: '#f0eeef',
//   },
//   paymentOptionText: {
//     fontSize: 16,
//     marginLeft: 8,
//     color: '#777',
//   },
//   selectedPaymentOptionText: {
//     color: '#584e51',
//     fontWeight: '500',
//   },
//   creditCardForm: {
//     marginTop: 10,
//   },
//   paypalInfo: {
//     backgroundColor: '#f9f9f9',
//     padding: 15,
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   paypalInfoText: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//   },
//   summaryItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   summaryItemText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   summaryItemValue: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   totalItem: {
//     marginTop: 10,
//     paddingTop: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
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
//   placeOrderButton: {
//     backgroundColor: '#584e51',
//     paddingVertical: 15,
//     borderRadius: 8,
//     marginHorizontal: 15,
//     marginVertical: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   placeOrderButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default Checkout;

//WORKING CHECKOUT
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { useSelector, useDispatch } from 'react-redux'; // Redux hooks
// import { clearCart, placeOrder } from '../../Redux/Actions/cartAction'; // Redux actions
// import { useAuth } from '../../Context/Auth'; // Import AuthContext
// import { getToken } from '../../utils/sqliteToken'; // Import getToken from sqliteToken.js

// const Checkout = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const { user } = useAuth(); // Retrieve user from AuthContext

//   // Access cart state from Redux
//   const { cartItems } = useSelector((state) => state.cart);

//   const userCartItems = cartItems.filter((item) => item.userId === user?.id); // Filter items for the current user

//   const subtotal = userCartItems
//     .reduce((sum, item) => sum + item.price * item.quantity, 0)
//     .toFixed(2);

//   const shipping = userCartItems.length > 0 ? 150 : 0;
//   const total = (parseFloat(subtotal) + shipping).toFixed(2);

//   const [loading, setLoading] = useState(false);
//   const [token, setToken] = useState(null); // State to store the token

//   // Form state
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: user?.email || '', // Pre-fill email if available
//     phone: '',
//     address: '',
//     city: '',
//     zipCode: '',
//     country: '',
//   });

//   // Payment methods
//   const [paymentMethod, setPaymentMethod] = useState('cod'); // Default to Cash on Delivery

//   // Fetch token from SQLite
//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         const storedToken = await getToken();
//         console.log('Retrieved Token from SQLite:', storedToken?.token); // Debugging
//         setToken(storedToken?.token); // Set the token in state
//       } catch (error) {
//         console.error('Error retrieving token from SQLite:', error);
//       }
//     };

//     fetchToken();
//   }, []);

//   const updateFormField = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   const validateForm = () => {
//     const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'zipCode', 'country'];

//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         Alert.alert('Missing information', `Please fill in the ${formatFieldName(field)} field`);
//         return false;
//       }
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       Alert.alert('Invalid email', 'Please enter a valid email address');
//       return false;
//     }

//     return true;
//   };

//   const formatFieldName = (field) => {
//     return field
//       .replace(/([A-Z])/g, ' $1')
//       .replace(/^./, (str) => str.toUpperCase());
//   };

//   const handlePlaceOrder = () => {
//     if (!validateForm()) return;

//     setLoading(true);

//     // Log all the data being sent
//     console.log('User:', user);
//     console.log('Token:', token); // Log the token being sent
//     console.log('Cart Items:', userCartItems);
//     console.log('Shipping Address:', formData);
//     console.log('Payment Method:', paymentMethod);
//     console.log('Subtotal:', subtotal);
//     console.log('Shipping:', shipping);
//     console.log('Total:', total);

//     // Dispatch the placeOrder action
//     dispatch(
//       placeOrder(
//         {
//           cartItems: userCartItems,
//           shippingAddress: formData,
//           paymentMethod,
//           subtotal,
//           shipping,
//           total,
//         },
//         token // Pass the token retrieved from SQLite
//       )
//     )
//       .then(() => {
//         // Clear the cart after successful order placement
//         dispatch(clearCart());

//         // Navigate to the order confirmation screen
//         navigation.navigate('OrderConfirmation', {
//           orderNumber: `TB-${Math.floor(100000 + Math.random() * 900000)}`, // Generate a random order number
//           total,
//         });
//       })
//       .catch((error) => {
//         console.error('Error placing order:', error);
//         Alert.alert('Error', 'An error occurred while placing the order');
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <KeyboardAwareScrollView style={styles.container}>
//       {/* Shipping Information */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Shipping Information</Text>

//         <View style={styles.formRow}>
//           <View style={styles.formColumn}>
//             <Text style={styles.label}>First Name</Text>
//             <TextInput
//               style={styles.input}
//               value={formData.firstName}
//               onChangeText={(text) => updateFormField('firstName', text)}
//               placeholder="First name"
//             />
//           </View>
//           <View style={styles.formColumn}>
//             <Text style={styles.label}>Last Name</Text>
//             <TextInput
//               style={styles.input}
//               value={formData.lastName}
//               onChangeText={(text) => updateFormField('lastName', text)}
//               placeholder="Last name"
//             />
//           </View>
//         </View>

//         <View style={styles.formField}>
//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             style={styles.input}
//             value={formData.email}
//             onChangeText={(text) => updateFormField('email', text)}
//             placeholder="Email address"
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//         </View>

//         <View style={styles.formField}>
//           <Text style={styles.label}>Phone</Text>
//           <TextInput
//             style={styles.input}
//             value={formData.phone}
//             onChangeText={(text) => updateFormField('phone', text)}
//             placeholder="Phone number"
//             keyboardType="phone-pad"
//           />
//         </View>

//         <View style={styles.formField}>
//           <Text style={styles.label}>Address</Text>
//           <TextInput
//             style={styles.input}
//             value={formData.address}
//             onChangeText={(text) => updateFormField('address', text)}
//             placeholder="Street address"
//           />
//         </View>

//         <View style={styles.formRow}>
//           <View style={styles.formColumn}>
//             <Text style={styles.label}>City</Text>
//             <TextInput
//               style={styles.input}
//               value={formData.city}
//               onChangeText={(text) => updateFormField('city', text)}
//               placeholder="City"
//             />
//           </View>
//           <View style={styles.formColumn}>
//             <Text style={styles.label}>Zip Code</Text>
//             <TextInput
//               style={styles.input}
//               value={formData.zipCode}
//               onChangeText={(text) => updateFormField('zipCode', text)}
//               placeholder="ZIP / Postal code"
//             />
//           </View>
//         </View>

//         <View style={styles.formField}>
//           <Text style={styles.label}>Country</Text>
//           <TextInput
//             style={styles.input}
//             value={formData.country}
//             onChangeText={(text) => updateFormField('country', text)}
//             placeholder="Country"
//           />
//         </View>
//       </View>

//       {/* Payment Method */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Payment Method</Text>

//         <View style={styles.paymentOptions}>
//           <TouchableOpacity
//             style={[
//               styles.paymentOption,
//               paymentMethod === 'cod' && styles.selectedPaymentOption,
//             ]}
//             onPress={() => setPaymentMethod('cod')}
//           >
//             <Icon
//               name="cash-outline"
//               size={24}
//               color={paymentMethod === 'cod' ? '#584e51' : '#777'}
//             />
//             <Text
//               style={[
//                 styles.paymentOptionText,
//                 paymentMethod === 'cod' && styles.selectedPaymentOptionText,
//               ]}
//             >
//               Cash on Delivery
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.paymentOption,
//               paymentMethod === 'gcash' && styles.selectedPaymentOption,
//             ]}
//             onPress={() => setPaymentMethod('gcash')}
//           >
//             <Icon
//               name="wallet-outline"
//               size={24}
//               color={paymentMethod === 'gcash' ? '#584e51' : '#777'}
//             />
//             <Text
//               style={[
//                 styles.paymentOptionText,
//                 paymentMethod === 'gcash' && styles.selectedPaymentOptionText,
//               ]}
//             >
//               Gcash
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Order Summary */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Order Summary</Text>

//         <View style={styles.summaryItem}>
//           <Text style={styles.summaryItemText}>
//             Items ({userCartItems.reduce((sum, item) => sum + item.quantity, 0)})
//           </Text>
//           <Text style={styles.summaryItemValue}>₱{subtotal}</Text>
//         </View>

//         <View style={styles.summaryItem}>
//           <Text style={styles.summaryItemText}>Shipping</Text>
//           <Text style={styles.summaryItemValue}>₱{shipping.toFixed(2)}</Text>
//         </View>

//         <View style={[styles.summaryItem, styles.totalItem]}>
//           <Text style={styles.totalText}>Total</Text>
//           <Text style={styles.totalValue}>₱{total}</Text>
//         </View>
//       </View>

//       {/* Place Order Button */}
//       <TouchableOpacity
//         style={styles.placeOrderButton}
//         onPress={handlePlaceOrder}
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator size="small" color="#fff" />
//         ) : (
//           <Text style={styles.placeOrderButtonText}>Place Order</Text>
//         )}
//       </TouchableOpacity>
//     </KeyboardAwareScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   section: {
//     backgroundColor: '#fff',
//     marginVertical: 10,
//     marginHorizontal: 15,
//     borderRadius: 10,
//     padding: 15,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.22,
//     shadowRadius: 2.22,
//     elevation: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 15,
//   },
//   formRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   formColumn: {
//     width: '48%',
//   },
//   formField: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 5,
//   },
//   input: {
//     backgroundColor: '#f9f9f9',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//   },
//   paymentOptions: {
//     flexDirection: 'row',
//     marginBottom: 15,
//   },
//   paymentOption: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#f9f9f9',
//     padding: 15,
//     margin: 5,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   selectedPaymentOption: {
//     borderColor: '#584e51',
//     backgroundColor: '#f0eeef',
//   },
//   paymentOptionText: {
//     fontSize: 16,
//     marginLeft: 8,
//     color: '#777',
//   },
//   selectedPaymentOptionText: {
//     color: '#584e51',
//     fontWeight: '500',
//   },
//   creditCardForm: {
//     marginTop: 10,
//   },
//   paypalInfo: {
//     backgroundColor: '#f9f9f9',
//     padding: 15,
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   paypalInfoText: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//   },
//   summaryItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   summaryItemText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   summaryItemValue: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   totalItem: {
//     marginTop: 10,
//     paddingTop: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
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
//   placeOrderButton: {
//     backgroundColor: '#584e51',
//     paddingVertical: 15,
//     borderRadius: 8,
//     marginHorizontal: 15,
//     marginVertical: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   placeOrderButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default Checkout;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux'; // Redux hooks
import { clearCart, placeOrder, removeFromCart } from '../../Redux/Actions/cartAction'; // Redux actions
import { useAuth } from '../../Context/Auth'; // Import AuthContext
import { getToken } from '../../utils/sqliteToken'; // Import getToken from sqliteToken.js

const Checkout = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { user } = useAuth(); // Retrieve user from AuthContext

  // Get selected cart items and totals from route params
  const { cartItems, subtotal, shipping, total } = route.params;

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null); // State to store the token

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '', // Pre-fill email if available
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
  });

  // Payment methods
  const [paymentMethod, setPaymentMethod] = useState('cod'); // Default to Cash on Delivery

  // Fetch token from SQLite
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await getToken();
        console.log('Retrieved Token from SQLite:', storedToken?.token); // Debugging
        setToken(storedToken?.token); // Set the token in state
      } catch (error) {
        console.error('Error retrieving token from SQLite:', error);
      }
    };

    fetchToken();
  }, []);

  const updateFormField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'zipCode', 'country'];

    for (const field of requiredFields) {
      if (!formData[field]) {
        Alert.alert('Missing information', `Please fill in the ${formatFieldName(field)} field`);
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Invalid email', 'Please enter a valid email address');
      return false;
    }

    return true;
  };

  const formatFieldName = (field) => {
    return field
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  // const handlePlaceOrder = () => {
  //   if (!validateForm()) return;
  
  //   setLoading(true);
  
  //   // Log all the data being sent
  //   console.log('User:', user);
  //   console.log('Token:', token); // Log the token being sent
  //   console.log('Cart Items:', cartItems); // Use selected cart items
  //   console.log('Shipping Address:', formData);
  //   console.log('Payment Method:', paymentMethod);
  //   console.log('Subtotal:', subtotal);
  //   console.log('Shipping:', shipping);
  //   console.log('Total:', total);
  
  //   // Dispatch the placeOrder action
  //   dispatch(
  //     placeOrder(
  //       {
  //         cartItems, // Use selected cart items
  //         shippingAddress: formData,
  //         paymentMethod,
  //         subtotal,
  //         shipping,
  //         total,
  //       },
  //       token // Pass the token retrieved from SQLite
  //     )
  //   )
  //     .then(() => {
  //       // Remove only the selected items from the cart
  //       cartItems.forEach((item) => {
  //         dispatch(removeFromCart(item.id)); // Dispatch action to remove each selected item
  //       });
  
  //       // Navigate to the order confirmation screen
  //       navigation.navigate('OrderConfirmation', {
  //         orderNumber: `TB-${Math.floor(100000 + Math.random() * 900000)}`, // Generate a random order number
  //         total,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error('Error placing order:', error);
  //       Alert.alert('Error', 'An error occurred while placing the order');
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const handlePlaceOrder = () => {
  if (!validateForm()) return;

  setLoading(true);

  // Transform cartItems to match the backend schema
  const transformedCartItems = cartItems.map((item) => ({
    productId: item.id, // Map `id` to `productId`
    quantity: item.quantity,
    // price: item.price, // Include price
    // name: item.name,   // Include name
  }));

  const orderData = {
    cartItems: transformedCartItems,
    shippingAddress: formData,
    paymentMethod,
    subtotal,
    shipping,
    total,
  };

  console.log('Transformed Cart Items:', transformedCartItems);

  // Dispatch the placeOrder action
  dispatch(placeOrder(orderData, token))
    .then(() => {
      // Remove only the selected items from the cart
      cartItems.forEach((item) => {
        dispatch(removeFromCart(item.id)); // Dispatch action to remove each selected item
      });

      // Navigate to the order confirmation screen
      navigation.navigate('OrderConfirmation', {
        orderNumber: `TB-${Math.floor(100000 + Math.random() * 900000)}`, // Generate a random order number
        total,
      });
    })
    .catch((error) => {
      console.error('Error placing order:', error);
      Alert.alert('Error', 'An error occurred while placing the order.');
    })
    .finally(() => {
      setLoading(false);
    });
};

  return (
    <KeyboardAwareScrollView style={styles.container}>
      {/* Shipping Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Information</Text>

        <View style={styles.formRow}>
          <View style={styles.formColumn}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={formData.firstName}
              onChangeText={(text) => updateFormField('firstName', text)}
              placeholder="First name"
            />
          </View>
          <View style={styles.formColumn}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={formData.lastName}
              onChangeText={(text) => updateFormField('lastName', text)}
              placeholder="Last name"
            />
          </View>
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => updateFormField('email', text)}
            placeholder="Email address"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(text) => updateFormField('phone', text)}
            placeholder="Phone number"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={formData.address}
            onChangeText={(text) => updateFormField('address', text)}
            placeholder="Street address"
          />
        </View>

        <View style={styles.formRow}>
          <View style={styles.formColumn}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              value={formData.city}
              onChangeText={(text) => updateFormField('city', text)}
              placeholder="City"
            />
          </View>
          <View style={styles.formColumn}>
            <Text style={styles.label}>Zip Code</Text>
            <TextInput
              style={styles.input}
              value={formData.zipCode}
              onChangeText={(text) => updateFormField('zipCode', text)}
              placeholder="ZIP / Postal code"
            />
          </View>
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Country</Text>
          <TextInput
            style={styles.input}
            value={formData.country}
            onChangeText={(text) => updateFormField('country', text)}
            placeholder="Country"
          />
        </View>
      </View>

      {/* Payment Method */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>

        <View style={styles.paymentOptions}>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'cod' && styles.selectedPaymentOption,
            ]}
            onPress={() => setPaymentMethod('cod')}
          >
            <Icon
              name="cash-outline"
              size={24}
              color={paymentMethod === 'cod' ? '#584e51' : '#777'}
            />
            <Text
              style={[
                styles.paymentOptionText,
                paymentMethod === 'cod' && styles.selectedPaymentOptionText,
              ]}
            >
              Cash on Delivery
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'gcash' && styles.selectedPaymentOption,
            ]}
            onPress={() => setPaymentMethod('gcash')}
          >
            <Icon
              name="wallet-outline"
              size={24}
              color={paymentMethod === 'gcash' ? '#584e51' : '#777'}
            />
            <Text
              style={[
                styles.paymentOptionText,
                paymentMethod === 'gcash' && styles.selectedPaymentOptionText,
              ]}
            >
              Gcash
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Order Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryItemText}>
            Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
          </Text>
          <Text style={styles.summaryItemValue}>₱{subtotal}</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryItemText}>Shipping</Text>
          <Text style={styles.summaryItemValue}>₱{shipping.toFixed(2)}</Text>
        </View>

        <View style={[styles.summaryItem, styles.totalItem]}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalValue}>₱{total}</Text>
        </View>
      </View>

      {/* Place Order Button */}
      <TouchableOpacity
        style={styles.placeOrderButton}
        onPress={handlePlaceOrder}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.placeOrderButtonText}>Place Order</Text>
        )}
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  section: {
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formColumn: {
    width: '48%',
  },
  formField: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  paymentOptions: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  paymentOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedPaymentOption: {
    borderColor: '#584e51',
    backgroundColor: '#f0eeef',
  },
  paymentOptionText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#777',
  },
  selectedPaymentOptionText: {
    color: '#584e51',
    fontWeight: '500',
  },
  creditCardForm: {
    marginTop: 10,
  },
  paypalInfo: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  paypalInfoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryItemText: {
    fontSize: 16,
    color: '#666',
  },
  summaryItemValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalItem: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
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
  placeOrderButton: {
    backgroundColor: '#584e51',
    paddingVertical: 15,
    borderRadius: 8,
    marginHorizontal: 15,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Checkout;