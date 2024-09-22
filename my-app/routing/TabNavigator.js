// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Homepage/Homepage';
// import Profile from '../screens/Profile';
// import Search from '../screens/Search';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomTabBar from '../components/CustomTabBar/CustomTabBar';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />} // Use the custom Tab Bar
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false, // Hide header if not needed
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="magnify" color={color} size={size} />
          ),
          iconStyles: { transform: [{ translateX: -20 }] }
        }}

      />
      <Tab.Screen
        name="Profile"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-outline" color={color} size={size} />
          ),
          iconStyles: { transform: [{ translateX: 20 }] }
        }}
      />
      <Tab.Screen
        name="Profile1"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
