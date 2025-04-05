// // import React, { useState } from 'react';
// // import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
// // import Icon from 'react-native-vector-icons/FontAwesome';
// // import { useNavigation } from '@react-navigation/native';
// // import axios from 'axios';
// // import Toast from 'react-native-toast-message';
// // import baseURL from '../../assets/common/baseUrl';
// // import { useAuth } from '../../Context/Auth'; 
// // import { getToken } from '../../utils/sqliteToken';

// // export default function LoginScreen() {
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const navigation = useNavigation();
// //   const { login } = useAuth(); // use the auth context

// //   const togglePasswordVisibility = () => {
// //     setShowPassword(!showPassword);
// //   };

// //   const handleLogin = async () => {
// //     try {
// //       const res = await axios.post(`${baseURL}/user/login`, {
// //         email,
// //         password
// //       });

// //       if (res.data.success) {
// //         // store the token and user data using context
// //         await login(res.data.user.token, res.data.user);
        
// //         const storedToken = await getToken();
// //         console.log('Stored Token:', storedToken)

// //         Toast.show({
// //           type: 'success',
// //           text1: 'Login Successful',
// //           text2: res.data.message || 'Welcome back!',
// //           position: 'bottom'
// //         });
// //         setTimeout(() => {
// //           navigation.navigate('MainNavigator');
// //         }, 1500);

// //       } else {
// //         console.log('Login failed:', res.data);
// //         Toast.show({
// //           type: 'error',
// //           text1: 'Login Failed',
// //           text2: res.data.message || 'Invalid credentials',
// //           position: 'bottom'
// //         });

// //       }
// //     } catch (error) {
// //       console.log('Login error:', error);
// //       Toast.show({
// //         type: 'error',
// //         text1: 'Error',
// //         text2: 'Something went wrong.',
// //         position: 'bottom'
// //       });

// //     }
// //   };


// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Login</Text>

// //       <View style={styles.inputContainer}>
// //         <Icon name="user" size={20} color="#000" style={styles.icon} />
// //         <TextInput
// //           style={styles.input}
// //           placeholder="EMAIL"
// //           placeholderTextColor="#000"
// //           value={email}
// //           onChangeText={setEmail}
// //           autoCapitalize="none"
// //         />
// //       </View>

// //       <View style={styles.inputContainer}>
// //         <Icon name="lock" size={20} color="#000" style={styles.icon} />
// //         <TextInput
// //           style={styles.input}
// //           placeholder="PASSWORD"
// //           placeholderTextColor="#000"
// //           secureTextEntry={!showPassword}
// //           value={password}
// //           onChangeText={setPassword}
// //         />
// //         <TouchableOpacity
// //           onPress={togglePasswordVisibility}
// //           style={styles.eyeIcon}
// //         >
// //           <Icon
// //             name={showPassword ? "eye" : "eye-slash"}
// //             size={20}
// //             color="#000"
// //           />
// //         </TouchableOpacity>
// //       </View>

// //       <TouchableOpacity>
// //         <Text style={styles.forgotPassword}>FORGOT PASSWORD?</Text>
// //       </TouchableOpacity>

// //       <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
// //         <Text style={styles.loginButtonText}>Login</Text>
// //       </TouchableOpacity>

// //       <View style={styles.dividerContainer}>
// //         <View style={styles.dividerLine} />
// //         <Text style={styles.orText}>Or sign in with</Text>
// //         <View style={styles.dividerLine} />
// //       </View>

// //       <View style={styles.socialLoginContainer}>
// //         <TouchableOpacity style={styles.socialButton}>
// //           <Icon name="google" size={30} color="#DB4437" />
// //         </TouchableOpacity>
// //         <TouchableOpacity style={styles.socialButton}>
// //           <Icon name="facebook" size={30} color="#4267B2" />
// //         </TouchableOpacity>
// //       </View>

// //       <View style={styles.signUpContainer}>
// //         <Text style={styles.noAccountText}>Don't have an account? </Text>
        
