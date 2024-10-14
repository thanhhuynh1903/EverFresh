import api from "./apiService";

export const paymentMomo = async (data) => {
  try {
    const response = await api.post(`/payment/momo`, data);
    return response;
  } catch (error) {
    console.log("paymentMomo in service/payment error : ", error);
    return error;
  }
};

export const paymentStripe = async (data) => {
  try {
    const response = await api.post(`/payment/stripe`, data);
    return response;
  } catch (error) {
    console.log("paymentStripe in service/payment error : ", error);
    return error;
  }
};

export const paymentStripeUprank = async () => {
  try {
    const response = await api.post(`/payment/stripe/up-rank`);
    return response;
  } catch (error) {
    console.log("paymentStripe in service/payment error : ", error);
    return error;
  }
};
