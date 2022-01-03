import axiosInstance from "../../../helpers/axios";

const selectDriver = (setData) => {
  axiosInstance
    .get(`driver`)
    .then((res) => {
      setData(res.data.data_driver);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export default selectDriver;
