
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../../Redux/Actions/productAction';
import { getToken } from '../../utils/sqliteToken'; 

const ProductForm = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products || {});

  const editMode = route.params?.product !== undefined;
  const initialProduct = editMode ? route.params.product : null;

  const [imageLoading, setImageLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [imagesToKeep, setImagesToKeep] = useState(
    editMode && initialProduct?.images ? 
      initialProduct.images.filter(img => img?.public_id).map(img => img.public_id) : []
  );
  const [newImages, setNewImages] = useState([]);

  const [formData, setFormData] = useState({
    ...(editMode && initialProduct?._id ? { _id: initialProduct._id } : {}),
    name: editMode && initialProduct?.name ? initialProduct.name : '',
    description: editMode && initialProduct?.description ? initialProduct.description : '',
    category: editMode && initialProduct?.category ? initialProduct.category : 'Bracelet',
    sell_price: editMode && initialProduct?.sell_price !== undefined ? String(initialProduct.sell_price) : '',
    cost_price: editMode && initialProduct?.cost_price !== undefined ? String(initialProduct.cost_price) : '',
    stock_quantity: editMode && initialProduct?.stock_quantity !== undefined ? String(initialProduct.stock_quantity) : '0',
    images: editMode && initialProduct?.images ? initialProduct.images.filter(img => img && img.url) : [],
  });

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  const categories = ['Bracelet', 'Necklace', 'Keychain'];

  const handleChange = (field, value) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  };

  const pickImage = async (source) => {
    try {
      setImageLoading(true);

      let result;
      if (source === 'camera') {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (!cameraPermission.granted) {
          Alert.alert('Permission Denied', 'You need to grant camera permissions to take a photo.');
          setImageLoading(false);
          return;
        }

        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });
      } else {
        const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!galleryPermission.granted) {
          Alert.alert('Permission Denied', 'You need to grant gallery permissions to select an image.');
          setImageLoading(false);
          return;
        }

        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });
      }

      if (!result.canceled && result.assets && result.assets[0]?.uri) {
        const uniqueId = `new_image_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        
        const newImage = {
          public_id: uniqueId,
          url: result.assets[0].uri,
          isNew: true,
        };

        setFormData(prevData => ({
          ...prevData,
          images: [...prevData.images, newImage],
        }));
        
        setNewImages(prev => [...prev, newImage]);
      }
    } catch (error) {
      console.log('Error picking image: ', error);
      Alert.alert('Error', 'Failed to pick image');
    } finally {
      setImageLoading(false);
    }
  };

  const removeImage = (public_id) => {
    if (!public_id) return;
    
    setFormData(prevData => ({
      ...prevData,
      images: prevData.images.filter((image) => image && image.public_id !== public_id),
    }));

    if (editMode && imagesToKeep.includes(public_id)) {
      setImagesToKeep(prev => prev.filter(id => id !== public_id));
    }

    setNewImages(prev => prev.filter(img => img.public_id !== public_id));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Validation Error', 'Product name is required');
      return false;
    }

    if (!formData.sell_price || isNaN(parseFloat(formData.sell_price))) {
      Alert.alert('Validation Error', 'Please enter a valid selling price');
      return false;
    }

    if (!formData.cost_price || isNaN(parseFloat(formData.cost_price))) {
      Alert.alert('Validation Error', 'Please enter a valid cost price');
      return false;
    }

    if (!formData.stock_quantity || isNaN(parseInt(formData.stock_quantity))) {
      Alert.alert('Validation Error', 'Please enter a valid stock quantity');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const tokenData = await getToken();
      
      if (!tokenData || !tokenData.token) {
        Alert.alert('Authentication Error', 'Please login again to continue.');
        return;
      }

      const productData = new FormData();
      
      if (editMode && formData._id) {
        productData.append('_id', formData._id);
      }
      
      productData.append('name', formData.name);
      productData.append('description', formData.description);
      productData.append('category', formData.category);
      productData.append('sell_price', formData.sell_price);
      productData.append('cost_price', formData.cost_price);
      productData.append('stock_quantity', formData.stock_quantity);

      if (editMode && imagesToKeep.length > 0) {
        productData.append('imagesToKeep', JSON.stringify(imagesToKeep));
      }

      newImages.forEach((image, index) => {
        if (image && image.url) {
          productData.append('images', {
            uri: image.url,
            type: 'image/jpeg',
            name: `image_${index}.jpg`,
          });
        }
      });

      if (editMode) {
        await dispatch(updateProduct(formData._id, productData, tokenData.token));
      } else {
        await dispatch(addProduct(productData, tokenData.token));
      }

      Alert.alert('Success', `Product ${editMode ? 'updated' : 'created'} successfully`, [
        { text: 'OK', onPress: () => navigation.navigate('AdminDashboard', { refresh: true }) },
      ]);
    } catch (error) {
      console.log('Error submitting form:', error);
      setSubmitError(error.message || 'An unexpected error occurred');
      Alert.alert('Error', error.message || 'Failed to save product. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.formContainer}>
          <View style={styles.imageSection}>
            <Text style={styles.sectionTitle}>Product Images</Text>
            <View style={styles.imageContainer}>
              {formData.images && formData.images.length > 0 ? (
                formData.images.map((image, index) => (
                  image && image.public_id ? (
                    <View key={image.public_id} style={styles.imageWrapper}>
                      <Image 
                        source={{ uri: image.url }} 
                        style={styles.productImage}
                      />
                      <TouchableOpacity
                        style={styles.removeImageButton}
                        onPress={() => removeImage(image.public_id)}
                      >
                        <Icon name="close-circle" size={22} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  ) : null
                ))
              ) : (
                <Text style={styles.noImagesText}>No images added yet</Text>
              )}
            </View>
            <View style={styles.addImageOptions}>
              <TouchableOpacity
                style={[styles.addImageButton, styles.cameraButton]}
                onPress={() => pickImage('camera')}
                disabled={imageLoading}
              >
                {imageLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <Icon name="camera" size={22} color="#fff" />
                    <Text style={styles.addImageText}>Take Photo</Text>
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.addImageButton, styles.galleryButton]}
                onPress={() => pickImage('gallery')}
                disabled={imageLoading}
              >
                {imageLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <Icon name="image" size={22} color="#fff" />
                    <Text style={styles.addImageText}>Select from Gallery</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Basic Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            <View style={styles.formField}>
              <Text style={styles.label}>Product Name</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => handleChange('name', text)}
                placeholder="Enter product name"
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) => handleChange('description', text)}
                placeholder="Product description"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
            <View style={styles.formRow}>
              <View style={styles.formHalfField}>
                <Text style={styles.label}>Selling Price (₱)</Text>
                <TextInput
                  style={styles.input}
                  value={formData.sell_price}
                  onChangeText={(text) => handleChange('sell_price', text)}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.formHalfField}>
                <Text style={styles.label}>Cost Price (₱)</Text>
                <TextInput
                  style={styles.input}
                  value={formData.cost_price}
                  onChangeText={(text) => handleChange('cost_price', text)}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Stock Quantity</Text>
              <TextInput
                style={styles.input}
                value={formData.stock_quantity}
                onChangeText={(text) => handleChange('stock_quantity', text)}
                placeholder="0"
                keyboardType="number-pad"
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.categoriesContainer}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryOption,
                      formData.category === category && styles.selectedCategory,
                    ]}
                    onPress={() => handleChange('category', category)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        formData.category === category && styles.selectedCategoryText,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>
                {editMode ? 'Update Product' : 'Create Product'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  formContainer: {
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  formField: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  formHalfField: {
    width: '48%',
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  imageSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 50,
    padding: 4,
  },
  addImageOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  addImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#584e51',
    marginHorizontal: 8,
  },
  cameraButton: {
    backgroundColor: '#584e51',
  },
  galleryButton: {
    backgroundColor: '#584e51',
  },
  addImageText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedCategory: {
    backgroundColor: '#584e51',
    borderColor: '#584e51',
  },
  categoryText: {
    color: '#555',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#584e51',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 30,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  noImagesText: {
    color: '#999',
    fontStyle: 'italic',
    marginVertical: 20,
  },
});

export default ProductForm;