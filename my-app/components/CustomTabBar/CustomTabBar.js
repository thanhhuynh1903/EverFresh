// CustomTabBar.js
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { appColors } from '../../utils/appColors'; // Define your colors here

const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 80, backgroundColor: "white" }}>
            {/* Gradient Background */}
            <LinearGradient
                colors={['#2CAD5E', '#75E00A']}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: 50,
                }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            />
            {/* <Svg
                width={100}
                height={60}
                viewBox="0 0 100 60"
                style={{ position: 'absolute', top: -20, alignSelf: 'center' }}
            >
                <Path
                    d={`M 0 60 Q 50 0 100 60`}
                    fill="transparent"
                    stroke="#fff"
                    strokeWidth={2}
                />
            </Svg> */}

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: "100%",
                alignItems: "center"
                // paddingHorizontal: 30,
                // alignItems: "center"
            }}>
                {/* Render Tab Bar Icons */}
                {state.routes.map((route, index) => {

                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ flex: 1, alignItems: 'center', ...options.iconStyles }}
                        >
                            {options.tabBarIcon({
                                focused: isFocused,
                                color: isFocused ? '#75E00A' : '#2CAD5E',
                                size: 32,
                            })}
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Center Button */}
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    top: "-50%",
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                    backgroundColor: '#ff9900', // Adjust as needed
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.12,
                    shadowRadius: 5,
                    elevation: 5,
                }}
                activeOpacity={0.9}
                // onPress={() => navigation.navigate('Camera')} // Replace with your central button action
            >
                <Icon name="camera" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

export default CustomTabBar;
