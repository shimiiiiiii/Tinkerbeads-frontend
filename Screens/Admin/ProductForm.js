// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   ScrollView,
// //   TextInput,
// //   TouchableOpacity,
// //   Image,
// //   Switch,
// //   Alert,
// //   ActivityIndicator,
// //   KeyboardAvoidingView,
// //   Platform
// // } from 'react-native';
// // import Icon from 'react-native-vector-icons/Ionicons';
// // import * as ImagePicker from 'expo-image-picker';
// // import baseURL from '../../assets/common/baseUrl';
// // import axios from 'axios';

// // const ProductForm = ({ navigation, route }) => {
// //   const editMode = route.params?.product !== undefined;
// //   const initialProduct = editMode ? route.params.product : null;

// //   const [loading, setLoading] = useState(false);
// //   const [submitLoading, setSubmitLoading] = useState(false);
// //   const [imageLoading, setImageLoading] = useState(false);
// //   const [imagesToKeep, setImagesToKeep] = useState(editMode ? initialProduct?.images.map(img => img.public_id) : []);
// //   const [newImages, setNewImages] = useState([]);

// //   // Form state
// //   const [formData, setFormData] = useState({
// //     ...(editMode ? { _id: initialProduct?._id } : {}),
// //     name: editMode ? initialProduct?.name : '',
// //     description: editMode ? initialProduct?.description || '' : '',
// //     category: editMode ? initialProduct?.category : 'Bracelet',
// //     sell_price: editMode ? String(initialProduct?.sell_price) : '',
// //     cost_price: editMode ? String(initialProduct?.cost_price) : '',
// //     stock_quantity: editMode ? String(initialProduct?.stock_quantity) : '0',
// //     images: editMode ? initialProduct?.images || [] : [],
// //   });

// //   // Categories
// //   const categories = ['Bracelet', 'Necklace', 'Keychain'];

// //   // Handle text input changes
// //   const handleChange = (field, value) => {
// //     setFormData({ ...formData, [field]: value });
// //   };

// //   // Handle image picker
// //   const pickImage = async (source) => {
// //     try {
// //       setImageLoading(true);
  
// //       let result;
// //       if (source === 'camera') {
// //         const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
// //         if (!cameraPermission.granted) {
// //           Alert.alert('Permission Denied', 'You need to grant camera permissions to take a photo.');
// //           setImageLoading(false);
// //           return;
// //         }
  
// //         result = await ImagePicker.launchCameraAsync({
// //           allowsEditing: true,
// //           aspect: [4, 3],
// //           quality: 0.8,
// //         });
// //       } else {
// //         const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
// //         if (!galleryPermission.granted) {
// //           Alert.alert('Permission Denied', 'You need to grant gallery permissions to select an image.');
// //           setImageLoading(false);
// //           return;
// //         }
  
// //         result = await ImagePicker.launchImageLibraryAsync({
// //           mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //           allowsEditing: true,
// //           aspect: [4, 3],
// //           quality: 0.8,
// //         });
// //       }
  
// //       if (!result.canceled && result.assets && result.assets[0]?.uri) {
// //         const newImage = {
// //           public_id: `new_image_${Date.now()}`,
// //           url: result.assets[0].uri,
// //           isNew: true, // Mark as new image
// //         };
  
// //         setFormData({
// //           ...formData,
// //           images: [...formData.images, newImage],
// //         });
// //         setNewImages([...newImages, newImage]);
// //       }
// //     } catch (error) {
// //       console.log('Error picking image: ', error);
// //       Alert.alert('Error', 'Failed to pick image');
// //     } finally {
// //       setImageLoading(false);
// //     }
// //   };
  
// //   // Remove image
// //   const removeImage = (public_id) => {
// //     // Remove from form data images
// //     setFormData({
// //       ...formData,
// //       images: formData.images.filter((image) => image.public_id !== public_id),
// //     });
    
// //     // If it's an existing image in edit mode, also remove from images to keep
// //     if (editMode && imagesToKeep.includes(public_id)) {
// //       setImagesToKeep(imagesToKeep.filter(id => id !== public_id));
// //     }
    
