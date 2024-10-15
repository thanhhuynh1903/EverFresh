import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllPlantsFromGalleryThunk,
  getGaleryThunk,
} from "../redux/thunk/galleryThunk";
import {
  addToCollections,
  removePlantFromCollections,
  changeCollections,
} from "../api/collection";
import useCustomToast from "../components/ToastNotification/ToastNotification";
import { getCollectionIdFromPlantId } from "./utils";
import { selectGallery } from "../redux/selector/selector";

const WIDTH = Dimensions.get("window").width;

export const useCollectionActions = () => {
  const dispatch = useDispatch();
  const showToast = useCustomToast();
  const [focusPlant, setFocusPlant] = useState({});
  const galleryRedux = useSelector(selectGallery);
  // Function to refresh the gallery data
  const refreshGallery = async () => {
    const response = await dispatch(getGaleryThunk());
    dispatch(getAllPlantsFromGalleryThunk(response.payload));
  };

  const handleAddToCollection = async (item, setChooseCollectionVisible) => {
    const response = await addToCollections(item?._id);
    console.log(item?._id);

    if (response.status === 201) {
      showToast({
        title: "Success",
        message: (
          <View
            style={{
              width: WIDTH * 0.75,
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Add to collection successfully</Text>
            <TouchableOpacity
              onPress={() => {
                setChooseCollectionVisible(true);
                setFocusPlant(item);
              }}
            >
              <Text style={{ color: "#4287f5", fontWeight: "bold" }}>
                Manager
              </Text>
            </TouchableOpacity>
          </View>
        ),
        type: "success",
      });
      await refreshGallery();
    } else {
      console.log(response?.response?.data);
      console.log(galleryRedux);

      showToast({
        title: "Fail",
        message: `Add plant to collection failed`,
        type: "error",
      });
    }
  };

  const handleRemoveToCollection = async (item) => {
    const collectionId = getCollectionIdFromPlantId(
      galleryRedux.galleries,
      item?._id
    );

    const response = await removePlantFromCollections(item?._id, collectionId);
    if (response.status === 200) {
      showToast({
        title: "Success",
        message: "Removed from collection successfully",
        type: "success",
      });
      await refreshGallery();
    } else {
      showToast({
        title: "Fail",
        message: `Remove plant from collection failed`,
        type: "error",
      });
    }
  };

  const handleChangeCollections = async (collection) => {
    const response = await changeCollections(
      focusPlant?._id,
      collection.collection_name
    );

    if (response.status === 201) {
      showToast({
        title: "Success",
        message: `Changed to collection ${collection?.collection_name} successfully`,
        type: "success",
      });
      await refreshGallery();
    } else {
      showToast({
        title: "Fail",
        message: `Change collection failed`,
        type: "error",
      });
    }
  };

  return {
    handleAddToCollection,
    handleRemoveToCollection,
    handleChangeCollections,
  };
};
