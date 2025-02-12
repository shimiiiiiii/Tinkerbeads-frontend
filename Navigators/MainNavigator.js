import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon

import HomeNavigator from './HomeNavigator';
import UserNavigator from './UserNavigator';
import CartNavigator from './CartNavigator';
import SearchNavigator from './SearchNavigator';

const Tab = createBottomTabNavigator();

const Main = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="search" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="shopping-cart" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="user" color={color} size={30} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default Main; // ✅ Corrected export


