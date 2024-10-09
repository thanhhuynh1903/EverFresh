import api from "./apiService";

export const getCollections = async (id) => {
  try {
    const response = await api.get(`/collections/` + id);
    return response;
  } catch (error) {
    console.log("getCollections in service/collection error : ", error);
    return error;
  }
};

export const addToCollections = async (id) => {
  try {
    const response = await api.post(`/collections/add-to-favorite`, {
      plant_id: id,
    });
    return response;
  } catch (error) {
    console.log("addToCollections in service/collection error : ", error);
    return error;
  }
};

export const changeCollections = async (id, collectionName) => {
  try {
    const response = await api.put(`/collections/change-collection`, {
      plant_id: id,
      collection_name: collectionName,
    });
    return response;
  } catch (error) {
    console.log("changeCollections in service/collection error : ", error);
    return error;
  }
};

export const removePlantFromCollections = async (id, collectionId) => {
  try {
    const response = await api.put(`/collections/remove`, {
      plant_id: id,
      collection_id: collectionId,
    });
    return response;
  } catch (error) {
    console.log(
      "removePlantFromCollections in service/collection error : ",
      error
    );
    return error;
  }
};

export const deleteCollections = async (id) => {
  try {
    const response = await api.delete(`/collections/` + id);
    return response;
  } catch (error) {
    console.log("getCollections in service/collection error : ", error);
    return error;
  }
};
