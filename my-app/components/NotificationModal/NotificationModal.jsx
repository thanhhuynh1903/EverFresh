import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { selectGallery } from "../../redux/selector/selector";
import { formatPrice } from "../../utils/utils";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function NotificationModal({}) {
  return <Modal></Modal>;
}

const styles = StyleSheet.create({});
