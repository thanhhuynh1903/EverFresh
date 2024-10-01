import api from "./apiService";

export const getVouchers = async (id) => {
    try {
        const response = await api.get(`/vouchers/${id}`);
        return response;
    } catch (error) {
        console.log("getVouchers in service/voucher error : ", error);
        return error;
    }
};