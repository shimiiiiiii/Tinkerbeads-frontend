

import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import Header from '../Shared/Header';
import Banner from '../Shared/Banner';
// import CategoryFilter from './CategoryFilter';
import ProductList from './ProductList';
import Footer from '../Shared/Footer';

const ProductContainer = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const handleFilterApply = (filterData) => {
        setPriceRange(filterData.priceRange);
        setSelectedCategories(filterData.categories);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <Header 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                onFilterApply={handleFilterApply} 
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Banner />
                {/* <CategoryFilter selectedCategories={selectedCategories} /> */}
                <ProductList 
                    searchQuery={searchQuery} 
                    priceRange={priceRange} 
                    selectedCategories={selectedCategories} 
                />
                <Footer />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default ProductContainer;