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
    type: "image/jpeg", // Adjust the type if necessary
    name: "image.jpg", // You can use any name you want
  });

  try {
    const response = await axiosInstance.post("/classify_image/", formData);
    return response.data; // Adjust based on your response structure
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Rethrow to handle it where you call this function
  }
};
