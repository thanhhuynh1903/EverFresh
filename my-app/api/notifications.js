import api from "./apiService";

export const getNotificate = async (id) => {
  try {
    const response = await api.get(`/notifications/${id || ""}`);
    return response;
  } catch (error) {
    console.log("getNotificate in service/notificate error : ", error);
    return error;
  }
};

export const updateNotificateReadAll = async () => {
  try {
    const response = await api.put(`/notifications/readAll`);
    return response;
  } catch (error) {
    console.log(
      "updateNotificateReadAll in service/notificate error : ",
      error
    );
    return error;
  }
};

export const updateNotificateSeenAll = async () => {
  try {
    const response = await api.put(`/notifications/seenAll`);
    return response;
  } catch (error) {
    console.log(
      "updateNotificateSeenAll in service/notificate error : ",
      error
    );
    return error;
  }
};

export const updateNotificateRead = async (id) => {
  try {
    const response = await api.put(`/notifications/read/${id}`);
    return response;
  } catch (error) {
    console.log("updateNotificateRead in service/notificate error : ", error);
    return error;
  }
};

export const updateNotificateSeen = async (id) => {
  try {
    const response = await api.put(`/notifications/seen/${id}`);
    return response;
  } catch (error) {
    console.log("updateNotificateSeen in service/notificate error : ", error);
    return error;
  }
};

export const deleteNotificateAll = async () => {
  try {
    const response = await api.delete(`/notifications/deleteAll`);
    return response;
  } catch (error) {
    console.log("deleteNotificateAll in service/notificate error : ", error);
    return error;
  }
};

export const deleteNotificate = async (id) => {
  try {
    const response = await api.delete(`/notifications/delete/${id}`);
    return response;
  } catch (error) {
    console.log("deleteNotificate in service/notificate error : ", error);
    return error;
  }
};
