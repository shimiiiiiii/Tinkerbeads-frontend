// import React from 'react';
// import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const Header = () => {
//     return (
//         <View style={styles.container}>
//             <TouchableOpacity style={styles.menuButton}>
//                 <Icon name="menu-outline" size={24} color="black" />
//             </TouchableOpacity>

//             <View style={styles.searchContainer}>
//                 <Icon name="search-outline" size={18} color="gray" style={styles.searchIcon} />
//                 <TextInput
//                     style={styles.searchInput}
//                     placeholder="Search here..."
//                     placeholderTextColor="gray"
//                 />
//             </View>

//             <View style={styles.rightIcons}>
//                 <TouchableOpacity style={styles.iconButton}>
//                     <Icon name="grid-outline" size={22} color="black" />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.iconButton}>
//                     <Icon name="notifications-outline" size={22} color="black" />
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         paddingHorizontal: 16,
//         paddingVertical: 12,
//         alignItems: 'center',
//         backgroundColor: 'white',
//         elevation: 2,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         shadowRadius: 1,
//     },
//     menuButton: {
//         marginRight: 12,
//     },
//     searchContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         height: 36,
//         backgroundColor: '#f0f0f0',
//         borderRadius: 6,
//         paddingHorizontal: 10,
//     },
//     searchIcon: {
//         marginRight: 8,
//     },
//     searchInput: {
//         flex: 1,
//         fontSize: 14,
//         color: 'black',
//         height: '100%',
//     },
//     rightIcons: {
//         flexDirection: 'row',
//         marginLeft: 12,
//     },
//     iconButton: {
//         marginLeft: 16,
//     },
// });

// export default Header;

// import React from 'react';
// import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const Header = ({ searchQuery, setSearchQuery }) => {
//     return (
//         <View style={styles.container}>
//             <TouchableOpacity style={styles.menuButton}>
//                 <Icon name="menu-outline" size={24} color="black" />
//             </TouchableOpacity>

//             <View style={styles.searchContainer}>
//                 <Icon name="search-outline" size={18} color="gray" style={styles.searchIcon} />
//                 <TextInput
//                     style={styles.searchInput}
//                     placeholder="Search here..."
//                     placeholderTextColor="gray"
//                     value={searchQuery}
//                     onChangeText={(text) => setSearchQuery(text)} 
//                 />
//             </View>

//             <View style={styles.rightIcons}>
//                 <TouchableOpacity style={styles.iconButton}>
//                     <Icon name="grid-outline" size={22} color="black" />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.iconButton}>
//                     <Icon name="notifications-outline" size={22} color="black" />
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         paddingHorizontal: 16,
//         paddingVertical: 12,
//         alignItems: 'center',
//         backgroundColor: 'white',
//         elevation: 2,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         shadowRadius: 1,
//     },
//     menuButton: {
//         marginRight: 12,
//     },
//     searchContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         height: 36,
//         backgroundColor: '#f0f0f0',
//         borderRadius: 6,
//         paddingHorizontal: 10,
//     },
//     searchIcon: {
//         marginRight: 8,
//     },
//     searchInput: {
//         flex: 1,
//         fontSize: 14,
//         color: 'black',
//         height: '100%',
//     },
//     rightIcons: {
//         flexDirection: 'row',
//         marginLeft: 12,
//     },
//     iconButton: {
//         marginLeft: 16,
//     },
// });

// export default Header;

// import React from 'react';
// import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const Header = ({ searchQuery, setSearchQuery, openDrawer }) => {
//     return (
//         <View style={styles.container}>
//             <TouchableOpacity 
//                 style={styles.menuButton}
//                 onPress={openDrawer}>
//                 <Icon name="menu-outline" size={24} color="black" />
//             </TouchableOpacity>

//             <View style={styles.searchContainer}>
//                 <Icon name="search-outline" size={18} color="gray" style={styles.searchIcon} />
//                 <TextInput
//                     style={styles.searchInput}
//                     placeholder="Search here..."
//                     placeholderTextColor="gray"
//                     value={searchQuery}
//                     onChangeText={(text) => setSearchQuery(text)} 
//                 />
//             </View>

