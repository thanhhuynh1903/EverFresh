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

export const getNewestOrder = async () => {
  try {
    const response = await api.get(`/orders/newest-order`);
    return response;
  } catch (error) {
    console.log("getNewestOrder in service/order error : ", error);
    return error;
  }
};

export const updateNewestOrder = async () => {
  try {
    const response = await api.put(`/orders/order-to-old`);
    return response;
  } catch (error) {
    console.log("updateNewestOrder in service/order error : ", error);
    return error;
  }
};
