import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const onRequest = async (config) => {
    const token = await AsyncStorage.getItem("@TOKEN_KEY");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

const setupInterceptorsTo = (axiosInstance) => {
    axiosInstance.interceptors.request.use(onRequest);
    return axiosInstance;
};

const api = axios.create();
setupInterceptorsTo(api);

export default api;