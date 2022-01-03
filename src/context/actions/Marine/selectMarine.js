import axiosInstance from "../../../helpers/axios";

const selectMarine = (setData) => {
  axiosInstance
    .get(`marine`)
    .then((res) => {
      setData(res.data.data_marine);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export default selectMarine;
