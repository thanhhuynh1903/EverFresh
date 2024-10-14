// api/imageClassificationAPI.js
import axios from "axios";
import * as FileSystem from "expo-file-system"; // Adjust the path based on your file structure

/**
 * Classifies an image by sending it to the YOLO-based model API.
 *
 * @param {File} file - The image file to be classified.
 * @returns {Promise<Object>} - A promise that resolves to the API response containing class ID, name, and confidence score.
 */
export const classifyImage = async (imageUri) => {
  const fileInfo = await FileSystem.getInfoAsync(imageUri);
  if (!fileInfo.exists) {
    console.log("File does not exist:", imageUri);
    return;
  }

  const fileUri = imageUri; // Use the provided image URI directly
  const fileName = fileUri.split("/").pop(); // Get the file name
  const fileType = fileUri.split(".").pop(); // Get the file type (extension)

  const formData = new FormData();
  formData.append("file", {
    uri: fileUri,
    name: fileName,
    type: `image/${fileType}`, // Adjust based on your file type
  });

  console.log(
    "Preparing to upload image to:",
    "http://yolo-sam-api.eastasia.cloudapp.azure.com:8000/classify_image/"
  );
  console.log("Image URI:", fileUri);
  console.log("Form Data:", formData);

  try {
    const response = await axios.post(
      "http://yolo-sam-api.eastasia.cloudapp.azure.com:8000/classify_image/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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
