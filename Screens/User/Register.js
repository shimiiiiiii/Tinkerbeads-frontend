import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

export default function RegisterScreen() {
    const [image, setImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const pickImage = async () => {
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
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status === "granted") {
            let result = await ImagePicker.launchCameraAsync({
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            <View style={styles.profileContainer}>
                <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.image} />
                    ) : (
                        <Icon name="user" size={50} color="black" />
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
                    <View style={styles.cameraIconContainer}>
                        <Icon name="camera" size={20} color="white" />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.nameContainer}>
                <TextInput
                    style={[styles.input, styles.nameInput]}
                    placeholder="First Name"
                    placeholderTextColor="#999"
                />
                <TextInput
                    style={[styles.input, styles.nameInput]}
                    placeholder="Last Name"
                    placeholderTextColor="#999"
                />
            </View>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={styles.eyeIcon}
                >
                    <Icon
                        name={showPassword ? "eye" : "eye-slash"}
                        size={20}
                        color="#000"
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#999"
                    secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                    onPress={toggleConfirmPasswordVisibility}
                    style={styles.eyeIcon}
                >
                    <Icon
                        name={showConfirmPassword ? "eye" : "eye-slash"}
                        size={20}
                        color="#000"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.signUpButton}>
                <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.signInContainer}>
                <Text style={styles.noAccountText}>Already have an account? </Text>
                <TouchableOpacity>
                    <Text style={styles.signInText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    profileContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    imageUpload: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderColor: 'black',
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(217, 217, 217, 0.63)',
    },
    image: {
        width: 114,
        height: 114,
        borderRadius: 57,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    cameraIconContainer: {
        backgroundColor: 'black',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15,
    },
    nameInput: {
        flex: 1,
        marginRight: 10,
    },
    inputContainer: {
        width: '100%',
        marginTop: 15,
        position: 'relative',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: 'rgba(217, 217, 217, 0.63)',
    },
    eyeIcon: {
        position: 'absolute',
        right: 12,
        top: 15,
        zIndex: 1,
    },
    signUpButton: {
        width: '100%',
        height: 50,
        borderColor: 'black',
        borderWidth: 3,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 20,
        marginTop: 20,
    },
    signUpButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 22,
    },
    signInContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
    },
    noAccountText: {
        color: '#000',
    },
    signInText: {
        color: '#ff3131',
    },
});