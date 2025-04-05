import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    Image,
    ActivityIndicator,
    Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../Context/Auth';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

const EditProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        // phone: '',
        // address: '',
    });

    const { token } = useAuth();

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseURL}/user/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = response.data.user;
            if (data) {
                setUserData({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    // phone: data.phone || '',
                    // address: data.address || '',
                });
                setImage(data.images?.[0]?.url || null);
            } else {
                Alert.alert('Error', 'Failed to load profile.');
            }
        } catch (err) {
            console.error('Error fetching user profile:', err);
            Alert.alert('Error', 'Failed to fetch user profile.');
        } finally {
            setLoading(false);
        }
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (field, value) => {
        setUserData({
            ...userData,
            [field]: value,
        });
    };

    const saveProfile = async () => {
      try {
          setLoading(true);
  
          const formData = new FormData();
          formData.append('first_name', userData.firstName);
          formData.append('last_name', userData.lastName);
          formData.append('email', userData.email);
  
          // Handle image upload
          if (image && image.startsWith('file://')) {
              const fileName = image.split('/').pop();
              const fileType = fileName.split('.').pop();
  
              formData.append('images', {
                  uri: image,
                  name: fileName,
                  type: `image/${fileType}`,
              });
          }
  
          // Log FormData for debugging
          console.log('FormData before sending:', formData._parts);
  
          const response = await axios.put(`${baseURL}/user/profile/update`, formData, {
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Accept': 'application/json',
                  'Content-Type': 'multipart/form-data',
              },
          });
  
          // Update user data with the response
          setUserData({
              ...userData,
              firstName: response.data.user.first_name,
              lastName: response.data.user.last_name,
              email: response.data.user.email,
          });
  
          setImage(response.data.user.images?.[0]?.url || null); // Update image URL
          Alert.alert('Success', 'Profile updated successfully.');
      } catch (err) {
          console.error('Profile update error:', err.response?.data || err.message);
          Alert.alert('Error', err.response?.data?.message || 'Failed to update profile.');
      } finally {
          setLoading(false);
          setIsEditing(false);
      }
  };

  const pickImage = async () => {
    if (!isEditing) return;

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });

    if (!result.canceled) {
        setImage(result.assets[0].uri);
    }
};

