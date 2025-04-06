// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
// import ProductDetail from './ProductDetail';

// const { width } = Dimensions.get("window");

// const ProductCard = ({ item }) => {
//     const navigation = useNavigation();

//     const formattedPrice = new Intl.NumberFormat('en-US').format(item.sell_price);

//     return (
//         <TouchableOpacity
//             style={styles.card}
//             onPress={() => navigation.navigate("ProductDetail", { item: item })}
//         >
//             <Image
//                 style={styles.image}
//                 resizeMode="contain"
//                 source={{ uri: item.images[0]?.url }}
//             />
//             <View style={styles.cardBody}>
//                 <View style={styles.priceContainer}>
//                     <Text style={styles.price}>₱ {formattedPrice}</Text>
//                 </View>
//                 <Text style={styles.title}>{item.name}</Text>
//             </View>
//         </TouchableOpacity>
//     );
// };

// const styles = StyleSheet.create({
//     card: {
//         width: (width - 40) / 2,  
//         marginBottom: 16,
//         backgroundColor: 'white',
//         borderRadius: 10,
//         overflow: 'hidden',
//         elevation: 1,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 2,
//     },
//     image: {
//         height: 130,
//         width: '100%',
//         backgroundColor: '#f9f9f9',
//     },
//     favoriteContainer: {
//         position: 'absolute',
//         right: 8,
//         top: 8,
//     },
//     favoriteButton: {
//         width: 30,
//         height: 30,
//         borderRadius: 15,
//         backgroundColor: 'white',
//         justifyContent: 'center',
//         alignItems: 'center',
//         elevation: 2,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.2,
//         shadowRadius: 1,
//     },
//     cardBody: {
//         padding: 10,
//     },
//     priceContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 4,
//     },
//     price: {
//         fontSize: 14,
//         fontWeight: 'bold',
//         color: 'red',
//     },
//     ratingContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     rating: {
//         fontSize: 12,
//         marginLeft: 2,
//         color: '#666',
//     },
//     title: {
//         fontSize: 14,
//         fontWeight: '500',
//         marginBottom: 2,
//     },
// });

// export default ProductCard;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get("window");

const ProductCard = ({ item }) => {
    const navigation = useNavigation();
    const formattedPrice = new Intl.NumberFormat('en-US').format(item.sell_price);

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("ProductDetail", { item: item })}
            activeOpacity={0.9}
        >
            <View style={styles.cardInner}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={{ uri: item.images[0]?.url }}
                    />
                </View>
                
                <View style={styles.infoContainer}>
                    <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.price}>₱ {formattedPrice}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: (width - 48) / 2,
        height: 250,
        marginBottom: 24,
        padding: 2, 
        backgroundColor: '#000', 
        borderRadius: 4,
        overflow: 'hidden',
    },
    cardInner: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 2,
        overflow: 'hidden',
    },
    imageContainer: {
        height: '75%',
        width: '100%',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    infoContainer: {
        padding: 12,
        height: '25%',
        justifyContent: 'space-between',
    },
    divider: {
        height: 1,
        backgroundColor: '#000', 
        marginVertical: 4,
    },
    price: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000',
        letterSpacing: 0.5,
    },
    title: {
        fontSize: 13,
        fontWeight: '500',
        color: '#000',
        textTransform: 'uppercase',
        letterSpacing: 0.3,
    }
});

export default ProductCard;