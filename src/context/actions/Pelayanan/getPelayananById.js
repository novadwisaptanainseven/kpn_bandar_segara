import axiosInstance from "../../../helpers/axios";

const getPelayananById = (id, setData) => {
  axiosInstance
    .get(`pelayanan/detail/${id}`)
    .then((res) => {
      setData(res.data.data_pelayanan);
      // console.log(res.data.data_pelayanan);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default getPelayananById;
