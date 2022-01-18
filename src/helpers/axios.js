import axios from "axios";

const baseURL = "http://localhost/kpn_bandar_segara_api/api/";
const baseUrlImg = "http://localhost/kpn_bandar_segara_api/public/images/";
localStorage.baseURL = baseURL;
localStorage.baseUrlImg = baseUrlImg;
let headers = {};

// console.log("Base URL: ", baseURL);

if (localStorage.token) {
  headers.Authorization = `Bearer ${localStorage.token}`;
  headers.withCredentials = true;
  headers.Accept = "application/json";
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return new Promise((resolve, reject) => {
      resolve(response);
    });
  },
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {});
    }
    if (error.response.status === 403) {
      localStorage.clear();

      return new Promise((resolve, reject) => {
        reject(error);
      });
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);

export default axiosInstance;
