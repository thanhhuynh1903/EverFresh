import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomTabBar from '../components/CustomTabBar/CustomTabBar';
import { RoutesList } from './routes';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />} // Use the custom Tab Bar
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false, // Hide header if not needed
      })}
    >
      {RoutesList.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={item.options}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
