// import React, { useState } from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
// import { AirbnbRating } from 'react-native-ratings';

// import Icon from 'react-native-vector-icons/MaterialIcons';

// const OrderDetails = ({ route }) => {
//   const { order } = route.params; // Get the order data from navigation params
//   const [reviewModalVisible, setReviewModalVisible] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null);
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState('');
  
//   const isDelivered = order.status.toLowerCase() === 'delivered';

//   const handleReviewSubmit = () => {
//     // Here you would implement the API call to submit the review
//     console.log(`Review for ${currentProduct.name}: ${rating} stars, "${comment}"`);
//     setReviewModalVisible(false);
//     setComment('');
//     setRating(5);
//   };

//   const openReviewModal = (item) => {
//     setCurrentProduct(item);
//     setReviewModalVisible(true);
//   };

//   const renderCartItem = ({ item }) => {
//     console.log('Rendering Cart Item:', item)
//     return (
//         <View style={styles.cartItem}>
//       <View style={styles.productRow}>
//         <Image 
//           source={{ uri: item.productId?.images && item.productId.images[0]?.url || 'https://via.placeholder.com/80' }} 
//           style={styles.productImage} 
//         />
//         <View style={styles.productInfo}>
//           <Text style={styles.productName}>{item.productId?.name || 'Unknown Product'}</Text>
//           <Text style={styles.productDetails}>
//             Category: {item.productId?.category || 'N/A'}
//           </Text>
//           <Text style={styles.productDetails}>
//             ₱{item.productId?.sell_price} x {item.quantity}
//           </Text>
//           <Text style={styles.productSubtotal}>
//             Subtotal: ₱{(item.productId?.sell_price * item.quantity).toFixed(2)}
//           </Text>
//         </View>
//       </View>
        
//         {isDelivered && (
//           <TouchableOpacity 
//             style={styles.reviewButton}
//             onPress={() => openReviewModal(item)}
//           >
//             <Icon name="rate-review" size={18} color="#fff" />
//             <Text style={styles.reviewButtonText}>Review Product</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     );
//   };


//   return (
//     <View style={styles.container}>
//       <Text style={styles.sectionTitle}>Order Details</Text>
//       <View style={styles.orderInfoCard}>
//         <Text style={styles.orderInfo}>Order Number: {order.orderNumber}</Text>
//         <Text style={[
//           styles.orderStatus, 
//           { color: order.status === 'Delivered' ? '#2e7d32' : 
//                   order.status === 'Processing' ? '#ff9800' : '#0277bd' }
//         ]}>
//           Status: {order.status}
//         </Text>
//         <Text style={styles.orderInfo}>Date: {order.date || 'N/A'}</Text>
//         <Text style={styles.orderTotal}>Total: ₱{order.total.toFixed(2)}</Text>
//       </View>

//       <Text style={styles.sectionTitle}>Products</Text>
//       <FlatList
//         data={order.cartItems}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={renderCartItem}
//         contentContainerStyle={styles.listContainer}
//       />

//       {/* Review Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={reviewModalVisible}
//         onRequestClose={() => setReviewModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Review Product</Text>
//             {currentProduct && (
//               <Text style={styles.productReviewName}>{currentProduct.name}</Text>
//             )}
            
//             <Text style={styles.ratingLabel}>Your Rating:</Text>
//             <AirbnbRating
//               count={5}
//               defaultRating={rating}
//               size={30}
//               showRating={false}
//               onFinishRating={setRating}
//             />
            
//             <Text style={styles.commentLabel}>Your Review:</Text>
//             <TextInput
//               style={styles.commentInput}
//               multiline
//               numberOfLines={4}
//               placeholder="Share your experience with this product..."
//               value={comment}
//               onChangeText={setComment}
//             />
            
