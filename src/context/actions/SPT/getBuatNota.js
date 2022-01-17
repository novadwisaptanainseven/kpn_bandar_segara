import axiosInstance from "../../../helpers/axios";

const getBuatNota = (id, setData) => {
  axiosInstance
    .get(`nota/tambah/${id}`)
    .then((res) => {
      setData(res.data);
      // console.log(res.data);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default getBuatNota;
