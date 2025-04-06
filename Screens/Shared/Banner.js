// import React, { useState, useEffect } from "react";
// import { Image, StyleSheet, Dimensions, View, Text, ImageBackground } from "react-native";
// import Swiper from "react-native-swiper";

// var { width } = Dimensions.get("window");

// const Banner = () => {
//     const [bannerData, setBannerData] = useState([]);

//     useEffect(() => {
//         setBannerData([
//             {
//                 image: "https://res.cloudinary.com/dlqclovym/image/upload/v1742722446/banner2_in23ta.jpg",
//                 title: "OUR BEST",
//                 subtitle: "COLLECTION",
//                 productName: "BLACK ROCK"
//             },
//             {
//                 image: "https://res.cloudinary.com/dlqclovym/image/upload/v1742722446/banner1_fcafuj.jpg",
//                 title: "NEW ARRIVAL",
//                 subtitle: "PREMIUM",
//                 productName: "GOLD EDITION"
//             },
//             {
//                 image: "https://res.cloudinary.com/dlqclovym/image/upload/v1742722446/banner1_fcafuj.jpg",
//                 title: "EXCLUSIVE",
//                 subtitle: "WATCHES",
//                 productName: "SILVER LINE"
//             }
//         ]);

//         return () => {
//             setBannerData([]);
//         };
//     }, []);

//     return (
//         <View style={styles.container}>
//             <Swiper
//                 style={styles.swiper}
//                 showsButtons={false}
//                 autoplay={true}
//                 autoplayTimeout={4}
//                 paginationStyle={styles.pagination}
//                 dotStyle={styles.dot}
//                 activeDotStyle={styles.activeDot}
//             >
//                 {bannerData.map((item, index) => (
//                     <ImageBackground
//                         key={index}
//                         style={styles.imageBanner}
//                         source={{ uri: item.image }}
//                         imageStyle={styles.imageBannerStyle}
//                     >
//                         <View style={styles.overlay}>
//                             <View style={styles.textContainer}>
//                                 <Text style={styles.title}>{item.title}</Text>
//                                 <Text style={styles.subtitle}>{item.subtitle}</Text>
//                                 <Text style={styles.productName}>{item.productName}</Text>
//                             </View>
//                         </View>
//                     </ImageBackground>
//                 ))}
//             </Swiper>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         height: width / 2,
//         backgroundColor: 'white',
//         paddingTop: 10,
//     },
//     swiper: {
//         height: width / 2,
//     },
//     imageBanner: {
//         height: "100%",
//         width: width - 32,
//         marginHorizontal: 16,
//         justifyContent: "center",
//     },
//     imageBannerStyle: {
//         borderRadius: 10,
//     },
//     overlay: {
//         backgroundColor: "rgba(0,0,0,0.4)",
//         height: "100%",
//         width: "100%",
//         borderRadius: 10,
//         justifyContent: "center",
//     },
//     textContainer: {
//         paddingHorizontal: 24,
//     },
//     title: {
//         color: "white",
//         fontSize: 14,
//         fontWeight: "600",
//         marginBottom: 4,
//     },
//     subtitle: {
//         color: "white",
//         fontSize: 22,
//         fontWeight: "bold",
//         marginBottom: 8,
//     },
//     productName: {
//         color: "white",
//         fontSize: 30,
//         fontWeight: "bold",
//     },
//     pagination: {
//         bottom: 10,
//     },
//     dot: {
//         backgroundColor: "#D9D9D9",
//         width: 8,
//         height: 8,
//         borderRadius: 4,
//         marginLeft: 3,
//         marginRight: 3,
//     },
//     activeDot: {
//         backgroundColor: "#000",
//         width: 16,
//         height: 8,
//         borderRadius: 4,
//         marginLeft: 3,
//         marginRight: 3,
//     },
// });

// export default Banner;

//WITH COLORS AND ANIMATIONS
// import React, { useState, useEffect, useRef } from "react";
// import { 
//   StyleSheet, 
//   Dimensions, 
//   View, 
//   Text, 
//   Image, 
//   TouchableOpacity, 
//   Animated, 
//   PanResponder,
//   ImageBackground,
//   Easing
// } from "react-native";
// import { AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// const { width, height } = Dimensions.get("window");

// const BRAND_COLOR = "#584e51";
// const PALETTE = {
//   primary: BRAND_COLOR,
//   secondary: "#bcaaa4",
//   accent1: "#8d6e63",
//   accent2: "#a1887f",
//   light: "#d7ccc8",
//   dark: "#3e2723",
//   white: "#ffffff",
//   black: "#212121"
// };

// const FloatingElement = ({ style, color, size, speed, delay, maxShift }) => {
//   const moveAnim = useRef(new Animated.Value(0)).current;
//   const rotateAnim = useRef(new Animated.Value(0)).current;
//   const opacityAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(0.8)).current;
  
//   useEffect(() => {
//     Animated.timing(opacityAnim, {
//       toValue: 0.8,
//       duration: 1000,
//       delay,
//       useNativeDriver: true
//     }).start();
    
