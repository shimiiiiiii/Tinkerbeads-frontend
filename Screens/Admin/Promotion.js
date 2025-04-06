import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useCallback } from "react";
import {
    View, Text, StyleSheet, TouchableOpacity, FlatList,
    ActivityIndicator, RefreshControl, Alert, Modal, TextInput, ScrollView
} from "react-native";
import { Surface, FAB, Searchbar, Button } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useAuth } from "../../Context/Auth";
import baseURL from '../../assets/common/baseUrl';
import { SafeAreaView } from "react-native-safe-area-context";

// Configure Notifications
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const Promotions = () => {
    const { token, user } = useAuth();
    const navigation = useNavigation();

    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPromotions, setFilteredPromotions] = useState([]);
    const [showForm, setShowForm] = useState(false);

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const isAdmin = user && user.role === 'admin';

    const fetchPromotions = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`${baseURL}/promotions`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();

            if (response.ok) {
                const sortedPromotions = data.promotions.sort((a, b) => {
                    if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
                    return new Date(a.startDate) - new Date(b.startDate);
                });

                setPromotions(sortedPromotions);
                setFilteredPromotions(sortedPromotions);
            } else {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Failed to load promotions",
                    text2: data.message || "Please try again later"
                });
            }
        } catch (error) {
            console.error("Error fetching promotions:", error);
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Network error",
                text2: "Please check your connection"
            });
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [token]);

    useFocusEffect(
        useCallback(() => {
            fetchPromotions();
        }, [fetchPromotions])
    );

    const onRefresh = () => {
        setRefreshing(true);
        fetchPromotions();
    };

    const handleSearch = (query) => {
        setSearchQuery(query);

        if (query.trim() === '') {
            setFilteredPromotions(promotions);
        } else {
            const filtered = promotions.filter(
                item =>
                    item.title.toLowerCase().includes(query.toLowerCase()) ||
                    (item.product && item.product.name &&
                        item.product.name.toLowerCase().includes(query.toLowerCase()))
            );
            setFilteredPromotions(filtered);
        }
    };

    const handleCreatePromotion = async () => {
        if (!title || !discountPercentage || !startDate || !endDate) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }

        const newPromotion = {
            title,
            description,
            discountPercentage: parseFloat(discountPercentage),
            startDate,
            endDate,
            isActive: true,
        };

        try {
            const response = await fetch(`${baseURL}/promotions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newPromotion),
            });

            if (response.ok) {
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Promotion created successfully!",
                });
                setShowForm(false);
                fetchPromotions();
            } else {
                const data = await response.json();
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Failed to create promotion",
                    text2: data.message || "Please try again later",
                });
            }
        } catch (error) {
            console.error("Error creating promotion:", error);
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Network error",
                text2: "Please check your connection",
            });
        }
    };

    const renderItem = ({ item }) => {
        return (
            <Surface style={styles.itemContainer}>
                <View style={styles.mainContent}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </Surface>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Searchbar
                placeholder="Search promotions..."
                onChangeText={handleSearch}
                value={searchQuery}
                style={styles.searchbar}
            />
            <FlatList
                data={filteredPromotions}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
            {isAdmin && (
                <FAB
                    style={styles.fab}
                    icon="plus"
                    onPress={() => setShowForm(true)}
                />
            )}

            {/* Promotion Form Modal */}
            <Modal visible={showForm} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <ScrollView contentContainerStyle={styles.formContainer}>
                        <Text style={styles.formTitle}>Create Promotion</Text>
                        <TextInput
                            placeholder="Title"
                            value={title}
                            onChangeText={setTitle}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Description"
                            value={description}
                            onChangeText={setDescription}
                            style={[styles.input, styles.textArea]}
                            multiline
                        />
                        <TextInput
                            placeholder="Discount Percentage"
                            value={discountPercentage}
                            onChangeText={setDiscountPercentage}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Start Date (YYYY-MM-DD)"
                            value={startDate}
                            onChangeText={setStartDate}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="End Date (YYYY-MM-DD)"
                            value={endDate}
                            onChangeText={setEndDate}
                            style={styles.input}
                        />
                        <View style={styles.buttonContainer}>
                            <Button
                                mode="contained"
                                onPress={handleCreatePromotion}
                                style={styles.button}
                            >
                                Create
                            </Button>
                            <Button
                                mode="outlined"
                                onPress={() => setShowForm(false)}
                                style={styles.button}
                            >
                                Cancel
                            </Button>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    searchbar: {
        margin: 16,
        borderRadius: 8,
    },
    itemContainer: {
        padding: 16,
        margin: 8,
        backgroundColor: "#fff",
        borderRadius: 8,
    },
    mainContent: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
        color: "#666",
    },
    fab: {
        position: "absolute",
        right: 16,
        bottom: 16,
        backgroundColor: "#3498db",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    formContainer: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        backgroundColor: "#fff",
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        flex: 1,
        marginHorizontal: 8,
    },
});

export default Promotions;