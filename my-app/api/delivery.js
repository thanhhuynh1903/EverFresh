import api from "./apiService";

export const getDeliveryMethods = async (id) => {
    try {
        const response = await api.get(`/delivery-methods/` + (id || ""))
        return response;
    } catch (error) {
        console.log("getDeliveryMethods in service/delivery error : ", error);
        return error;
    }
};

export const getDeliveryInformation = async (id) => {
    try {
        const response = await api.get(`/delivery-information/` + (id || ""));
        return response;
    } catch (error) {
        console.log("getDeliveryInformation in service/delivery error : ", error);
        return error;
    }
};

export const createDeliveryInformation = async (id, data) => {
    try {
        const response = await api.post(`/delivery-information/${id}`, data);
        return response;
    } catch (error) {
        console.log("createDeliveryInformation in service/delivery error : ", error);
        return error;
    }
};

export const updateDeliveryInformation = async (id, data) => {
    try {
        const response = await api.put(`/delivery-information/${id}`, data);
        return response;
    } catch (error) {
        console.log("updateDeliveryInformation in service/delivery error : ", error);
        return error;
    }
};

export const deleteDeliveryInformation = async (id, data) => {
    try {
        const response = await api.delete(`/delivery-information/${id}`, data);
        return response;
    } catch (error) {
        console.log("deleteDeliveryInformation in service/delivery error : ", error);
        return error;
    }
};