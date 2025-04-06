import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Switch, 
  TouchableOpacity, 
  ScrollView,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteToken } from '../../utils/sqliteToken'; 
// import AuthGlobal from '../../Context/store/AuthGlobal';

const Settings = ({ navigation }) => {
  // const context = useContext(AuthGlobal);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);


  const toggleNotifications = () => setNotifications(previousState => !previousState);
  const toggleDarkMode = () => setDarkMode(previousState => !previousState);

    const handleLogout = async () => {
      Alert.alert(
        'Logout', 
        'Do you want to logout?', 
        [
          {
            text: 'Cancel',
            style: 'cancel', // Dismiss the alert without doing anything
          },
          {
            text: 'Logout',
            onPress: async () => {
              try {
                await deleteToken(); // Delete the token from the SQLite database
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }], // Reset the navigation stack and navigate to the Login screen
                });
              } catch (error) {
                console.error('Logout failed:', error);
                Alert.alert('Error', 'Failed to log out. Please try again.');
              }
            },
          },
        ],
        { cancelable: true } // Allow the user to dismiss the alert by tapping outside
      );
    };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity 
          style={styles.option} 
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.optionText}>Profile Information</Text>
          <Icon name="chevron-forward" size={22} color="#777" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.option}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Text style={styles.optionText}>Change Password</Text>
          <Icon name="chevron-forward" size={22} color="#777" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#a3897e" }}
            thumbColor={notifications ? "#584e51" : "#f4f3f4"}
            onValueChange={toggleNotifications}
            value={notifications}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#a3897e" }}
            thumbColor={darkMode ? "#584e51" : "#f4f3f4"}
            onValueChange={toggleDarkMode}
            value={darkMode}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Help Center</Text>
          <Icon name="chevron-forward" size={22} color="#777" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Privacy Policy</Text>
          <Icon name="chevron-forward" size={22} color="#777" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Terms of Service</Text>
          <Icon name="chevron-forward" size={22} color="#777" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={[styles.option, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
      
      <Text style={styles.versionText}>TinkerBeads v1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  section: {
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: '#584e51',
    backgroundColor: '#f8f8f8',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: 'white',
    marginVertical: 20,
    marginHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  logoutText: {
    color: '#ff3b30',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  versionText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 20,
  }
});

export default Settings;