// //         <TouchableOpacity onPress={() => navigation.navigate('Register')}>
// //           <Text style={styles.signUpText}>SignUp</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     padding: 40,
// //     backgroundColor: '#fff',
// //   },
// //   title: {
// //     fontSize: 35,
// //     fontWeight: 'bold',
// //     marginBottom: 30,
// //   },
// //   inputContainer: {
// //     width: '100%',
// //     marginTop: 15,
// //     position: 'relative',
// //   },
// //   input: {
// //     width: '100%',
// //     height: 50,
// //     borderColor: 'black',
// //     borderWidth: 3,
// //     borderRadius: 15,
// //     paddingHorizontal: 40,
// //     backgroundColor: 'rgba(217, 217, 217, 0.63)',
// //   },
// //   icon: {
// //     position: 'absolute',
// //     left: 12,
// //     top: 15,
// //     zIndex: 1,
// //   },
// //   eyeIcon: {
// //     position: 'absolute',
// //     right: 12,
// //     top: 15,
// //     zIndex: 1,
// //   },
// //   forgotPassword: {
// //     color: '#ff3131',
// //     marginTop: 10,
// //     fontSize: 11,
// //     marginLeft: 165,
// //     marginBottom: 25,
// //   },
// //   loginButton: {
// //     width: '100%',
// //     height: 50,
// //     borderColor: 'black',
// //     borderWidth: 3,
// //     backgroundColor: 'white',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     borderRadius: 15,
// //     marginBottom: 20,
// //   },
// //   loginButtonText: {
// //     color: 'black',
// //     fontWeight: 'bold',
// //     fontSize: 22,
// //   },
// //   dividerContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     width: '100%',
// //     marginTop: 50,
// //     marginBottom: 20,
// //   },
// //   dividerLine: {
// //     flex: 1,
// //     height: 1,
// //     backgroundColor: '#999',
// //   },
// //   orText: {
// //     color: '#999',
// //     paddingHorizontal: 10,
// //   },
// //   socialLoginContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     width: '60%',
// //     marginBottom: 20,
// //     gap: 40,
// //   },
// //   socialButton: {
// //     width: 50,
// //     height: 50,
// //     borderRadius: 25,
// //     backgroundColor: 'white',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     borderWidth: 2,
// //     borderColor: '#ddd',
// //     elevation: 3,
// //     shadowColor: '#000',
// //     shadowOffset: {
// //       width: 0,
// //       height: 2,
// //     },
// //     shadowOpacity: 0.25,
// //     shadowRadius: 3.84,
// //   },
// //   signUpContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   noAccountText: {
// //     color: '#000',
// //   },
// //   signUpText: {
// //     color: '#ff3131',
// //   },
// // });

// //WORKING LOGIN
// import React, { useState } from 'react';
// import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import Toast from 'react-native-toast-message';
// import baseURL from '../../assets/common/baseUrl';
// import { useAuth } from '../../Context/Auth'; 
// import { getToken } from '../../utils/sqliteToken';