const takePhoto = async () => {
    if (!isEditing) return;

    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === "granted") {
        let result = await ImagePicker.launchCameraAsync({
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }
};

if (loading && !isEditing) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#757575" />
                <Text style={styles.loadingText}>Loading profile...</Text>
            </View>
        </SafeAreaView>
    );
}
  
    return (
      <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="black" />
          <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardAvoidView}
          >
              <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
                  <View style={styles.header}>
                      <Text style={styles.headerTitle}>Profile</Text>
                      {!isEditing && (
                          <TouchableOpacity onPress={toggleEditing}>
                              <Feather name="edit-2" size={22} color="black" />
                          </TouchableOpacity>
                      )}
                  </View>

                  <View style={styles.avatarContainer}>
                      <View style={styles.avatarWrapper}>
                          <Image
                              source={{ uri: image || 'https://randomuser.me/api/portraits/lego/1.jpg' }}
                              style={styles.avatar}
                          />
                          {isEditing && (
                              <View style={styles.avatarButtons}>
                                  <TouchableOpacity style={styles.changePhotoButton} onPress={pickImage}>
                                      <Feather name="image" size={18} color="#fff" />
                                  </TouchableOpacity>
                                  <TouchableOpacity style={[styles.changePhotoButton, styles.cameraButton]} onPress={takePhoto}>
                                      <Feather name="camera" size={18} color="#fff" />
                                  </TouchableOpacity>
                              </View>
                          )}
                      </View>
                      {isEditing && <Text style={styles.changePhotoText}>Change photo</Text>}
                  </View>

                  <View style={styles.formSection}>
                      <View style={styles.inputGroup}>
                          <Text style={styles.label}>First Name</Text>
                          <View style={[styles.inputContainer, isEditing && styles.inputContainerActive]}>
                              <TextInput
                                  style={styles.input}
                                  value={userData.firstName}
                                  onChangeText={(text) => handleInputChange('firstName', text)}
                                  editable={isEditing}
                                  placeholderTextColor="#999"
                              />
                          </View>
                      </View>

                      <View style={styles.inputGroup}>
                          <Text style={styles.label}>Last Name</Text>
                          <View style={[styles.inputContainer, isEditing && styles.inputContainerActive]}>
                              <TextInput
                                  style={styles.input}
                                  value={userData.lastName}
                                  onChangeText={(text) => handleInputChange('lastName', text)}
                                  editable={isEditing}
                                  placeholderTextColor="#999"
                              />
                          </View>
                      </View>

                      <View style={styles.inputGroup}>
                          <Text style={styles.label}>Email</Text>
                          <View style={[styles.inputContainer, isEditing && styles.inputContainerActive]}>
                              <TextInput
                                  style={styles.input}
                                  value={userData.email}
                                  onChangeText={(text) => handleInputChange('email', text)}
                                  keyboardType="email-address"
                                  editable={isEditing}
                                  placeholderTextColor="#999"
                              />
                          </View>
                      </View>
                  </View>

                  {isEditing ? (
                      <View style={styles.buttonContainer}>
                          <TouchableOpacity style={styles.cancelButton} onPress={toggleEditing}>
                              <Text style={styles.cancelButtonText}>Cancel</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
                              <Text style={styles.saveButtonText}>Save Changes</Text>
                          </TouchableOpacity>
                      </View>
                  ) : (
                      <TouchableOpacity style={styles.editButton} onPress={toggleEditing}>
                          <Text style={styles.editButtonText}>Edit Profile</Text>
                      </TouchableOpacity>
                  )}
              </ScrollView>
          </KeyboardAvoidingView>
          
          {loading && (
              <View style={styles.loadingOverlay}>
                  <View style={styles.loadingContainer}>
                      <ActivityIndicator size="large" color="black" />
                      <Text style={styles.loadingText}>
                          {isEditing ? 'Updating profile...' : 'Loading profile...'}
                      </Text>
                  </View>
              </View>
          )}
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
  },
  keyboardAvoidView: {
      flex: 1,
  },
  formContainer: {
      flex: 1,
      paddingTop: 20,
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 20,
  },
  headerTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#333',
  },
  formSection: {
      backgroundColor: '#fff',
      borderRadius: 12,
      marginHorizontal: 20,
      paddingVertical: 15,
      paddingHorizontal: 5,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 2,
  },
  avatarContainer: {
      alignItems: 'center',
      marginBottom: 25,
  },
  avatarWrapper: {
      position: 'relative',
  },
  avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 4,
      borderColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
  },
  avatarButtons: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      flexDirection: 'row',
  },
  changePhotoButton: {
      backgroundColor: 'black',
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#fff',
      marginLeft: 5,
  },
  cameraButton: {
      backgroundColor: 'black',
  },
  changePhotoText: {
      marginTop: 10,
      color: 'black',
      fontSize: 14,
  },
  inputGroup: {
      marginBottom: 18,
      paddingHorizontal: 15,
  },
  label: {
      fontSize: 14,
      color: '#666',
      marginBottom: 8,
      fontWeight: '500',
  },
  inputContainer: {
      borderWidth: 1,
      borderColor: '#e0e0e0',
      borderRadius: 10,
      backgroundColor: '#fafafa',
      overflow: 'hidden',
  },
  inputContainerActive: {
      borderColor: 'black',
      backgroundColor: '#fff',
  },
  input: {
      paddingHorizontal: 15,
      paddingVertical: 12,
      fontSize: 16,
      color: '#333',
  },
  buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginTop: 10,
      marginBottom: 30,
  },
  cancelButton: {
      flex: 1,
      backgroundColor: '#f2f2f2',
      paddingVertical: 15,
      borderRadius: 10,
      marginRight: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
  },
  saveButton: {
      flex: 1,
      backgroundColor: 'black',
      paddingVertical: 15,
      borderRadius: 10,
      marginLeft: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
  },
  cancelButtonText: {
      color: '#333',
      fontSize: 16,
      fontWeight: '600',
  },
  saveButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
  },
  editButton: {
      backgroundColor: 'black',
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginHorizontal: 20,
      marginTop: 10,
      marginBottom: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
  },
  editButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
  },
  loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
  },
  loadingContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
  },
  loadingText: {
      marginTop: 10,
      color: 'black',
      fontSize: 16,
  },
});

export default EditProfile;