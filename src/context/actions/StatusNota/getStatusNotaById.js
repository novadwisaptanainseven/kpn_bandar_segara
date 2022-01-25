import axiosInstance from "../../../helpers/axios";

const getStatusNotaById = (id, setData) => {
  axiosInstance
    .get(`status_nota/detail/${id}`)
    .then((res) => {
      setData(res.data.data_status_nota);
      // console.log(res.data.data_status_nota);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default getStatusNotaById;
