// import React, { useState } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   TouchableOpacity, 
//   Image, 
//   ScrollView,
//   SafeAreaView,
//   ImageBackground,
//   Dimensions
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const { width } = Dimensions.get('window');

// const UserProfile = ({ navigation }) => {
//   // Mock user data - replace with actual authentication later
//   const [user, setUser] = useState({
//     name: "Jane Doe",
//     email: "jane.doe@example.com",
//     avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//     memberSince: "March 2023",
//     totalOrders: 12,
//     savedItems: 8
//   });

//   const menuItems = [
//     {
//       id: 1,
//       title: "My Orders",
//       icon: "receipt-outline",
//       screen: "OrderHistory",
//       color: "#584e51"
//     },
//     {
//       id: 2,
//       title: "Edit Profile",
//       icon: "create-outline",
//       screen: "EditProfile",
//       color: "#584e51"
//     },
//     {
//       id: 3,
//       title: "Saved Items",
//       icon: "heart-outline",
//       screen: "Save",
//       color: "#584e51"
//     },
//     {
//       id: 4,
//       title: "Settings",
//       icon: "settings-outline",
//       screen: "Settings",
//       color: "#584e51"
//     }
//   ];

//   // Handle logout
//   const handleLogout = () => {
//     // Add logout logic here
//     alert("Boss wala ka pang Token");
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Profile Header with Background */}
//         <View style={styles.headerBackground}>
//           <View style={styles.profileHeader}>
//             <View style={styles.avatarContainer}>
//               <Image 
//                 source={{ uri: user.avatar }} 
//                 style={styles.avatar} 
//               />
//               <TouchableOpacity style={styles.editAvatarButton}>
//                 <Icon name="camera-outline" size={18} color="#fff" />
//               </TouchableOpacity>
//             </View>
//             <Text style={styles.userName}>{user.name}</Text>
//             <Text style={styles.userEmail}>{user.email}</Text>
//             <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
//           </View>
//         </View>

//         {/* Stats Cards */}
//         <View style={styles.statsRow}>
//           <TouchableOpacity 
//             style={styles.statCard}
//             onPress={() => navigation.navigate("OrderHistory")}
//           >
//             <View style={styles.statIconContainer}>
//               <Icon name="bag-check" size={22} color="#584e51" />
//             </View>
//             <Text style={styles.statNumber}>{user.totalOrders}</Text>
//             <Text style={styles.statLabel}>Orders</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             style={styles.statCard}
//             onPress={() => navigation.navigate("Save")}
//           >
//             <View style={styles.statIconContainer}>
//               <Icon name="heart" size={22} color="#584e51" />
//             </View>
//             <Text style={styles.statNumber}>{user.savedItems}</Text>
//             <Text style={styles.statLabel}>Saved Items</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Menu Items */}
//         <View style={styles.menuContainer}>
//           <Text style={styles.menuTitle}>Account</Text>
          
//           {menuItems.map((item) => (
//             <TouchableOpacity
//               key={item.id}
//               style={styles.menuItem}
//               onPress={() => navigation.navigate(item.screen)}
//             >
//               <View style={styles.iconContainer}>
//                 <Icon name={item.icon} size={22} color="#FFFFFF" />
//               </View>
//               <Text style={styles.menuText}>{item.title}</Text>
//               <Icon name="chevron-forward" size={20} color="#999" />
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Help & Support Section */}
//         <View style={styles.supportContainer}>
//           <Text style={styles.menuTitle}>Help & Support</Text>
          
//           <TouchableOpacity style={styles.menuItem}>
//             <View style={styles.iconContainer}>
//               <Icon name="help-circle-outline" size={22} color="#FFFFFF" />
//             </View>
//             <Text style={styles.menuText}>FAQ</Text>
//             <Icon name="chevron-forward" size={20} color="#999" />
//           </TouchableOpacity>
          
//           <TouchableOpacity style={styles.menuItem}>
//             <View style={styles.iconContainer}>
//               <Icon name="mail-outline" size={22} color="#FFFFFF" />
//             </View>
//             <Text style={styles.menuText}>Contact Support</Text>
//             <Icon name="chevron-forward" size={20} color="#999" />
//           </TouchableOpacity>
//         </View>

//         {/* Logout Button */}
//         <TouchableOpacity 
//           style={styles.logoutButton} 
//           onPress={handleLogout}
//         >
//           <Icon name="log-out-outline" size={22} color="#fff" />
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>

