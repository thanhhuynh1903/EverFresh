import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  Dimensions,
} from "react-native";

const WIDTH = Dimensions.get("window").width;

export default function ChangeColorWheel() {
  const [planterList, setPlanterList] = useState([
    { image: require("../../assets/plant details/pot6.png") },
    { image: require("../../assets/plant details/pot5.png") },
    { image: require("../../assets/plant details/pot4.png") },
    { image: require("../../assets/plant details/pot6.png") },
    { image: require("../../assets/plant details/pot3.png") },
    { image: require("../../assets/plant details/pot3.png") },
    { image: require("../../assets/plant details/pot3.png") },
  ]);

  const numPots = planterList.length; // Number of pots based on the state length
  const animationValues = useRef(
    planterList.map(() => ({
      rotation: new Animated.Value(0), // Rotation value for animation
      translateX: new Animated.Value(0), // X translation value
      translateY: new Animated.Value(0), // Y translation value
    }))
  ).current;

  const [wheelDimensions, setWheelDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Set initial positions for the planters when the component mounts
    if (wheelDimensions.width && wheelDimensions.height) {
      planterList.forEach((_, i) => {
        const { x, y } = calculatePotPosition(i);
        animationValues[i].translateX.setValue(x);
        animationValues[i].translateY.setValue(y);
        animationValues[i].rotation.setValue(0); // Reset rotation to 0
      });
    }
  }, [wheelDimensions, planterList]); // Trigger this effect when the wheel's dimensions are known or planterList changes

  const calculatePotPosition = (index) => {
    const k = 110 / 8 / 5; // Constant for curvature
    const vertexY = 50 / 9; // Y value at the top of the curve
    const maxHeight = 90; // Max height for positioning

    const bottomPositionValue = (maxHeight / numPots) * (index + 0.5);
    const leftPositionValue =
      k * Math.pow(index - (numPots - 1) / 2, 2) + vertexY;

    // Convert % to px based on changingWheel's dimensions
    return {
      x: (leftPositionValue / 100) * wheelDimensions.width,
      y: (bottomPositionValue / 100) * wheelDimensions.height,
    };
  };

  const handlePress = (index) => {
    const middleIndex = Math.floor(numPots / 2);
    const shift = middleIndex - index;

    // Create a new list so state is updated immutably
    const newList = [...planterList];
    for (let i = 0; i < Math.abs(shift); i++) {
      if (shift > 0) {
        newList.unshift(newList.pop());
      } else {
        newList.push(newList.shift());
      }
    }

    // Animate the new positions and rotation
    newList.forEach((_, i) => {
      const { x, y } = calculatePotPosition(i);

      // Animate the rotation for the selected pot
      Animated.timing(animationValues[i].rotation, {
        toValue: 1, // Rotate to 1 (360 degrees)
        duration: 300, // Duration of the rotation animation
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true, // Use native driver for better performance
      }).start(() => {
        // Reset the rotation back to 0 after the animation
        animationValues[i].rotation.setValue(0);
      });

      // Animate the position using translation
      Animated.spring(animationValues[i].translateX, {
        toValue: x,
        speed: 2, // Adjust for smoothness
        bounciness: 10,
        useNativeDriver: true, // Use native driver for animation
      }).start();

      Animated.spring(animationValues[i].translateY, {
        toValue: y,
        speed: 2,
        bounciness: 10,
        useNativeDriver: true,
      }).start();
    });

    setPlanterList(newList); // Update the list immutably after animation
  };

  const renderPot = (item, index) => {
    // Interpolate rotation for 360 degrees
    const rotateInterpolate = animationValues[index].rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"], // Rotation from 0 to 360 degrees
    });

    return (
      <Animated.View
        style={[
          styles.pot,
          {
            transform: [
              { translateX: animationValues[index].translateX }, // Apply translation in X
              { translateY: animationValues[index].translateY }, // Apply translation in Y
              { rotate: rotateInterpolate }, // Apply rotation
            ],
          },
        ]}
        key={index}
      >
        <TouchableOpacity onPress={() => handlePress(index)}>
          <Image source={item.image} resizeMode="contain" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View
      style={styles.changingWheel}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setWheelDimensions({ width, height }); // Capture changingWheel dimensions
      }}
    >
      {planterList.map((item, index) => renderPot(item, index))}
    </View>
  );
}

const styles = {
  changingWheel: {
    width: WIDTH * 1.2, // Adjust as necessary
    height: "100%", // Adjust as necessary
    backgroundColor: "white",
    borderWidth: 4,
    borderColor: "#203901",
    borderRadius: 500,
    position: "relative",
  },
  pot: {
    width: "10%", // Adjust size as necessary
    height: "10%", // Adjust size as necessary
    position: "absolute",
  },
};
