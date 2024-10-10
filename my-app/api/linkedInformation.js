import api from "./apiService";

export const getPaymentMethod = async (id) => {
  try {
    const response = await api.get(`/linked-information/${id || ""}`);
    return response;
  } catch (error) {
    console.log(
      "getPaymentMethod in service/linkedInformation error : ",
      error
    );
    return error;
  }
};

export const createPaymentMethod = async (data) => {
  try {
    const response = await api.post(`/linked-information`, data);
    return response;
  } catch (error) {
    console.log(
      "createPaymentMethod in service/linkedInformation error : ",
      error
    );
    return error;
  }
};
