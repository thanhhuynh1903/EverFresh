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

export const addToCart = async (id, amount) => {
  try {
    const data = {
      plant_id: id,
      quantity: amount || 1,
    };
    const response = await api.post(`/cart-items`, data);
    return response;
  } catch (error) {
    console.log("addToCart in service/cart error : ", error);
    return error;
  }
};

export const updateCartItem = async (id, amount) => {
  try {
    const response = await api.put(`/cart-items/${id}`, { quantity: amount });
    return response;
  } catch (error) {
    console.log("updateCartItem in service/cart error : ", error);
    return error;
  }
};

export const deleteCartItem = async (id) => {
  try {
    const response = await api.put(`/cart-items/${id}`);
    return response;
  } catch (error) {
    console.log("deleteCartItem in service/cart error : ", error);
    return error;
  }
};
