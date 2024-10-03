import api from "./apiService";

export const getOrder = async (id) => {
  try {
    const response = await api.get(`/orders` + (id || ""));
    return response;
  } catch (error) {
    console.log("getOrder in service/order error : ", error);
    return error;
  }
};

export const createOrder = async (data) => {
  try {
    const response = await api.post(`/orders`, data);
    return response;
  } catch (error) {
    console.log("createOrder in service/order error : ", error);
    return error;
  }
};