//     Animated.spring(scaleAnim, {
//       toValue: 1,
//       friction: 7,
//       delay: delay + 100,
//       useNativeDriver: true
//     }).start();
    
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(moveAnim, {
//           toValue: 1,
//           duration: speed,
//           easing: Easing.bezier(0.25, 0.1, 0.25, 1),
//           useNativeDriver: true
//         }),
//         Animated.timing(moveAnim, {
//           toValue: 0,
//           duration: speed,
//           easing: Easing.bezier(0.25, 0.1, 0.25, 1),
//           useNativeDriver: true
//         })
//       ])
//     ).start();
    
//     Animated.loop(
//       Animated.timing(rotateAnim, {
//         toValue: 1,
//         duration: speed * 3,
//         easing: Easing.linear,
//         useNativeDriver: true
//       })
//     ).start();
//   }, []);
  
//   return (
//     <Animated.View
//       style={[
//         style,
//         {
//           width: size,
//           height: size,
//           borderRadius: size / 2,
//           backgroundColor: color,
//           transform: [
//             {
//               translateY: moveAnim.interpolate({
//                 inputRange: [0, 0.5, 1],
//                 outputRange: [0, maxShift, 0]
//               })
//             },
//             {
//               translateX: moveAnim.interpolate({
//                 inputRange: [0, 0.3, 0.7, 1],
//                 outputRange: [0, maxShift/2, -maxShift/2, 0]
//               })
//             },
//             {
//               rotate: rotateAnim.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: ['0deg', '360deg']
//               })
//             },
//             { scale: scaleAnim }
//           ],
//           opacity: opacityAnim
//         }
//       ]}
//     />
//   );
// };

// const MorphingShape = ({ style, color, size, morphSpeed }) => {
//   const shapeAnim = useRef(new Animated.Value(0)).current;
  
//   useEffect(() => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(shapeAnim, {
//           toValue: 1,
//           duration: morphSpeed,
//           easing: Easing.bezier(0.4, 0, 0.2, 1),
//           useNativeDriver: false
//         }),
//         Animated.timing(shapeAnim, {
//           toValue: 2,
//           duration: morphSpeed,
//           easing: Easing.bezier(0.4, 0, 0.2, 1),
//           useNativeDriver: false
//         }),
//         Animated.timing(shapeAnim, {
//           toValue: 3,
//           duration: morphSpeed,
//           easing: Easing.bezier(0.4, 0, 0.2, 1),
//           useNativeDriver: false
//         }),
//         Animated.timing(shapeAnim, {
//           toValue: 0,
//           duration: morphSpeed,
//           easing: Easing.bezier(0.4, 0, 0.2, 1),
//           useNativeDriver: false
//         })
//       ])
//     ).start();
//   }, []);
  
//   const borderRadius = shapeAnim.interpolate({
//     inputRange: [0, 1, 2, 3],
//     outputRange: [size/2, size/8, size/2, 0]
//   });
  
//   const rotate = shapeAnim.interpolate({
//     inputRange: [0, 1, 2, 3],
//     outputRange: ['0deg', '45deg', '0deg', '0deg']
//   });
  
//   const width = shapeAnim.interpolate({
//     inputRange: [0, 1, 2, 3],
//     outputRange: [size, size * 1.2, size * 0.8, size * 1.1]
//   });
  
//   const height = shapeAnim.interpolate({
//     inputRange: [0, 1, 2, 3],
//     outputRange: [size, size * 0.8, size * 1.2, size * 0.9]
//   });
  
//   return (
//     <Animated.View
//       style={[
//         style,
//         {
//           width,
//           height,
//           borderRadius,
//           backgroundColor: color,
//           transform: [{ rotate }]
//         }
//       ]}
//     />
//   );
// };

// const RevealingText = ({ text, style, delay = 0, duration = 1500 }) => {
//   const [characters, setCharacters] = useState([]);
  
//   useEffect(() => {
//     const chars = text.split('').map((char, index) => {
//       return {
//         char,
//         opacity: new Animated.Value(0),
//         translateY: new Animated.Value(10)
//       };
//     });
    
//     setCharacters(chars);
    
//     chars.forEach((char, index) => {
//       Animated.parallel([
//         Animated.timing(char.opacity, {
//           toValue: 1,
//           duration: duration / 2,
//           delay: delay + (index * (duration / (text.length * 2))),
//           useNativeDriver: true
//         }),
//         Animated.timing(char.translateY, {
//           toValue: 0,
//           duration: duration / 2,
//           delay: delay + (index * (duration / (text.length * 2))),
//           useNativeDriver: true
//         })
//       ]).start();
//     });
//   }, [text]);
  
//   return (
//     <View style={{ flexDirection: 'row' }}>
//       {characters.map((char, index) => (
//         <Animated.Text
//           key={`${char.char}-${index}`}
//           style={[
//             style,
//             {
//               opacity: char.opacity,
//               transform: [{ translateY: char.translateY }]
//             }
//           ]}
//         >
//           {char.char}
//         </Animated.Text>
//       ))}
//     </View>
//   );
// };

// const Banner = ({ onProductPress }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isInteracting, setIsInteracting] = useState(false);
//   const [isTextAnimating, setIsTextAnimating] = useState(true);
  
//   // Animation refs
//   const fadeAnim = useRef(new Animated.Value(1)).current;
//   const scaleAnim = useRef(new Animated.Value(1)).current;
//   const translateYAnim = useRef(new Animated.Value(0)).current;
//   const translateXAnim = useRef(new Animated.Value(0)).current;
//   const rotateAnim = useRef(new Animated.Value(0)).current;
//   const progressAnim = useRef(new Animated.Value(0)).current;
  
//   const tiltXAnim = useRef(new Animated.Value(0)).current;
//   const tiltYAnim = useRef(new Animated.Value(0)).current;
  
//   const parallaxAnim = useRef(new Animated.Value(0)).current;
  
//   const pulseAnim = useRef(new Animated.Value(1)).current;
  
//   const bannerData = [
//     {
//       id: '1',
//       image: "https://res.cloudinary.com/tinkerbeads/image/upload/v1743933929/487830721_1717746942509884_2681236726868176947_n_hc7hr7.png",
//       bgGradient: ["#3e2723", "#4e342e", PALETTE.primary],
//       accentColor: PALETTE.secondary,
//       secondaryColor: PALETTE.accent1,
//       title: "ARTISAN",
//       tagline: "Handcrafted Elegance",
//       price: "49.99",
//       discount: "30% OFF",
//       featureIcon: "diamond-stone",
//       patternType: "dot"
//     },
//     {
//       id: '2',
//       image: "https://res.cloudinary.com/tinkerbeads/image/upload/v1743933929/486735525_2059434014467745_2771512422976388246_n_dkkcm7.png",
//       bgGradient: ["#263238", "#37474f", PALETTE.primary],
//       accentColor: PALETTE.accent2,
//       secondaryColor: PALETTE.light,
//       title: "HERITAGE",
//       tagline: "Timeless Collection",
//       price: "59.99",
//       discount: "NEW ARRIVAL",
//       featureIcon: "crown",
//       patternType: "line"
//     },
//     {
//       id: '3',
//       image: "https://res.cloudinary.com/tinkerbeads/image/upload/v1743934393/482156267_3828549747409050_6130955109232268353_n_wacjro.png",
//       bgGradient: ["#1a1a1a", "#303030", PALETTE.primary],
//       accentColor: PALETTE.light,
//       secondaryColor: PALETTE.accent1,
//       title: "LUXE",
//       tagline: "Premium Selection",
//       price: "69.99",
//       discount: "LIMITED EDITION",
//       featureIcon: "star-four-points",
//       patternType: "circle"
//     }
//   ];

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderGrant: () => {
//         setIsInteracting(true);
//         setIsTextAnimating(true);
//       },
//       onPanResponderMove: (evt, gestureState) => {
//         const { moveX, moveY } = gestureState;
//         const centerX = width / 2;
//         const centerY = height * 0.15;
//         const tiltX = (moveX - centerX) / centerX * 0.15;
//         const tiltY = (moveY - centerY) / centerY * 0.15;
        
//         tiltXAnim.setValue(tiltX);
//         tiltYAnim.setValue(tiltY);
        
//         parallaxAnim.setValue(tiltX * 10);
//       },
//       onPanResponderRelease: () => {
//         setIsInteracting(false);
//         Animated.parallel([
//           Animated.spring(tiltXAnim, {
//             toValue: 0,
//             friction: 6,
//             useNativeDriver: true
//           }),
//           Animated.spring(tiltYAnim, {
//             toValue: 0,
//             friction: 6,
//             useNativeDriver: true
//           }),
//           Animated.spring(parallaxAnim, {
//             toValue: 0,
//             friction: 6,
//             useNativeDriver: true
//           })
//         ]).start();
//       }
//     })
//   ).current;

//   const animateToNext = () => {
//     if (isInteracting) return;
    
//     setIsTextAnimating(true);
    
//     Animated.sequence([
//       Animated.parallel([
//         Animated.timing(fadeAnim, {
//           toValue: 0.3,
//           duration: 300,
//           useNativeDriver: true,
//         }),
//         Animated.timing(scaleAnim, {
//           toValue: 0.9,
//           duration: 300,
//           useNativeDriver: true,
//         }),
//         Animated.timing(translateYAnim, {
//           toValue: 10,
//           duration: 300,
//           useNativeDriver: true,
//         }),
//         Animated.timing(rotateAnim, {
//           toValue: 0.05,
//           duration: 300,
//           useNativeDriver: true,
//         })
//       ]),
      
//       Animated.timing(translateXAnim, {
//         toValue: -width,
//         duration: 300,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//     ]).start(() => {
//       setCurrentIndex(prev => (prev < bannerData.length - 1 ? prev + 1 : 0));
      
//       fadeAnim.setValue(0.3);
//       scaleAnim.setValue(1.1);
//       translateYAnim.setValue(-15);
//       translateXAnim.setValue(width);
//       rotateAnim.setValue(-0.05);
      
//       Animated.sequence([
//         Animated.timing(translateXAnim, {
//           toValue: 0,
//           duration: 400,
//           easing: Easing.out(Easing.back(1.5)),
//           useNativeDriver: true,
//         }),
        
//         Animated.parallel([
//           Animated.timing(fadeAnim, {
//             toValue: 1,
//             duration: 300,
//             useNativeDriver: true,
//           }),
//           Animated.spring(scaleAnim, {
//             toValue: 1,
//             friction: 8,
//             useNativeDriver: true,
//           }),
//           Animated.timing(translateYAnim, {
//             toValue: 0,
//             duration: 300,
//             useNativeDriver: true,
//           }),
//           Animated.timing(rotateAnim, {
//             toValue: 0,
//             duration: 300,
//             useNativeDriver: true,
//           })
//         ])
//       ]).start(() => {
//         startProgressAnimation();
//         startPulseAnimation();
//       });
//     });
//   };

//   useEffect(() => {
//     startProgressAnimation();
//     startPulseAnimation();
    
//     const interval = setInterval(() => {
//       if (!isInteracting) {
//         animateToNext();
//       }
//     }, 9000);
    
//     return () => clearInterval(interval);
//   }, [isInteracting]);

//   const startProgressAnimation = () => {
//     progressAnim.setValue(0);
//     Animated.timing(progressAnim, {
//       toValue: 1,
//       duration: 6000,
//       easing: Easing.linear,
//       useNativeDriver: false,
//     }).start();
//   };
  
//   const startPulseAnimation = () => {
//     pulseAnim.setValue(1);
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(pulseAnim, {
//           toValue: 1.1,
//           duration: 1000,
//           easing: Easing.bezier(0.4, 0, 0.2, 1),
//           useNativeDriver: true
//         }),
//         Animated.timing(pulseAnim, {
//           toValue: 1,
//           duration: 1000,
//           easing: Easing.bezier(0.4, 0, 0.2, 1),
//           useNativeDriver: true
//         })
//       ])
//     ).start();
//   };

//   const goToNext = () => animateToNext();
  
//   const goToPrev = () => {
//     if (isInteracting) return;
    
//     setIsTextAnimating(true);
    
//     Animated.sequence([
//       Animated.parallel([
//         Animated.timing(fadeAnim, {
//           toValue: 0.3,
//           duration: 300,
//           useNativeDriver: true,
//         }),
//         Animated.timing(scaleAnim, {
//           toValue: 0.9,
//           duration: 300,
//           useNativeDriver: true,
//         }),
//         Animated.timing(translateYAnim, {
//           toValue: 10,
//           duration: 300,
//           useNativeDriver: true,
//         }),
//         Animated.timing(rotateAnim, {
//           toValue: -0.05,
//           duration: 300,
//           useNativeDriver: true,
//         })
//       ]),
      
//       Animated.timing(translateXAnim, {
//         toValue: width,
//         duration: 300,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//     ]).start(() => {
//       setCurrentIndex(prev => (prev > 0 ? prev - 1 : bannerData.length - 1));
      
//       fadeAnim.setValue(0.3);
//       scaleAnim.setValue(1.1);
//       translateYAnim.setValue(-15);
//       translateXAnim.setValue(-width);
//       rotateAnim.setValue(0.05);
      
//       Animated.sequence([
//         Animated.timing(translateXAnim, {
//           toValue: 0,
//           duration: 400,
//           easing: Easing.out(Easing.back(1.5)),
//           useNativeDriver: true,
//         }),
        
//         Animated.parallel([
//           Animated.timing(fadeAnim, {
//             toValue: 1,
//             duration: 300,
//             useNativeDriver: true,
//           }),
//           Animated.spring(scaleAnim, {
//             toValue: 1,
//             friction: 8,
//             useNativeDriver: true,
//           }),
//           Animated.timing(translateYAnim, {
//             toValue: 0,
//             duration: 300,
//             useNativeDriver: true,
//           }),
//           Animated.timing(rotateAnim, {
//             toValue: 0,
//             duration: 300,
//             useNativeDriver: true,
//           })
//         ])
//       ]).start(() => {
//         startProgressAnimation();
//         startPulseAnimation();
//       });
//     });
//   };

//   const currentBanner = bannerData[currentIndex];
  
//   const transformStyle = {
//     transform: [
//       { perspective: 800 },
//       { rotateX: tiltYAnim.interpolate({
//           inputRange: [-0.15, 0.15],
//           outputRange: ['10deg', '-10deg']
//         })
//       },
//       { rotateY: tiltXAnim.interpolate({
//           inputRange: [-0.15, 0.15],
//           outputRange: ['-10deg', '10deg']
//         })
//       },
//       { scale: scaleAnim },
//       { translateX: translateXAnim },
//       { translateY: translateYAnim },
//       { rotate: rotateAnim.interpolate({
//           inputRange: [-0.05, 0, 0.05],
//           outputRange: ['-5deg', '0deg', '5deg']
//         })
//       }
//     ]
//   };

//   const lightingStyle = {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'white',
//     opacity: tiltXAnim.interpolate({
//       inputRange: [-0.15, 0, 0.15],
//       outputRange: [0.05, 0, 0.05]
//     })
//   };
  
//   const renderPatterns = () => {
//     const patternElements = [];
    
//     if (currentBanner.patternType === 'dot') {
//       for (let i = 0; i < 15; i++) {
//         const size = 3 + Math.random() * 5;
//         patternElements.push(
//           <FloatingElement
//             key={i}
//             style={{
//               position: 'absolute',
//               top: Math.random() * height * 0.3,
//               left: Math.random() * width,
//             }}
//             color={i % 2 === 0 ? 
//               `${currentBanner.accentColor}30` : 
//               `${currentBanner.secondaryColor}30`}
//             size={size}
//             speed={3000 + Math.random() * 2000}
//             delay={i * 100}
//             maxShift={15}
//           />
//         );
//       }
//     } else if (currentBanner.patternType === 'line') {
//       for (let i = 0; i < 8; i++) {
//         patternElements.push(
//           <Animated.View 
//             key={i}
//             style={{
//               position: 'absolute',
//               width: 20 + Math.random() * 100,
//               height: 2,
//               backgroundColor: i % 2 === 0 ? 
//                 `${currentBanner.accentColor}20` : 
//                 `${currentBanner.secondaryColor}20`,
//               top: Math.random() * height * 0.3,
//               left: Math.random() * width,
//               transform: [
//                 { rotate: `${Math.random() * 180}deg` },
//                 { 
//                   translateX: parallaxAnim.interpolate({
//                     inputRange: [-10, 0, 10],
//                     outputRange: [i % 2 === 0 ? 5 : -5, 0, i % 2 === 0 ? -5 : 5]
//                   }) 
//                 }
//               ]
//             }}
//           />
//         );
//       }
//     } else if (currentBanner.patternType === 'circle') {
//       for (let i = 0; i < 5; i++) {
//         patternElements.push(
//           <MorphingShape
//             key={i}
//             style={{
//               position: 'absolute',
//               top: Math.random() * height * 0.3,
//               left: Math.random() * width,
//             }}
//             color={i % 2 === 0 ? 
//               `${currentBanner.accentColor}15` : 
//               `${currentBanner.secondaryColor}15`}
//             size={30 + Math.random() * 50}
//             morphSpeed={5000 + Math.random() * 3000}
//           />
//         );
//       }
//     }
    
//     return patternElements;
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.bannerContainer}>
//         <ImageBackground
//           source={{ uri: currentBanner.image }}
//           style={styles.backgroundImage}
//           blurRadius={20}
//         >
//           <LinearGradient
//             colors={currentBanner.bgGradient}
//             style={styles.bannerOverlay}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//           >
//             {renderPatterns()}
            
//             <Animated.View 
//               style={[
//                 styles.contentWrapper,
//                 {
//                   opacity: fadeAnim,
//                   ...transformStyle
//                 }
//               ]}
//               {...panResponder.panHandlers}
//             >
//               <Animated.View style={lightingStyle} />
              
//               <View style={styles.discountWrapper}>
//                 <Animated.View 
//                   style={[
//                     styles.discountContainer, 
//                     { 
//                       borderColor: currentBanner.accentColor,
//                       transform: [{ scale: pulseAnim }] 
//                     }
//                   ]}
//                 >
//                   <MaterialCommunityIcons 
//                     name={currentBanner.featureIcon} 
//                     size={12} 
//                     color={currentBanner.accentColor} 
//                     style={{ marginRight: 4 }} 
//                   />
//                   <Text style={[styles.discountText, { color: currentBanner.accentColor }]}>
//                     {currentBanner.discount}
//                   </Text>
//                 </Animated.View>
//               </View>
              
//               <View style={styles.contentInner}>
//                 <Animated.View 
//                   style={[
//                     styles.leftContent,
//                     {
//                       transform: [{ 
//                         translateX: parallaxAnim.interpolate({
//                           inputRange: [-10, 0, 10],
//                           outputRange: [-5, 0, 5]
//                         }) 
//                       }]
//                     }
//                   ]}
//                 >
//                   {isTextAnimating ? (
//                     <RevealingText 
//                       text={currentBanner.tagline}
//                       style={styles.tagline}
//                       delay={300}
//                       duration={1000}
//                     />
//                   ) : (
//                     <Text style={styles.tagline}>{currentBanner.tagline}</Text>
//                   )}
                  
//                   <View style={styles.titleWrapper}>
//                     {isTextAnimating ? (
//                       <RevealingText 
//                         text={currentBanner.title}
//                         style={[styles.title, { color: currentBanner.accentColor }]}
//                         delay={500}
//                         duration={1200}
//                       />
//                     ) : (
//                       <Text style={[styles.title, { color: currentBanner.accentColor }]}>
//                         {currentBanner.title}
//                       </Text>
//                     )}
//                     <Animated.View 
//                       style={[
//                         styles.titleUnderline, 
//                         { 
//                           backgroundColor: currentBanner.accentColor,
//                           width: isTextAnimating ? progressAnim.interpolate({
//                             inputRange: [0, 0.3],
//                             outputRange: [0, 40],
//                             extrapolate: 'clamp'
//                           }) : 40
//                         }
//                       ]}
//                     />
//                   </View>
                  
//                   <View style={styles.priceRow}>
//                     <Animated.View 
//                       style={[
//                         styles.priceContainer,
//                         {
//                           opacity: isTextAnimating ? progressAnim.interpolate({
//                             inputRange: [0, 0.4, 0.6],
//                             outputRange: [0, 0, 1],
//                             extrapolate: 'clamp'
//                           }) : 1,
//                           transform: [{ 
//                             translateY: isTextAnimating ? progressAnim.interpolate({
//                               inputRange: [0, 0.4, 0.6],
//                               outputRange: [10, 10, 0],
//                               extrapolate: 'clamp'
//                             }) : 0
//                           }]
//                         }
//                       ]}
//                     >
//                       <Text style={styles.priceCurrency}>$</Text>
//                       <Text style={styles.priceValue}>{currentBanner.price}</Text>
//                     </Animated.View>
                    
//                     <TouchableOpacity 
//                       style={styles.shopButtonContainer}
//                       onPress={() => onProductPress && onProductPress(currentBanner)}
//                       activeOpacity={0.7}
//                     >
//                       <Animated.View 
//                         style={[
//                           styles.shopButton, 
//                           { 
//                             backgroundColor: currentBanner.accentColor,
//                             opacity: isTextAnimating ? progressAnim.interpolate({
//                               inputRange: [0, 0.7, 0.9],
//                               outputRange: [0, 0, 1],
//                               extrapolate: 'clamp'
//                             }) : 1,
//                             transform: [{ 
//                               translateY: isTextAnimating ? progressAnim.interpolate({
//                                 inputRange: [0, 0.7, 0.9],
//                                 outputRange: [10, 10, 0],
//                                 extrapolate: 'clamp'
//                               }) : 0
//                             }]
//                           }
//                         ]}
//                       >
//                         <Text style={styles.buttonText}>SHOP NOW</Text>
//                         <AntDesign name="arrowright" size={16} color="white" />
//                       </Animated.View>
//                     </TouchableOpacity>
//                   </View>
//                 </Animated.View>
                
//                 <Animated.View 
//                   style={[
//                     styles.rightContent,
//                     {
//                       transform: [{ 
//                         translateX: parallaxAnim.interpolate({
//                           inputRange: [-10, 0, 10],
//                           outputRange: [5, 0, -5]
//                         }) 
//                       }]
//                     }
//                   ]}
//                 >
//                   <Animated.View 
//                     style={[
//                       styles.imageFrame, 
//                       { 
//                         borderColor: currentBanner.secondaryColor,
//                         transform: [{ 
//                           translateX: tiltXAnim.interpolate({
//                             inputRange: [-0.15, 0.15],
//                             outputRange: [5, -5]
//                           }) 
//                         }]
//                       }
//                     ]}
//                   >
//                     <Image 
//                       source={{ uri: currentBanner.image }} 
//                       style={styles.productImage}
//                     />
                    
//                     <Animated.View 
//                       style={{
//                         position: 'absolute',
//                         top: 0,
//                         left: 0,
//                         right: 0,
//                         height: '50%',
//                         backgroundColor: 'white',
//                         opacity: tiltYAnim.interpolate({
//                           inputRange: [-0.15, 0, 0.15],
//                           outputRange: [0.1, 0.05, 0]
//                         }),
//                         borderTopLeftRadius: 12,
//                         borderTopRightRadius: 12
//                       }}
//                     />
//                   </Animated.View>
//                 </Animated.View>
//               </View>
              
//               <Animated.View 
//                 style={[
//                   styles.badgesRow,
//                   {
//                     opacity: isTextAnimating ? progressAnim.interpolate({
//                       inputRange: [0, 0.8, 1],
//                       outputRange: [0, 0, 1],
//                       extrapolate: 'clamp'
//                     }) : 1,
//                     transform: [{ 
//                       translateY: isTextAnimating ? progressAnim.interpolate({
//                         inputRange: [0, 0.8, 1],
//                         outputRange: [10, 10, 0],
//                         extrapolate: 'clamp'
//                       }) : 0
//                     }]
//                   }
//                 ]}
//               >
//                 <View style={styles.badge}>
//                   <MaterialCommunityIcons name="certificate" size={14} color={currentBanner.secondaryColor} />
//                   <Text style={[styles.badgeText, { color: currentBanner.secondaryColor }]}>AUTHENTIC</Text>
//                 </View>
//                 <View style={styles.badge}>
//                   <Feather name="package" size={14} color={currentBanner.secondaryColor} />
//                   <Text style={[styles.badgeText, { color: currentBanner.secondaryColor }]}>PREMIUM</Text>
//                 </View>
//                 <View style={styles.badge}>
//                   <MaterialCommunityIcons name="hand-heart" size={14} color={currentBanner.secondaryColor} />
//                   <Text style={[styles.badgeText, { color: currentBanner.secondaryColor }]}>HANDMADE</Text>
//                 </View>
//               </Animated.View>
//             </Animated.View>
            
//             <View style={styles.controlsContainer}>
//               <TouchableOpacity 
//                 style={[styles.navButton, { backgroundColor: `${PALETTE.primary}aa` }]} 
//                 onPress={goToPrev}
//                 activeOpacity={0.7}
//               >
//                 <AntDesign name="left" size={18} color="white" />
//               </TouchableOpacity>
              
//               <View style={styles.progressContainer}>
//                 {bannerData.map((_, index) => {
//                   const isActive = index === currentIndex;
//                   return (
//                     <TouchableOpacity
//                       key={index}
//                       style={styles.progressBarTouch}
//                       onPress={() => {
//                         if (index !== currentIndex) {
//                           setCurrentIndex(index);
//                           setIsTextAnimating(true);
//                           startProgressAnimation();
//                           startPulseAnimation();
//                         }
//                       }}
//                     >
//                       <View 
//                         style={[
//                           styles.progressBarBg, 
//                           { 
//                             backgroundColor: isActive ? 
//                               `${currentBanner.secondaryColor}50` : 
//                               'rgba(255,255,255,0.2)' 
//                           }
//                         ]}
//                       >
//                         {isActive && (
//                           <Animated.View 
//                             style={[
//                               styles.progressFill,
//                               {
//                                 width: progressAnim.interpolate({
//                                   inputRange: [0, 1],
//                                   outputRange: ['0%', '100%']
//                                 }),
//                                 backgroundColor: currentBanner.accentColor
//                               }
//                             ]}
//                           />
//                         )}
//                       </View>
//                     </TouchableOpacity>
//                   );
//                 })}
//               </View>
              
//               <TouchableOpacity 
//                 style={[styles.navButton, { backgroundColor: `${PALETTE.primary}aa` }]} 
//                 onPress={goToNext}
//                 activeOpacity={0.7}
//               >
//                 <AntDesign name="right" size={18} color="white" />
//               </TouchableOpacity>
//             </View>
            
//             {/* Interactive helper text */}
//             <Animated.Text 
//               style={[
//                 styles.interactionHint,
//                 {
//                   opacity: tiltXAnim.interpolate({
//                     inputRange: [-0.1, 0, 0.1],
//                     outputRange: [0, 0.5, 0]
//                   })
//                 }
//               ]}
//             >
//               Touch & drag to explore
//             </Animated.Text>
//           </LinearGradient>
//         </ImageBackground>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginVertical: 15,
//     height: height * 0.32,
//   },
//   bannerContainer: {
//     marginHorizontal: 15,
//     height: "100%",
//     borderRadius: 20,
//     overflow: 'hidden',
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 14,
//     elevation: 10,
//   },
//   backgroundImage: {
//     width: '100%',
//     height: '100%',
//   },
//   bannerOverlay: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 15,
//     position: 'relative',
//     overflow: 'hidden',
//   },
//   contentWrapper: {
//     width: '100%',
//     height: '100%',
//     position: 'relative',
//     borderRadius: 16,
//     overflow: 'hidden',
//     padding: 15,
//   },
//   contentInner: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   leftContent: {
//     flex: 1,
//     paddingRight: 10,
//   },
//   rightContent: {
//     width: width * 0.28,
//     height: width * 0.28,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imageFrame: {
//     width: '100%',
//     height: '100%',
//     borderWidth: 2,
//     borderRadius: 12,
//     overflow: 'hidden',
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 5,
//     },
//     shadowOpacity: 0.4,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   productImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 10,
//   },
//   tagline: {
//     color: 'rgba(255,255,255,0.9)',
//     fontSize: 12,
//     fontWeight: '600',
//     textTransform: 'uppercase',
//     marginBottom: 5,
//     letterSpacing: 1.5,
//   },
//   titleWrapper: {
//     marginBottom: 12,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     letterSpacing: 1,
//     textShadowColor: 'rgba(0,0,0,0.4)',
//     textShadowOffset: { width: 1, height: 2 },
//     textShadowRadius: 4,
//   },
//   titleUnderline: {
//     height: 3,
//     marginTop: 5,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: 5,
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   priceCurrency: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginTop: 2,
//   },
//   priceValue: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   shopButtonContainer: {
//     overflow: 'visible',
//   },
//   shopButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     justifyContent: 'center',
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 12,
//     marginRight: 5,
//   },
//   discountWrapper: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     zIndex: 10,
//   },
//   discountContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 12,
//     borderWidth: 1,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//   },
//   discountText: {
//     fontWeight: 'bold',
//     fontSize: 10,
//   },
//   controlsContainer: {
//     position: 'absolute',
//     bottom: 10,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//   },
//   navButton: {
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden',
//   },
//   progressContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   progressBarTouch: {
//     padding: 6, 
//   },
//   progressBarBg: {
//     width: 30,
//     height: 4,
//     borderRadius: 2,
//     marginHorizontal: 2,
//     overflow: 'hidden',
//   },
//   progressFill: {
//     height: '100%',
//   },
//   badgesRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     borderRadius: 10,
//     paddingVertical: 7,
//     paddingHorizontal: 5,
//     marginTop: 8,
//   },
//   badge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 5,
//   },
//   badgeText: {
//     fontSize: 9,
//     fontWeight: 'bold',
//     marginLeft: 3,
//     letterSpacing: 0.5,
//   },
//   interactionHint: {
//     position: 'absolute',
//     bottom: 50,
//     color: 'rgba(255,255,255,0.7)',
//     fontSize: 10,
//     fontStyle: 'italic',
//   }
// });

// export default Banner;

import React, { useState, useEffect, useRef } from "react";
import { 
  StyleSheet, 
  Dimensions, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  Animated, 
  PanResponder,
  ImageBackground,
  Easing
} from "react-native";
import { AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get("window");

const PALETTE = {
  primary: "#000000",
  secondary: "#ffffff",
  accent1: "#333333",
  accent2: "#cccccc",
  light: "#f5f5f5",
  dark: "#111111",
  white: "#ffffff",
  black: "#000000",
  gray: "#777777"
};

const FloatingElement = ({ style, color, size, speed, delay, maxShift }) => {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  
  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 0.8,
      duration: 1000,
      delay,
      useNativeDriver: true
    }).start();
    
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 7,
      delay: delay + 100,
      useNativeDriver: true
    }).start();
    
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: 1,
          duration: speed,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true
        }),
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: speed,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true
        })
      ])
    ).start();
    
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: speed * 3,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }, []);
  
  return (
    <Animated.View
      style={[
        style,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          transform: [
            {
              translateY: moveAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, maxShift, 0]
              })
            },
            {
              translateX: moveAnim.interpolate({
                inputRange: [0, 0.3, 0.7, 1],
                outputRange: [0, maxShift/2, -maxShift/2, 0]
              })
            },
            {
              rotate: rotateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
              })
            },
            { scale: scaleAnim }
          ],
          opacity: opacityAnim
        }
      ]}
    />
  );
};