// //     // If it's a new image, remove from new images tracking
// //     setNewImages(newImages.filter(img => img.public_id !== public_id));
// //   };

// //   // Validate form before submission
// //   const validateForm = () => {
// //     // Existing validation logic
// //     // ...

// //     return true;
// //   };

// //   // Submit form
// //   const handleSubmit = async () => {
// //     if (!validateForm()) {
// //       return;
// //     }
  
// //     setSubmitLoading(true);
  
// //     try {
// //       const formDataToSend = new FormData();
  
// //       // Add text fields to FormData
// //       if (editMode && formData._id) {
// //         formDataToSend.append('_id', formData._id); 
// //       }
// //       formDataToSend.append('name', formData.name);
// //       formDataToSend.append('description', formData.description);
// //       formDataToSend.append('category', formData.category);
// //       formDataToSend.append('sell_price', formData.sell_price);
// //       formDataToSend.append('cost_price', formData.cost_price);
// //       formDataToSend.append('stock_quantity', formData.stock_quantity);
  
// //       // If editing and we have existing images to keep
// //       if (editMode) {
// //         formDataToSend.append('imagesToKeep', JSON.stringify(imagesToKeep));
// //       }
  
// //       // Add only new images to FormData
// //       const imagesToUpload = formData.images.filter(img => img.isNew);
// //       imagesToUpload.forEach((image, index) => {
// //         formDataToSend.append('images', {
// //           uri: image.url,
// //           type: 'image/jpeg',
// //           name: `image_${index}.jpg`,
// //         });
// //       });
  
// //       const url = editMode
// //         ? `${baseURL}/product/update/${formData._id}`
// //         : `${baseURL}/product/create`;
  
// //       const response = await axios[editMode ? 'put' : 'post'](url, formDataToSend, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       });
  
// //       if (response.status === 200 || response.status === 201) {
// //         setSubmitLoading(false);
// //         Alert.alert(
// //           'Success',
// //           `Product ${editMode ? 'updated' : 'created'} successfully`,
// //           [
// //             {
// //               text: 'OK',
// //               onPress: () => navigation.navigate('AdminDashboard', { refresh: true }),
// //             },
// //           ]
// //         );
// //       } else {
// //         throw new Error(response.data.message || 'Unexpected error occurred');
// //       }
// //     } catch (error) {
// //       console.log('Error submitting form: ', error.response?.data || error.message);
// //       setSubmitLoading(false);
  
// //       Alert.alert(
// //         'Error',
// //         error.response?.data?.message || 'Failed to save product. Please check your input and try again.'
// //       );
// //     }
// //   };

// //   return (
// //     <KeyboardAvoidingView
// //       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// //       style={{ flex: 1 }}
// //     >
// //       <ScrollView style={styles.container}>
// //         <View style={styles.formContainer}>
// //           {/* Product Images */}
// //           <View style={styles.imageSection}>
// //             <Text style={styles.sectionTitle}>Product Images</Text>
// //             <View style={styles.imageContainer}>
// //                 {formData.images.map((image) => (
// //                 <View key={image.public_id} style={styles.imageWrapper}>
// //                     <Image source={{ uri: image.url }} style={styles.productImage} />
// //                     <TouchableOpacity
// //                     style={styles.removeImageButton}
// //                     onPress={() => removeImage(image.public_id)}
// //                     >
// //                     <Icon name="close-circle" size={22} color="#fff" />
// //                     </TouchableOpacity>
// //                 </View>
// //                 ))}
// //             </View>
// //             <View style={styles.addImageOptions}>
// //             <TouchableOpacity
// //                 style={[styles.addImageButton, styles.cameraButton]}
// //                 onPress={() => pickImage('camera')}
// //             >
// //                 <Icon name="camera" size={22} color="#fff" />
// //                 <Text style={styles.addImageText}>Take Photo</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity
// //                 style={[styles.addImageButton, styles.galleryButton]}
// //                 onPress={() => pickImage('gallery')}
// //             >
// //                 <Icon name="image" size={22} color="#fff" />
// //                 <Text style={styles.addImageText}>Select from Gallery</Text>
// //             </TouchableOpacity>
// //             </View>
// //         </View>

