import api from "./apiService";

export const login = async (data) => {
  try {
    const response = await api.post(`/auth/login`, data);
    return response;
  } catch (error) {
    console.log("login in service/auth error : ", error);
    return error;
  }
};

export const loginGoogle = async (data) => {
  try {
    const response = await api.post(`/auth/loginGoogle`, data);
    return response;
  } catch (error) {
    console.log("login in service/auth error : ", error);
    return error;
  }
};
