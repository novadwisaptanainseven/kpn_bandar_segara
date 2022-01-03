import axiosInstance from "../../../helpers/axios";

const getDriverById = (id, setData) => {
  axiosInstance
    .get(`driver/detail/${id}`)
    .then((res) => {
      setData(res.data.data_driver);
      console.log(res.data.data_driver);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export default getDriverById;