// //           {/* Basic Information */}
// //           <View style={styles.section}>
// //             <Text style={styles.sectionTitle}>Basic Information</Text>
// //             <View style={styles.formField}>
// //               <Text style={styles.label}>Product Name</Text>
// //               <TextInput
// //                 style={styles.input}
// //                 value={formData.name}
// //                 onChangeText={(text) => handleChange('name', text)}
// //                 placeholder="Enter product name"
// //               />
// //             </View>
// //             <View style={styles.formField}>
// //               <Text style={styles.label}>Description</Text>
// //               <TextInput
// //                 style={[styles.input, styles.textArea]}
// //                 value={formData.description}
// //                 onChangeText={(text) => handleChange('description', text)}
// //                 placeholder="Product description"
// //                 multiline
// //                 numberOfLines={4}
// //                 textAlignVertical="top"
// //               />
// //             </View>
// //             <View style={styles.formRow}>
// //               <View style={styles.formHalfField}>
// //                 <Text style={styles.label}>Selling Price (₱)</Text>
// //                 <TextInput
// //                   style={styles.input}
// //                   value={formData.sell_price}
// //                   onChangeText={(text) => handleChange('sell_price', text)}
// //                   placeholder="0.00"
// //                   keyboardType="decimal-pad"
// //                 />
// //               </View>
// //               <View style={styles.formHalfField}>
// //                 <Text style={styles.label}>Cost Price (₱)</Text>
// //                 <TextInput
// //                   style={styles.input}
// //                   value={formData.cost_price}
// //                   onChangeText={(text) => handleChange('cost_price', text)}
// //                   placeholder="0.00"
// //                   keyboardType="decimal-pad"
// //                 />
// //               </View>
// //             </View>
// //             <View style={styles.formField}>
// //               <Text style={styles.label}>Stock Quantity</Text>
// //               <TextInput
// //                 style={styles.input}
// //                 value={formData.stock_quantity}
// //                 onChangeText={(text) => handleChange('stock_quantity', text)}
// //                 placeholder="0"
// //                 keyboardType="number-pad"
// //               />
// //             </View>
// //             <View style={styles.formField}>
// //               <Text style={styles.label}>Category</Text>
// //               <View style={styles.categoriesContainer}>
// //                 {categories.map((category) => (
// //                   <TouchableOpacity
// //                     key={category}
// //                     style={[
// //                       styles.categoryOption,
// //                       formData.category === category && styles.selectedCategory,
// //                     ]}
// //                     onPress={() => handleChange('category', category)}
// //                   >
// //                     <Text
// //                       style={[
// //                         styles.categoryText,
// //                         formData.category === category && styles.selectedCategoryText,
// //                       ]}
// //                     >
// //                       {category}
// //                     </Text>
// //                   </TouchableOpacity>
// //                 ))}
// //               </View>
// //             </View>
// //           </View>

// //           {/* Submit Button */}
// //           <TouchableOpacity
// //             style={styles.submitButton}
// //             onPress={handleSubmit}
// //             disabled={submitLoading}
// //           >
// //             {submitLoading ? (
// //               <ActivityIndicator size="small" color="#fff" />
// //             ) : (
// //               <Text style={styles.submitButtonText}>
// //                 {editMode ? 'Update Product' : 'Create Product'}
// //               </Text>
// //             )}
// //           </TouchableOpacity>
// //         </View>
// //       </ScrollView>
// //     </KeyboardAvoidingView>
// //   );
// // };


// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#f8f8f8',
// //   },
// //   formContainer: {
// //     padding: 16,
// //   },
// //   section: {
// //     backgroundColor: '#fff',
// //     borderRadius: 10,
// //     padding: 16,
// //     marginBottom: 16,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 1 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 2,
// //     elevation: 2,
// //   },
// //   sectionTitle: {
// //     fontSize: 18,
// //     fontWeight: '600',
// //     marginBottom: 16,
// //     color: '#333',
// //   },
// //   formField: {
// //     marginBottom: 16,
// //   },
// //   formRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginBottom: 16,
// //   },
// //   formHalfField: {
// //     width: '48%',
// //   },
// //   label: {
// //     fontSize: 14,
// //     marginBottom: 8,
// //     color: '#555',
// //   },
// //   input: {
// //     backgroundColor: '#f9f9f9',
// //     borderWidth: 1,
// //     borderColor: '#ddd',
// //     borderRadius: 8,
// //     padding: 12,
// //     fontSize: 16,
// //   },
// //   textArea: {
// //     height: 100,
// //     paddingTop: 12,
// //   },
// //   imageSection: {
// //     backgroundColor: '#fff',
// //     borderRadius: 10,
// //     padding: 16,
// //     marginBottom: 16,
// //     alignItems: 'center',
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 1 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 2,
// //     elevation: 2,
// //   },
// //   imageContainer: {
// //     width: '100%',
// //     alignItems: 'center',
// //   },
// //   productImage: {
// //     width: 200,
// //     height: 200,
// //     borderRadius: 8,
// //     marginBottom: 16,
// //   },
// //   imagePlaceholder: {
// //     width: 200,
// //     height: 200,
// //     borderRadius: 8,
// //     backgroundColor: '#f0f0f0',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginBottom: 16,
// //   },
// //   changeImageButton: {
// //     flexDirection: 'row',
// //     backgroundColor: '#584e51',
// //     paddingVertical: 10,
// //     paddingHorizontal: 16,
// //     borderRadius: 6,
// //     alignItems: 'center',
// //   },
// //   changeImageText: {
// //     color: '#fff',
// //     marginLeft: 8,
// //     fontWeight: '500',
// //   },
// //   categoriesContainer: {
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //   },
// //   categoryOption: {
// //     paddingHorizontal: 16,
// //     paddingVertical: 8,
// //     borderWidth: 1,
// //     borderColor: '#ddd',
// //     borderRadius: 20,
// //     marginRight: 8,
// //     marginBottom: 8,
// //   },
// //   selectedCategory: {
// //     backgroundColor: '#584e51',
// //     borderColor: '#584e51',
// //   },
// //   categoryText: {
// //     color: '#555',
// //   },
// //   selectedCategoryText: {
// //     color: '#fff',
// //   },
// //   inputWithButton: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 8,
// //   },
// //   tagInput: {
// //     backgroundColor: '#f9f9f9',
// //     borderWidth: 1,
// //     borderColor: '#ddd',
// //     borderRadius: 8,
// //     padding: 12,
// //     fontSize: 16,
// //     flex: 1,
// //     marginRight: 8,
// //   },
// //   addButton: {
// //     backgroundColor: '#584e51',
// //     width: 44,
// //     height: 44,
// //     borderRadius: 8,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   tagsContainer: {
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //   },
// //   tag: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: '#f0f0f0',
// //     paddingVertical: 6,
// //     paddingHorizontal: 12,
// //     borderRadius: 16,
// //     marginRight: 8,
// //     marginBottom: 8,
// //   },
// //   tagText: {
// //     color: '#333',
// //     marginRight: 4,
// //   },
// //   switchContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //   },
// //   switchLabel: {
// //     fontSize: 16,
// //     color: '#333',
// //   },
// //   submitButton: {
// //     backgroundColor: '#584e51',
// //     paddingVertical: 16,
// //     borderRadius: 8,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     marginTop: 8,
// //     marginBottom: 30,
// //   },
// //   submitButtonText: {
// //     color: '#fff',
// //     fontWeight: '600',
// //     fontSize: 16,
// //   },
// //   addImageOptions: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginTop: 16,
// //   },
// //   addImageButton: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     paddingVertical: 10,
// //     paddingHorizontal: 16,
// //     borderRadius: 8,
// //     backgroundColor: '#584e51',
// //     marginHorizontal: 8,
// //   },
// //   cameraButton: {
// //     backgroundColor: '#584e51',
// //   },
// //   galleryButton: {
// //     backgroundColor: '#584e51',
// //   },
// //   addImageText: {
// //     color: '#fff',
// //     marginLeft: 8,
// //     fontWeight: '500',
// //   },
// // });

