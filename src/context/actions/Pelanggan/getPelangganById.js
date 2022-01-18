import axiosInstance from "../../../helpers/axios";

const getPelangganById = (id, setData) => {
  axiosInstance
    .get(`pelanggan/detail/${id}`)
    .then((res) => {
      setData(res.data.data_pelanggan);
      // console.log(res.data.data_pelanggan);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default getPelangganById;
