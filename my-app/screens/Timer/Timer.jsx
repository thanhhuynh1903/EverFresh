import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Plants from "./tabViews/plants";
import Log from "./tabViews/log";
import Setting from "./tabViews/setting";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const FirstRoute = () => (
  <ScrollView
    style={[styles.scene, styles.paddingContainer, { backgroundColor: "#fff" }]}
    nestedScrollEnabled={true}
  >
    <Plants />
  </ScrollView>
);

const SecondRoute = () => (
  <ScrollView
    style={[styles.scene, styles.paddingContainer, { backgroundColor: "#fff" }]}
    nestedScrollEnabled={true}
  >
    <Log />
  </ScrollView>
);

const ThirdRoute = () => (
  <ScrollView
    style={[styles.scene, styles.paddingContainer, { backgroundColor: "#fff" }]}
    nestedScrollEnabled={true}
  >
    <Setting />
  </ScrollView>
);

export default function Timer() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
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
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      stickyHeaderIndices={[2]}
    >
      {/* Banner Image */}
      <View style={styles.gifContainer}>
        <Image
          source={require("../../assets/timeGif.gif")}
          resizeMode="stretch"
          style={styles.gifImage}
        />
      </View>
      <View style={[styles.paddingContainer, styles.inforContainer]}>
        <Text style={styles.inforContainerName}>User’s Garden</Text>
        <Text style={styles.inforContainerId}>ID: 1344295024</Text>
      </View>

      {/* TabView */}
      <View style={styles.tabViewContainer}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          initialLayout={{ width: WIDTH }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  gifContainer: {
    width: WIDTH,
    height: HEIGHT * 0.26, // Adjust this as per your banner height
    backgroundColor: "#fff", // Keep the background to match banner image
  },
  gifImage: {
    width: WIDTH,
    height: "100%", // Fill the container
  },
  paddingContainer: {
    paddingHorizontal: "5%",
  },
  inforContainer: {
    paddingVertical: 24,
  },
  inforContainerName: {
    fontWeight: "medium",
    fontSize: 32,
    color: "#111111",
  },
  inforContainerId: {
    fontSize: 14,
    color: "rgba(0,0,0,0.5)",
  },
  //popular Pland Infor
  popularPlandInfor: {
    width: "100%",
    height: "auto",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
    marginVertical: 24,
    // borderWidth: 1,

    backgroundColor: "#FFFFFF",
    shadowColor: "#0C9359",
    shadowOffset: { width: 0, height: 2 }, // X: 0, Y: 4
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 1,
  },
  popularPlandInforRow: {
    flexDirection: "row",
    gap: 12,
    height: 25,
  },
  popularPlandInforRowText: {
    color: "#06492C",
    fontWeight: "bold",
    fontSize: 14,
  },
  deviderLine: {
    width: WIDTH - 20 * 2,
    height: 1,
    backgroundColor: "#D9D9D9",
    marginBottom: 28,
    marginHorizontal: 20,
  },

  tabViewContainer: {
    height: HEIGHT, // Set the height to fit the screen
    backgroundColor: "#fff",
  },
  scene: {
    width: WIDTH,
    height: HEIGHT,
    marginBottom: 150,
    // alignItems: "center",
    // justifyContent: "center",
  },
  tabBar: {
    backgroundColor: "#E8F5F1",
    borderRadius: 12,
    margin: 10,
    elevation: 0,
    // paddingHorizontal: 5,
    justifyContent: "center",
  },
  indicatorStyle: {
    backgroundColor: "#fff",
    height: "90%",
    width: "32.5%",
    marginVertical: "5%",
    marginHorizontal: "0.833333333%",
    borderRadius: 12,
  },
  tabLabel: {
    color: "#88B797",
    fontSize: 16,
    fontWeight: "600",
  },
  tabLabelFocused: {
    color: "#1D5036",
  },
});
