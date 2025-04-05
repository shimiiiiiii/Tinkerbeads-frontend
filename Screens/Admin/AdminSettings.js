import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

const AdminSettings = ({ navigation }) => {
  // State for various settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Handle logout
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          onPress: () => {
            Toast.show({
              type: 'success',
              text1: 'Logged Out',
              text2: 'You have been successfully logged out',
              position: 'bottom'
            });
            // Navigate to login screen
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }]
            });
          }
        }
      ]
    );
  };

  // Toggle maintenance mode with confirmation
  const toggleMaintenanceMode = () => {
    if (!maintenanceMode) {
      Alert.alert(
        'Enable Maintenance Mode',
        'Enabling maintenance mode will make the app unavailable for regular users. Continue?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Enable',
            onPress: () => {
              setMaintenanceMode(true);
              Toast.show({
                type: 'info',
                text1: 'Maintenance Mode Enabled',
                text2: 'The app is now in maintenance mode',
                position: 'bottom'
              });
            }
          }
        ]
      );
    } else {
      setMaintenanceMode(false);
      Toast.show({
        type: 'info',
        text1: 'Maintenance Mode Disabled',
        text2: 'The app is now available to all users',
        position: 'bottom'
      });
    }
  };

  // Handle backup
  const handleBackup = () => {
    Toast.show({
      type: 'success',
      text1: 'Backup Started',
      text2: 'System backup initiated. You will be notified when complete.',
      position: 'bottom'
    });
    // Simulate backup process
    setTimeout(() => {
      Toast.show({
        type: 'success',
        text1: 'Backup Complete',
        text2: 'System data has been successfully backed up',
        position: 'bottom'
      });
    }, 3000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#584e51" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* General Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Icon name="notifications-outline" size={22} color="#584e51" />
            <Text style={styles.settingText}>Admin Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#d1d1d1', true: '#a3e4d7' }}
            thumbColor={notificationsEnabled ? '#584e51' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Icon name="moon-outline" size={22} color="#584e51" />
            <Text style={styles.settingText}>Dark Mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#d1d1d1', true: '#a3e4d7' }}
            thumbColor={darkMode ? '#584e51' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Icon name="cloud-upload-outline" size={22} color="#584e51" />
            <Text style={styles.settingText}>Auto Backup</Text>
          </View>
          <Switch
            value={autoBackup}
            onValueChange={setAutoBackup}
            trackColor={{ false: '#d1d1d1', true: '#a3e4d7' }}
            thumbColor={autoBackup ? '#584e51' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* System Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Icon name="construct-outline" size={22} color="#584e51" />
            <Text style={styles.settingText}>Maintenance Mode</Text>
          </View>
          <Switch
            value={maintenanceMode}
            onValueChange={toggleMaintenanceMode}
            trackColor={{ false: '#d1d1d1', true: '#a3e4d7' }}
            thumbColor={maintenanceMode ? '#584e51' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions</Text>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleBackup}>
          <Icon name="cloud-upload" size={22} color="#584e51" />
          <Text style={styles.actionText}>Create System Backup</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => Alert.alert('Clear Cache', 'Cache cleared successfully!')}
        >
          <Icon name="trash-bin" size={22} color="#584e51" />
          <Text style={styles.actionText}>Clear App Cache</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { borderBottomWidth: 0 }]}
          onPress={handleLogout}
        >
          <Icon name="log-out" size={22} color="#ff3131" />
          <Text style={[styles.actionText, { color: '#ff3131' }]}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>TinkerBeads Admin v1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 15,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 10,
  },
  versionContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
  }
});

export default AdminSettings;