// export default function LoginScreen() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigation = useNavigation();
//   const { login } = useAuth(); 

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(`${baseURL}/user/login`, {
//         email,
//         password,
//       });

//       if (res.data.success) {
//         // Store the token and user data using context
//         await login(res.data.user.token, res.data.user);

//         // Set the token in Axios headers for future requests
//         axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.user.token}`;

//         const storedToken = await getToken();
//         console.log('Stored Token:', storedToken);

//         Toast.show({
//           type: 'success',
//           text1: 'Login Successful',
//           text2: res.data.message || 'Welcome back!',
//           position: 'bottom',
//         });

//         // Redirect based on user role
//         setTimeout(() => {
//           if (res.data.user.role === 'admin') {
//             navigation.navigate('AdminNavigator');
//           } else {
//             navigation.navigate('MainNavigator');
//           }
//         }, 1500);
//       } else {
//         console.log('Login failed:', res.data);
//         Toast.show({
//           type: 'error',
//           text1: 'Login Failed',
//           text2: res.data.message || 'Invalid credentials',
//           position: 'bottom',
//         });
//       }
//     } catch (error) {
//       console.log('Login error:', error);
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'Something went wrong.',
//         position: 'bottom',
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>

//       <View style={styles.inputContainer}>
//         <Icon name="user" size={20} color="#000" style={styles.icon} />
//         <TextInput
//           style={styles.input}
//           placeholder="EMAIL"
//           placeholderTextColor="#000"
//           value={email}
//           onChangeText={setEmail}
//           autoCapitalize="none"
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Icon name="lock" size={20} color="#000" style={styles.icon} />
//         <TextInput
//           style={styles.input}
//           placeholder="PASSWORD"
//           placeholderTextColor="#000"
//           secureTextEntry={!showPassword}
//           value={password}
//           onChangeText={setPassword}
//         />
//         <TouchableOpacity
//           onPress={togglePasswordVisibility}
//           style={styles.eyeIcon}
//         >
//           <Icon
//             name={showPassword ? "eye" : "eye-slash"}
//             size={20}
//             color="#000"
//           />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity>
//         <Text style={styles.forgotPassword}>FORGOT PASSWORD?</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//         <Text style={styles.loginButtonText}>Login</Text>
//       </TouchableOpacity>

//       <View style={styles.dividerContainer}>
//         <View style={styles.dividerLine} />
//         <Text style={styles.orText}>Or sign in with</Text>
//         <View style={styles.dividerLine} />
//       </View>

//       <View style={styles.socialLoginContainer}>
//         <TouchableOpacity style={styles.socialButton}>
//           <Icon name="google" size={30} color="#DB4437" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.socialButton}>
//           <Icon name="facebook" size={30} color="#4267B2" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.signUpContainer}>
//         <Text style={styles.noAccountText}>Don't have an account? </Text>
        
//         <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//           <Text style={styles.signUpText}>SignUp</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 40,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 35,
//     fontWeight: 'bold',
//     marginBottom: 30,
//   },
//   inputContainer: {
//     width: '100%',
//     marginTop: 15,
//     position: 'relative',
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     borderColor: 'black',
//     borderWidth: 3,
//     borderRadius: 15,
//     paddingHorizontal: 40,
//     backgroundColor: 'rgba(217, 217, 217, 0.63)',
//   },
//   icon: {
//     position: 'absolute',
//     left: 12,
//     top: 15,
//     zIndex: 1,
//   },
//   eyeIcon: {
//     position: 'absolute',
//     right: 12,
//     top: 15,
//     zIndex: 1,
//   },
//   forgotPassword: {
//     color: '#ff3131',
//     marginTop: 10,
//     fontSize: 11,
//     marginLeft: 165,
//     marginBottom: 25,
//   },
//   loginButton: {
//     width: '100%',
//     height: 50,
//     borderColor: 'black',
//     borderWidth: 3,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 15,
//     marginBottom: 20,
//   },
//   loginButtonText: {
//     color: 'black',
//     fontWeight: 'bold',
//     fontSize: 22,
//   },
//   dividerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     marginTop: 50,
//     marginBottom: 20,
//   },
//   dividerLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#999',
//   },
//   orText: {
//     color: '#999',
//     paddingHorizontal: 10,
//   },
//   socialLoginContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     width: '60%',
//     marginBottom: 20,
//     gap: 40,
//   },
//   socialButton: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#ddd',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   signUpContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   noAccountText: {
//     color: '#000',
//   },
//   signUpText: {
//     color: '#ff3131',
//   },
// });

import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Dimensions,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import baseURL from '../../assets/common/baseUrl';
import { useAuth } from '../../Context/Auth'; 
import { getToken } from '../../utils/sqliteToken';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { login } = useAuth(); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${baseURL}/user/login`, {
        email,
        password,
      });

      if (res.data.success) {
        // Store the token and user data using context
        await login(res.data.user.token, res.data.user);

        // Set the token in Axios headers for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.user.token}`;

        const storedToken = await getToken();
        console.log('Stored Token:', storedToken);

        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: res.data.message || 'Welcome back!',
          position: 'bottom',
        });

        // Redirect based on user role
        setTimeout(() => {
          if (res.data.user.role === 'admin') {
            navigation.navigate('AdminNavigator');
          } else {
            navigation.navigate('MainNavigator');
          }
        }, 1500);
      } else {
        console.log('Login failed:', res.data);
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: res.data.message || 'Invalid credentials',
          position: 'bottom',
        });
      }
    } catch (error) {
      console.log('Login error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong.',
        position: 'bottom',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
      <View style={styles.headerSection}>
        <View style={styles.brandContainer}>
          <Text style={styles.brandPrefix}>TINKER</Text>
          <Text style={styles.brandSuffix}>BEADS</Text>
        </View>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Handmade by gl</Text>
        </View>
      </View>
      
        <View style={styles.formSection}>
          <Text style={styles.formTitle}>Sign In</Text>
          
          <View style={styles.inputContainer}>
            <Icon name="envelope" size={18} color="#444" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Icon name="lock" size={18} color="#444" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
              <Icon name={showPassword ? "eye" : "eye-slash"} size={18} color="#444" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialSection}>
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.orText}>OR SIGN IN WITH</Text>
            <View style={styles.dividerLine} />
          </View>
          
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="google" size={20} color="#000" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="facebook-f" size={20} color="#000" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="apple" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <Text style={styles.noAccountText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 40,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  brandPrefix: {
    fontWeight: '800',
    fontSize: 26,
    letterSpacing: 3,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-black',
  },
  brandSuffix: {
    fontWeight: '300',
    fontSize: 26,
    letterSpacing: 3,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-light',
    marginLeft: 4,
  },
  brandName: {
    fontWeight: 'bold',
    fontSize: 24,
    letterSpacing: 4,
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium',
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#555',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-light',
  },
  welcomeBoldText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium',
  },
  formSection: {
    marginBottom: 40,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium',
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#E0E0E0',
    marginBottom: 25,
    paddingBottom: 8,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#000',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    paddingLeft: 12,
  },
  inputIcon: {
    marginLeft: 4,
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 30,
    marginTop: 5,
  },
  forgotPasswordText: {
    color: '#555',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  loginButton: {
    height: 58,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium',
  },
  socialSection: {
    marginTop: 30,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  orText: {
    fontSize: 12,
    color: '#888',
    paddingHorizontal: 12,
    letterSpacing: 1,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-light',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
  },
  noAccountText: {
    color: '#666',
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  signUpText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium',
  },
});