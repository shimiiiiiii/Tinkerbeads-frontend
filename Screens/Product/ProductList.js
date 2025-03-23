import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import ProductCard from './ProductCard'; 
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';

const { width } = Dimensions.get("window");

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${baseURL}/product/get/all`); 
            setProducts(res.data.products);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

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
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                numColumns={2}
                ListHeaderComponent={ListHeader}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
});

export default ProductList;