// // export default ProductForm;

// //GOOD BUT NOT GOOD ENOUGH
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Alert,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import * as ImagePicker from 'expo-image-picker';
// import { useDispatch, useSelector } from 'react-redux';
// import { addProduct, updateProduct } from '../../Redux/Actions/productAction';
// import { getToken } from '../../utils/sqliteToken'; 

// const ProductForm = ({ navigation, route }) => {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.products);

//   const editMode = route.params?.product !== undefined;
//   const initialProduct = editMode ? route.params.product : null;

//   const [imageLoading, setImageLoading] = useState(false);
//   const [imagesToKeep, setImagesToKeep] = useState(editMode ? initialProduct?.images.map(img => img.public_id) : []);
//   const [newImages, setNewImages] = useState([]);

//   // Form state
//   const [formData, setFormData] = useState({
//     ...(editMode ? { _id: initialProduct?._id } : {}),
//     name: editMode ? initialProduct?.name : '',
//     description: editMode ? initialProduct?.description || '' : '',
//     category: editMode ? initialProduct?.category : 'Bracelet',
//     sell_price: editMode ? String(initialProduct?.sell_price) : '',
//     cost_price: editMode ? String(initialProduct?.cost_price) : '',
//     stock_quantity: editMode ? String(initialProduct?.stock_quantity) : '0',
//     images: editMode ? initialProduct?.images || [] : [],
//   });

//   // Categories
//   const categories = ['Bracelet', 'Necklace', 'Keychain'];

//   // Handle text input changes
//   const handleChange = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   // Handle image picker
//   const pickImage = async (source) => {
//     try {
//       setImageLoading(true);

//       let result;
//       if (source === 'camera') {
//         const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
//         if (!cameraPermission.granted) {
//           Alert.alert('Permission Denied', 'You need to grant camera permissions to take a photo.');
//           setImageLoading(false);
//           return;
//         }

//         result = await ImagePicker.launchCameraAsync({
//           allowsEditing: true,
//           aspect: [4, 3],
//           quality: 0.8,
//         });
//       } else {
//         const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (!galleryPermission.granted) {
//           Alert.alert('Permission Denied', 'You need to grant gallery permissions to select an image.');
//           setImageLoading(false);
//           return;
//         }

//         result = await ImagePicker.launchImageLibraryAsync({
//           mediaTypes: ImagePicker.MediaTypeOptions.Images,
//           allowsEditing: true,
//           aspect: [4, 3],
//           quality: 0.8,
//         });
//       }

//       if (!result.canceled && result.assets && result.assets[0]?.uri) {
//         const newImage = {
//           public_id: `new_image_${Date.now()}`,
//           url: result.assets[0].uri,
//           isNew: true, // Mark as new image
//         };

//         setFormData({
//           ...formData,
//           images: [...formData.images, newImage],
//         });
//         setNewImages([...newImages, newImage]);
//       }
//     } catch (error) {
//       console.log('Error picking image: ', error);
//       Alert.alert('Error', 'Failed to pick image');
//     } finally {
//       setImageLoading(false);
//     }
//   };

//   // Remove image
//   const removeImage = (public_id) => {
//     setFormData({
//       ...formData,
//       images: formData.images.filter((image) => image.public_id !== public_id),
//     });

//     if (editMode && imagesToKeep.includes(public_id)) {
//       setImagesToKeep(imagesToKeep.filter(id => id !== public_id));
//     }

//     setNewImages(newImages.filter(img => img.public_id !== public_id));
//   };

//   // Validate form before submission
//   const validateForm = () => {
//     if (!formData.name || !formData.sell_price || !formData.cost_price || !formData.stock_quantity) {
//       Alert.alert('Validation Error', 'Please fill in all required fields.');
//       return false;
//     }
//     return true;
//   };

//   // Submit form
//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       return;
//     }

//     try {
//       // Get the token from SQLite storage
//       const tokenData = await getToken();
      
//       if (!tokenData || !tokenData.token) {
//         Alert.alert('Authentication Error', 'Please login again to continue.');
//         return;
//       }

//       const productData = {
//         ...formData,
//         imagesToKeep: editMode ? imagesToKeep : undefined,
//         images: newImages.map((img) => ({
//           uri: img.url,
//           type: 'image/jpeg',
//           name: `image_${Date.now()}.jpg`,
//         })),
//       };

//       if (editMode) {
//         await dispatch(updateProduct(formData._id, productData, tokenData.token));
//         Alert.alert('Success', 'Product updated successfully', [
//           { text: 'OK', onPress: () => navigation.navigate('AdminDashboard', { refresh: true }) },
//         ]);
//       } else {
//         await dispatch(addProduct(productData, tokenData.token));
//         Alert.alert('Success', 'Product created successfully', [
//           { text: 'OK', onPress: () => navigation.navigate('AdminDashboard', { refresh: true }) },
//         ]);
//       }
//     } catch (error) {
//       Alert.alert('Error', error.message || 'Failed to save product.');
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <ScrollView>
//         <View style={styles.formContainer}>
//           {/* Product Images */}
//           <View style={styles.imageSection}>
//             <Text style={styles.sectionTitle}>Product Images</Text>
//             <View style={styles.imageContainer}>
//               {formData.images.map((image) => (
//                 <View key={image.public_id} style={styles.imageWrapper}>
//                   <Image source={{ uri: image.url }} style={styles.productImage} />
//                   <TouchableOpacity
//                     style={styles.removeImageButton}
//                     onPress={() => removeImage(image.public_id)}
//                   >
//                     <Icon name="close-circle" size={22} color="#fff" />
//                   </TouchableOpacity>
//                 </View>
//               ))}
//             </View>
//             <View style={styles.addImageOptions}>
//               <TouchableOpacity
//                 style={[styles.addImageButton, styles.cameraButton]}
//                 onPress={() => pickImage('camera')}
//               >
//                 <Icon name="camera" size={22} color="#fff" />
//                 <Text style={styles.addImageText}>Take Photo</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.addImageButton, styles.galleryButton]}
//                 onPress={() => pickImage('gallery')}
//               >
//                 <Icon name="image" size={22} color="#fff" />
//                 <Text style={styles.addImageText}>Select from Gallery</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Basic Information */}
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Basic Information</Text>
//             <View style={styles.formField}>
//               <Text style={styles.label}>Product Name</Text>
//               <TextInput
//                 style={styles.input}
//                 value={formData.name}
//                 onChangeText={(text) => handleChange('name', text)}
//                 placeholder="Enter product name"
//               />
//             </View>
//             <View style={styles.formField}>
//               <Text style={styles.label}>Description</Text>
//               <TextInput
//                 style={[styles.input, styles.textArea]}
//                 value={formData.description}
//                 onChangeText={(text) => handleChange('description', text)}
//                 placeholder="Product description"
//                 multiline
//                 numberOfLines={4}
//                 textAlignVertical="top"
//               />
//             </View>
//             <View style={styles.formRow}>
//               <View style={styles.formHalfField}>
//                 <Text style={styles.label}>Selling Price (₱)</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.sell_price}
//                   onChangeText={(text) => handleChange('sell_price', text)}
//                   placeholder="0.00"
//                   keyboardType="decimal-pad"
//                 />
//               </View>
//               <View style={styles.formHalfField}>
//                 <Text style={styles.label}>Cost Price (₱)</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.cost_price}
//                   onChangeText={(text) => handleChange('cost_price', text)}
//                   placeholder="0.00"
//                   keyboardType="decimal-pad"
//                 />
//               </View>
//             </View>
//             <View style={styles.formField}>
//               <Text style={styles.label}>Stock Quantity</Text>
//               <TextInput
//                 style={styles.input}
//                 value={formData.stock_quantity}
//                 onChangeText={(text) => handleChange('stock_quantity', text)}
//                 placeholder="0"
//                 keyboardType="number-pad"
//               />
//             </View>
//             <View style={styles.formField}>
//               <Text style={styles.label}>Category</Text>
//               <View style={styles.categoriesContainer}>
//                 {categories.map((category) => (
//                   <TouchableOpacity
//                     key={category}
//                     style={[
//                       styles.categoryOption,
//                       formData.category === category && styles.selectedCategory,
//                     ]}
//                     onPress={() => handleChange('category', category)}
//                   >
//                     <Text
//                       style={[
//                         styles.categoryText,
//                         formData.category === category && styles.selectedCategoryText,
//                       ]}
//                     >
//                       {category}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </View>
//           </View>

