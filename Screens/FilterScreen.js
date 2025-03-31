// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   TouchableOpacity, 
//   ScrollView,
//   SafeAreaView,
//   Animated,
//   ActivityIndicator,
// } from 'react-native';
// import Slider from '@react-native-community/slider';
// import Icon from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import baseURL from '../assets/common/baseUrl'; // Corrected relative path

// const FilterScreen = ({ navigation }) => {
//   const [priceRange, setPriceRange] = useState([0, 0]); // Start with 0 for both min and max
//   const [maxPrice, setMaxPrice] = useState(0); // Maximum price fetched from products
//   const [selectedCategories, setSelectedCategories] = useState(['all']);
//   const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
//   const [loading, setLoading] = useState(true); // Loading state for fetching products
//   const rotateAnimation = useState(new Animated.Value(0))[0];

//   // Categories array as a list of strings
//   const categories = ['Bracelet', 'Necklace', 'Keychain'];

//   // Fetch products to determine the maximum price
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(`${baseURL}/product/get/all`);
//         const products = res.data.products;

//         // Find the highest sell_price
//         const highestPrice = Math.max(...products.map((product) => product.sell_price));
//         setMaxPrice(highestPrice);
//         setPriceRange([0, highestPrice]); // Initialize the price range
//       } catch (error) {
//         console.error('Failed to fetch products:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Toggle drawer open/closed with animation
//   const toggleCategoryDrawer = () => {
//     const toValue = categoryDrawerOpen ? 0 : 1;
//     Animated.timing(rotateAnimation, {
//       toValue: toValue,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//     setCategoryDrawerOpen(!categoryDrawerOpen);
//   };

//   // Convert rotation value to degrees
//   const spin = rotateAnimation.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['0deg', '180deg'],
//   });

//   // Handle category selection/deselection
//   const toggleCategory = (category) => {
//     if (category === 'all') {
//       setSelectedCategories(['all']); // Reset to "All Categories"
//     } else {
//       let updated = selectedCategories.filter((c) => c !== 'all'); // Remove "all" if present

//       if (updated.includes(category)) {
//         updated = updated.filter((c) => c !== category); // Deselect category
//         if (updated.length === 0) {
//           updated = ['all']; // Default to "All Categories" if none selected
//         }
//       } else {
//         updated.push(category); // Add category
//       }

//       setSelectedCategories(updated);
//     }
//   };

//   // Get display text for selected categories
//   const getSelectedCategoriesText = () => {
//     if (selectedCategories.includes('all')) {
//       return 'All Categories';
//     }

//     return selectedCategories.join(', ');
//   };

//   // Apply filters and navigate back
//   const applyFilters = () => {
//     navigation.navigate('Products', {
//       filters: {
//         minPrice: priceRange[0],
//         maxPrice: priceRange[1],
//         categories: selectedCategories,
//       },
//     });
//   };

//   // Reset filters
//   const resetFilters = () => {
//     setPriceRange([0, maxPrice]); // Reset price range to full range
//     setSelectedCategories(['all']);
//   };

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#584e51" />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         {/* Price Range Section */}
//         <View style={styles.filterSection}>
//           <Text style={styles.sectionTitle}>Price Range</Text>
//           <View style={styles.priceRangeContainer}>
//             <Text style={styles.rangeLabel}>₱{priceRange[0]}</Text>
//             <Text style={styles.rangeLabel}>₱{priceRange[1]}</Text>
//           </View>

//           <Slider
//             style={styles.slider}
//             minimumValue={0}
//             maximumValue={maxPrice}
//             step={100}
//             value={priceRange[1]}
//             minimumTrackTintColor="#584e51"
//             maximumTrackTintColor="#d3d3d3"
//             thumbTintColor="#584e51"
//             onValueChange={(value) => setPriceRange([priceRange[0], value])}
//           />

//           <Slider
//             style={styles.slider}
//             minimumValue={0}
//             maximumValue={maxPrice}
//             step={100}
//             value={priceRange[0]}
//             minimumTrackTintColor="#d3d3d3"
//             maximumTrackTintColor="#584e51"
//             thumbTintColor="#584e51"
//             onValueChange={(value) => setPriceRange([value, priceRange[1]])}
//           />
//         </View>

//         {/* Category Section */}
//         <View style={styles.filterSection}>
//           <TouchableOpacity style={styles.drawerHeader} onPress={toggleCategoryDrawer}>
//             <Text style={styles.sectionTitle}>Category</Text>
//             <View style={styles.selectedDisplay}>
//               <Text style={styles.selectedText} numberOfLines={1}>
//                 {getSelectedCategoriesText()}
//               </Text>
//               <Animated.View style={{ transform: [{ rotate: spin }] }}>
//                 <Icon name="chevron-down" size={20} color="#584e51" />
//               </Animated.View>
//             </View>
//           </TouchableOpacity>

//           {categoryDrawerOpen && (
//             <View style={styles.categoryDrawer}>
//               {['all', ...categories].map((category) => (
//                 <TouchableOpacity
//                   key={category}
//                   style={styles.categoryItem}
//                   onPress={() => toggleCategory(category)}
//                 >
//                   <View style={styles.checkboxContainer}>
//                     <View
//                       style={[
//                         styles.checkbox,
//                         selectedCategories.includes(category) && styles.checkboxSelected,
//                       ]}
//                     >
//                       {selectedCategories.includes(category) && (
//                         <Icon name="checkmark" size={16} color="#fff" />
//                       )}
//                     </View>
//                     <Text style={styles.categoryText}>{category}</Text>
//                   </View>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           )}
//         </View>

