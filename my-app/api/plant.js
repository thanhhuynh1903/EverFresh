import api from "./apiService";

export const getPlants = async (id) => {
  try {
    const response = await api.get(`/plants/` + (id || ""));
    return response;
  } catch (error) {
    console.log("getPlants in service/plant error : ", error);
    return error;
  }
};

export const getPlantByName = async (name) => {
  try {
    const response = await api.get(`/plants/search?searchName=` + (name || ""));
    return response;
  } catch (error) {
    console.log("getPlantByName in service/plant error : ", error);
    return error;
  }
};

export const getPlanters = async (id) => {
  try {
    const response = await api.get(`/planters/` + (id || ""));
    return response;
  } catch (error) {
    console.log("getPlanters in service/plant error : ", error);
    return error;
  }
};

export const getPlanterByName = async (name) => {
  try {
    const response = await api.get(
      `/planters/search?searchName=` + (name || "")
    );
    return response;
  } catch (error) {
    console.log("getPlanterByName in service/plant error : ", error);
    return error;
  }
};

export const getSeeds = async (id) => {
  try {
    const response = await api.get(`/seeds/` + (id || ""));
    return response;
  } catch (error) {
    console.log("getSeeds in service/plant error : ", error);
    return error;
  }
};

export const getSeedByName = async (name) => {
  try {
    const response = await api.get(`/seeds/search?searchName=` + (name || ""));
    return response;
  } catch (error) {
    console.log("getSeedByName in service/plant error : ", error);
    return error;
  }
};
