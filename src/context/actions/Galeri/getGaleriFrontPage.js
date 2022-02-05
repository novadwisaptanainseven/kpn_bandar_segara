import axiosInstance from "../../../helpers/axios";

const getGaleriFrontPage = (setData) => {
  axiosInstance
    .get(`galeri`)
    .then((res) => {
      setData(res.data.data_galeri);
      // console.log(res.data);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default getGaleriFrontPage;
