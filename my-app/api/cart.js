import api from "./apiService";

export const getCart = async () => {
    try {
        const response = await api.get(`/cart`);
        return response;
    } catch (error) {
        console.log("getCart in service/cart error : ", error);
        return error;
    }
};

export const createCart = async () => {
    try {
        const response = await api.post(`/cart`);
        return response;
    } catch (error) {
        console.log("getCart in service/cart error : ", error);
        return error;
    }
};