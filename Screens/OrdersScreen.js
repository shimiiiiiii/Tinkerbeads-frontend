import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Shared/Header';

const OrdersScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState(''); 

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <Header 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                openDrawer={() => navigation.openDrawer()}
            />
            <View style={styles.content}>
                <Text style={styles.title}>My Orders</Text>
                <Text>Your order history will appear here</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default OrdersScreen;