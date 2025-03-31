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

import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import Header from '../Shared/Header';
import Banner from '../Shared/Banner';
import CategoryFilter from './CategoryFilter';
import ProductList from './ProductList';

const ProductContainer = () => {
    const [searchQuery, setSearchQuery] = useState(''); 

    return (
      <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <ScrollView showsVerticalScrollIndicator={false}>
              <Banner />
              <CategoryFilter />
              <ProductList searchQuery={searchQuery} />
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