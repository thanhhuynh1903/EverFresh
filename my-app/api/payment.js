import api from "./apiService";

export const paymentMomo = async ({ voucherId, deliveryMethodId, deliveryInformationId, cartId }) => {
    try {
        const data = {
            voucher_id: voucherId,
            delivery_method_id: deliveryMethodId,
            delivery_information_id: deliveryInformationId,
            cart_id: cartId
        }
        const response = await api.post(`/payment/momo`, data);
        return response;
    } catch (error) {
        console.log("paymentMomo in service/payment error : ", error);
        return error;
    }
};