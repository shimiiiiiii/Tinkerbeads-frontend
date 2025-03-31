// // // import React, { useEffect, useState } from 'react';
// // // import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
// // // import ProductCard from './ProductCard'; 
// // // import baseURL from '../../assets/common/baseUrl';
// // // import axios from 'axios';

// // // const { width } = Dimensions.get("window");

// // // const ProductList = () => {
// // //     const [products, setProducts] = useState([]);
// // //     const [loading, setLoading] = useState(true);

// // //     const fetchProducts = async () => {
// // //         try {
// // //             const res = await axios.get(`${baseURL}/product/get/all`); 
// // //             setProducts(res.data.products);
// // //         } catch (error) {
// // //             console.error('Failed to fetch products:', error);
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     useEffect(() => {
// // //         fetchProducts();
// // //     }, []);

// // //     const renderItem = ({ item }) => <ProductCard item={item} />;

// // //     const ListHeader = () => (
// // //         <View style={styles.headerContainer}>
// // //             <Text style={styles.header}>All Products</Text>
// // //             <TouchableOpacity>
// // //                 <Text style={styles.viewAll}>View All</Text>
// // //             </TouchableOpacity>
// // //         </View>
// // //     );

// // //     return (
// // //         <View style={styles.container}>
// // //             <FlatList
// // //                 data={products}
// // //                 keyExtractor={(item) => item._id}
// // //                 renderItem={renderItem}
// // //                 numColumns={2}
// // //                 ListHeaderComponent={ListHeader}
// // //                 columnWrapperStyle={styles.columnWrapper}
// // //                 contentContainerStyle={styles.listContainer}
// // //                 showsVerticalScrollIndicator={false}
// // //                 nestedScrollEnabled={true} 
// // //             />
// // //         </View>
// // //     );
// // // };

// // // const styles = StyleSheet.create({
// // //     container: {
// // //         flex: 1,
// // //         backgroundColor: 'white',
// // //     },
// // //     headerContainer: {
// // //         flexDirection: 'row',
// // //         justifyContent: 'space-between',
// // //         alignItems: 'center',
// // //         paddingHorizontal: 16,
// // //         paddingVertical: 10,
// // //         marginBottom: 10,
// // //     },
// // //     header: {
// // //         fontSize: 18,
// // //         fontWeight: 'bold',
// // //     },
// // //     viewAll: {
// // //         fontSize: 14,
// // //         color: 'red',
// // //     },
// // //     listContainer: {
// // //         paddingBottom: 16,
// // //     },
// // //     columnWrapper: {
// // //         justifyContent: 'space-between',
// // //         paddingHorizontal: 16,
// // //     },
// // // });

// // // export default ProductList;

// // import React, { useEffect, useState } from 'react';
// // import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
// // import ProductCard from './ProductCard'; 
// // import baseURL from '../../assets/common/baseUrl';
// // import axios from 'axios';

// // const { width } = Dimensions.get("window");

// // const ProductList = () => {
// //     const [products, setProducts] = useState([]);
// //     const [loading, setLoading] = useState(true);

// //     const fetchProducts = async () => {
// //         try {
// //             const res = await axios.get(`${baseURL}/product/get/all`); 
// //             setProducts(res.data.products);
// //         } catch (error) {
// //             console.error('Failed to fetch products:', error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchProducts();
// //     }, []);

// //     const renderItem = ({ item }) => <ProductCard item={item} />;

// //     const ListHeader = () => (
// //         <View style={styles.headerContainer}>
// //             <Text style={styles.header}>All Products</Text>
// //             <TouchableOpacity>
// //                 <Text style={styles.viewAll}>View All</Text>
// //             </TouchableOpacity>
// //         </View>
// //     );

// //     return (
// //         <View style={styles.container}>
// //         <FlatList
// //             data={products}
// //             keyExtractor={(item) => item._id}
// //             renderItem={renderItem}
// //             numColumns={2}
// //             ListHeaderComponent={ListHeader}
// //             columnWrapperStyle={styles.columnWrapper}
// //             contentContainerStyle={styles.listContainer}
// //             showsVerticalScrollIndicator={false}
// //             nestedScrollEnabled={true} 
// //         />
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         backgroundColor: 'white',
// //     },
// //     headerContainer: {
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         alignItems: 'center',
// //         paddingHorizontal: 16,
// //         paddingVertical: 10,
// //         marginBottom: 10,
// //     },
// //     header: {
// //         fontSize: 18,
// //         fontWeight: 'bold',
// //     },
// //     viewAll: {
// //         fontSize: 14,
// //         color: 'red',
// //     },
// //     listContainer: {
// //         paddingBottom: 16,
// //     },
// //     columnWrapper: {
// //         justifyContent: 'space-between',
// //         paddingHorizontal: 16,
// //     },
// // });

// // export default ProductList;

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
// import ProductCard from './ProductCard'; 
// import baseURL from '../../assets/common/baseUrl';
// import axios from 'axios';

// const ProductList = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const res = await axios.get(`${baseURL}/product/get/all`); 
//                 setProducts(res.data.products);
//             } catch (error) {
//                 console.error('Failed to fetch products:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);

//     const renderItem = ({ item }) => <ProductCard item={item} />;

//     const ListHeader = () => (
//         <View style={styles.headerContainer}>
//             <Text style={styles.header}>All Products</Text>
//             <TouchableOpacity>
//                 <Text style={styles.viewAll}>View All</Text>
//             </TouchableOpacity>
//         </View>
//     );

//     return (
//         <SafeAreaView style={styles.container}>
//             {loading ? (
//                 <ActivityIndicator size="large" color="red" style={styles.loader} />
//             ) : (
//                 <ScrollView contentContainerStyle={styles.scrollContainer}>
//                     <FlatList
//                         data={products}
//                         keyExtractor={(item) => item._id}
//                         renderItem={renderItem}
//                         numColumns={2}
//                         ListHeaderComponent={ListHeader}
//                         columnWrapperStyle={styles.columnWrapper}
//                         contentContainerStyle={styles.listContainer}
//                         showsVerticalScrollIndicator={false}
//                         scrollEnabled={false} // 🚀 This is the FIX! FlatList won't scroll separately
//                         keyboardShouldPersistTaps="handled"
//                     />
//                 </ScrollView>
//             )}
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//     },
//     scrollContainer: {
//         flexGrow: 1,
//     },
//     headerContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingHorizontal: 16,
//         paddingVertical: 10,
//         marginBottom: 10,
//     },
//     header: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     viewAll: {
//         fontSize: 14,
//         color: 'red',
//     },
//     listContainer: {
//         paddingBottom: 16,
//     },
//     columnWrapper: {
//         justifyContent: 'space-between',
//         paddingHorizontal: 16,
//     },
//     loader: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });

// export default ProductList;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import ProductCard from './ProductCard'; 
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';

const ProductList = ({ searchQuery }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${baseURL}/product/get/all`); 
                setProducts(res.data.products);
                setFilteredProducts(res.data.products); // Initialize filtered products
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        // Filter products based on search query
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);

    const renderItem = ({ item }) => <ProductCard item={item} />;

    const ListHeader = () => (
        <View style={styles.headerContainer}>
            <Text style={styles.header}>All Products</Text>
            <TouchableOpacity>
                <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="red" style={styles.loader} />
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <FlatList
                        data={filteredProducts} // Use filtered products
                        keyExtractor={(item) => item._id}
                        renderItem={renderItem}
                        numColumns={2}
                        ListHeaderComponent={ListHeader}
                        columnWrapperStyle={styles.columnWrapper}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        keyboardShouldPersistTaps="handled"
                    />
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 10,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewAll: {
        fontSize: 14,
        color: 'red',
    },
    listContainer: {
        paddingBottom: 16,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProductList;