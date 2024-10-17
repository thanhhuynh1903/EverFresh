import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Dimensions, ScrollView } from "react-native";

const WIDTH = Dimensions.get("window").width;

export default function ColorBar({
  defaultColor,
  defaultColorList,
  setDefaultColorIndex,
}) {
  const [colorList, setColorList] = useState([]);

  const [defaulList, setDefaulList] = useState([]);

  // Update colorList only if defaultColorList or defaultColor changes
  useEffect(() => {
    if (defaultColorList) {
      const updateColorList = defaultColorList.map((item) => {
        return { color: item?.color };
      });

      const defaultIndex = defaultColorList.findIndex(
        (item) => item.color === defaultColor
      );
      if (defaultIndex !== -1) {
        handlePress(
          defaultColorList[defaultIndex],
          defaultIndex - 1,
          updateColorList
        );
      } else {
        setColorList(updateColorList);
      }
      setDefaulList(updateColorList);
    }
  }, [defaultColorList, defaultColor]); // Dependency array includes defaultColor

  const handlePress = (item, index, updateColorList) => {
    const middleIndex = Math.floor(colorList.length / 2);
    const shift = middleIndex - index;
    console.log(item);
    console.log(index);
    console.log(updateColorList);

    // Create a new list so state is updated immutably
    const newList = [...(updateColorList || colorList)];
    for (let i = 0; i < Math.abs(shift); i++) {
      if (shift > 0) {
        newList.unshift(newList.pop());
      } else {
        newList.push(newList.shift());
      }
    }
    console.log(newList);

    setColorList([...newList]);
    setDefaultColorIndex(
      (updateColorList || defaulList).findIndex(
        (element) => element.color === item.color
      )
    );
  };

  const renderColorItem = (item, key) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.colorItem,
          // backgroundColor: item?.color,
          backgroundColor: item?.color.toLowerCase(),
          width:
            key === Math.floor(colorList.length / 2)
              ? WIDTH * 0.08
              : WIDTH * 0.06,
          height:
            key === Math.floor(colorList.length / 2)
              ? WIDTH * 0.08
              : WIDTH * 0.06,
          // marginHorizontal:
          //   key === Math.floor(colorList.length / 2)
          //     ? WIDTH * 0.01
          //     : WIDTH * 0.02,
        }}
        onPress={() => handlePress(item, key)}
        key={key}
      />
    );
  };

  return (
    <ScrollView
      style={styles.colorList}
      contentContainerStyle={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
      }}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
    >
      {colorList.map((item, key) => renderColorItem(item, key))}
    </ScrollView>
  );
}

const styles = {
  colorList: {
    position: "absolute",
    height: "60%",
    top: "20%",
    left: "30%",
    width: WIDTH * 0.1,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#203901",
    gap: 18,
  },
  colorItem: {
    width: WIDTH * 0.06,
    height: WIDTH * 0.06,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.2)",
  },
};
