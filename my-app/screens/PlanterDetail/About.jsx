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

export default function About({ planter }) {
  const [aboutDetail, setAboutDetail] = useState([]);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    setAboutDetail([
      {
        name: "Artificial Intelligence",
        value:
          "Ivy has artificial intelligence built into it. Along with gesture interaction features, it has more than 49 different animations to express different emotions. Ivy develops a personality through interaction with you as the owner",
      },
      {
        name: "Electronic Pets",
        value:
          "Ivy has artificial intelligence built into it. Along with gesture interaction features, it has more than 49 different animations to express different emotions. Ivy develops a personality through interaction with you as the owner",
      },
      {
        name: "Custom Feature 1",
        value:
          "This is a custom feature description. This text is long to test the truncation when the 'Read More' is toggled off.",
      },
      {
        name: "Custom Feature 2",
        value:
          "This is another custom feature description that should also appear when 'Read More' is toggled.",
      },
    ]);
  }, [planter]);

  const renderInfor = (item, key, isLimited) => {
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
            fontWeight: "regular",
            fontSize: 20,
          }}
          numberOfLines={isLimited ? 3 : 0}
        >
          •【{item.name}】
          <Text
            style={{
              fontWeight: "regular",
              fontSize: 20,
              marginLeft: 8,
            }}
          >
            {item.value}
          </Text>
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.aboutTitle}>About this item.</Text>
      <View>
        {aboutDetail
          .slice(0, readMore ? aboutDetail.length : 2) // Show all if readMore, otherwise show only 2
          .map((item, key) => renderInfor(item, key, key === 1 && !readMore))}
      </View>
      <TouchableOpacity onPress={() => setReadMore(!readMore)}>
        <Text style={styles.readMoreText}>
          {readMore ? "Hidden" : "Read More"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
    marginHorizontal: 18,
  },
  aboutTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  readMoreText: {
    color: "#0D986A",
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "right",
    textDecorationLine: "underline",
  },
});
