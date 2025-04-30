import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios"
import LocalForage from "localforage"


const onJwt = async (config: InternalAxiosRequestConfig) => {
    const token = await LocalForage.getItem('@TOKEN_KEY');
    if (token && config.headers){
        config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
}

const setupInterceptors = (axiosInstance: AxiosInstance) => {
    axiosInstance.interceptors.request.use(onJwt);
    return axiosInstance;
}

const api = axios.create();
setupInterceptors(api);
export default api;