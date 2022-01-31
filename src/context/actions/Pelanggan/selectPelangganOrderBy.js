import axiosInstance from "../../../helpers/axios";

const selectPelangganOrderBy = (setData) => {
  axiosInstance
    .get(`pelanggan_orderby`)
    .then((res) => {
      setData(res.data.data_pelanggan);
      // console.log(res.data);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default selectPelangganOrderBy;
