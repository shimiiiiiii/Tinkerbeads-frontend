import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text, Image } from 'react-native';

const CategoryFilter = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Categories</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContainer}
            >
                <TouchableOpacity style={styles.categoryItem}>
                    <View style={styles.categoryImageContainer}>
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/dlqclovym/image/upload/v1742724105/daytona1_hix75v.webp' }}
                            style={styles.categoryImage}
                        />
                    </View>
                    <Text style={styles.categoryName}>Bracelet</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.categoryItem}>
                    <View style={styles.categoryImageContainer}>
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/dlqclovym/image/upload/v1742724105/daytona1_hix75v.webp' }}
                            style={styles.categoryImage}
                        />
                    </View>
                    <Text style={styles.categoryName}>Necklace</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.categoryItem}>
                    <View style={styles.categoryImageContainer}>
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/dlqclovym/image/upload/v1742724105/daytona1_hix75v.webp' }}
                            style={styles.categoryImage}
                        />
                    </View>
                    <Text style={styles.categoryName}>Keychain</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingVertical: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
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
    categoriesContainer: {
        paddingHorizontal: 12,
    },
    categoryItem: {
        alignItems: 'center',
        marginHorizontal: 4,
        width: 80,
    },
    categoryImageContainer: {
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        overflow: 'hidden',
    },
    categoryImage: {
        width: '100%',
        height: '100%',
    },
    categoryName: {
        fontSize: 12,
        textAlign: 'center',
    },
});

export default CategoryFilter;