//             <View style={styles.modalButtons}>
//               <TouchableOpacity 
//                 style={[styles.modalButton, styles.cancelButton]}
//                 onPress={() => setReviewModalVisible(false)}
//               >
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity 
//                 style={[styles.modalButton, styles.submitButton]}
//                 onPress={handleReviewSubmit}
//               >
//                 <Text style={styles.submitButtonText}>Submit</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: '#f8f8f8',
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 15,
//     marginBottom: 10,
//     color: '#333',
//   },
//   orderInfoCard: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   orderInfo: {
//     fontSize: 16,
//     marginBottom: 5,
//     color: '#555',
//   },
//   orderStatus: {
//     fontSize: 16,
//     marginBottom: 5,
//     fontWeight: 'bold',
//   },
//   orderTotal: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 5,
//     color: '#333',
//   },
//   listContainer: {
//     paddingBottom: 20,
//   },
//   cartItem: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   productRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   productImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//     marginRight: 15,
//     backgroundColor: '#f0f0f0',
//   },
//   productInfo: {
//     flex: 1,
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 4,
//   },
//   productDetails: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 2,
//   },
//   productSubtotal: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#444',
//   },
//   reviewButton: {
//     backgroundColor: '#584e51',
//     padding: 10,
//     borderRadius: 6,
//     marginTop: 10,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   reviewButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     marginLeft: 5,
//   },
//   // Modal Styles
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '85%',
//     backgroundColor: 'white',
//     borderRadius: 15,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 15,
//     color: '#333',
//   },
//   productReviewName: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#555',
//   },
//   ratingLabel: {
//     fontSize: 16,
//     marginBottom: 5,
//     color: '#555',
//   },
//   commentLabel: {
//     fontSize: 16,
//     marginTop: 15,
//     marginBottom: 5,
//     color: '#555',
//   },
//   commentInput: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 10,
//     height: 100,
//     textAlignVertical: 'top',
//     marginBottom: 15,
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   modalButton: {
//     padding: 12,
//     borderRadius: 8,
//     minWidth: '45%',
//     alignItems: 'center',
//   },
//   submitButton: {
//     backgroundColor: '#584e51',
//   },
//   submitButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   cancelButton: {
//     backgroundColor: '#f0f0f0',
//   },
//   cancelButtonText: {
//     color: '#666',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default OrderDetails;

//Ni HAO FINE CODE
import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, TextInput, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { createReview } from '../../Redux/Actions/reviewAction'; // Import the Redux action
import { getToken } from '../../utils/sqliteToken'; // Import getToken from sqliteToken.js

// Custom Star Rating Component
const StarRating = ({ count = 5, defaultRating = 5, size = 30, onFinishRating }) => {
  const [rating, setRating] = useState(defaultRating);

  const handleRating = (newRating) => {
    setRating(newRating);
    if (onFinishRating) {
      onFinishRating(newRating);
    }
  };

  return (
    <View style={styles.starContainer}>
      {Array.from({ length: count }, (_, index) => (
        <TouchableOpacity key={index} onPress={() => handleRating(index + 1)}>
          <Icon
            name={index < rating ? 'star' : 'star-border'}
            size={size}
            color={index < rating ? '#FFD700' : '#ccc'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const OrderDetails = ({ route }) => {
  const { order } = route.params; // Get the order data from navigation params
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [token, setToken] = useState(null); // State to store the token
  const dispatch = useDispatch();

  const isDelivered = order.status.toLowerCase() === 'delivered';

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

  const handleReviewSubmit = () => {
    if (!token) {
      Alert.alert('Error', 'User token is missing. Please log in again.');
      return;
    }

    if (currentProduct) {
      const productId = currentProduct.productId._id; // Assuming productId is in the item
      const reviewData = { rating, comment };

      // Dispatch the createReview action
      dispatch(createReview(productId, reviewData, token))
        .then(() => {
          Alert.alert('Success', 'Your review has been submitted.');
          // Reset modal state
          setReviewModalVisible(false);
          setComment('');
          setRating(5);
        })
        .catch((error) => {
          console.error('Error submitting review:', error);
          Alert.alert('Error', 'An error occurred while submitting your review.');
        });

      // Dismiss the keyboard
      Keyboard.dismiss();
    }
  };

  const openReviewModal = (item) => {
    setCurrentProduct(item);
    setReviewModalVisible(true);
  };

  const renderCartItem = ({ item }) => {
    return (
      <View style={styles.cartItem}>
        <View style={styles.productRow}>
          <Image 
            source={{ uri: item.productId?.images && item.productId.images[0]?.url || 'https://via.placeholder.com/80' }} 
            style={styles.productImage} 
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.productId?.name || 'Unknown Product'}</Text>
            <Text style={styles.productDetails}>
              Category: {item.productId?.category || 'N/A'}
            </Text>
            <Text style={styles.productDetails}>
              ₱{item.productId?.sell_price} x {item.quantity}
            </Text>
            <Text style={styles.productSubtotal}>
              Subtotal: ₱{(item.productId?.sell_price * item.quantity).toFixed(2)}
            </Text>
          </View>
        </View>
        
        {isDelivered && (
          <TouchableOpacity 
            style={styles.reviewButton}
            onPress={() => openReviewModal(item)}
          >
            <Icon name="rate-review" size={18} color="#fff" />
            <Text style={styles.reviewButtonText}>Review Product</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          <View style={styles.orderInfoCard}>
            <Text style={styles.orderInfo}>Order Number: {order.orderNumber}</Text>
            <Text style={[
              styles.orderStatus, 
              { color: order.status === 'Delivered' ? '#2e7d32' : 
                      order.status === 'Processing' ? '#ff9800' : '#0277bd' }
            ]}>
              Status: {order.status}
            </Text>
            <Text style={styles.orderInfo}>Date: {order.date || 'N/A'}</Text>
            <Text style={styles.orderTotal}>Total: ₱{order.total.toFixed(2)}</Text>
          </View>

          <Text style={styles.sectionTitle}>Products</Text>
          <FlatList
            data={order.cartItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderCartItem}
            contentContainerStyle={styles.listContainer}
          />

          {/* Review Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={reviewModalVisible}
            onRequestClose={() => setReviewModalVisible(false)}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Review Product</Text>
                  {currentProduct && (
                    <Text style={styles.productReviewName}>{currentProduct.productId?.name}</Text>
                  )}
                  
                  <Text style={styles.ratingLabel}>Your Rating:</Text>
                  <StarRating
                    count={5}
                    defaultRating={rating}
                    size={30}
                    onFinishRating={setRating}
                  />
                  
                  <Text style={styles.commentLabel}>Your Review:</Text>
                  <TextInput
                    style={styles.commentInput}
                    multiline
                    numberOfLines={4}
                    placeholder="Share your experience with this product..."
                    value={comment}
                    onChangeText={setComment}
                  />
                  
                  <View style={styles.modalButtons}>
                    <TouchableOpacity 
                      style={[styles.modalButton, styles.cancelButton]}
                      onPress={() => {
                        setReviewModalVisible(false);
                        Keyboard.dismiss();
                      }}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.modalButton, styles.submitButton]}
                      onPress={handleReviewSubmit}
                    >
                      <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f8f8f8',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  orderInfoCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderInfo: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  orderStatus: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  cartItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  productSubtotal: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
  },
  reviewButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  productReviewName: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  ratingLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  commentLabel: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
    color: '#555',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 12,
    borderRadius: 8,
    minWidth: '45%',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: 'black',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OrderDetails;

