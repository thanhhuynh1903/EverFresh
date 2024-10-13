import axios from "axios";
// import { refresh } from "./refresh";
import AsyncStorage from "@react-native-async-storage/async-storage";

const url = process.env.SCAN_API_LINK;

const instance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  responseType: "json",
});

// instance.interceptors.request.use(
//   async (config) => {
//     const accessToken = await AsyncStorage.getItem("accessToken");
//     // console.log(accessToken);
//     if (accessToken) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default instance;
