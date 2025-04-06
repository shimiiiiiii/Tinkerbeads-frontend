import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  Linking,
  Animated
} from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Monochrome palette
const PALETTE = {
  white: "#ffffff",
  lightGray: "#f5f5f5",
  mediumGray: "#9e9e9e",
  darkGray: "#212121",
  black: "#000000"
};

const Footer = () => {
  // Animation values
  const containerOpacity = useRef(new Animated.Value(0)).current;
  const containerTranslate = useRef(new Animated.Value(15)).current;

  useEffect(() => {
    // Main animations
    Animated.parallel([
      Animated.timing(containerOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(containerTranslate, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const openSocialMedia = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: containerOpacity,
          transform: [{ translateY: containerTranslate }]
        }
      ]}
    >
      <View style={styles.footerContainer}>
        <LinearGradient
          colors={[PALETTE.black, '#0a0a0a']}
          style={styles.gradientBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Top Row: Logo and Social */}
          <View style={styles.topRow}>
            {/* Logo */}
            <View style={styles.logoSection}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoInitial}>T</Text>
              </View>
              <View style={styles.brandTextContainer}>
                <Text style={styles.logoText}>TINKERBEADS</Text>
              </View>
            </View>
            
            {/* Social Icons */}
            <View style={styles.socialSection}>
              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => openSocialMedia('https://instagram.com')}
              >
                <FontAwesome5 name="instagram" size={13} color={PALETTE.white} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => openSocialMedia('https://tiktok.com')}
              >
                <FontAwesome5 name="tiktok" size={13} color={PALETTE.white} />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Minimal Divider */}
          <View style={styles.divider} />
          
          {/* Badges Row */}
          <View style={styles.badgesRow}>
            <View style={styles.badge}>
              <Feather name="shield" size={11} color={PALETTE.white} />
              <Text style={styles.badgeText}>Secure</Text>
            </View>
            
            <View style={styles.badge}>
              <Feather name="truck" size={11} color={PALETTE.white} />
              <Text style={styles.badgeText}>Fast Ship</Text>
            </View>
            
            <View style={styles.badge}>
              <Feather name="award" size={11} color={PALETTE.white} />
              <Text style={styles.badgeText}>Quality</Text>
            </View>
          </View>
          
          {/* Copyright */}
          <Text style={styles.copyright}>
            © {new Date().getFullYear()} TinkerBeads
          </Text>
        </LinearGradient>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingHorizontal: 15,
  },
  footerContainer: {
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: PALETTE.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  gradientBackground: {
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 18,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: PALETTE.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoInitial: {
    color: PALETTE.black,
    fontSize: 12,
    fontWeight: 'bold',
  },
  brandTextContainer: {
    alignItems: 'flex-start',
  },
  logoText: {
    color: PALETTE.white,
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  socialSection: {
    flexDirection: 'row',
  },
  socialButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 12,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.07)',
    paddingVertical: 4,
    paddingHorizontal: 7,
    borderRadius: 12,
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  badgeText: {
    color: PALETTE.white,
    fontSize: 9,
    marginLeft: 3,
    fontWeight: '500',
  },
  copyright: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 9,
    textAlign: 'center',
    marginTop: 2,
  }
});

export default Footer;