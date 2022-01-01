import axiosInstance from "../../../helpers/axios";

const selectPerusahaan = (setData) => {
  axiosInstance
    .get(`perusahaan`)
    .then((res) => {
      setData(res.data.data_perusahaan);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export default selectPerusahaan;
