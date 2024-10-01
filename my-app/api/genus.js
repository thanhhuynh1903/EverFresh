import api from "./apiService";

export const getGenus = async (id) => {
    try {
        const response = await api.get(`/genus/${id}`);
        return response;
    } catch (error) {
        console.log("getGenus in service/plant error : ", error);
        return error;
    }
};