//         <View style={styles.footer}>
//           <Text style={styles.versionText}>Version 1.0.0</Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   headerBackground: {
//     width: '100%',
//     backgroundColor: '#584e51',
//   },
//   profileHeader: {
//     alignItems: 'center',
//     paddingTop: 30,
//     paddingBottom: 30,
//   },
//   avatarContainer: {
//     position: 'relative',
//   },
//   avatar: {
//     width: 110,
//     height: 110,
//     borderRadius: 55,
//     borderWidth: 3,
//     borderColor: '#fff',
//   },
//   editAvatarButton: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     backgroundColor: '#584e51',
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#fff',
//   },
//   userName: {
//     fontSize: 24,
//     fontWeight: '700',
//     marginTop: 15,
//     color: '#fff',
//   },
//   userEmail: {
//     fontSize: 15,
//     color: 'rgba(255, 255, 255, 0.8)',
//     marginTop: 5,
//   },
//   memberSince: {
//     fontSize: 13,
//     color: 'rgba(255, 255, 255, 0.6)',
//     marginTop: 5,
//   },
//   statsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: -25,
//     marginHorizontal: 20,
//   },
//   statCard: {
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//     elevation: 5,
//     width: width * 0.42,
//   },
//   statIconContainer: {
//     backgroundColor: 'rgba(88, 78, 81, 0.1)',
//     padding: 10,
//     borderRadius: 12,
//     marginBottom: 10,
//   },
//   statNumber: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#584e51',
//   },
//   statLabel: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 3,
//   },
//   menuContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     marginHorizontal: 20,
//     marginTop: 25,
//     paddingVertical: 10,
//     paddingHorizontal: 5,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   menuTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     marginLeft: 20,
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 14,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   iconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#584e51',
//   },
//   menuText: {
//     fontSize: 16,
//     color: '#333',
//     marginLeft: 15,
//     flex: 1,
//   },
//   supportContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     marginHorizontal: 20,
//     marginTop: 25,
//     paddingVertical: 10,
//     paddingHorizontal: 5,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   logoutButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#584e51',
//     marginHorizontal: 20,
//     marginTop: 30,
//     marginBottom: 10,
//     paddingVertical: 15,
//     borderRadius: 15,
//   },
//   logoutText: {
//     marginLeft: 10,
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   footer: {
//     alignItems: 'center',
//     marginBottom: 20,
//     marginTop: 10,
//   },
//   versionText: {
//     fontSize: 12,
//     color: '#999',
//   }
// });

// export default UserProfile;

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import { useAuth } from '../../Context/Auth';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const UserProfile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const { token } = useAuth();
  

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data.user;
      setUser({
        name: `${userData.first_name} ${userData.last_name}`,
        email: userData.email,
        avatar: userData.images?.[0]?.url || 'https://randomuser.me/api/portraits/lego/1.jpg',
        memberSince: userData.createdAt ? userData.createdAt.split('T')[0] : 'N/A',
        totalOrders: userData.totalOrders || 0,
        savedItems: userData.savedItems || 0,
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      Alert.alert('Error', 'Failed to fetch user profile.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserProfile();
    }, [])
  );

  const handleLogout = () => {
    Alert.alert('Logout', 'You have been logged out.');
  };

  if (loading || !user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#584e51" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const menuItems = [
    {
      id: 1,
      title: "My Orders",
      icon: "receipt-outline",
      screen: "OrderHistory",
      color: "black",
    },
    {
      id: 2,
      title: "Edit Profile",
      icon: "create-outline",
      screen: "EditProfile",
      color: "black",
    },
    // {
    //   id: 3,
    //   title: "Saved Items",
    //   icon: "heart-outline",
    //   screen: "Save",
    //   color: "black",
    // },
    {
      id: 4,
      title: "Settings",
      icon: "settings-outline",
      screen: "Settings",
      color: "black",
    },
  ];
  
 
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header with Background */}
        <View style={styles.headerBackground}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: user.avatar }} 
                style={styles.avatar} 
              />
              {/* <TouchableOpacity style={styles.editAvatarButton}>
                <Icon name="camera-outline" size={18} color="#fff" />
              </TouchableOpacity> */}
            </View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            {/* <Text style={styles.memberSince}>Member since {user.memberSince}</Text> */}
          </View>
        </View>

        {/* Stats Cards */}
        {/* <View style={styles.statsRow}>
          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => navigation.navigate("OrderHistory")}
          >
            <View style={styles.statIconContainer}>
              <Icon name="bag-check" size={22} color="black" />
            </View>
            <Text style={styles.statNumber}>{user.totalOrders}</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => navigation.navigate("Save")}
          >
            <View style={styles.statIconContainer}>
              <Icon name="heart" size={22} color="black" />
            </View>
            <Text style={styles.statNumber}>{user.savedItems}</Text>
            <Text style={styles.statLabel}>Saved Items</Text>
          </TouchableOpacity>
        </View> */}

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Account</Text>
          
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.iconContainer}>
                <Icon name={item.icon} size={22} color="#FFFFFF" />
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
              <Icon name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Help & Support Section */}
        <View style={styles.supportContainer}>
          <Text style={styles.menuTitle}>Help & Support</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.iconContainer}>
              <Icon name="help-circle-outline" size={22} color="#FFFFFF" />
            </View>
            <Text style={styles.menuText}>FAQ</Text>
            <Icon name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.iconContainer}>
              <Icon name="mail-outline" size={22} color="#FFFFFF" />
            </View>
            <Text style={styles.menuText}>Contact Support</Text>
            <Icon name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
        >
          <Icon name="log-out-outline" size={22} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  headerBackground: {
    width: '100%',
    backgroundColor: 'black',
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#fff',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#584e51',
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 15,
    color: '#fff',
  },
  userEmail: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  memberSince: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -25,
    marginHorizontal: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    width: width * 0.42,
  },
  statIconContainer: {
    backgroundColor: 'rgba(88, 78, 81, 0.1)',
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#584e51',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 25,
    paddingVertical: 10,
    paddingHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    flex: 1,
  },
  supportContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 25,
    paddingVertical: 10,
    paddingHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 10,
    paddingVertical: 15,
    borderRadius: 15,
  },
  logoutText: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
  }
});

export default UserProfile;