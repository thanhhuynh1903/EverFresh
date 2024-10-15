import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { selectGallery } from "../../redux/selector/selector";
import AddNewCollection from "./AddNewCollection";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function CollectionListBottomSheet({
  visible,
  chooseCollection,
  onClose,
}) {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);
  const bottomSheetRef = useRef(null);
  const galleryRedux = useSelector(selectGallery);

  useEffect(() => {
    if (visible) {
      openBottomSheet();
    } else {
      closeBottomSheet();
    }
  }, [visible]);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setBottomSheetVisible(false);
    if (onClose) onClose();
  };

  const handleChooseCollection = (item) => {
    if (chooseCollection) {
      chooseCollection(item);
      closeBottomSheet();
    }
  };

  const createColection = (name) => {
    setModalVisible(false);
    handleChooseCollection({ collection_name: name });
  };

  const renderCollectionCard = (item, key) => {
    return (
      <TouchableOpacity
        style={styles.collectionCard}
        onPress={() => handleChooseCollection(item)}
        key={key}
      >
        <Image
          source={
            // item?.img_url[0]
            //   ? { uri: item?.img_url[0] || "" }
            //   :
            require("../../assets/cart/plant1.png")
          }
          resizeMode="stretch"
          style={styles.collectionCardImage}
        />
        <View style={styles.collectionCardInfor}>
          <Text style={styles.collectionName}>{item?.collection_name}</Text>
          <Text>{item?.list_plant_id?.length} Plant</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {bottomSheetVisible && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeBottomSheet}
        />
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        style={{ zIndex: 999 }}
      >
        <View style={styles.sheetContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeBottomSheet}
          >
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Add to collection</Text>
          <View style={styles.collectionList}>
            <TouchableOpacity
              style={{
                ...styles.collectionCard,
                borderWidth: 1,
                borderRadius: 12,
                margin: 10,
                padding: 12,
                width: WIDTH - 60,
                height: HEIGHT * 0.08,
              }}
              onPress={() => setModalVisible(true)}
            >
              <View
                style={{
                  ...styles.collectionCardInfor,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    ...styles.collectionName,
                    transform: [{ translateY: 8 }],
                  }}
                >
                  Add new collection +
                </Text>
                <Text></Text>
              </View>
            </TouchableOpacity>
            {galleryRedux?.galleries?.list_collection_id?.map((item, key) =>
              renderCollectionCard(item, key)
            )}
          </View>
        </View>
        <AddNewCollection visible={modalVisible} onSubmit={createColection} />
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: WIDTH,
    height: HEIGHT,
    top: 0,
    left: 0,
  },
  sheetContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  closeText: {
    fontSize: 30,
    color: "#000",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: "#000",
    marginVertical: 8,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  col: {
    width: "48%",
  },

  collectionCard: {
    width: WIDTH,
    height: HEIGHT * 0.1,
    flexDirection: "row",
    gap: WIDTH * 0.05,
  },
  collectionCardImage: {
    height: "100%",
    width: HEIGHT * 0.08,
  },
  collectionCardInfor: {
    height: "100%",
    justifyContent: "space-around",
    backgroundColor: "white",
  },
  collectionName: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
