// // import React, { useState, useRef } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   ScrollView,
// //   Image,
// //   TouchableOpacity,
// //   Dimensions,
// //   SafeAreaView,
// //   StatusBar,
// //   FlatList,
// //   Animated,
// // } from 'react-native';
// // import Icon from 'react-native-vector-icons/Ionicons';
// // import { useNavigation } from '@react-navigation/native';

// // const { width, height } = Dimensions.get('window');

// // const ProductDetail = ({ route }) => {
// //   const { item } = route.params;
// //   const navigation = useNavigation();
// //   const [isFavorite, setIsFavorite] = useState(false);
// //   const [quantity, setQuantity] = useState(1);
// //   const scrollX = useRef(new Animated.Value(0)).current;
// //   const imageSliderRef = useRef(null);
  
// //   const formattedPrice = new Intl.NumberFormat('en-US').format(item.sell_price);

// //   const handleIncrease = () => {
// //     setQuantity(quantity + 1);
// //   };

// //   const handleDecrease = () => {
// //     if (quantity > 1) {
// //       setQuantity(quantity - 1);
// //     }
// //   };

// //   const toggleFavorite = () => {
// //     setIsFavorite(!isFavorite);
// //   };
  
// //   const onViewableItemsChanged = useRef(({ viewableItems }) => {
// //     if (viewableItems[0] !== undefined) {
// //       setCurrentImageIndex(viewableItems[0].index);
// //     }
// //   }).current;
  
// //   const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
// //   const handleImagePress = (index) => {
// //     setCurrentImageIndex(index);
// //     imageSliderRef.current.scrollToOffset({
// //       offset: index * width,
// //       animated: true
// //     });
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
// //       {/* Header */}
// //       <View style={styles.header}>
// //         <TouchableOpacity 
// //           style={styles.headerButton} 
// //           onPress={() => navigation.goBack()}
// //         >
// //           <Icon name="chevron-back" size={24} color="#222" />
// //         </TouchableOpacity>
// //         <Text style={styles.headerTitle}>Product Details</Text>
// //         <TouchableOpacity 
// //           style={styles.headerButton}
// //           onPress={toggleFavorite}
// //         >
// //           <Icon 
// //             name={isFavorite ? "heart" : "heart-outline"} 
// //             size={24} 
// //             color={isFavorite ? "#FF4D67" : "#222"} 
// //           />
// //         </TouchableOpacity>
// //       </View>

// //       <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
// //         {/* Full-width Image Slider */}
// //         <View style={styles.imageSliderContainer}>
// //           <FlatList
// //             ref={imageSliderRef}
// //             data={item.images}
// //             horizontal
// //             pagingEnabled
// //             showsHorizontalScrollIndicator={false}
// //             onScroll={Animated.event(
// //               [{ nativeEvent: { contentOffset: { x: scrollX } } }],
// //               { useNativeDriver: false }
// //             )}
// //             onViewableItemsChanged={onViewableItemsChanged}
// //             viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
// //             renderItem={({ item: image }) => (
// //               <View style={styles.slideItem}>
// //                 <Image
// //                   source={{ uri: image.url }}
// //                   style={styles.productImage}
// //                   resizeMode="contain"
// //                 />
// //               </View>
// //             )}
// //             keyExtractor={(_, index) => index.toString()}
// //           />
          
// //           {/* Image Pagination Dots */}
// //           {item.images.length > 1 && (
// //             <View style={styles.paginationContainer}>
// //               {item.images.map((_, index) => (
// //                 <Animated.View
// //                   key={index}
// //                   style={[
// //                     styles.paginationDot,
// //                     {
// //                       opacity: scrollX.interpolate({
// //                         inputRange: [
// //                           (index - 1) * width,
// //                           index * width,
// //                           (index + 1) * width
// //                         ],
// //                         outputRange: [0.3, 1, 0.3],
// //                         extrapolate: 'clamp'
// //                       }),
// //                       width: scrollX.interpolate({
// //                         inputRange: [
// //                           (index - 1) * width,
// //                           index * width,
// //                           (index + 1) * width
// //                         ],
// //                         outputRange: [8, 16, 8],
// //                         extrapolate: 'clamp'
// //                       }),
// //                       backgroundColor: scrollX.interpolate({
// //                         inputRange: [
// //                           (index - 1) * width,
// //                           index * width,
// //                           (index + 1) * width
// //                         ],
// //                         outputRange: ['#bbb', '#584e51', '#bbb'],
// //                         extrapolate: 'clamp'
// //                       })
// //                     }
// //                   ]}
// //                 />
// //               ))}
// //             </View>
// //           )}
// //         </View>
        
// //         {/* Thumbnail Gallery */}
// //         {item.images.length > 1 && (
// //           <View style={styles.thumbnailGallery}>
// //             <FlatList
// //               horizontal
// //               showsHorizontalScrollIndicator={false}
// //               data={item.images}
// //               renderItem={({ item: image, index }) => (
// //                 <TouchableOpacity
// //                   onPress={() => handleImagePress(index)}
// //                   style={[
// //                     styles.thumbnail,
// //                     currentImageIndex === index && styles.thumbnailActive
// //                   ]}
// //                 >
// //                   <Image
// //                     source={{ uri: image.url }}
// //                     style={styles.thumbnailImage}
// //                     resizeMode="cover"
// //                   />
// //                 </TouchableOpacity>
// //               )}
// //               keyExtractor={(_, index) => `thumb_${index}`}
// //               contentContainerStyle={styles.thumbnailContentContainer}
// //             />
// //           </View>
// //         )}
        
// //         {/* Product Info */}
// //         <View style={styles.infoSection}>
// //           <View style={styles.categoryRow}>
// //             <View style={styles.categoryBadge}>
// //               <Text style={styles.categoryText}>{item.category}</Text>
// //             </View>
// //             <View style={styles.ratingContainer}>
// //               <Icon name="star" size={16} color="#FFD700" />
// //               <Text style={styles.ratingText}>{item.rating || "N/A"}</Text>
// //             </View>
// //           </View>
          
// //           <Text style={styles.productTitle}>{item.name}</Text>
// //           <Text style={styles.priceText}>₱{formattedPrice}</Text>
          
// //           <View style={styles.divider} />
          
// //           <Text style={styles.sectionTitle}>Description</Text>
// //           <Text style={styles.descriptionText}>{item.description}</Text>
          
// //           <View style={styles.divider} />
          
