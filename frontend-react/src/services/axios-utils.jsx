import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_SERVER_API_URL;

axios.interceptors.request.use(
  function (config) {
    config.headers.prince = "cellllo";
    return config;
  },
  function (error) {
    document.body.classList.remove("loading-indicator");
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log("🚀 ~ file: axios-utils.jsx:18 ~ response:", response);

    return response;
  },
  (error) => {}
);

export default axios;
