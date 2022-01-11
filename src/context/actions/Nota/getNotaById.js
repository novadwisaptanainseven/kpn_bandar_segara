import axiosInstance from "../../../helpers/axios";

const getNotaById = (id, setData) => {
  axiosInstance
    .get(`nota/detail/${id}`)
    .then((res) => {
      setData(res.data.data_nota);
      console.log(res.data.data_nota);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export default getNotaById;
