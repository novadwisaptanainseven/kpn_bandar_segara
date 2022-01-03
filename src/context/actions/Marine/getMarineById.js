import axiosInstance from "../../../helpers/axios";

const getMarineById = (id, setData) => {
  axiosInstance
    .get(`marine/detail/${id}`)
    .then((res) => {
      setData(res.data.data_marine);
      console.log(res.data.data_marine);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export default getMarineById;
