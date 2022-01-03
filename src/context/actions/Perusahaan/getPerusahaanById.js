import axiosInstance from "../../../helpers/axios";

const getPerusahaanById = (id, setData) => {
  axiosInstance
    .get(`perusahaan/detail/${id}`)
    .then((res) => {
      setData(res.data.data_perusahaan);
      console.log(res.data.data_perusahaan);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export default getPerusahaanById;