//           {/* Submit Button */}
//           <TouchableOpacity
//             style={styles.submitButton}
//             onPress={handleSubmit}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator size="small" color="#fff" />
//             ) : (
//               <Text style={styles.submitButtonText}>
//                 {editMode ? 'Update Product' : 'Create Product'}
//               </Text>
//             )}
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   formContainer: {
//     padding: 16,
//   },
//   section: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 16,
//     color: '#333',
//   },
//   formField: {
//     marginBottom: 16,
//   },
//   formRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   formHalfField: {
//     width: '48%',
//   },
//   label: {
//     fontSize: 14,
//     marginBottom: 8,
//     color: '#555',
//   },
//   input: {
//     backgroundColor: '#f9f9f9',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//   },
//   textArea: {
//     height: 100,
//     paddingTop: 12,
//   },
//   imageSection: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 16,
//     marginBottom: 16,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   imageContainer: {
//     width: '100%',
//     alignItems: 'center',
//   },
//   imageWrapper: {
//     position: 'relative',
//     marginBottom: 16,
//   },
//   productImage: {
//     width: 200,
//     height: 200,
//     borderRadius: 8,
//   },
//   removeImageButton: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     borderRadius: 50,
//     padding: 4,
//   },
//   addImageOptions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 16,
//   },
//   addImageButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     backgroundColor: '#584e51',
//     marginHorizontal: 8,
//   },
//   cameraButton: {
//     backgroundColor: '#584e51',
//   },
//   galleryButton: {
//     backgroundColor: '#584e51',
//   },
//   addImageText: {
//     color: '#fff',
//     marginLeft: 8,
//     fontWeight: '500',
//   },
//   categoriesContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   categoryOption: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 20,
//     marginRight: 8,
//     marginBottom: 8,
//   },
//   selectedCategory: {
//     backgroundColor: '#584e51',
//     borderColor: '#584e51',
//   },
//   categoryText: {
//     color: '#555',
//   },
//   selectedCategoryText: {
//     color: '#fff',
//   },
//   submitButton: {
//     backgroundColor: '#584e51',
//     paddingVertical: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 8,
//     marginBottom: 30,
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });

// export default ProductForm;

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

  // Form state
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

  // Display Redux errors if any
  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  // Categories
  const categories = ['Bracelet', 'Necklace', 'Keychain'];

  // Handle text input changes
  const handleChange = (field, value) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  };

  // Handle image picker
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

  // Remove image
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

  // Validate form before submission
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

  // Submit form
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Get the token from SQLite storage
      const tokenData = await getToken();
      
      if (!tokenData || !tokenData.token) {
        Alert.alert('Authentication Error', 'Please login again to continue.');
        return;
      }

      const productData = new FormData();
      
      // Add text fields
      if (editMode && formData._id) {
        productData.append('_id', formData._id);
      }
      
      productData.append('name', formData.name);
      productData.append('description', formData.description);
      productData.append('category', formData.category);
      productData.append('sell_price', formData.sell_price);
      productData.append('cost_price', formData.cost_price);
      productData.append('stock_quantity', formData.stock_quantity);

      // If editing and we have existing images to keep
      if (editMode && imagesToKeep.length > 0) {
        productData.append('imagesToKeep', JSON.stringify(imagesToKeep));
      }

      // Add only new images to FormData
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
          {/* Product Images */}
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