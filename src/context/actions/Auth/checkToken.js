import axiosInstance from "../../../helpers/axios";

export const checkToken = () => {
  axiosInstance
    .get(`${localStorage.baseURL}ceklogin`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
