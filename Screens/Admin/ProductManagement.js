
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  deleteProduct,
} from '../../Redux/Actions/productAction';
import { getToken } from '../../utils/sqliteToken'; 

const ProductManagement = ({ navigation }) => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategories, setFilterCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    applyFilters(products, searchQuery, filterCategories);
  }, [products, searchQuery, filterCategories]);

  const confirmDeleteProduct = async (productId) => {
    try {
        const tokenData = await getToken();

        if (!tokenData || !tokenData.token) {
            Alert.alert('Authentication Error', 'Please login again to continue.');
            return;
        }

        Alert.alert(
            'Delete Product',
            'Are you sure you want to delete this product?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await dispatch(deleteProduct(productId, tokenData.token));
                            Alert.alert('Success', 'Product successfully deleted.');
                        } catch (error) {
                            console.error('Error deleting product:', error);
                            Alert.alert('Error', 'Failed to delete product. Please try again.');
                        }
                    },
                },
            ]
        );
    } catch (error) {
        console.error('Authentication error:', error);
        Alert.alert('Error', 'Failed to authenticate. Please log in again.');
    }
};

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(fetchProducts());
    setRefreshing(false);
  };

  const applyFilters = (productsToFilter, query, categories) => {
    let result = Array.isArray(productsToFilter) ? productsToFilter : [];

    if (categories.length > 0) {
      result = result.filter((product) => 
        product && product.category && categories.includes(product.category)
      );
    }

    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      result = result.filter((product) => {
        if (!product) return false;
        return (
          (product.name && product.name.toLowerCase().includes(lowerCaseQuery)) ||
          (product.category && product.category.toLowerCase().includes(lowerCaseQuery))
        );
      });
    }

    setFilteredProducts(result);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleCategoryFilter = (category) => {
    let updatedCategories = [...filterCategories];
    if (updatedCategories.includes(category)) {
      updatedCategories = updatedCategories.filter((cat) => cat !== category);
    } else {
      updatedCategories.push(category);
    }
    setFilterCategories(updatedCategories);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterCategories([]);
  };

  const categories = ['Bracelet', 'Necklace', 'Keychain'];

  const renderProductItem = ({ item }) => {
    if (!item || !item._id) return null;
    
    const imageUrl = item.images && item.images[0] && item.images[0].url;
    
    return (
      <View style={styles.productCard}>
        <View style={styles.productImageContainer}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.productImage} />
          ) : (
            <View style={[styles.productImage, styles.noImageContainer]}>
              <Icon name="image-outline" size={24} color="#ccc" />
            </View>
          )}
        </View>

        <View style={styles.productContent}>
          <Text style={styles.productName} numberOfLines={1}>
            {item.name || 'Unnamed Product'}
          </Text>
          <View style={styles.productMeta}>
            <Text style={styles.productCategory}>{item.category || 'Uncategorized'}</Text>
            <Text style={styles.productPrice}>
              ₱{item.sell_price ? parseFloat(item.sell_price).toFixed(2) : '0.00'}
            </Text>
          </View>
          <View style={styles.stockContainer}>
            <Text
              style={[
                styles.stockText,
                item.stock_quantity === 0
                  ? styles.outOfStock
                  : item.stock_quantity < 10
                  ? styles.lowStock
                  : styles.inStock,
              ]}
            >
              {item.stock_quantity === 0
                ? 'Out of Stock'
                : item.stock_quantity < 10
                ? `Low Stock: ${item.stock_quantity}`
                : `In Stock: ${item.stock_quantity}`}
            </Text>
          </View>
        </View>

        <View style={styles.productActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('ProductForm', { product: item })}
          >
            <Icon name="create-outline" size={20} color="#584e51" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => confirmDeleteProduct(item._id)}
          >
            <Icon name="trash-outline" size={20} color="#d9534f" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerActions}>
        <View style={styles.searchContainer}>
          <Icon
            name="search-outline"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery ? (
            <TouchableOpacity
              style={styles.clearSearch}
              onPress={() => handleSearch('')}
            >
              <Icon name="close-circle" size={16} color="#999" />
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('ProductForm')}
        >
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.categoryFilterContainer}>
        <View style={styles.categoryFilterWrapper}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  filterCategories.includes(item) ? styles.activeCategoryButton : null,
                ]}
                onPress={() => handleCategoryFilter(item)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    filterCategories.includes(item) ? styles.activeCategoryText : null,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
          {filterCategories.length > 0 && (
            <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
              <Text style={styles.clearFiltersText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#584e51" />
        </View>
      ) : (
        <FlatList
          data={Array.isArray(filteredProducts) ? filteredProducts : []}
          keyExtractor={(item) => (item && item._id) ? item._id.toString() : `temp-${Math.random().toString(36).substring(7)}`}
          renderItem={renderProductItem}
          contentContainerStyle={styles.productList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="cube-outline" size={60} color="#ccc" />
              <Text style={styles.emptyText}>No products found</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  headerActions: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 15,
  },
  clearSearch: {
    padding: 5,
  },
  addButton: {
    backgroundColor: '#584e51',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryFilterContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  activeCategoryButton: {
    backgroundColor: '#584e51',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#555',
  },
  activeCategoryText: {
    color: '#fff',
  },
  categoryFilterContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryFilterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  activeCategoryButton: {
    backgroundColor: '#584e51',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#555',
  },
  activeCategoryText: {
    color: '#fff',
  },
  clearFiltersButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#584e51',
    borderRadius: 20,
    marginLeft: 10,
  },
  clearFiltersText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productList: {
    padding: 15,
  },
  productCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  productImageContainer: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },

  productContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 5,
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 13,
    color: '#777',
  },
  productPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#584e51',
  },
  stockContainer: {
    marginTop: 3,
  },
  stockText: {
    fontSize: 12,
  },
  outOfStock: {
    color: '#d9534f',
  },
  lowStock: {
    color: '#f0ad4e',
  },
  inStock: {
    color: '#5cb85c',
  },
  productActions: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#eee',
  },
  actionButton: {
    padding: 6,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
    marginBottom: 15,
  },
});

export default ProductManagement;