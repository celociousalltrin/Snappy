import axios from "axios";

import { store } from "../redux/store";
import { addNewAccesstoken } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { TbSquareChevronsDownFilled } from "react-icons/tb";

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_SERVER_API_URL;

axios.interceptors.request.use(
  function (config) {
    document.body.classList.add("loading-indicator");

    const userDetails = store.getState().user?.data;
    if (!!userDetails.access_token)
      config.headers.Authorization = `Bearer ${userDetails.access_token}`;

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
    document.body.classList.remove("loading-indicator");
    if (error.response.status === 401) {
      window.location.href = "http://127.0.0.1:5173/logout";
    }
    return Promise.reject(error?.response);
  }
);

export default axios;
