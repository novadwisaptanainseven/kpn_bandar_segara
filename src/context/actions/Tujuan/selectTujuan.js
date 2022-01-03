import axiosInstance from "../../../helpers/axios";

const selectTujuan = (setData) => {
  axiosInstance
    .get(`tujuan`)
    .then((res) => {
      setData(res.data.data_tujuan);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export default selectTujuan;