//             <View style={styles.rightIcons}>
//                 <TouchableOpacity style={styles.iconButton}>
//                     <Icon name="grid-outline" size={22} color="black" />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.iconButton}>
//                     <Icon name="notifications-outline" size={22} color="black" />
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         paddingHorizontal: 16,
//         paddingVertical: 12,
//         alignItems: 'center',
//         backgroundColor: 'white',
//         elevation: 2,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         shadowRadius: 1,
//     },
//     menuButton: {
//         marginRight: 12,
//     },
//     searchContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         height: 36,
//         backgroundColor: '#f0f0f0',
//         borderRadius: 6,
//         paddingHorizontal: 10,
//     },
//     searchIcon: {
//         marginRight: 8,
//     },
//     searchInput: {
//         flex: 1,
//         fontSize: 14,
//         color: 'black',
//         height: '100%',
//     },
//     rightIcons: {
//         flexDirection: 'row',
//         marginLeft: 12,
//     },
//     iconButton: {
//         marginLeft: 16,
//     },
// });

// export default Header;

import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Modal, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl'; // Adjust the path if necessary

const Header = ({ searchQuery, setSearchQuery, onFilterApply }) => {
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [maxPrice, setMaxPrice] = useState(0);
  const [tempPriceRange, setTempPriceRange] = useState([0, 0]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = ['Necklace', 'Keychain', 'Bracelet'];

  useEffect(() => {
    const fetchMaxPrice = async () => {
      try {
        const res = await axios.get(`${baseURL}/product/get/all`);
        const products = res.data.products;
        const highestPrice = Math.max(...products.map((product) => product.sell_price));
        setMaxPrice(highestPrice);
        setTempPriceRange([0, highestPrice]);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchMaxPrice();
  }, []);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const applyFilters = () => {
    setFilterModalVisible(false);
    if (onFilterApply) {
      onFilterApply({
        priceRange: tempPriceRange,
        categories: selectedCategories,
      });
    }
    
    console.log('Filters applied:', { selectedPriceRange: tempPriceRange, selectedCategories });
  };

  const resetFilters = () => {
    setTempPriceRange([0, maxPrice]);
    setSelectedCategories([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={18} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search here..."
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      <View style={styles.rightIcons}>
        <TouchableOpacity style={styles.iconButton} onPress={() => setFilterModalVisible(true)}>
          <Icon name="filter-outline" size={22} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="notifications-outline" size={22} color="black" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isFilterModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setFilterModalVisible(false)}
              >
                <Icon name="close-outline" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>

            {/* Price Range */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Price Range</Text>
              <View style={styles.priceRangeContainer}>
                <View style={styles.priceBox}>
                  <Text style={styles.priceLabel}>Min</Text>
                  <Text style={styles.priceValue}>₱{Math.round(tempPriceRange[0])}</Text>
                </View>
                <View style={styles.priceBox}>
                  <Text style={styles.priceLabel}>Max</Text>
                  <Text style={styles.priceValue}>₱{Math.round(tempPriceRange[1])}</Text>
                </View>
              </View>

              <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={maxPrice}
                step={10}
                value={tempPriceRange[0]}
                onValueChange={(value) => {
                  if (value < tempPriceRange[1]) {
                    setTempPriceRange([value, tempPriceRange[1]]);
                  }
                }}
                minimumTrackTintColor="#000"
                maximumTrackTintColor="#DDD"
                thumbTintColor="#000"
              />
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={maxPrice}
                step={10}
                value={tempPriceRange[1]}
                onValueChange={(value) => {
                  if (value > tempPriceRange[0]) {
                    setTempPriceRange([tempPriceRange[0], value]);
                  }
                }}
                minimumTrackTintColor="#DDD"
                maximumTrackTintColor="#000"
                inverted={true}
                thumbTintColor="#000"
              />
            </View>
            </View>

            <View style={styles.divider} />

            {/* Categories */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <View style={styles.categoryContainer}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryChip,
                      selectedCategories.includes(category) && styles.selectedCategoryChip,
                    ]}
                    onPress={() => toggleCategory(category)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selectedCategories.includes(category) && styles.selectedCategoryText,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.divider} />

            {/* Action Buttons */}
            <View style={styles.modalButtons}>
              <Pressable style={styles.resetButton} onPress={resetFilters}>
                <Text style={styles.resetButtonText}>Reset All</Text>
              </Pressable>
              <Pressable style={styles.applyButton} onPress={applyFilters}>
                <Text style={styles.applyButtonText}>Apply</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: 'black',
    height: '100%',
  },
  rightIcons: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  iconButton: {
    marginLeft: 16,
  },
  
  // New black & white modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 20,
  },
  filterSection: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  priceBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    width: '48%',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  sliderContainer: {
    marginTop: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryChip: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  selectedCategoryChip: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  selectedCategoryText: {
    color: '#FFF',
    fontWeight: '500',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  resetButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    width: '48%',
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  applyButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#000',
    width: '48%',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Header;