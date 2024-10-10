import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#fff" }]}>
    <Text>Plants Content</Text>
  </View>
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#fff" }]}>
    <Text>Log Content</Text>
  </View>
);

const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#fff" }]}>
    <Text>Settings Content</Text>
  </View>
);

export default function Timer() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "plants", title: "PLANTS" },
    { key: "log", title: "LOG" },
    { key: "settings", title: "SETTINGS" },
  ]);

  const renderScene = SceneMap({
    plants: FirstRoute,
    log: SecondRoute,
    settings: ThirdRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBar}
      renderLabel={({ route, focused }) => (
        <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <>
      <ScrollView style={styles.container}>
        <Text>Timer</Text>
      </ScrollView>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: "100%" }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: HEIGHT,
    width: WIDTH,
    overflow: "visible",
    backgroundColor: "white",
  },

  //   tab
  scene: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBar: {
    backgroundColor: "#E8F5F1", // light greenish background color
    borderRadius: 30, // rounded tabs background
    margin: 10,
    elevation: 0,
  },
  indicatorStyle: {
    backgroundColor: "#fff", // white background for active tab
    height: "100%",
    borderRadius: 30, // rounded active tab
  },
  tabLabel: {
    color: "#88B797", // default color for tabs
    fontSize: 16,
    fontWeight: "600",
  },
  tabLabelFocused: {
    color: "#1D5036", // focused tab color
  },
});
