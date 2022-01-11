import axiosInstance from "../../../helpers/axios";

const getEditNotaById = (id, setData) => {
  axiosInstance
    .get(`nota/ubah/${id}`)
    .then((res) => {
      setData(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export default getEditNotaById;
