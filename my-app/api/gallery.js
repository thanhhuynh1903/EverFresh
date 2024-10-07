import api from "./apiService";

export const getGallery = async () => {
  try {
    const response = await api.get(`/galleries`);
    return response;
  } catch (error) {
    console.log("getGallery in service/gallery error : ", error);
    return error;
  }
};
