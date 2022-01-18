import axiosInstance from "../../../helpers/axios";

const getTujuanById = (id, setData) => {
  axiosInstance
    .get(`tujuan/detail/${id}`)
    .then((res) => {
      setData(res.data.data_tujuan);
      // console.log(res.data.data_tujuan);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default getTujuanById;
