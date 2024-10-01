import api from "./apiService";

export const getCurrentUser = async () => {
    try {
        const response = await api.get(`/users/current`);
        return response;
    } catch (error) {
        console.log("getCurrentUser in service/user error : ", error);
        return error;
    }
};

export const updateCurrentUser = async (id, data) => {
    try {
        const response = await api.put(`/users/${id}`, data);
        return response;
    } catch (error) {
        console.log("updateCurrentUser in service/user error : ", error);
        return error;
    }
};

export const checkCurrentPassword = async (id, password) => {
    try {
        const data = {
            password: password
        }
        const response = await api.put(`/users/checkOldPassword/${id}`, data);
        return response;
    } catch (error) {
        console.log("checkCurrentPassword in service/user error : ", error);
        return error;
    }
};

export const changePassword = async (id, password, confirmPassword) => {
    try {
        const data = {
            password: password,
            confirmPassword: confirmPassword
        }
        const response = await api.put(`/users/checkOldPassword/${id}`, data);
        return response;
    } catch (error) {
        console.log("changePassword in service/user error : ", error);
        return error;
    }
};