//         {/* Buttons */}
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={[styles.button, styles.applyButton]} onPress={applyFilters}>
//             <Text style={styles.buttonText}>Apply Filters</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetFilters}>
//             <Text style={styles.resetButtonText}>Reset</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//     padding: 20,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   filterSection: {
//     backgroundColor: '#ffffff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#584e51',
//     marginBottom: 5,
//   },
//   priceRangeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   rangeLabel: {
//     fontSize: 16,
//     color: '#584e51',
//   },
//   slider: {
//     width: '100%',
//     height: 40,
//   },
//   drawerHeader: {
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//   },
//   selectedDisplay: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//     marginTop: 5,
//   },
//   selectedText: {
//     fontSize: 16,
//     color: '#333',
//     flex: 1,
//   },
//   categoryDrawer: {
//     marginTop: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#f0f0f0',
//   },
//   categoryItem: {
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   checkbox: {
//     width: 22,
//     height: 22,
//     borderRadius: 4,
//     borderWidth: 1,
//     borderColor: '#584e51',
//     marginRight: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   checkboxSelected: {
//     backgroundColor: '#584e51',
//   },
//   categoryText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//     marginBottom: 30,
//   },
//   button: {
//     borderRadius: 8,
//     padding: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   applyButton: {
//     backgroundColor: '#584e51',
//     flex: 1,
//     marginRight: 10,
//   },
//   resetButton: {
//     backgroundColor: '#f8f8f8',
//     borderWidth: 1,
//     borderColor: '#584e51',
//     paddingVertical: 14,
//     flex: 0.4,
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   resetButtonText: {
//     color: '#584e51',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default FilterScreen;

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Animated,
  ActivityIndicator,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import baseURL from '../assets/common/baseUrl';

const FilterScreen = ({ navigation, onApplyFilters }) => {
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const rotateAnimation = useState(new Animated.Value(0))[0];

  const categories = ['Bracelet', 'Necklace', 'Keychain'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${baseURL}/product/get/all`);
        const products = res.data.products;

        const highestPrice = Math.max(...products.map((product) => product.sell_price));
        setMaxPrice(highestPrice);
        setPriceRange([0, highestPrice]);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleCategoryDrawer = () => {
    const toValue = categoryDrawerOpen ? 0 : 1;
    Animated.timing(rotateAnimation, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setCategoryDrawerOpen(!categoryDrawerOpen);
  };

  const spin = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const toggleCategory = (category) => {
    if (category === 'all') {
      setSelectedCategories(['all']);
    } else {
      let updated = selectedCategories.filter((c) => c !== 'all');

      if (updated.includes(category)) {
        updated = updated.filter((c) => c !== category);
        if (updated.length === 0) {
          updated = ['all'];
        }
      } else {
        updated.push(category);
      }

      setSelectedCategories(updated);
    }
  };

  const getSelectedCategoriesText = () => {
    if (selectedCategories.includes('all')) {
      return 'All Categories';
    }

    return selectedCategories.join(', ');
  };

  const applyFilters = () => {
    onApplyFilters({
      priceRange,
      selectedCategories,
    });

    navigation.goBack();
  };

  const resetFilters = () => {
    setPriceRange([0, maxPrice]);
    setSelectedCategories(['all']);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#584e51" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Price Range</Text>
          <View style={styles.priceRangeContainer}>
            <Text style={styles.rangeLabel}>₱{priceRange[0]}</Text>
            <Text style={styles.rangeLabel}>₱{priceRange[1]}</Text>
          </View>

          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={maxPrice}
            step={100}
            value={priceRange[1]}
            minimumTrackTintColor="#584e51"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#584e51"
            onValueChange={(value) => setPriceRange([priceRange[0], value])}
          />

          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={maxPrice}
            step={100}
            value={priceRange[0]}
            minimumTrackTintColor="#d3d3d3"
            maximumTrackTintColor="#584e51"
            thumbTintColor="#584e51"
            onValueChange={(value) => setPriceRange([value, priceRange[1]])}
          />
        </View>

        <View style={styles.filterSection}>
          <TouchableOpacity style={styles.drawerHeader} onPress={toggleCategoryDrawer}>
            <Text style={styles.sectionTitle}>Category</Text>
            <View style={styles.selectedDisplay}>
              <Text style={styles.selectedText} numberOfLines={1}>
                {getSelectedCategoriesText()}
              </Text>
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <Icon name="chevron-down" size={20} color="#584e51" />
              </Animated.View>
            </View>
          </TouchableOpacity>

          {categoryDrawerOpen && (
            <View style={styles.categoryDrawer}>
              {['all', ...categories].map((category) => (
                <TouchableOpacity
                  key={category}
                  style={styles.categoryItem}
                  onPress={() => toggleCategory(category)}
                >
                  <View style={styles.checkboxContainer}>
                    <View
                      style={[
                        styles.checkbox,
                        selectedCategories.includes(category) && styles.checkboxSelected,
                      ]}
                    >
                      {selectedCategories.includes(category) && (
                        <Icon name="checkmark" size={16} color="#fff" />
                      )}
                    </View>
                    <Text style={styles.categoryText}>{category}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.applyButton]} onPress={applyFilters}>
            <Text style={styles.buttonText}>Apply Filters</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetFilters}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterSection: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#584e51',
    marginBottom: 5,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  rangeLabel: {
    fontSize: 16,
    color: '#584e51',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  drawerHeader: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  selectedDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginTop: 5,
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  categoryDrawer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  categoryItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#584e51',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#584e51',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButton: {
    backgroundColor: '#584e51',
    flex: 1,
    marginRight: 10,
  },
  resetButton: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#584e51',
    paddingVertical: 14,
    flex: 0.4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButtonText: {
    color: '#584e51',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FilterScreen;