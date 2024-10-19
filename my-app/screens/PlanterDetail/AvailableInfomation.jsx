import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

const WIDTH = Dimensions.get("window").width;

export default function AvailableInfomation({ planter, color }) {
  const [availableDetail, setAvaiableDetail] = useState([]);

  useEffect(() => {
    setAvaiableDetail([
      {
        name: "Material",
        value: planter?.material || "",
      },
      {
        name: "Color",
        value: color || "Unknown",
      },
      {
        name: "Special Feature",
        value: planter?.special_feature || "",
      },
      {
        name: "Style",
        value: planter?.style || "",
      },
      {
        name: "Planter Form",
        value: planter?.planter_form || "",
      },
    ]);
  }, [planter, color]);

  const renderInfor = (item, key) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 8,
          marginTop: 4,
        }}
        key={key}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 14,
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            fontWeight: "regular",
            fontSize: 14,
          }}
        >
          {item.value}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.availableContainer}>
      <View style={styles.availableHeader}>
        {planter === "In Stock" ? (
          <>
            <Text style={styles.availableHeaderTitle}>
              Currently available.
            </Text>
            <Text style={styles.availableHeaderDescrip}>
              This item is in stock.
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.availableHeaderTitle}>
              Currently unavailable.
            </Text>
            <Text style={styles.availableHeaderDescrip}>
              We don't know when or if this item will be back in stock.
            </Text>
          </>
        )}
      </View>
      <View>{availableDetail.map((item, key) => renderInfor(item, key))}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  availableContainer: {
    margin: 12,
    marginHorizontal: 18,
  },
  availableHeaderTitle: {
    fontWeight: "bold",
    color: "#0C9359",
    fontSize: 20,
  },
  availableHeaderDescrip: {
    fontWeight: "medium",
    color: "#979797",
    fontSize: 14,
    paddingHorizontal: 8,
  },
});
