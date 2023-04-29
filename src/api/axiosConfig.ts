import Axios from "axios";
import { getToken, removeToken } from "../utils/token";

export const BaseUrl = "http://localhost:3000";

export const apiAgent = Axios.create({ baseURL: BaseUrl });
apiAgent.interceptors.request.use(
  (config: any) => {
    if (!config.headers.Authorization && getToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiAgent.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response.status === 401) {
      removeToken();
    }

    return Promise.reject(error);
  }
);
