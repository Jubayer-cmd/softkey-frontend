import { authKey } from "@/constants/storageKey";
import { getNewAccessToken } from "@/services/auth.service";

import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  async function (error) {
    await console.log(error);
    const config = error?.config;
    if (error?.response?.status === 403 && !config?.sent) {
      config.sent = true;
      const response = await getNewAccessToken();
      const accessToken = response?.data?.accessToken;
      config.headers["Authorization"] = accessToken;
      setToLocalStorage(authKey, accessToken);
      console.log("access from instance", accessToken);
      return instance(config);
    } else {
      const responseError = await error?.response?.data;
      if (responseError) {
        // You can now access the detailed error information from the server.
        const responseObject: IGenericErrorResponse = {
          statusCode: responseError.statusCode || 500,
          message: responseError.message || "Something went wrong",
          errorMessages:
            responseError.errorMessages || "No error messages provided",
        };
        return responseObject;
      } else {
        // Handle cases where there is no responseError in the server response.
        const responseObject: IGenericErrorResponse = {
          statusCode: 500,
          message: "Something went wrong",
          errorMessages: [],
        };
        return responseObject;
      }
    }
  }
);

export { instance };
