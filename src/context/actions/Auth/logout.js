import axiosInstance from "../../../helpers/axios";

const logout = () => {
  axiosInstance
    .post(`logout`)
    .then((res) => {
      // console.log(res.data);

      localStorage.clear();
      window.location.href = "/login";
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default logout;
