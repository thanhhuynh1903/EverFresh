// api/imageClassificationAPI.js
import axios from "axios";
import axiosInstance from "./scanApiService"; // Adjust the path based on your file structure

/**
 * Classifies an image by sending it to the YOLO-based model API.
 *
 * @param {File} file - The image file to be classified.
 * @returns {Promise<Object>} - A promise that resolves to the API response containing class ID, name, and confidence score.
 */
export const classifyImage = async (imageUri) => {
  const formData = new FormData();
  formData.append("file", {
    uri: imageUri,
    type: "image/jpeg",
    name: "image.jpg",
  });

  try {
    const response = await axios.post(
      "http://yolo-sam-api.eastasia.cloudapp.azure.com:8000/classify_image/",
      formData
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const detectAndSegment = async (imageUri) => {
  const formData = new FormData();
  formData.append("file", {
    uri: imageUri,
    type: "image/jpeg",
    name: "image.jpg",
  });

  try {
    const response = await axios.post(
      "http://yolo-sam-api.eastasia.cloudapp.azure.com:8000/detect_and_segment/",
      formData
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
