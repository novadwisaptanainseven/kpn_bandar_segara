import axiosInstance from "../../../helpers/axios";

const selectStatusNota = (setData) => {
  axiosInstance
    .get(`status_nota`)
    .then((res) => {
      setData(res.data.data_status_nota);
      // console.log(res.data);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default selectStatusNota;
