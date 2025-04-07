import React, { useState, useEffect, useCallback } from "react";
import {
    View, Text, StyleSheet, TouchableOpacity, FlatList, 
    ActivityIndicator, RefreshControl, Alert, Dimensions
} from "react-native";
import { Searchbar } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { useAuth } from "../../Context/Auth";
import baseURL from '../../assets/common/baseUrl';
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get('window');

const Promotions = () => {
    const { token, user } = useAuth();
    const navigation = useNavigation();
    
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPromotions, setFilteredPromotions] = useState([]);
    const [filterType, setFilterType] = useState('all');
    
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
                applyFilter(sortedPromotions, filterType, searchQuery);
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
    }, [token, filterType, searchQuery]);

    useFocusEffect(
        useCallback(() => {
            fetchPromotions();
        }, [fetchPromotions])
    );

    const onRefresh = () => {
        setRefreshing(true);
        fetchPromotions();
    };

    const applyFilter = (promotionsList, type, query) => {
        const searchFiltered = query.trim() === '' 
            ? promotionsList 
            : promotionsList.filter(
                item => 
                    item.title.toLowerCase().includes(query.toLowerCase()) ||
                    (item.product && item.product.name && 
                     item.product.name.toLowerCase().includes(query.toLowerCase()))
            );
            
        if (type === 'all') {
            setFilteredPromotions(searchFiltered);
            return;
        }
        
        const currentDate = new Date();
        let statusFiltered;
        
        if (type === 'active') {
            statusFiltered = searchFiltered.filter(item => {
                const startDate = new Date(item.startDate);
                const endDate = new Date(item.endDate);
                return item.isActive && currentDate >= startDate && currentDate <= endDate;
            });
        } else if (type === 'upcoming') {
            statusFiltered = searchFiltered.filter(item => {
                const startDate = new Date(item.startDate);
                return item.isActive && currentDate < startDate;
            });
        } else if (type === 'expired') {
            statusFiltered = searchFiltered.filter(item => {
                const endDate = new Date(item.endDate);
                return !item.isActive || currentDate > endDate;
            });
        }
        
        setFilteredPromotions(statusFiltered || searchFiltered);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        applyFilter(promotions, filterType, query);
    };
    
    const handleFilterChange = (type) => {
        setFilterType(type);
        applyFilter(promotions, type, searchQuery);
    };

    const confirmDelete = (id) => {
        Alert.alert(
            "Delete Promotion",
            "Are you sure you want to delete this promotion?",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Delete", 
                    style: "destructive",
                    onPress: () => deletePromotion(id)
                }
            ]
        );
    };

    const deletePromotion = async (id) => {
        try {
            const response = await fetch(`${baseURL}/promotions/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (response.ok) {
                const updatedPromotions = promotions.filter(item => item._id !== id);
                setPromotions(updatedPromotions);
                applyFilter(updatedPromotions, filterType, searchQuery);
                
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Promotion deleted successfully"
                });
            } else {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Failed to delete promotion"
                });
            }
        } catch (error) {
            console.error("Error deleting promotion:", error);
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Network error",
                text2: "Please check your connection"
            });
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const calculateDaysRemaining = (endDate) => {
        const today = new Date();
        const end = new Date(endDate);
        const differenceInTime = end - today;
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays;
    };

    const getStatusText = (promotion) => {
        const currentDate = new Date();
        const startDate = new Date(promotion.startDate);
        const endDate = new Date(promotion.endDate);
        
        if (!promotion.isActive) {
            return "INACTIVE";
        } else if (currentDate < startDate) {
            return "UPCOMING";
        } else if (currentDate > endDate) {
            return "EXPIRED";
        } else {
            return "ACTIVE";
        }
    };

    const renderItem = ({ item }) => {
        const statusText = getStatusText(item);
        const daysRemaining = calculateDaysRemaining(item.endDate);
        const isActive = statusText === "ACTIVE";
        const isExpired = statusText === "EXPIRED" || statusText === "INACTIVE";
        
        return (
            <TouchableOpacity 
                style={[
                    styles.promotionCard, 
                    isExpired && styles.expiredCard
                ]}
                onPress={() => isAdmin && navigation.navigate("PromotionForm", { item })}
                activeOpacity={0.7}
            >
                <View style={styles.promotionHeader}>
                    <View style={styles.promotionTitleContainer}>
                        <Text style={styles.promotionTitle} numberOfLines={1}>
                            {item.title}
                        </Text>
                        {item.product && (
                            <Text style={styles.productName} numberOfLines={1}>
                                {item.product.name}
                            </Text>
                        )}
                    </View>
                    
                    <View style={[
                        styles.statusIndicator, 
                        isActive && styles.activeIndicator,
                        statusText === "UPCOMING" && styles.upcomingIndicator,
                        isExpired && styles.expiredIndicator
                    ]}>
                        <Text style={styles.statusText}>{statusText}</Text>
                    </View>
                </View>
                
                <View style={styles.promotionContent}>
                    <View style={styles.promotionDetails}>
                        <View style={styles.detailItem}>
                            <Icon name="pricetag-outline" size={16} color="#000" />
                            <Text style={styles.detailText}>
                                {item.discountPercentage}% discount
                            </Text>
                        </View>
                        
                        <View style={styles.detailItem}>
                            <Icon name="calendar-outline" size={16} color="#000" />
                            <Text style={styles.detailText}>
                                {formatDate(item.startDate)} — {formatDate(item.endDate)}
                            </Text>
                        </View>
                        
                        {isActive && daysRemaining > 0 && (
                            <View style={styles.daysRemainingBadge}>
                                <Text style={styles.daysRemainingText}>
                                    {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left
                                </Text>
                            </View>
                        )}
                    </View>
                    
                    {isAdmin && (
                        <View style={styles.actionButtons}>
                            <TouchableOpacity 
                                style={styles.actionButton}
                                onPress={() => navigation.navigate("PromotionForm", { item })}
                            >
                                <Icon name="create-outline" size={20} color="#000" />
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={styles.actionButton}
                                onPress={() => confirmDelete(item._id)}
                            >
                                <Icon name="trash-outline" size={20} color="#000" />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerTitle}>PROMOTIONS</Text>
                    {isAdmin && (
                        <TouchableOpacity 
                            style={styles.addButton}
                            onPress={() => navigation.navigate("PromotionForm")}
                        >
                            <Icon name="add" size={24} color="#fff" />
                        </TouchableOpacity>
                    )}
                </View>
                
                <Searchbar
                    placeholder="Search promotions..."
                    onChangeText={handleSearch}
                    value={searchQuery}
                    style={styles.searchbar}
                    inputStyle={styles.searchInput}
                    iconColor="#000"
                />
                
                <View style={styles.filterTabs}>
                    {['all', 'active', 'upcoming', 'expired'].map(type => (
                        <TouchableOpacity
                            key={type}
                            style={[
                                styles.filterTab,
                                filterType === type && styles.activeFilterTab
                            ]}
                            onPress={() => handleFilterChange(type)}
                        >
                            <Text style={[
                                styles.filterTabText,
                                filterType === type && styles.activeFilterTabText
                            ]}>
                                {type.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            
            {loading && !refreshing ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : filteredPromotions.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Icon name="pricetag-outline" size={56} color="#000" />
                    <Text style={styles.emptyText}>No promotions found</Text>
                    <Text style={styles.emptySubtext}>
                        {searchQuery 
                            ? "Try adjusting your search or filters"
                            : isAdmin 
                                ? "Create your first promotion to get started"
                                : "Check back later for special offers"
                        }
                    </Text>
                    
                    {isAdmin && (
                        <TouchableOpacity 
                            style={styles.emptyAddButton}
                            onPress={() => navigation.navigate("PromotionForm")}
                        >
                            <Text style={styles.emptyAddButtonText}>CREATE NEW PROMOTION</Text>
                        </TouchableOpacity>
                    )}
                </View>
            ) : (
                <FlatList
                    contentContainerStyle={styles.listContent}
                    data={filteredPromotions}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor="#000"
                            colors={["#000"]}
                        />
                    }
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        backgroundColor: "#fff",
        paddingTop: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    headerTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "900",
        letterSpacing: 1,
        color: "#000",
    },
    addButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    searchbar: {
        marginHorizontal: 20,
        marginBottom: 15,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        elevation: 0,
        height: 46,
    },
    searchInput: {
        fontSize: 14,
        color: "#000",
    },
    filterTabs: {
        flexDirection: "row",
        paddingHorizontal: 20,
    },
    filterTab: {
        marginRight: 20,
        paddingVertical: 8,
        borderBottomWidth: 2,
        borderBottomColor: "transparent",
    },
    activeFilterTab: {
        borderBottomColor: "#000",
    },
    filterTabText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#888",
        letterSpacing: 0.5,
    },
    activeFilterTabText: {
        color: "#000",
    },
    listContent: {
        padding: 16,
        paddingBottom: 30,
    },
    promotionCard: {
        marginBottom: 16,
        borderRadius: 10,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e0e0e0",
        overflow: "hidden",
    },
    expiredCard: {
        opacity: 0.7,
        backgroundColor: "#f9f9f9",
    },
    promotionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    promotionTitleContainer: {
        flex: 1,
    },
    promotionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#000",
        marginBottom: 4,
    },
    productName: {
        fontSize: 12,
        color: "#666",
    },
    statusIndicator: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        backgroundColor: "#f0f0f0",
    },
    activeIndicator: {
        backgroundColor: "#000",
    },
    upcomingIndicator: {
        backgroundColor: "#f0f0f0",
        borderWidth: 1,
        borderColor: "#000",
    },
    expiredIndicator: {
        backgroundColor: "#e0e0e0",
    },
    statusText: {
        fontSize: 10,
        fontWeight: "700",
        color: "#000",
        letterSpacing: 0.5,
    },
    promotionContent: {
        padding: 16,
    },
    promotionDetails: {
        marginBottom: 4,
    },
    detailItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    detailText: {
        fontSize: 14,
        color: "#333",
        marginLeft: 8,
    },
    daysRemainingBadge: {
        alignSelf: "flex-start",
        backgroundColor: "#000",
        borderRadius: 4,
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginTop: 6,
    },
    daysRemainingText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
    },
    actionButtons: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
    },
    actionButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        marginLeft: 10,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#000",
        marginTop: 24,
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginBottom: 30,
        maxWidth: width * 0.8,
    },
    emptyAddButton: {
        backgroundColor: "#000",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    emptyAddButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
        letterSpacing: 0.5,
    },
});

export default Promotions;