// //      {/* Quantity Selector */}
// //           <Text style={styles.sectionTitle}>Quantity</Text>
// //           <View style={styles.quantityRow}>
// //             <View style={styles.quantitySelector}>
// //               <TouchableOpacity 
// //                 style={styles.quantityButton} 
// //                 onPress={handleDecrease}
// //               >
// //                 <Icon name="remove" size={18} color={quantity > 1 ? "#333" : "#ccc"} />
// //               </TouchableOpacity>
// //               <View style={styles.quantityValueContainer}>
// //                 <Text style={styles.quantityValue}>{quantity}</Text>
// //               </View>
// //               <TouchableOpacity 
// //                 style={styles.quantityButton} 
// //                 onPress={handleIncrease}
// //               >
// //                 <Icon name="add" size={18} color="#333" />
// //               </TouchableOpacity>
// //             </View>
// //             <Text style={styles.stockText}>{item.stock_quantity} items available</Text>
// //           </View>
// //         </View>
// //       </ScrollView>

// //       {/* Bottom Action Bar */}
// //       <View style={styles.actionBar}>
// //         <TouchableOpacity style={styles.cartButton}>
// //           <Icon name="cart-outline" size={22} color="#FFF" />
// //           <Text style={styles.buttonText}>Add to Cart</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity style={styles.buyButton}>
// //           <Text style={styles.buyButtonText}>Buy Now</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#FFFFFF',
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     paddingHorizontal: 15,
// //     paddingTop: 10,
// //     paddingBottom: 10,
// //     backgroundColor: '#FFF',
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#EEEEEE',
// //   },
// //   headerButton: {
// //     width: 40,
// //     height: 40,
// //     borderRadius: 20,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   headerTitle: {
// //     fontSize: 18,
// //     fontWeight: '600',
// //     color: '#222',
// //   },
// //   imageSliderContainer: {
// //     width: width,
// //     height: height * 0.4,
// //     backgroundColor: '#F8F8F8',
// //   },
// //   slideItem: {
// //     width: width,
// //     height: '100%',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   productImage: {
// //     width: width - 40,
// //     height: '100%',
// //   },
// //   paginationContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     position: 'absolute',
// //     bottom: 10,
// //     width: '100%',
// //   },
// //   paginationDot: {
// //     height: 8,
// //     borderRadius: 4,
// //     marginHorizontal: 4,
// //   },
// //   thumbnailGallery: {
// //     backgroundColor: '#FFF',
// //     paddingVertical: 15,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#EFEFEF',
// //   },
// //   thumbnailContentContainer: {
// //     paddingHorizontal: 15,
// //   },
// //   thumbnail: {
// //     width: 70,
// //     height: 70,
// //     borderRadius: 8,
// //     marginRight: 10,
// //     borderWidth: 1,
// //     borderColor: '#584e51',
// //     overflow: 'hidden',
// //   },
// //   thumbnailActive: {
// //     borderWidth: 2,
// //     borderColor: '#584e51',
// //   },
// //   thumbnailImage: {
// //     width: '100%',
// //     height: '100%',
// //   },
// //   infoSection: {
// //     padding: 20,
// //   },
// //   categoryRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginBottom: 10,
// //   },
// //   categoryBadge: {
// //     paddingHorizontal: 12,
// //     paddingVertical: 6,
// //     backgroundColor: '#584e51',
// //     borderRadius: 20,
// //   },
// //   categoryText: {
// //     color: 'white',
// //     fontSize: 14,
// //     fontWeight: '500',
// //   },
// //   ratingContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   ratingText: {
// //     marginLeft: 5,
// //     fontSize: 15,
// //     fontWeight: '600',
// //     color: '#444',
// //   },
// //   productTitle: {
// //     fontSize: 22,
// //     fontWeight: 'bold',
// //     color: '#222',
// //     marginBottom: 8,
// //   },
// //   priceText: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     color: '#584e51',
// //     marginBottom: 15,
// //   },
// //   divider: {
// //     height: 1,
// //     backgroundColor: '#EEEEEE',
// //     marginVertical: 15,
// //   },
// //   sectionTitle: {
// //     fontSize: 18,
// //     fontWeight: '600',
// //     color: '#222',
// //     marginBottom: 10,
// //   },
// //   descriptionText: {
// //     fontSize: 15,
// //     lineHeight: 24,
// //     color: '#555',
// //   },
// //   quantityRow: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //   },
// //   quantitySelector: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     borderWidth: 1,
// //     borderColor: '#eee',
// //     borderRadius: 25,
// //     overflow: 'hidden',
// //   },
// //   quantityButton: {
// //     width: 36,
// //     height: 36,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: '#f8f8f8',
// //   },
// //   quantityValueContainer: {
// //     width: 40,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   quantityValue: {
// //     fontSize: 16,
// //     fontWeight: '600',
// //   },
// //   stockText: {
// //     fontSize: 14,
// //     color: '#888',
// //   },
// //   actionBar: {
// //     flexDirection: 'row',
// //     paddingHorizontal: 20,
// //     paddingVertical: 15,
// //     backgroundColor: '#FFF',
// //     borderTopWidth: 1,
// //     borderTopColor: '#EEEEEE',
// //   },
// //   cartButton: {
// //     flex: 1,
// //     flexDirection: 'row',
// //     backgroundColor: '#584e51',
// //     borderRadius: 30,
// //     height: 50,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginRight: 10,
// //   },
// //   buttonText: {
// //     color: '#FFF',
// //     fontWeight: '600',
// //     fontSize: 16,
// //     marginLeft: 8,
// //   },
// //   buyButton: {
// //     flex: 1,
// //     backgroundColor: '#584e51',
// //     borderRadius: 30,
// //     height: 50,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   buyButtonText: {
// //     color: '#FFF',
// //     fontWeight: '600',
// //     fontSize: 16,
// //   },
// // });

// // export default ProductDetail;

// //WORKING ALREADY
// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   SafeAreaView,
//   StatusBar,
//   FlatList,
//   Animated,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../../Redux/Actions/cartAction';
// import { useAuth } from '../../Context/Auth'; // Import AuthContext

// const { width, height } = Dimensions.get('window');

// const ProductDetail = ({ route }) => {
//   const { item } = route.params;
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const { user } = useAuth(); // Retrieve user from AuthContext
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const imageSliderRef = useRef(null);

//   const formattedPrice = new Intl.NumberFormat('en-US').format(item.sell_price);

//   const handleIncrease = () => {
//     setQuantity(quantity + 1);
//   };

//   const handleDecrease = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const toggleFavorite = () => {
//     setIsFavorite(!isFavorite);
//   };

