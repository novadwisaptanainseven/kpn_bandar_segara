import axiosInstance from "../../../helpers/axios";

const getRiwayatNotaById = (id, setData) => {
  axiosInstance
    .get(`cetak_nota/detail/${id}`)
    .then((res) => {
      setData(res.data);
      // console.log(res.data.data_nota);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export default getRiwayatNotaById;
