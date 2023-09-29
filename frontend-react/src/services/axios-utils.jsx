import axios from "axios";

import { store } from "../redux/store";
import { addNewAccesstoken } from "../redux/slices/userSlice";

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_SERVER_API_URL;

axios.interceptors.request.use(
  function (config) {
    document.body.classList.add("loading-indicator");

    const userDetails = store.getState().user?.data;
    if (!!userDetails.access_token)
      config.headers.Authorization = `Bearer ${userDetails.access_token}`;

    config.headers.snappy_user_name = userDetails.user_name;
    config.withCredentials = true;
    return config;
  },
  function (error) {
    document.body.classList.remove("loading-indicator");
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    if (!!response.data.new_access_token) {
      store.dispatch(addNewAccesstoken(response.data.new_access_token));
    }
    document.body.classList.remove("loading-indicator");
    return response;
  },
  (error) => {
    console.log("🚀 ~ file: axios-utils.jsx:30 ~ error:", error);
    document.body.classList.remove("loading-indicator");
    return Promise.reject(error?.response);
  }
);

export default axios;
