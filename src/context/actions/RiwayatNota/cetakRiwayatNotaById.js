import axiosInstance from "../../../helpers/axios";

const cetakRiwayatNotaById = (id, setData) => {
  axiosInstance
    .get(`cetak_nota/cetak/${id}`)
    .then((res) => {
      setData(res.data);
      // console.log(res.data.data_nota);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default cetakRiwayatNotaById;
