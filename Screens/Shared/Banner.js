import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, View, Text, ImageBackground } from "react-native";
import Swiper from "react-native-swiper";

var { width } = Dimensions.get("window");

const Banner = () => {
    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
        setBannerData([
            {
                image: "https://res.cloudinary.com/dlqclovym/image/upload/v1742722446/banner2_in23ta.jpg",
                title: "OUR BEST",
                subtitle: "COLLECTION",
                productName: "BLACK ROCK"
            },
            {
                image: "https://res.cloudinary.com/dlqclovym/image/upload/v1742722446/banner1_fcafuj.jpg",
                title: "NEW ARRIVAL",
                subtitle: "PREMIUM",
                productName: "GOLD EDITION"
            },
            {
                image: "https://res.cloudinary.com/dlqclovym/image/upload/v1742722446/banner1_fcafuj.jpg",
                title: "EXCLUSIVE",
                subtitle: "WATCHES",
                productName: "SILVER LINE"
            }
        ]);

        return () => {
            setBannerData([]);
        };
    }, []);

    return (
        <View style={styles.container}>
            <Swiper
                style={styles.swiper}
                showsButtons={false}
                autoplay={true}
                autoplayTimeout={4}
                paginationStyle={styles.pagination}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
            >
                {bannerData.map((item, index) => (
                    <ImageBackground
                        key={index}
                        style={styles.imageBanner}
                        source={{ uri: item.image }}
                        imageStyle={styles.imageBannerStyle}
                    >
                        <View style={styles.overlay}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.subtitle}>{item.subtitle}</Text>
                                <Text style={styles.productName}>{item.productName}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                ))}
            </Swiper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: width / 2,
        backgroundColor: 'white',
        paddingTop: 10,
    },
    swiper: {
        height: width / 2,
    },
    imageBanner: {
        height: "100%",
        width: width - 32,
        marginHorizontal: 16,
        justifyContent: "center",
    },
    imageBannerStyle: {
        borderRadius: 10,
    },
    overlay: {
        backgroundColor: "rgba(0,0,0,0.4)",
        height: "100%",
        width: "100%",
        borderRadius: 10,
        justifyContent: "center",
    },
    textContainer: {
        paddingHorizontal: 24,
    },
    title: {
        color: "white",
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 4,
    },
    subtitle: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 8,
    },
    productName: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
    },
    pagination: {
        bottom: 10,
    },
    dot: {
        backgroundColor: "#D9D9D9",
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
    },
    activeDot: {
        backgroundColor: "#000",
        width: 16,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
    },
});

export default Banner;