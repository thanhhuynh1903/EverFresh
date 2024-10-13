// api/imageClassificationAPI.js
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
    console.log("get in");

    const response = await axiosInstance.post("/classify_image/", formData);
    console.log("get out");

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
