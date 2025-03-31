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
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';

// const { width, height } = Dimensions.get('window');

// const ProductDetail = ({ route }) => {
//   const { item } = route.params;
//   const navigation = useNavigation();
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
//       animated: true
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
//             name={isFavorite ? "heart" : "heart-outline"} 
//             size={24} 
//             color={isFavorite ? "#FF4D67" : "#222"} 
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
//                           (index + 1) * width
//                         ],
//                         outputRange: [0.3, 1, 0.3],
//                         extrapolate: 'clamp'
//                       }),
//                       width: scrollX.interpolate({
//                         inputRange: [
//                           (index - 1) * width,
//                           index * width,
//                           (index + 1) * width
//                         ],
//                         outputRange: [8, 16, 8],
//                         extrapolate: 'clamp'
//                       }),
//                       backgroundColor: scrollX.interpolate({
//                         inputRange: [
//                           (index - 1) * width,
//                           index * width,
//                           (index + 1) * width
//                         ],
//                         outputRange: ['#bbb', '#584e51', '#bbb'],
//                         extrapolate: 'clamp'
//                       })
//                     }
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
//                     currentImageIndex === index && styles.thumbnailActive
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
//               <Text style={styles.ratingText}>{item.rating || "N/A"}</Text>
//             </View>
//           </View>
          
//           <Text style={styles.productTitle}>{item.name}</Text>
//           <Text style={styles.priceText}>₱{formattedPrice}</Text>
          
//           <View style={styles.divider} />
          
//           <Text style={styles.sectionTitle}>Description</Text>
//           <Text style={styles.descriptionText}>{item.description}</Text>
          
//           <View style={styles.divider} />
          
//      {/* Quantity Selector */}
//           <Text style={styles.sectionTitle}>Quantity</Text>
//           <View style={styles.quantityRow}>
//             <View style={styles.quantitySelector}>
//               <TouchableOpacity 
//                 style={styles.quantityButton} 
//                 onPress={handleDecrease}
//               >
//                 <Icon name="remove" size={18} color={quantity > 1 ? "#333" : "#ccc"} />
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
//             <Text style={styles.stockText}>{item.stock_quantity} items available</Text>
//           </View>
//         </View>
//       </ScrollView>

//       {/* Bottom Action Bar */}
//       <View style={styles.actionBar}>
//         <TouchableOpacity style={styles.cartButton}>
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


import React, { useState, useRef } from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/Actions/cartAction';
import { useAuth } from '../../Context/Auth'; // Import AuthContext

const { width, height } = Dimensions.get('window');

const ProductDetail = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useAuth(); // Retrieve user from AuthContext
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const scrollX = useRef(new Animated.Value(0)).current;
  const imageSliderRef = useRef(null);

  const formattedPrice = new Intl.NumberFormat('en-US').format(item.sell_price);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    if (!user) {
      Alert.alert('Error', 'User not logged in.');
      return;
    }

    const cartItem = {
      userId: user.id, // Use user.id from context
      id: item._id,
      name: item.name,
      price: item.sell_price,
      image: item.images[0]?.url,
      category: item.category,
      quantity,
    };
    dispatch(addToCart(cartItem));
    Alert.alert('Success', `${item.name} added to cart! ${user.id}`);
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
            <View style={styles.ratingContainer}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating || 'N/A'}</Text>
            </View>
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
      </ScrollView>

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
});

export default ProductDetail;