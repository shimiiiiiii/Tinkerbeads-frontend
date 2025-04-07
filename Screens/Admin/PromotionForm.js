import React, { useState, useEffect } from "react";
import {
    View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert,
    ScrollView, Modal, Dimensions
} from "react-native";
import { TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useAuth } from "../../Context/Auth";
import baseURL from '../../assets/common/baseUrl';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get('window');

const CustomDatePicker = ({ isVisible, onClose, onSelect, initialDate, minDate }) => {
    const [selectedDate, setSelectedDate] = useState(initialDate || new Date());
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 6 }, (_, i) => currentYear + i);
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

    const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth());
    const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
    const [selectedDay, setSelectedDay] = useState(selectedDate.getDate());

    useEffect(() => {
        const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
        if (selectedDay > daysInMonth) {
            setSelectedDay(daysInMonth);
        }
    }, [selectedMonth, selectedYear]);

    const handleConfirm = () => {
        const newDate = new Date(selectedYear, selectedMonth, selectedDay);
        if (minDate && newDate < minDate) {
            Alert.alert("Invalid Date", "Please select a date after the minimum allowed date.");
            return;
        }
        onSelect(newDate);
        onClose();
    };

    if (!isVisible) return null;
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={customDatePickerStyles.overlay}>
                <View style={customDatePickerStyles.container}>
                    <View style={customDatePickerStyles.headerSection}>
                        <View style={customDatePickerStyles.headerBar}>
                            <Text style={customDatePickerStyles.headerTitle}>Date Selection</Text>
                            <TouchableOpacity onPress={onClose} style={customDatePickerStyles.closeButton}>
                                <Ionicons name="close-outline" size={28} color="black" />
                            </TouchableOpacity>
                        </View>
                        <Text style={customDatePickerStyles.selectedDateText}>
                            {new Date(selectedYear, selectedMonth, selectedDay).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </Text>
                    </View>
                    
                    <View style={customDatePickerStyles.selectionArea}>
                        <View style={customDatePickerStyles.selectionRow}>
                            <View style={customDatePickerStyles.selector}>
                                <Text style={customDatePickerStyles.selectorLabel}>Month</Text>
                                <ScrollView 
                                    style={customDatePickerStyles.scrollPicker} 
                                    showsVerticalScrollIndicator={false}
                                >
                                    {months.map((month, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                customDatePickerStyles.optionItem,
                                                selectedMonth === index && customDatePickerStyles.selectedOptionItem
                                            ]}
                                            onPress={() => setSelectedMonth(index)}
                                        >
                                            <Text style={[
                                                customDatePickerStyles.optionText,
                                                selectedMonth === index && customDatePickerStyles.selectedOptionText
                                            ]}>
                                                {month}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                            
                            <View style={customDatePickerStyles.selector}>
                                <Text style={customDatePickerStyles.selectorLabel}>Day</Text>
                                <ScrollView 
                                    style={customDatePickerStyles.scrollPicker} 
                                    showsVerticalScrollIndicator={false}
                                >
                                    {days.map((day) => (
                                        <TouchableOpacity
                                            key={day}
                                            style={[
                                                customDatePickerStyles.optionItem,
                                                selectedDay === day && customDatePickerStyles.selectedOptionItem
                                            ]}
                                            onPress={() => setSelectedDay(day)}
                                        >
                                            <Text style={[
                                                customDatePickerStyles.optionText,
                                                selectedDay === day && customDatePickerStyles.selectedOptionText
                                            ]}>
                                                {day}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                            
                            <View style={customDatePickerStyles.selector}>
                                <Text style={customDatePickerStyles.selectorLabel}>Year</Text>
                                <ScrollView 
                                    style={customDatePickerStyles.scrollPicker} 
                                    showsVerticalScrollIndicator={false}
                                >
                                    {years.map((year) => (
                                        <TouchableOpacity
                                            key={year}
                                            style={[
                                                customDatePickerStyles.optionItem,
                                                selectedYear === year && customDatePickerStyles.selectedOptionItem
                                            ]}
                                            onPress={() => setSelectedYear(year)}
                                        >
                                            <Text style={[
                                                customDatePickerStyles.optionText,
                                                selectedYear === year && customDatePickerStyles.selectedOptionText
                                            ]}>
                                                {year}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                    
                    <TouchableOpacity 
                        style={customDatePickerStyles.confirmButton}
                        onPress={handleConfirm}
                    >
                        <Text style={customDatePickerStyles.confirmButtonText}>CONFIRM</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const PromotionForm = (props) => {
    const { user, token } = useAuth();
    const navigation = useNavigation();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [product, setProduct] = useState('');
    const [products, setProducts] = useState([]);
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
    const [error, setError] = useState('');
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        if (user && user.role !== 'admin') {
            Alert.alert("Access Denied", "Only admin users can access this screen");
            navigation.navigate('MainNavigator');
        }
    }, [user]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoadingProducts(true);
                const response = await fetch(`${baseURL}/product/get/all`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const result = await response.json();

                if (response.ok) {
                    setProducts(result.products || []);
                } else {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Failed to load products",
                        text2: result.message || "Please try again later"
                    });
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Network error",
                    text2: "Please check your connection"
                });
                setProducts([]);
            } finally {
                setLoadingProducts(false);
            }
        };

        fetchProducts();
    }, [token]);

    useEffect(() => {
        if (!props.route.params) {
            setItem(null);
        } else {
            const itemData = props.route.params.item;
            setItem(itemData);
            setTitle(itemData.title);
            setDescription(itemData.description || '');
            setProduct(itemData.product ? itemData.product._id : '');
            setDiscountPercentage(itemData.discountPercentage.toString());
            setStartDate(new Date(itemData.startDate));
            setEndDate(new Date(itemData.endDate));
        }
    }, [props.route.params]);

    const handleStartDateSelect = (date) => {
        setStartDate(date);
        if (endDate < date) {
            setEndDate(new Date(date.getTime() + 24 * 60 * 60 * 1000));
        }
    };

    const handleEndDateSelect = (date) => {
        setEndDate(date);
    };

    const validateCurrentStep = () => {
        if (currentStep === 1) {
            if (title === "") {
                setError("Please enter a promotion title");
                return false;
            }
            if (description === "") {
                setError("Please provide a description");
                return false;
            }
            setError("");
            return true;
        } else if (currentStep === 2) {
            if (product === "") {
                setError("Please select a product");
                return false;
            }
            if (discountPercentage === "") {
                setError("Please enter a discount percentage");
                return false;
            }
            
            const discountValue = parseFloat(discountPercentage);
            if (isNaN(discountValue) || discountValue <= 0 || discountValue > 100) {
                setError("Discount percentage must be between 1 and 100");
                return false;
            }
            
            setError("");
            return true;
        } else if (currentStep === 3) {
            if (startDate >= endDate) {
                setError("End date must be after start date");
                return false;
            }
            setError("");
            return true;
        }
        
        return false;
    };

    const handleNext = () => {
        if (validateCurrentStep()) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    const validateForm = () => {
        if (title === "" || product === "" || discountPercentage === "") {
            setError("Please fill in all required fields");
            return false;
        }

        const discountValue = parseFloat(discountPercentage);
        if (isNaN(discountValue) || discountValue <= 0 || discountValue > 100) {
            setError("Discount percentage must be between 1 and 100");
            return false;
        }

        if (startDate >= endDate) {
            setError("End date must be after start date");
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);

        const promotionData = {
            title,
            description,
            product,
            discountPercentage: parseFloat(discountPercentage),
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            isActive: true
        };

        try {
            if (item !== null) {
                await fetch(`${baseURL}/promotions/${item._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(promotionData)
                });

                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Promotion successfully updated",
                    text2: ""
                });
            } else {
                await fetch(`${baseURL}/promotions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(promotionData)
                });

                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "New promotion added",
                    text2: ""
                });
            }

            setTimeout(() => {
                navigation.navigate("Promotions");
            }, 2000);
        } catch (error) {
            console.log(error);
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Failed to process promotion",
                text2: "Please try again"
            });
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        return date.toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Basic Information</Text>
                        <Text style={styles.stepDescription}>
                            Enter the promotional details that customers will see
                        </Text>
                        
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Promotion Title</Text>
                            <TextInput
                                mode="flat"
                                placeholder="E.g. Summer Sale, Holiday Special"
                                value={title}
                                onChangeText={setTitle}
                                style={styles.textInput}
                                underlineColor="#e0e0e0"
                                activeUnderlineColor="#000"
                                theme={{ colors: { text: '#000', placeholder: '#999' } }}
                                maxLength={60}
                            />
                        </View>
                        
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Description</Text>
                            <TextInput
                                mode="flat"
                                placeholder="Describe what makes this promotion special"
                                value={description}
                                onChangeText={setDescription}
                                multiline={true}
                                numberOfLines={4}
                                style={styles.textArea}
                                underlineColor="#e0e0e0"
                                activeUnderlineColor="#000"
                                theme={{ colors: { text: '#000', placeholder: '#999' } }}
                            />
                        </View>
                    </View>
                );
                
            case 2:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Discount Details</Text>
                        <Text style={styles.stepDescription}>
                            Select the product and set the discount percentage
                        </Text>
                        
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Select Product</Text>
                            {loadingProducts ? (
                                <View style={styles.loadingContainer}>
                                    <ActivityIndicator size="small" color="#000" />
                                    <Text style={styles.loadingText}>Loading products...</Text>
                                </View>
                            ) : (
                                <View style={styles.pickerBox}>
                                    <Picker
                                        selectedValue={product}
                                        onValueChange={setProduct}
                                        style={styles.picker}
                                        dropdownIconColor="#000"
                                    >
                                        <Picker.Item label="Choose a product" value="" />
                                        {products && products.length > 0 ? (
                                            products.map((prod) => (
                                                <Picker.Item
                                                    key={prod._id}
                                                    label={prod.name}
                                                    value={prod._id}
                                                />
                                            ))
                                        ) : (
                                            <Picker.Item label="No products available" value="" enabled={false} />
                                        )}
                                    </Picker>
                                </View>
                            )}
                        </View>
                        
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Discount Percentage</Text>
                            <View style={styles.discountInputContainer}>
                                <TextInput
                                    mode="flat"
                                    placeholder="Enter a value between 1-100"
                                    value={discountPercentage}
                                    keyboardType="numeric"
                                    onChangeText={setDiscountPercentage}
                                    style={styles.discountInput}
                                    underlineColor="#e0e0e0"
                                    activeUnderlineColor="#000"
                                    theme={{ colors: { text: '#000', placeholder: '#999' } }}
                                />
                                <View style={styles.percentageIndicator}>
                                    <Text style={styles.percentageText}>%</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                );
                
            case 3:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Promotion Duration</Text>
                        <Text style={styles.stepDescription}>
                            Set the start and end dates for this promotion
                        </Text>
                        
                        <View style={styles.dateSelectionContainer}>
                            <View style={styles.dateBox}>
                                <Text style={styles.dateBoxTitle}>Start Date</Text>
                                <TouchableOpacity
                                    style={styles.datePickerButton}
                                    onPress={() => setShowStartDatePicker(true)}
                                >
                                    <Text style={styles.dateValue}>{formatDate(startDate)}</Text>
                                    <Ionicons name="calendar" size={22} color="#000" />
                                </TouchableOpacity>
                            </View>
                            
                            <View style={styles.dateArrow}>
                                <Ionicons name="arrow-forward" size={24} color="#000" />
                            </View>
                            
                            <View style={styles.dateBox}>
                                <Text style={styles.dateBoxTitle}>End Date</Text>
                                <TouchableOpacity
                                    style={styles.datePickerButton}
                                    onPress={() => setShowEndDatePicker(true)}
                                >
                                    <Text style={styles.dateValue}>{formatDate(endDate)}</Text>
                                    <Ionicons name="calendar" size={22} color="#000" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        <View style={styles.durationInfo}>
                            <Text style={styles.durationText}>
                                Duration: {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))} days
                            </Text>
                        </View>
                        
                        <View style={styles.summarySection}>
                            <Text style={styles.summaryTitle}>Promotion Summary</Text>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>Title:</Text>
                                <Text style={styles.summaryValue}>{title}</Text>
                            </View>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>Product:</Text>
                                <Text style={styles.summaryValue}>
                                    {products.find(p => p._id === product)?.name || 'None selected'}
                                </Text>
                            </View>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>Discount:</Text>
                                <Text style={styles.summaryValue}>{discountPercentage}%</Text>
                            </View>
                        </View>
                    </View>
                );
                
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Promotions')}
                >
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>{item ? "Edit Promotion" : "New Promotion"}</Text>
                <View style={{width: 24}} />
            </View>
            
            <View style={styles.progressContainer}>
                <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${(currentStep / 3) * 100}%` }]} />
                </View>
                <View style={styles.stepsIndicator}>
                    <View style={styles.stepRow}>
                        {[1, 2, 3].map((step) => (
                            <View key={step} style={styles.stepIndicatorContainer}>
                                <View 
                                    style={[
                                        styles.stepIndicator, 
                                        currentStep >= step ? styles.activeStep : {}
                                    ]}
                                >
                                    <Text 
                                        style={[
                                            styles.stepNumber, 
                                            currentStep >= step ? styles.activeStepNumber : {}
                                        ]}
                                    >
                                        {step}
                                    </Text>
                                </View>
                                <Text style={styles.stepLabel}>
                                    {step === 1 ? 'Basics' : step === 2 ? 'Discount' : 'Duration'}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
            
            <KeyboardAwareScrollView 
                style={styles.formScroll}
                enableOnAndroid={true}
                showsVerticalScrollIndicator={false}
            >
                {renderStep()}
                
                {error ? (
                    <View style={styles.errorContainer}>
                        <Ionicons name="alert-circle" size={20} color="#c62828" />
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                ) : null}
            </KeyboardAwareScrollView>
            
            <View style={styles.navigationButtons}>
                {currentStep > 1 ? (
                    <TouchableOpacity
                        style={styles.navButton}
                        onPress={handleBack}
                    >
                        <Ionicons name="chevron-back" size={20} color="#000" />
                        <Text style={styles.navButtonText}>Back</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.navButton}
                        onPress={() => navigation.navigate('Promotions')}
                    >
                        <Ionicons name="close" size={20} color="#000" />
                        <Text style={styles.navButtonText}>Cancel</Text>
                    </TouchableOpacity>
                )}
                
                {currentStep < 3 ? (
                    <TouchableOpacity
                        style={[styles.navButton, styles.primaryButton]}
                        onPress={handleNext}
                    >
                        <Text style={[styles.navButtonText, styles.primaryButtonText]}>Continue</Text>
                        <Ionicons name="chevron-forward" size={20} color="#fff" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={[styles.navButton, styles.primaryButton]}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <>
                                <Text style={[styles.navButtonText, styles.primaryButtonText]}>
                                    {item ? "Update Promotion" : "Create Promotion"}
                                </Text>
                                <Ionicons name="checkmark" size={20} color="#fff" />
                            </>
                        )}
                    </TouchableOpacity>
                )}
            </View>
            
            <CustomDatePicker
                isVisible={showStartDatePicker}
                onClose={() => setShowStartDatePicker(false)}
                onSelect={handleStartDateSelect}
                initialDate={startDate}
                minDate={new Date()}
            />

            <CustomDatePicker
                isVisible={showEndDatePicker}
                onClose={() => setShowEndDatePicker(false)}
                onSelect={handleEndDateSelect}
                initialDate={endDate}
                minDate={new Date(startDate.getTime() + 24 * 60 * 60 * 1000)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        padding: 5,
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    progressContainer: {
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 5,
        backgroundColor: '#fff',
    },
    progressTrack: {
        height: 4,
        backgroundColor: '#f0f0f0',
        borderRadius: 2,
        marginBottom: 15,
    },
    progressFill: {
        height: 4,
        backgroundColor: '#000',
        borderRadius: 2,
    },
    stepsIndicator: {
        marginBottom: 10,
    },
    stepRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stepIndicatorContainer: {
        alignItems: 'center',
    },
    stepIndicator: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    activeStep: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    stepNumber: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
    },
    activeStepNumber: {
        color: '#fff',
    },
    stepLabel: {
        fontSize: 12,
        color: '#666',
    },
    formScroll: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    stepContainer: {
        padding: 20,
        backgroundColor: '#fff',
        marginHorizontal: 0,
        marginBottom: 20,
    },
    stepTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
    },
    stepDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 24,
    },
    inputWrapper: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        marginBottom: 8,
    },
    textInput: {
        backgroundColor: '#fff',
        fontSize: 16,
    },
    textArea: {
        backgroundColor: '#fff',
        fontSize: 16,
        minHeight: 120,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    loadingText: {
        marginLeft: 10,
        color: '#666',
    },
    pickerBox: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    picker: {
        height: 50,
        color: '#000',
    },
    discountInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    discountInput: {
        flex: 1,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    percentageIndicator: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentageText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
    },
    dateSelectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    dateBox: {
        flex: 1,
    },
    dateBoxTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        marginBottom: 8,
    },
    datePickerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    dateValue: {
        fontSize: 15,
        color: '#000',
    },
    dateArrow: {
        paddingHorizontal: 10,
    },
    durationInfo: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        marginBottom: 24,
    },
    durationText: {
        fontSize: 14,
        color: '#666',
    },
    summarySection: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 8,
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 12,
    },
    summaryItem: {
        flexDirection: 'row',
        paddingVertical: 5,
    },
    summaryLabel: {
        width: 80,
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
    },
    summaryValue: {
        flex: 1,
        fontSize: 14,
        color: '#000',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffebee',
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 15,
        borderRadius: 8,
    },
    errorText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#c62828',
        flex: 1,
    },
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: '#fff',
    },
    navButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        backgroundColor: '#fff',
        minWidth: 100,
    },
    navButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
        marginHorizontal: 4,
    },
    primaryButton: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    primaryButtonText: {
        color: '#fff',
    },
});

const customDatePickerStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: width * 0.9,
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
    },
    headerSection: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    closeButton: {
        padding: 5,
    },
    selectedDateText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    selectionArea: {
        padding: 16,
    },
    selectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    selector: {
        flex: 1,
        marginHorizontal: 4,
    },
    selectorLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        textAlign: 'center',
        marginBottom: 8,
    },
    scrollPicker: {
        height: 200,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    optionItem: {
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    selectedOptionItem: {
        backgroundColor: '#000',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    selectedOptionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    confirmButton: {
        margin: 16,
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});

export default PromotionForm;