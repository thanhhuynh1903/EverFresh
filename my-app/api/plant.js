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