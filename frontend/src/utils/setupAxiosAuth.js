import axios from "axios";
import { clearAuth } from "./auth";

let interceptorId;

const setupAxiosAuth = () => {
  if (interceptorId !== undefined) return;

  interceptorId = axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        clearAuth();
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  );
};

export default setupAxiosAuth;
