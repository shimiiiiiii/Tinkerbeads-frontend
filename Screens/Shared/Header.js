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

import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({ searchQuery, setSearchQuery, openDrawer }) => {
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity 
        style={styles.menuButton}
        onPress={openDrawer} // Call openDrawer when menu button is pressed
      >
        <Icon name="menu-outline" size={24} color="black" />
      </TouchableOpacity> */}

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
        {/* <TouchableOpacity style={styles.iconButton}>
          <Icon name="grid-outline" size={22} color="black" />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="notifications-outline" size={22} color="black" />
        </TouchableOpacity>
      </View>
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
  menuButton: {
    marginRight: 12,
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
});

export default Header;