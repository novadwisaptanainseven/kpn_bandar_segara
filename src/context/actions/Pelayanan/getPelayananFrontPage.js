import axiosInstance from "../../../helpers/axios";

const getPelayananFrontPage = (setData) => {
  axiosInstance
    .get(`pelayanan`)
    .then((res) => {
      setData(res.data.data_pelayanan);
      // console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export default getPelayananFrontPage;
