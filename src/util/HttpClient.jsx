import axios from "axios";
import cargoToast from "cogo-toast";

//axios.defaults.baseURL =  import.meta.env.VITE_SERVER_URL;
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

axios.interceptors.response.use(
  function (res) {
    return res;
  },
  (err) => {
    console.log(err);
    cargoToast.error(`server responded with error code ${err} ${err.code}`);
    return Promise.reject(err);
  }
);

export const HttpClient = () => {
  const token = localStorage.getItem("token");

  const defaultSetting = {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  };

  return {
    get: async (url) => await axios.get(url, { ...defaultSetting }),
    post: async (url, data) =>
      await axios.post(url, data, { ...defaultSetting }),
    put: async (url, data) => await axios.put(url, data, { ...defaultSetting }),
    delete: async (url) => await axios.delete(url, { ...defaultSetting }),
  };
};