const MorphingShape = ({ style, color, size, morphSpeed }) => {
  const shapeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shapeAnim, {
          toValue: 1,
          duration: morphSpeed,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: false
        }),
        Animated.timing(shapeAnim, {
          toValue: 2,
          duration: morphSpeed,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: false
        }),
        Animated.timing(shapeAnim, {
          toValue: 3,
          duration: morphSpeed,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: false
        }),
        Animated.timing(shapeAnim, {
          toValue: 0,
          duration: morphSpeed,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: false
        })
      ])
    ).start();
  }, []);
  
  const borderRadius = shapeAnim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [size/2, size/8, size/2, 0]
  });
  
  const rotate = shapeAnim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: ['0deg', '45deg', '0deg', '0deg']
  });
  
  const width = shapeAnim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [size, size * 1.2, size * 0.8, size * 1.1]
  });
  
  const height = shapeAnim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [size, size * 0.8, size * 1.2, size * 0.9]
  });
  
  return (
    <Animated.View
      style={[
        style,
        {
          width,
          height,
          borderRadius,
          backgroundColor: color,
          transform: [{ rotate }]
        }
      ]}
    />
  );
};

const RevealingText = ({ text, style, delay = 0, duration = 1500 }) => {
  const [characters, setCharacters] = useState([]);
  
  useEffect(() => {
    const chars = text.split('').map((char, index) => {
      return {
        char,
        opacity: new Animated.Value(0),
        translateY: new Animated.Value(10)
      };
    });
    
    setCharacters(chars);
    
    chars.forEach((char, index) => {
      Animated.parallel([
        Animated.timing(char.opacity, {
          toValue: 1,
          duration: duration / 2,
          delay: delay + (index * (duration / (text.length * 2))),
          useNativeDriver: true
        }),
        Animated.timing(char.translateY, {
          toValue: 0,
          duration: duration / 2,
          delay: delay + (index * (duration / (text.length * 2))),
          useNativeDriver: true
        })
      ]).start();
    });
  }, [text]);
  
  return (
    <View style={{ flexDirection: 'row' }}>
      {characters.map((char, index) => (
        <Animated.Text
          key={`${char.char}-${index}`}
          style={[
            style,
            {
              opacity: char.opacity,
              transform: [{ translateY: char.translateY }]
            }
          ]}
        >
          {char.char}
        </Animated.Text>
      ))}
    </View>
  );
};

