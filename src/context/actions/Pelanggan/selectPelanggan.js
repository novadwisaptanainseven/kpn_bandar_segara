import axiosInstance from "../../../helpers/axios";

const selectPelanggan = (setData) => {
  axiosInstance
    .get(`pelanggan`)
    .then((res) => {
      setData(res.data.data_pelanggan);
      // console.log(res.data);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default selectPelanggan;
