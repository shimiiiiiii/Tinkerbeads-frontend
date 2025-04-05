// import React from 'react';
// import { StyleSheet, View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
// import Header from '../Shared/Header';
// import Banner from '../Shared/Banner';
// import CategoryFilter from './CategoryFilter';
// import ProductList from './ProductList';

// const ProductContainer = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="white" barStyle="dark-content" />
//       <Header />
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <Banner />
//         <CategoryFilter />
//         <ProductList />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
// });

// export default ProductContainer;

// import React, { useState } from 'react';
// import { StyleSheet, View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
// import Header from '../Shared/Header';
// import Banner from '../Shared/Banner';
// import CategoryFilter from './CategoryFilter';
// import ProductList from './ProductList';

// const ProductContainer = () => {
//     const [searchQuery, setSearchQuery] = useState(''); 

//     return (
//       <SafeAreaView style={styles.container}>
//           <StatusBar backgroundColor="white" barStyle="dark-content" />
//           <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
//           <ScrollView showsVerticalScrollIndicator={false}>
//               <Banner />
//               <CategoryFilter />
//               <ProductList searchQuery={searchQuery} />
//           </ScrollView>
//       </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//     },
// });

// export default ProductContainer;


import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import Header from '../Shared/Header';
import Banner from '../Shared/Banner';
import CategoryFilter from './CategoryFilter';
import ProductList from './ProductList';

const ProductContainer = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Handle filter data from Header
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
                onFilterApply={handleFilterApply} // Pass the callback to Header
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Banner />
                <CategoryFilter selectedCategories={selectedCategories} />
                <ProductList 
                    searchQuery={searchQuery} 
                    priceRange={priceRange} // Pass price range to ProductList
                    selectedCategories={selectedCategories} // Pass selected categories to ProductList
                />
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