const Banner = ({ onProductPress }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isTextAnimating, setIsTextAnimating] = useState(true);
  
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const translateXAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  
  const tiltXAnim = useRef(new Animated.Value(0)).current;
  const tiltYAnim = useRef(new Animated.Value(0)).current;
  
  const parallaxAnim = useRef(new Animated.Value(0)).current;
  
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  const bannerData = [
    {
      id: '1',
      image: "https://res.cloudinary.com/tinkerbeads/image/upload/v1743933929/487830721_1717746942509884_2681236726868176947_n_hc7hr7.png",
      bgGradient: ["#000000", "#111111", "#222222"],
      accentColor: PALETTE.white,
      secondaryColor: PALETTE.light,
      title: "ARTISAN",
      tagline: "Handcrafted Elegance",
      price: "100.00",
      discount: "30% OFF",
      featureIcon: "diamond-stone",
      patternType: "dot"
    },
    {
      id: '2',
      image: "https://res.cloudinary.com/tinkerbeads/image/upload/v1743933929/486735525_2059434014467745_2771512422976388246_n_dkkcm7.png",
      bgGradient: ["#111111", "#000000", "#1a1a1a"],
      accentColor: PALETTE.white,
      secondaryColor: PALETTE.accent2,
      title: "HERITAGE",
      tagline: "Timeless Collection",
      price: "150.00",
      discount: "NEW ARRIVAL",
      featureIcon: "crown",
      patternType: "line"
    },
    {
      id: '3',
      image: "https://res.cloudinary.com/tinkerbeads/image/upload/v1743934393/482156267_3828549747409050_6130955109232268353_n_wacjro.png",
      bgGradient: ["#000000", "#0a0a0a", "#1a1a1a"],
      accentColor: PALETTE.white,
      secondaryColor: PALETTE.accent2,
      title: "LUXE",
      tagline: "Premium Selection",
      price: "200.00",
      discount: "LIMITED EDITION",
      featureIcon: "star-four-points",
      patternType: "circle"
    }
  ];

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsInteracting(true);
        setIsTextAnimating(true);
      },
      onPanResponderMove: (evt, gestureState) => {
        const { moveX, moveY } = gestureState;
        const centerX = width / 2;
        const centerY = height * 0.15;
        const tiltX = (moveX - centerX) / centerX * 0.15;
        const tiltY = (moveY - centerY) / centerY * 0.15;
        
        tiltXAnim.setValue(tiltX);
        tiltYAnim.setValue(tiltY);
        
        parallaxAnim.setValue(tiltX * 10);
      },
      onPanResponderRelease: () => {
        setIsInteracting(false);
        Animated.parallel([
          Animated.spring(tiltXAnim, {
            toValue: 0,
            friction: 6,
            useNativeDriver: true
          }),
          Animated.spring(tiltYAnim, {
            toValue: 0,
            friction: 6,
            useNativeDriver: true
          }),
          Animated.spring(parallaxAnim, {
            toValue: 0,
            friction: 6,
            useNativeDriver: true
          })
        ]).start();
      }
    })
  ).current;

  const animateToNext = () => {
    if (isInteracting) return;
    
    setIsTextAnimating(true);
    
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 10,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0.05,
          duration: 300,
          useNativeDriver: true,
        })
      ]),
      
      Animated.timing(translateXAnim, {
        toValue: -width,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentIndex(prev => (prev < bannerData.length - 1 ? prev + 1 : 0));
      
      fadeAnim.setValue(0.3);
      scaleAnim.setValue(1.1);
      translateYAnim.setValue(-15);
      translateXAnim.setValue(width);
      rotateAnim.setValue(-0.05);
      
      Animated.sequence([
        Animated.timing(translateXAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
        
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          })
        ])
      ]).start(() => {
        startProgressAnimation();
        startPulseAnimation();
      });
    });
  };

  useEffect(() => {
    startProgressAnimation();
    startPulseAnimation();
    
    const interval = setInterval(() => {
      if (!isInteracting) {
        animateToNext();
      }
    }, 9000);
    
    return () => clearInterval(interval);
  }, [isInteracting]);

  const startProgressAnimation = () => {
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 6000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };
  
  const startPulseAnimation = () => {
    pulseAnim.setValue(1);
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: true
        })
      ])
    ).start();
  };

  const goToNext = () => animateToNext();
  
  const goToPrev = () => {
    if (isInteracting) return;
    
    setIsTextAnimating(true);
    
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 10,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: -0.05,
          duration: 300,
          useNativeDriver: true,
        })
      ]),
      
      Animated.timing(translateXAnim, {
        toValue: width,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentIndex(prev => (prev > 0 ? prev - 1 : bannerData.length - 1));
      
      fadeAnim.setValue(0.3);
      scaleAnim.setValue(1.1);
      translateYAnim.setValue(-15);
      translateXAnim.setValue(-width);
      rotateAnim.setValue(0.05);
      
      Animated.sequence([
        Animated.timing(translateXAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
        
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          })
        ])
      ]).start(() => {
        startProgressAnimation();
        startPulseAnimation();
      });
    });
  };

  const currentBanner = bannerData[currentIndex];
  
  const transformStyle = {
    transform: [
      { perspective: 800 },
      { rotateX: tiltYAnim.interpolate({
          inputRange: [-0.15, 0.15],
          outputRange: ['10deg', '-10deg']
        })
      },
      { rotateY: tiltXAnim.interpolate({
          inputRange: [-0.15, 0.15],
          outputRange: ['-10deg', '10deg']
        })
      },
      { scale: scaleAnim },
      { translateX: translateXAnim },
      { translateY: translateYAnim },
      { rotate: rotateAnim.interpolate({
          inputRange: [-0.05, 0, 0.05],
          outputRange: ['-5deg', '0deg', '5deg']
        })
      }
    ]
  };

  const lightingStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    opacity: tiltXAnim.interpolate({
      inputRange: [-0.15, 0, 0.15],
      outputRange: [0.05, 0, 0.05]
    })
  };
  
  const renderPatterns = () => {
    const patternElements = [];
    
    if (currentBanner.patternType === 'dot') {
      for (let i = 0; i < 15; i++) {
        const size = 3 + Math.random() * 5;
        patternElements.push(
          <FloatingElement
            key={i}
            style={{
              position: 'absolute',
              top: Math.random() * height * 0.3,
              left: Math.random() * width,
            }}
            color={i % 2 === 0 ? 
              `${currentBanner.accentColor}30` : 
              `${currentBanner.secondaryColor}30`}
            size={size}
            speed={3000 + Math.random() * 2000}
            delay={i * 100}
            maxShift={15}
          />
        );
      }
    } else if (currentBanner.patternType === 'line') {
      for (let i = 0; i < 8; i++) {
        patternElements.push(
          <Animated.View 
            key={i}
            style={{
              position: 'absolute',
              width: 20 + Math.random() * 100,
              height: 2,
              backgroundColor: i % 2 === 0 ? 
                `${currentBanner.accentColor}20` : 
                `${currentBanner.secondaryColor}20`,
              top: Math.random() * height * 0.3,
              left: Math.random() * width,
              transform: [
                { rotate: `${Math.random() * 180}deg` },
                { 
                  translateX: parallaxAnim.interpolate({
                    inputRange: [-10, 0, 10],
                    outputRange: [i % 2 === 0 ? 5 : -5, 0, i % 2 === 0 ? -5 : 5]
                  }) 
                }
              ]
            }}
          />
        );
      }
    } else if (currentBanner.patternType === 'circle') {
      for (let i = 0; i < 5; i++) {
        patternElements.push(
          <MorphingShape
            key={i}
            style={{
              position: 'absolute',
              top: Math.random() * height * 0.3,
              left: Math.random() * width,
            }}
            color={i % 2 === 0 ? 
              `${currentBanner.accentColor}15` : 
              `${currentBanner.secondaryColor}15`}
            size={30 + Math.random() * 50}
            morphSpeed={5000 + Math.random() * 3000}
          />
        );
      }
    }
    
    return patternElements;
  };

  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <ImageBackground
          source={{ uri: currentBanner.image }}
          style={styles.backgroundImage}
          blurRadius={20}
        >
          <LinearGradient
            colors={currentBanner.bgGradient}
            style={styles.bannerOverlay}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {renderPatterns()}
            
            <Animated.View 
              style={[
                styles.contentWrapper,
                {
                  opacity: fadeAnim,
                  ...transformStyle
                }
              ]}
              {...panResponder.panHandlers}
            >
              <Animated.View style={lightingStyle} />
              
              <View style={styles.discountWrapper}>
                <Animated.View 
                  style={[
                    styles.discountContainer, 
                    { 
                      borderColor: currentBanner.accentColor,
                      transform: [{ scale: pulseAnim }] 
                    }
                  ]}
                >
                  <MaterialCommunityIcons 
                    name={currentBanner.featureIcon} 
                    size={12} 
                    color={currentBanner.accentColor} 
                    style={{ marginRight: 4 }} 
                  />
                  <Text style={[styles.discountText, { color: currentBanner.accentColor }]}>
                    {currentBanner.discount}
                  </Text>
                </Animated.View>
              </View>
              
              <View style={styles.contentInner}>
                <Animated.View 
                  style={[
                    styles.leftContent,
                    {
                      transform: [{ 
                        translateX: parallaxAnim.interpolate({
                          inputRange: [-10, 0, 10],
                          outputRange: [-5, 0, 5]
                        }) 
                      }]
                    }
                  ]}
                >
                  {isTextAnimating ? (
                    <RevealingText 
                      text={currentBanner.tagline}
                      style={styles.tagline}
                      delay={300}
                      duration={1000}
                    />
                  ) : (
                    <Text style={styles.tagline}>{currentBanner.tagline}</Text>
                  )}
                  
                  <View style={styles.titleWrapper}>
                    {isTextAnimating ? (
                      <RevealingText 
                        text={currentBanner.title}
                        style={[styles.title, { color: currentBanner.accentColor }]}
                        delay={500}
                        duration={1200}
                      />
                    ) : (
                      <Text style={[styles.title, { color: currentBanner.accentColor }]}>
                        {currentBanner.title}
                      </Text>
                    )}
                    <Animated.View 
                      style={[
                        styles.titleUnderline, 
                        { 
                          backgroundColor: currentBanner.accentColor,
                          width: isTextAnimating ? progressAnim.interpolate({
                            inputRange: [0, 0.3],
                            outputRange: [0, 40],
                            extrapolate: 'clamp'
                          }) : 40
                        }
                      ]}
                    />
                  </View>
                  
                  <View style={styles.priceRow}>
                    <Animated.View 
                      style={[
                        styles.priceContainer,
                        {
                          opacity: isTextAnimating ? progressAnim.interpolate({
                            inputRange: [0, 0.4, 0.6],
                            outputRange: [0, 0, 1],
                            extrapolate: 'clamp'
                          }) : 1,
                          transform: [{ 
                            translateY: isTextAnimating ? progressAnim.interpolate({
                              inputRange: [0, 0.4, 0.6],
                              outputRange: [10, 10, 0],
                              extrapolate: 'clamp'
                            }) : 0
                          }]
                        }
                      ]}
                    >
                      <Text style={styles.priceCurrency}>₱</Text>
                      <Text style={styles.priceValue}>{currentBanner.price}</Text>
                    </Animated.View>
                    
                    <TouchableOpacity 
                      style={styles.shopButtonContainer}
                      onPress={() => onProductPress && onProductPress(currentBanner)}
                      activeOpacity={0.7}
                    >
                      <Animated.View 
                        style={[
                          styles.shopButton, 
                          { 
                            backgroundColor: PALETTE.black,
                            opacity: isTextAnimating ? progressAnim.interpolate({
                              inputRange: [0, 0.7, 0.9],
                              outputRange: [0, 0, 1],
                              extrapolate: 'clamp'
                            }) : 1,
                            transform: [{ 
                              translateY: isTextAnimating ? progressAnim.interpolate({
                                inputRange: [0, 0.7, 0.9],
                                outputRange: [10, 10, 0],
                                extrapolate: 'clamp'
                              }) : 0
                            }]
                          }
                        ]}
                      >
                        <Text style={styles.buttonText}>SHOP NOW</Text>
                        <AntDesign name="arrowright" size={16} color="white" />
                      </Animated.View>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
                
                <Animated.View 
                  style={[
                    styles.rightContent,
                    {
                      transform: [{ 
                        translateX: parallaxAnim.interpolate({
                          inputRange: [-10, 0, 10],
                          outputRange: [5, 0, -5]
                        }) 
                      }]
                    }
                  ]}
                >
                  <Animated.View 
                    style={[
                      styles.imageFrame, 
                      { 
                        borderColor: PALETTE.white,
                        transform: [{ 
                          translateX: tiltXAnim.interpolate({
                            inputRange: [-0.15, 0.15],
                            outputRange: [5, -5]
                          }) 
                        }]
                      }
                    ]}
                  >
                    <Image 
                      source={{ uri: currentBanner.image }} 
                      style={styles.productImage}
                    />
                    
                    <Animated.View 
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '50%',
                        backgroundColor: 'white',
                        opacity: tiltYAnim.interpolate({
                          inputRange: [-0.15, 0, 0.15],
                          outputRange: [0.1, 0.05, 0]
                        }),
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12
                      }}
                    />
                  </Animated.View>
                </Animated.View>
              </View>
              
              <Animated.View 
                style={[
                  styles.badgesRow,
                  {
                    opacity: isTextAnimating ? progressAnim.interpolate({
                      inputRange: [0, 0.8, 1],
                      outputRange: [0, 0, 1],
                      extrapolate: 'clamp'
                    }) : 1,
                    transform: [{ 
                      translateY: isTextAnimating ? progressAnim.interpolate({
                        inputRange: [0, 0.8, 1],
                        outputRange: [10, 10, 0],
                        extrapolate: 'clamp'
                      }) : 0
                    }]
                  }
                ]}
              >
                <View style={styles.badge}>
                  <MaterialCommunityIcons name="certificate" size={14} color={PALETTE.white} />
                  <Text style={[styles.badgeText, { color: PALETTE.white }]}>AUTHENTIC</Text>
                </View>
                <View style={styles.badge}>
                  <Feather name="package" size={14} color={PALETTE.white} />
                  <Text style={[styles.badgeText, { color: PALETTE.white }]}>PREMIUM</Text>
                </View>
                <View style={styles.badge}>
                  <MaterialCommunityIcons name="hand-heart" size={14} color={PALETTE.white} />
                  <Text style={[styles.badgeText, { color: PALETTE.white }]}>HANDMADE</Text>
                </View>
              </Animated.View>
            </Animated.View>
            
            <View style={styles.controlsContainer}>
              <TouchableOpacity 
                style={[styles.navButton, { backgroundColor: `${PALETTE.black}aa` }]} 
                onPress={goToPrev}
                activeOpacity={0.7}
              >
                <AntDesign name="left" size={18} color="white" />
              </TouchableOpacity>
              
              <View style={styles.progressContainer}>
                {bannerData.map((_, index) => {
                  const isActive = index === currentIndex;
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.progressBarTouch}
                      onPress={() => {
                        if (index !== currentIndex) {
                          setCurrentIndex(index);
                          setIsTextAnimating(true);
                          startProgressAnimation();
                          startPulseAnimation();
                        }
                      }}
                    >
                      <View 
                        style={[
                          styles.progressBarBg, 
                          { 
                            backgroundColor: isActive ? 
                              `${PALETTE.white}50` : 
                              'rgba(255,255,255,0.2)' 
                          }
                        ]}
                      >
                        {isActive && (
                          <Animated.View 
                            style={[
                              styles.progressFill,
                              {
                                width: progressAnim.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: ['0%', '100%']
                                }),
                                backgroundColor: PALETTE.white
                              }
                            ]}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
              
              <TouchableOpacity 
                style={[styles.navButton, { backgroundColor: `${PALETTE.black}aa` }]} 
                onPress={goToNext}
                activeOpacity={0.7}
              >
                <AntDesign name="right" size={18} color="white" />
              </TouchableOpacity>
            </View>
            
            {/* Interactive helper text */}
            <Animated.Text 
              style={[
                styles.interactionHint,
                {
                  opacity: tiltXAnim.interpolate({
                    inputRange: [-0.1, 0, 0.1],
                    outputRange: [0, 0.5, 0]
                  })
                }
              ]}
            >
              Touch & drag to explore
            </Animated.Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    height: height * 0.32,
  },
  bannerContainer: {
    marginHorizontal: 15,
    height: "100%",
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 10,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    position: 'relative',
    overflow: 'hidden',
  },
  contentWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    padding: 15,
  },
  contentInner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flex: 1,
    paddingRight: 10,
  },
  rightContent: {
    width: width * 0.28,
    height: width * 0.28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageFrame: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  tagline: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 5,
    letterSpacing: 1.5,
  },
  titleWrapper: {
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  titleUnderline: {
    height: 3,
    marginTop: 5,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  priceCurrency: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
  },
  priceValue: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  shopButtonContainer: {
    overflow: 'visible',
  },
  shopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    marginRight: 5,
  },
  discountWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  discountText: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  navButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarTouch: {
    padding: 6, 
  },
  progressBarBg: {
    width: 30,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 5,
    marginTop: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    marginLeft: 3,
    letterSpacing: 0.5,
  },
  interactionHint: {
    position: 'absolute',
    bottom: 50,
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    fontStyle: 'italic',
  }
});

export default Banner;