//   const handleAddToCart = () => {
//     if (!user) {
//       Alert.alert('Error', 'User not logged in.');
//       return;
//     }

//     const cartItem = {
//       userId: user.id, // Use user.id from context
//       id: item._id,
//       name: item.name,
//       price: item.sell_price,
//       image: item.images[0]?.url,
//       category: item.category,
//       quantity,
//     };
//     dispatch(addToCart(cartItem));
//     Alert.alert('Success', `${item.name} added to cart! ${user.id}`);
//   };

//   const onViewableItemsChanged = useRef(({ viewableItems }) => {
//     if (viewableItems[0] !== undefined) {
//       setCurrentImageIndex(viewableItems[0].index);
//     }
//   }).current;

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const handleImagePress = (index) => {
//     setCurrentImageIndex(index);
//     imageSliderRef.current.scrollToOffset({
//       offset: index * width,
//       animated: true,
//     });
//   };


//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.headerButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Icon name="chevron-back" size={24} color="#222" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Product Details</Text>
//         <TouchableOpacity
//           style={styles.headerButton}
//           onPress={toggleFavorite}
//         >
//           <Icon
//             name={isFavorite ? 'heart' : 'heart-outline'}
//             size={24}
//             color={isFavorite ? '#FF4D67' : '#222'}
//           />
//         </TouchableOpacity>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
//         {/* Full-width Image Slider */}
//         <View style={styles.imageSliderContainer}>
//           <FlatList
//             ref={imageSliderRef}
//             data={item.images}
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             onScroll={Animated.event(
//               [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//               { useNativeDriver: false }
//             )}
//             onViewableItemsChanged={onViewableItemsChanged}
//             viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
//             renderItem={({ item: image }) => (
//               <View style={styles.slideItem}>
//                 <Image
//                   source={{ uri: image.url }}
//                   style={styles.productImage}
//                   resizeMode="contain"
//                 />
//               </View>
//             )}
//             keyExtractor={(_, index) => index.toString()}
//           />

//           {/* Image Pagination Dots */}
//           {item.images.length > 1 && (
//             <View style={styles.paginationContainer}>
//               {item.images.map((_, index) => (
//                 <Animated.View
//                   key={index}
//                   style={[
//                     styles.paginationDot,
//                     {
//                       opacity: scrollX.interpolate({
//                         inputRange: [
//                           (index - 1) * width,
//                           index * width,
//                           (index + 1) * width,
//                         ],
//                         outputRange: [0.3, 1, 0.3],
//                         extrapolate: 'clamp',
//                       }),
//                       width: scrollX.interpolate({
//                         inputRange: [
//                           (index - 1) * width,
//                           index * width,
//                           (index + 1) * width,
//                         ],
//                         outputRange: [8, 16, 8],
//                         extrapolate: 'clamp',
//                       }),
//                       backgroundColor: scrollX.interpolate({
//                         inputRange: [
//                           (index - 1) * width,
//                           index * width,
//                           (index + 1) * width,
//                         ],
//                         outputRange: ['#bbb', '#584e51', '#bbb'],
//                         extrapolate: 'clamp',
//                       }),
//                     },
//                   ]}
//                 />
//               ))}
//             </View>
//           )}
//         </View>

//         {/* Thumbnail Gallery */}
//         {item.images.length > 1 && (
//           <View style={styles.thumbnailGallery}>
//             <FlatList
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               data={item.images}
//               renderItem={({ item: image, index }) => (
//                 <TouchableOpacity
//                   onPress={() => handleImagePress(index)}
//                   style={[
//                     styles.thumbnail,
//                     currentImageIndex === index && styles.thumbnailActive,
//                   ]}
//                 >
//                   <Image
//                     source={{ uri: image.url }}
//                     style={styles.thumbnailImage}
//                     resizeMode="cover"
//                   />
//                 </TouchableOpacity>
//               )}
//               keyExtractor={(_, index) => `thumb_${index}`}
//               contentContainerStyle={styles.thumbnailContentContainer}
//             />
//           </View>
//         )}

//         {/* Product Info */}
//         <View style={styles.infoSection}>
//           <View style={styles.categoryRow}>
//             <View style={styles.categoryBadge}>
//               <Text style={styles.categoryText}>{item.category}</Text>
//             </View>
//             <View style={styles.ratingContainer}>
//               <Icon name="star" size={16} color="#FFD700" />
//               <Text style={styles.ratingText}>{item.rating || 'N/A'}</Text>
//             </View>
//           </View>

//           <Text style={styles.productTitle}>{item.name}</Text>
//           <Text style={styles.priceText}>₱{formattedPrice}</Text>

//           <View style={styles.divider} />

//           <Text style={styles.sectionTitle}>Description</Text>
//           <Text style={styles.descriptionText}>{item.description}</Text>

//           <View style={styles.divider} />

//           {/* Quantity Selector */}
//           <Text style={styles.sectionTitle}>Quantity</Text>
//           <View style={styles.quantityRow}>
//             <View style={styles.quantitySelector}>
//               <TouchableOpacity
//                 style={styles.quantityButton}
//                 onPress={handleDecrease}
//               >
//                 <Icon
//                   name="remove"
//                   size={18}
//                   color={quantity > 1 ? '#333' : '#ccc'}
//                 />
//               </TouchableOpacity>
//               <View style={styles.quantityValueContainer}>
//                 <Text style={styles.quantityValue}>{quantity}</Text>
//               </View>
//               <TouchableOpacity
//                 style={styles.quantityButton}
//                 onPress={handleIncrease}
//               >
//                 <Icon name="add" size={18} color="#333" />
//               </TouchableOpacity>
//             </View>
//             <Text style={styles.stockText}>
//               {item.stock_quantity} items available
//             </Text>
//           </View>
//         </View>
//       </ScrollView>

//       {/* Bottom Action Bar */}
//       <View style={styles.actionBar}>
//         <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
//           <Icon name="cart-outline" size={22} color="#FFF" />
//           <Text style={styles.buttonText}>Add to Cart</Text>
          
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.buyButton}>
//           <Text style={styles.buyButtonText}>Buy Now</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 15,
//     paddingTop: 10,
//     paddingBottom: 10,
//     backgroundColor: '#FFF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEEEEE',
//   },
//   headerButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#222',
//   },
//   imageSliderContainer: {
//     width: width,
//     height: height * 0.4,
//     backgroundColor: '#F8F8F8',
//   },
//   slideItem: {
//     width: width,
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   productImage: {
//     width: width - 40,
//     height: '100%',
//   },
//   paginationContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     bottom: 10,
//     width: '100%',
//   },
//   paginationDot: {
//     height: 8,
//     borderRadius: 4,
//     marginHorizontal: 4,
//   },
//   thumbnailGallery: {
//     backgroundColor: '#FFF',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EFEFEF',
//   },
//   thumbnailContentContainer: {
//     paddingHorizontal: 15,
//   },
//   thumbnail: {
//     width: 70,
//     height: 70,
//     borderRadius: 8,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#584e51',
//     overflow: 'hidden',
//   },
//   thumbnailActive: {
//     borderWidth: 2,
//     borderColor: '#584e51',
//   },
//   thumbnailImage: {
//     width: '100%',
//     height: '100%',
//   },
//   infoSection: {
//     padding: 20,
//   },
//   categoryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   categoryBadge: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     backgroundColor: '#584e51',
//     borderRadius: 20,
//   },
//   categoryText: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   ratingText: {
//     marginLeft: 5,
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#444',
//   },
//   productTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#222',
//     marginBottom: 8,
//   },
//   priceText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#584e51',
//     marginBottom: 15,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#EEEEEE',
//     marginVertical: 15,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#222',
//     marginBottom: 10,
//   },
//   descriptionText: {
//     fontSize: 15,
//     lineHeight: 24,
//     color: '#555',
//   },
//   quantityRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   quantitySelector: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#eee',
//     borderRadius: 25,
//     overflow: 'hidden',
//   },
//   quantityButton: {
//     width: 36,
//     height: 36,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f8f8',
//   },
//   quantityValueContainer: {
//     width: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   quantityValue: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   stockText: {
//     fontSize: 14,
//     color: '#888',
//   },
//   actionBar: {
//     flexDirection: 'row',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: '#FFF',
//     borderTopWidth: 1,
//     borderTopColor: '#EEEEEE',
//   },
//   cartButton: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: '#584e51',
//     borderRadius: 30,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   buttonText: {
//     color: '#FFF',
//     fontWeight: '600',
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   buyButton: {
//     flex: 1,
//     backgroundColor: '#584e51',
//     borderRadius: 30,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buyButtonText: {
//     color: '#FFF',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });

// export default ProductDetail;

// // WORKING WITH REVIEWS
// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   SafeAreaView,
//   StatusBar,
//   FlatList,
//   Animated,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../../Redux/Actions/cartAction';
// import { listReviewsByProduct } from '../../Redux/Actions/reviewAction';
// import { useAuth } from '../../Context/Auth';

// const { width, height } = Dimensions.get('window');

// const ProductDetail = ({ route }) => {
//   const { item } = route.params;
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const { user } = useAuth();
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const imageSliderRef = useRef(null);

//   // Access reviews and loading state from Redux
//   const { reviews, loading } = useSelector((state) => ({
//     reviews: state.reviews.reviews, // Accessing reviews from reviewReducer
//     loading: state.reviews.loading, // Accessing loading state from reviewReducer
//   }));

//   const formattedPrice = new Intl.NumberFormat('en-US').format(item.sell_price);

//   useEffect(() => {
//     // Dispatch action to fetch reviews for the product
//     dispatch(listReviewsByProduct(item._id));
//   }, [dispatch, item._id]);

//   const handleIncrease = () => {
//     if (quantity < item.stock_quantity) {
//       setQuantity(quantity + 1);
//     } else {
//       Alert.alert('Error', 'Not enough stock available.');
//     }
//   };

//   const handleDecrease = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const toggleFavorite = () => setIsFavorite(!isFavorite);

//   const handleAddToCart = () => {
//     if (!user) {
//       Alert.alert('Error', 'User not logged in.');
//       return;
//     }

//     const cartItem = {
//       userId: user.id,
//       id: item._id,
//       name: item.name,
//       price: item.sell_price,
//       image: item.images[0]?.url,
//       category: item.category,
//       quantity,
//     };
//     dispatch(addToCart(cartItem));
//     Alert.alert('Success', `${item.name} added to cart!`);
//   };

//   const onViewableItemsChanged = useRef(({ viewableItems }) => {
//     if (viewableItems[0] !== undefined) {
//       setCurrentImageIndex(viewableItems[0].index);
//     }
//   }).current;

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const handleImagePress = (index) => {
//     setCurrentImageIndex(index);
//     imageSliderRef.current.scrollToOffset({
//       offset: index * width,
//       animated: true,
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.headerButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Icon name="chevron-back" size={24} color="#222" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Product Details</Text>
//         <TouchableOpacity
//           style={styles.headerButton}
//           onPress={toggleFavorite}
//         >
//           <Icon
//             name={isFavorite ? 'heart' : 'heart-outline'}
//             size={24}
//             color={isFavorite ? '#FF4D67' : '#222'}
//           />
//         </TouchableOpacity>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
//         {/* Full-width Image Slider */}
//         <View style={styles.imageSliderContainer}>
//           <FlatList
//             ref={imageSliderRef}
//             data={item.images}
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             onScroll={Animated.event(
//               [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//               { useNativeDriver: false }
//             )}
//             onViewableItemsChanged={onViewableItemsChanged}
//             viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
//             renderItem={({ item: image }) => (
//               <View style={styles.slideItem}>
//                 <Image
//                   source={{ uri: image.url }}
//                   style={styles.productImage}
//                   resizeMode="contain"
//                 />
//               </View>
//             )}
//             keyExtractor={(_, index) => index.toString()}
//           />

//           {/* Image Pagination Dots */}
//           {item.images.length > 1 && (
//             <View style={styles.paginationContainer}>
//               {item.images.map((_, index) => (
//                 <Animated.View
//                   key={index}
//                   style={[
//                     styles.paginationDot,
//                     {
//                       opacity: scrollX.interpolate({
//                         inputRange: [
//                           (index - 1) * width,
//                           index * width,
//                           (index + 1) * width,
//                         ],
//                         outputRange: [0.3, 1, 0.3],
//                         extrapolate: 'clamp',
//                       }),
//                       width: scrollX.interpolate({
//                         inputRange: [
//                           (index - 1) * width,
//                           index * width,
//                           (index + 1) * width,
//                         ],
//                         outputRange: [8, 16, 8],
//                         extrapolate: 'clamp',
//                       }),
//                       backgroundColor: scrollX.interpolate({
//                         inputRange: [
//                           (index - 1) * width,
//                           index * width,
//                           (index + 1) * width,
//                         ],
//                         outputRange: ['#bbb', '#584e51', '#bbb'],
//                         extrapolate: 'clamp',
//                       }),
//                     },
//                   ]}
//                 />
//               ))}
//             </View>
//           )}
//         </View>
        
//         {/* Thumbnail Gallery */}
//         {item.images.length > 1 && (
//           <View style={styles.thumbnailGallery}>
//             <FlatList
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               data={item.images}
//               renderItem={({ item: image, index }) => (
//                 <TouchableOpacity
//                   onPress={() => handleImagePress(index)}
//                   style={[
//                     styles.thumbnail,
//                     currentImageIndex === index && styles.thumbnailActive,
//                   ]}
//                 >
//                   <Image
//                     source={{ uri: image.url }}
//                     style={styles.thumbnailImage}
//                     resizeMode="cover"
//                   />
//                 </TouchableOpacity>
//               )}
//               keyExtractor={(_, index) => `thumb_${index}`}
//               contentContainerStyle={styles.thumbnailContentContainer}
//             />
//           </View>
//         )}

//         {/* Product Info */}
//         <View style={styles.infoSection}>
//           <View style={styles.categoryRow}>
//             <View style={styles.categoryBadge}>
//               <Text style={styles.categoryText}>{item.category}</Text>
//             </View>
//             {/* <View style={styles.ratingContainer}>
//               <Icon name="star" size={16} color="#FFD700" />
//               <Text style={styles.ratingText}>{item.rating || 'N/A'}</Text>
//             </View> */}
//           </View>

//           <Text style={styles.productTitle}>{item.name}</Text>
//           <Text style={styles.priceText}>₱{formattedPrice}</Text>

//           <View style={styles.divider} />

//           <Text style={styles.sectionTitle}>Description</Text>
//           <Text style={styles.descriptionText}>{item.description}</Text>

//           <View style={styles.divider} />

//           {/* Quantity Selector */}
//           <Text style={styles.sectionTitle}>Quantity</Text>
//           <View style={styles.quantityRow}>
//             <View style={styles.quantitySelector}>
//               <TouchableOpacity
//                 style={styles.quantityButton}
//                 onPress={handleDecrease}
//               >
//                 <Icon
//                   name="remove"
//                   size={18}
//                   color={quantity > 1 ? '#333' : '#ccc'}
//                 />
//               </TouchableOpacity>
//               <View style={styles.quantityValueContainer}>
//                 <Text style={styles.quantityValue}>{quantity}</Text>
//               </View>
//               <TouchableOpacity
//                 style={styles.quantityButton}
//                 onPress={handleIncrease}
//               >
//                 <Icon name="add" size={18} color="#333" />
//               </TouchableOpacity>
//             </View>
//             <Text style={styles.stockText}>
//               {item.stock_quantity} items available
//             </Text>
//           </View>
//         </View>

//        {/* Reviews Section */}
//         <View style={styles.reviewsSection}>
//           <Text style={styles.sectionTitle}>Customer Reviews</Text>
          
//           {loading ? (
//   <ActivityIndicator size="large" color="#584e51" style={styles.loader} />
// ) : reviews.length > 0 ? (
//   <View>
//     <View style={styles.reviewsSummary}>
//       <View style={styles.reviewsSummaryLeft}>
//         <Text style={styles.averageRating}>
//           {(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)}
//         </Text>
//         <View style={styles.starsContainer}>
//           {[1, 2, 3, 4, 5].map((star) => {
//             const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
//             // Calculate if this star should be filled, empty, or partially filled
//             return (
//               <View key={star} style={{ position: 'relative' }}>
//                 {/* Empty star (background) */}
//                 <Icon 
//                   name="star-outline" 
//                   size={16} 
//                   color="#FFD700" 
//                   style={{ opacity: 0.3 }}
//                 />
                
//                 {/* Filled part of star */}
//                 <View style={{
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   width: star <= Math.floor(averageRating) 
//                     ? '100%' 
//                     : star === Math.ceil(averageRating) 
//                       ? `${(averageRating % 1) * 100}%` 
//                       : '0%',
//                   overflow: 'hidden'
//                 }}>
//                   <Icon 
//                     name="star" 
//                     size={16} 
//                     color="#FFD700" 
//                   />
//                 </View>
//               </View>
//             );
//           })}
//         </View>
//         <Text style={styles.totalReviews}>Based on {reviews.length} reviews</Text>
//       </View>
      
//       <View style={styles.reviewsSummaryRight}>
//         <View style={styles.ratingDistribution}>
//           {[5, 4, 3, 2, 1].map((rating) => {
//             const count = reviews.filter(review => Math.floor(review.rating) === rating).length;
//             const percentage = (count / reviews.length) * 100;
//             return (
//               <View key={rating} style={styles.ratingBar}>
//                 <Text style={styles.ratingNumber}>{rating}</Text>
//                 <View style={styles.ratingBarBackground}>
//                   <View style={[styles.ratingBarFill, { width: `${percentage}%` }]} />
//                 </View>
//                 <Text style={styles.ratingCount}>{count}</Text>
//               </View>
//             );
//           })}
//         </View>
//       </View>
//     </View>


              
//               {reviews.map((review) => (
//                 <View key={review._id} style={styles.reviewCard}>
//                   <View style={styles.reviewHeader}>
//                     <View style={styles.userCircle}>
//                       <Text style={styles.userInitial}>
//                         {(review.user?.email || 'A')[0].toUpperCase()}
//                       </Text>
//                     </View>
//                     <View style={styles.reviewHeaderText}>
//                       <Text style={styles.reviewAuthor}>
//                         {review.user?.email || 'Anonymous User'}
//                       </Text>
//                       <View style={styles.reviewRating}>
//                         {[...Array(5)].map((_, i) => (
//                           <Icon 
//                             key={i} 
//                             name={i < review.rating ? "star" : "star-outline"} 
//                             size={14} 
//                             color="#FFD700" 
//                           />
//                         ))}
//                         <Text style={styles.reviewDate}>
//                           {new Date(review.createdAt).toLocaleDateString()}
//                         </Text>
//                       </View>
//                     </View>
//                   </View>
//                   <Text style={styles.reviewText}>{review.comment}</Text>
//                 </View>
//               ))}
//             </View>
//           ) : (
//             <View style={styles.emptyReviewsContainer}>
//               <Icon name="chatbubble-ellipses-outline" size={50} color="#ccc" />
//               <Text style={styles.noReviewsText}>No reviews yet</Text>
//               <Text style={styles.reviewPrompt}>
//                 Be the first to review this product
//               </Text>
//             </View>
//           )}
//         </View>

//       </ScrollView>

//       {/* Bottom Action Bar */}
//       <View style={styles.actionBar}>
//         <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
//           <Icon name="cart-outline" size={22} color="#FFF" />
//           <Text style={styles.buttonText}>Add to Cart</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.buyButton}>
//           <Text style={styles.buyButtonText}>Buy Now</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 15,
//     paddingTop: 10,
//     paddingBottom: 10,
//     backgroundColor: '#FFF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEEEEE',
//   },
//   headerButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#222',
//   },
//   imageSliderContainer: {
//     width: width,
//     height: height * 0.4,
//     backgroundColor: '#F8F8F8',
//   },
//   slideItem: {
//     width: width,
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   productImage: {
//     width: width - 40,
//     height: '100%',
//   },
//   paginationContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     bottom: 10,
//     width: '100%',
//   },
//   paginationDot: {
//     height: 8,
//     borderRadius: 4,
//     marginHorizontal: 4,
//   },
//   thumbnailGallery: {
//     backgroundColor: '#FFF',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EFEFEF',
//   },
//   thumbnailContentContainer: {
//     paddingHorizontal: 15,
//   },
//   thumbnail: {
//     width: 70,
//     height: 70,
//     borderRadius: 8,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#584e51',
//     overflow: 'hidden',
//   },
//   thumbnailActive: {
//     borderWidth: 2,
//     borderColor: '#584e51',
//   },
//   thumbnailImage: {
//     width: '100%',
//     height: '100%',
//   },
//   infoSection: {
//     padding: 20,
//   },
//   categoryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   categoryBadge: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     backgroundColor: '#584e51',
//     borderRadius: 20,
//   },
//   categoryText: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   ratingText: {
//     marginLeft: 5,
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#444',
//   },
//   productTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#222',
//     marginBottom: 8,
//   },
//   priceText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#584e51',
//     marginBottom: 15,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#EEEEEE',
//     marginVertical: 15,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#222',
//     marginBottom: 10,
//   },
//   descriptionText: {
//     fontSize: 15,
//     lineHeight: 24,
//     color: '#555',
//   },
//   quantityRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   quantitySelector: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#eee',
//     borderRadius: 25,
//     overflow: 'hidden',
//   },
//   quantityButton: {
//     width: 36,
//     height: 36,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f8f8',
//   },
//   quantityValueContainer: {
//     width: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   quantityValue: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   stockText: {
//     fontSize: 14,
//     color: '#888',
//   },
//   actionBar: {
//     flexDirection: 'row',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: '#FFF',
//     borderTopWidth: 1,
//     borderTopColor: '#EEEEEE',
//   },
//   cartButton: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: '#584e51',
//     borderRadius: 30,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   buttonText: {
//     color: '#FFF',
//     fontWeight: '600',
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   buyButton: {
//     flex: 1,
//     backgroundColor: '#584e51',
//     borderRadius: 30,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buyButtonText: {
//     color: '#FFF',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   reviewsSection: {
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   loader: {
//     marginVertical: 20,
//   },
//   reviewsSummary: {
//     flexDirection: 'row',
//     marginBottom: 20,
//     padding: 15,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//   },
//   reviewsRating: {
//     alignItems: 'center',
//   },
//   averageRating: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#584e51',
//   },
//   starsContainer: {
//     flexDirection: 'row',
//     marginVertical: 5,
//   },
//   totalReviews: {
//     fontSize: 14,
//     color: '#777',
//   },
//   reviewCard: {
//     marginBottom: 15,
//     padding: 15,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//     borderLeftWidth: 3,
//     borderLeftColor: '#584e51',
//   },
//   reviewHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   userCircle: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: '#584e51',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   userInitial: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   reviewHeaderText: {
//     flex: 1,
//   },
//   reviewAuthor: {
//     fontWeight: 'bold',
//     fontSize: 15,
//     color: '#333',
//     marginBottom: 2,
//   },
//   reviewRating: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   reviewDate: {
//     fontSize: 12,
//     color: '#888',
//     marginLeft: 8,
//   },
//   reviewText: {
//     fontSize: 14,
//     lineHeight: 20,
//     color: '#555',
//   },
//   emptyReviewsContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 30,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//   },
//   noReviewsText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#666',
//     marginTop: 10,
//   },
//   reviewPrompt: {
//     fontSize: 14,
//     color: '#888',
//     marginTop: 5,
//   },
//   reviewsSummary: {
//     flexDirection: 'row',
//     marginBottom: 20,
//     padding: 15,
//     backgroundColor: '#f8f8f8',
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   reviewsSummaryLeft: {
//     flex: 2,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRightWidth: 1,
//     borderRightColor: '#eee',
//     paddingRight: 15,
//   },
//   reviewsSummaryRight: {
//     flex: 3,
//     paddingLeft: 15,
//     justifyContent: 'center',
//   },
//   averageRating: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: '#584e51',
//     marginBottom: 5,
//   },
//   starsContainer: {
//     flexDirection: 'row',
//     marginVertical: 5,
//     alignItems: 'center',
//   },
//   totalReviews: {
//     fontSize: 13,
//     color: '#777',
//     marginTop: 5,
//     textAlign: 'center',
//   },
//   ratingDistribution: {
//     width: '100%',
//   },
//   ratingBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 2,
//   },
//   ratingNumber: {
//     width: 20,
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: '#555',
//     textAlign: 'center',
//   },
//   ratingBarBackground: {
//     flex: 1,
//     height: 6,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 3,
//     marginHorizontal: 8,
//     overflow: 'hidden',
//   },
//   ratingBarFill: {
//     height: '100%',
//     backgroundColor: '#584e51',
//     borderRadius: 3,
//   },
//   ratingCount: {
//     width: 25,
//     fontSize: 12,
//     color: '#777',
//     textAlign: 'center',
//   },
// });

// export default ProductDetail;


// WORKING WITH REVIEWS
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  FlatList,
  Animated,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Redux/Actions/cartAction';
import { listReviewsByProduct, updateReview,deleteReview  } from '../../Redux/Actions/reviewAction';
import { useAuth } from '../../Context/Auth';
import { getToken } from '../../utils/sqliteToken';


const { width, height } = Dimensions.get('window');

const ProductDetail = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const scrollX = useRef(new Animated.Value(0)).current;
  const imageSliderRef = useRef(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [updatedComment, setUpdatedComment] = useState('');
  const [updatedRating, setUpdatedRating] = useState(0);
  const [token, setToken] = useState(null);

  // Access reviews and loading state from Redux
  const { reviews, loading } = useSelector((state) => ({
    reviews: state.reviews.reviews, // Accessing reviews from reviewReducer
    loading: state.reviews.loading, // Accessing loading state from reviewReducer
  }));

  const formattedPrice = new Intl.NumberFormat('en-US').format(item.sell_price);

  useEffect(() => {
    // Fetch token from SQLite
    const fetchToken = async () => {
      try {
        const storedToken = await getToken();
        setToken(storedToken?.token); // Set the token in state
      } catch (error) {
        console.error('Error retrieving token from SQLite:', error);
      }
    };

    fetchToken();

    // Dispatch action to fetch reviews for the product
    dispatch(listReviewsByProduct(item._id));
  }, [dispatch, item._id]);


  const handleIncrease = () => {
    if (quantity < item.stock_quantity) {
      setQuantity(quantity + 1);
    } else {
      Alert.alert('Error', 'Not enough stock available.');
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  const handleAddToCart = () => {
    if (!user) {
      Alert.alert('Error', 'User not logged in.');
      return;
    }

    const cartItem = {
      userId: user.id,
      id: item._id,
      name: item.name,
      price: item.sell_price,
      image: item.images[0]?.url,
      category: item.category,
      quantity,
    };
    dispatch(addToCart(cartItem));
    Alert.alert('Success', `${item.name} added to cart!`);
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems[0] !== undefined) {
      setCurrentImageIndex(viewableItems[0].index);
    }
  }).current;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImagePress = (index) => {
    setCurrentImageIndex(index);
    imageSliderRef.current.scrollToOffset({
      offset: index * width,
      animated: true,
    });
  };

  const handleEditReview = (review) => {
    setSelectedReview(review); // Set the review to be edited
    setUpdatedComment(review.comment); // Pre-fill the comment in the modal
    setUpdatedRating(review.rating); // Pre-fill the rating in the modal
    setIsModalVisible(true); // Open the modal
  };

  const handleUpdateReview = async () => {
    if (!updatedComment.trim()) {
      Alert.alert('Error', 'Comment cannot be empty.');
      return;
    }
  
    if (!token) {
      Alert.alert('Error', 'User token not found.');
      return;
    }
  
    try {
      await dispatch(updateReview(item._id, selectedReview._id, { comment: updatedComment, rating: updatedRating }, token));
      setIsModalVisible(false);
      Alert.alert('Success', 'Review updated successfully.');
    } catch (error) {
      console.error('Error updating review:', error);
      Alert.alert('Error', error.message || 'Failed to update review.');
    }
  };
  
  const handleDeleteReview = async (reviewId) => {
    if (!token) {
      Alert.alert('Error', 'User token not found.');
      return;
    }
  
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(deleteReview(item._id, reviewId, token));
              Alert.alert('Success', 'Review deleted successfully.');
            } catch (error) {
              console.error('Error deleting review:', error);
              Alert.alert('Error', error.message || 'Failed to delete review.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={toggleFavorite}
        >
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? '#FF4D67' : '#222'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Full-width Image Slider */}
        <View style={styles.imageSliderContainer}>
          <FlatList
            ref={imageSliderRef}
            data={item.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            renderItem={({ item: image }) => (
              <View style={styles.slideItem}>
                <Image
                  source={{ uri: image.url }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
              </View>
            )}
            keyExtractor={(_, index) => index.toString()}
          />

          {/* Image Pagination Dots */}
          {item.images.length > 1 && (
            <View style={styles.paginationContainer}>
              {item.images.map((_, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.paginationDot,
                    {
                      opacity: scrollX.interpolate({
                        inputRange: [
                          (index - 1) * width,
                          index * width,
                          (index + 1) * width,
                        ],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                      }),
                      width: scrollX.interpolate({
                        inputRange: [
                          (index - 1) * width,
                          index * width,
                          (index + 1) * width,
                        ],
                        outputRange: [8, 16, 8],
                        extrapolate: 'clamp',
                      }),
                      backgroundColor: scrollX.interpolate({
                        inputRange: [
                          (index - 1) * width,
                          index * width,
                          (index + 1) * width,
                        ],
                        outputRange: ['#bbb', '#584e51', '#bbb'],
                        extrapolate: 'clamp',
                      }),
                    },
                  ]}
                />
              ))}
            </View>
          )}
        </View>
        
        {/* Thumbnail Gallery */}
        {item.images.length > 1 && (
          <View style={styles.thumbnailGallery}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={item.images}
              renderItem={({ item: image, index }) => (
                <TouchableOpacity
                  onPress={() => handleImagePress(index)}
                  style={[
                    styles.thumbnail,
                    currentImageIndex === index && styles.thumbnailActive,
                  ]}
                >
                  <Image
                    source={{ uri: image.url }}
                    style={styles.thumbnailImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(_, index) => `thumb_${index}`}
              contentContainerStyle={styles.thumbnailContentContainer}
            />
          </View>
        )}

        {/* Product Info */}
        <View style={styles.infoSection}>
          <View style={styles.categoryRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
            {/* <View style={styles.ratingContainer}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating || 'N/A'}</Text>
            </View> */}
          </View>

          <Text style={styles.productTitle}>{item.name}</Text>
          <Text style={styles.priceText}>₱{formattedPrice}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>

          <View style={styles.divider} />

          {/* Quantity Selector */}
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantityRow}>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleDecrease}
              >
                <Icon
                  name="remove"
                  size={18}
                  color={quantity > 1 ? '#333' : '#ccc'}
                />
              </TouchableOpacity>
              <View style={styles.quantityValueContainer}>
                <Text style={styles.quantityValue}>{quantity}</Text>
              </View>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleIncrease}
              >
                <Icon name="add" size={18} color="#333" />
              </TouchableOpacity>
            </View>
            <Text style={styles.stockText}>
              {item.stock_quantity} items available
            </Text>
          </View>
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>Customer Reviews</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#584e51" style={styles.loader} />
          ) : reviews.length > 0 ? (
            <View>
              <View style={styles.reviewsSummary}>
                <View style={styles.reviewsSummaryLeft}>
                  <Text style={styles.averageRating}>
                    {(
                      reviews.reduce((sum, review) => sum + review.rating, 0) /
                      reviews.length
                    ).toFixed(1)}
                  </Text>
                  <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((star) => {
                      const averageRating =
                        reviews.reduce((sum, review) => sum + review.rating, 0) /
                        reviews.length;
                      return (
                        <View key={star} style={{ position: 'relative' }}>
                          {/* Empty star (background) */}
                          <Icon
                            name="star-outline"
                            size={16}
                            color="#FFD700"
                            style={{ opacity: 0.3 }}
                          />
                          {/* Filled part of star */}
                          <View
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width:
                                star <= Math.floor(averageRating)
                                  ? '100%'
                                  : star === Math.ceil(averageRating)
                                  ? `${(averageRating % 1) * 100}%`
                                  : '0%',
                              overflow: 'hidden',
                            }}
                          >
                            <Icon name="star" size={16} color="#FFD700" />
                          </View>
                        </View>
                      );
                    })}
                  </View>
                  <Text style={styles.totalReviews}>
                    Based on {reviews.length} reviews
                  </Text>
                </View>

                <View style={styles.reviewsSummaryRight}>
                  <View style={styles.ratingDistribution}>
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = reviews.filter(
                        (review) => Math.floor(review.rating) === rating
                      ).length;
                      const percentage = (count / reviews.length) * 100;
                      return (
                        <View key={rating} style={styles.ratingBar}>
                          <Text style={styles.ratingNumber}>{rating}</Text>
                          <View style={styles.ratingBarBackground}>
                            <View
                              style={[styles.ratingBarFill, { width: `${percentage}%` }]}
                            />
                          </View>
                          <Text style={styles.ratingCount}>{count}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>

              {reviews
                .slice() 
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
                .map((review) => (
                  <View key={review._id} style={styles.reviewCard}>
                    <View style={styles.reviewHeader}>
                      <View style={styles.userCircle}>
                        <Text style={styles.userInitial}>
                          {(review.user?.email || 'A')[0].toUpperCase()}
                        </Text>
                      </View>
                      <View style={styles.reviewHeaderText}>
                        <Text style={styles.reviewAuthor}>
                          {review.user?.email || 'Anonymous User'}
                        </Text>
                        <View style={styles.reviewRating}>
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              name={i < review.rating ? 'star' : 'star-outline'}
                              size={14}
                              color="#FFD700"
                            />
                          ))}
                          <Text style={styles.reviewDate}>
                            {new Date(review.createdAt).toLocaleDateString()}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Text style={styles.reviewText}>{review.comment}</Text>

                    {/* Update and Delete Buttons */}
                    {user && review.user?._id === user.id && (
                      <View style={styles.reviewActions}>
                        <TouchableOpacity
                          style={styles.editButton}
                          onPress={() => handleEditReview(review)}
                        >
                          <Icon name="create-outline" size={16} color="#584e51" />
                          <Text style={styles.actionText}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() => handleDeleteReview(review._id)}
                        >
                          <Icon name="trash-outline" size={16} color="#FF4D67" />
                          <Text style={styles.actionText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyReviewsContainer}>
              <Icon name="chatbubble-ellipses-outline" size={50} color="#ccc" />
              <Text style={styles.noReviewsText}>No reviews yet</Text>
              <Text style={styles.reviewPrompt}>
                Be the first to review this product
              </Text>
            </View>
          )}
        </View>

      </ScrollView>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        {/* Remove KeyboardAvoidingView to prevent modal from moving up */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Update Review</Text>
                <TouchableOpacity 
                  onPress={() => {
                    setIsModalVisible(false);
                    Keyboard.dismiss();
                  }}
                  style={styles.closeButton}
                >
                  <Icon name="close" size={24} color="#584e51" />
                </TouchableOpacity>
              </View>
              
              <Text style={styles.modalLabel}>Your Rating</Text>
              <View style={styles.starRatingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => setUpdatedRating(star)}
                    style={styles.starButton}
                  >
                    <Icon
                      name={star <= updatedRating ? "star" : "star-outline"}
                      size={32}
                      color="#FFD700"
                    />
                  </TouchableOpacity>
                ))}
              </View>
              
              <Text style={styles.modalLabel}>Your Review</Text>
              <TextInput
                style={styles.reviewInput}
                placeholder="Share your thoughts about this product..."
                value={updatedComment}
                onChangeText={setUpdatedComment}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
              />
              
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => {
                  handleUpdateReview();
                  Keyboard.dismiss();
                }}
              >
                <Text style={styles.updateButtonText}>Update Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Bottom Action Bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <Icon name="cart-outline" size={22} color="#FFF" />
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  imageSliderContainer: {
    width: width,
    height: height * 0.4,
    backgroundColor: '#F8F8F8',
  },
  slideItem: {
    width: width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: width - 40,
    height: '100%',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  thumbnailGallery: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  thumbnailContentContainer: {
    paddingHorizontal: 15,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#584e51',
    overflow: 'hidden',
  },
  thumbnailActive: {
    borderWidth: 2,
    borderColor: '#584e51',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  infoSection: {
    padding: 20,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#584e51',
    borderRadius: 20,
  },
  categoryText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
  },
  productTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#584e51',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#555',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 25,
    overflow: 'hidden',
  },
  quantityButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  quantityValueContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  stockText: {
    fontSize: 14,
    color: '#888',
  },
  actionBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  cartButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#584e51',
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#584e51',
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  reviewsSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  loader: {
    marginVertical: 20,
  },
  reviewsSummary: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  reviewsRating: {
    alignItems: 'center',
  },
  averageRating: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#584e51',
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  totalReviews: {
    fontSize: 14,
    color: '#777',
  },
  reviewCard: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#584e51',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#584e51',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  userInitial: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewHeaderText: {
    flex: 1,
  },
  reviewAuthor: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#333',
    marginBottom: 2,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
    marginLeft: 8,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  emptyReviewsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  noReviewsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 10,
  },
  reviewPrompt: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  reviewsSummary: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  reviewsSummaryLeft: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#eee',
    paddingRight: 15,
  },
  reviewsSummaryRight: {
    flex: 3,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  averageRating: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#584e51',
    marginBottom: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
  },
  totalReviews: {
    fontSize: 13,
    color: '#777',
    marginTop: 5,
    textAlign: 'center',
  },
  ratingDistribution: {
    width: '100%',
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  ratingNumber: {
    width: 20,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
  },
  ratingBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: '#584e51',
    borderRadius: 3,
  },
  ratingCount: {
    width: 25,
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
  },
  reviewActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    marginLeft: 5,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#584e51',
  },
  closeButton: {
    padding: 5,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 5,
  },
  starRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  starButton: {
    padding: 8,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    height: 120,
    marginBottom: 20,
    color: '#333',
  },
  updateButton: {
    backgroundColor: '#584e51',
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  updateButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ProductDetail;