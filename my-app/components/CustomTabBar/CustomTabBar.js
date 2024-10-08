// CustomTabBar.js
import React, { useMemo, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RoutesList } from "../../routing/routes";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const [isOpenCircelMenu, setIsOpenCircelMenu] = useState(false);
  const routeItem = useMemo(() => {
    return RoutesList[state.index];
  }, [state.index]);

  if (routeItem.hiddenBottomTab) return;

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: HEIGHT * 0.08,
        // backgroundColor: "white",
      }}
    >
      {/* Gradient Background */}
      <LinearGradient
        colors={["#2CAD5E", "#75E00A"]}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: 50,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: "100%",
          alignItems: "center",
        }}
      >
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
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              setIsOpenCircelMenu(false);
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          // Skip rendering if tabBarButton is hidden
          if (
            options.tabBarButton &&
            typeof options.tabBarButton === "function"
          ) {
            return null;
          }

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: "center", ...options.iconStyles }}
            >
              {options.tabBarIcon
                ? options.tabBarIcon({
                    focused: isFocused,
                    color: isFocused
                      ? options?.activeColor
                        ? options?.activeColor
                        : "#75E00A"
                      : options?.inactiveColor
                      ? options?.inactiveColor
                      : "#ffffff",
                    size: 32,
                  })
                : null}
            </TouchableOpacity>
          );
        })}
      </View>
      {/* Center Button */}
      <TouchableOpacity
        style={{
          position: "absolute",
          alignSelf: "center",
          top: "-50%",
          width: HEIGHT * 0.08,
          height: HEIGHT * 0.08,
          borderRadius: 50,
          backgroundColor: "#ff9900", // Adjust as needed
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          setIsOpenCircelMenu(!isOpenCircelMenu);
        }}
        activeOpacity={0.9}
        // Add desired action for the central button
      >
        {isOpenCircelMenu && (
          <View style={styles.circleTabBar}>
            <LinearGradient
              colors={["#47B571", "#75E00A"]}
              style={styles.halfCircleTabBar}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <TouchableOpacity style={styles.scanIcon}>
                <Icon name="line-scan" size={28} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.imageIcon}>
                <Icon name="image-outline" size={30} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.videoIcon}
                onPress={() => navigation.navigate("ScanCamera")}
              >
                <Icon name="video-outline" size={30} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}
        <View style={styles.circleContainer}>
          <View style={styles.halfCircle} />
        </View>
        <LinearGradient
          colors={["#FCCC1F", "#EB5210"]}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: 50,
          }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 1, y: 0.5 }}
        ></LinearGradient>
        <Icon name="camera-outline" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  circleContainer: {
    position: "absolute",
    width: HEIGHT * 0.09,
    height: HEIGHT * 0.045,
    overflow: "hidden",
    transform: [{ rotateZ: "180deg" }],
    bottom: -HEIGHT * 0.005,
    alignSelf: "center",
    // top: "-0%",
  },
  halfCircle: {
    width: HEIGHT * 0.09, // Full width (diameter)
    height: HEIGHT * 0.09, // Full height (diameter)
    backgroundColor: "white", // Circle color
    borderRadius: 50, // This makes it a circle
  },
  circleTabBar: {
    position: "absolute",
    width: HEIGHT * 0.2,
    height: HEIGHT * 0.1,
    overflow: "hidden",
    top: 0,
    transform: [{ translateY: -(HEIGHT * 0.06) }],
    alignSelf: "center",
  },
  halfCircleTabBar: {
    width: HEIGHT * 0.2,
    height: HEIGHT * 0.2,
    backgroundColor: "white",
    borderRadius: 150,
  },

  scanIcon: {
    position: "absolute",
    top: HEIGHT * 0.06,
    left: HEIGHT * 0.02,
  },
  imageIcon: {
    position: "absolute",
    top: HEIGHT * 0.015,
    left: HEIGHT * 0.083,
  },
  videoIcon: {
    position: "absolute",
    top: HEIGHT * 0.06,
    right: HEIGHT * 0.02,
  },
});

export default CustomTabBar;
