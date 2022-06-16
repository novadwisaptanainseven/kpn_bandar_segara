import axiosInstance from "../../../helpers/axios";

const getKontakFrontPage = (setData) => {
  axiosInstance
    .get(`kontak`)
    .then((res) => {
      setData(res.data.data_kontak);
      // console.log(res.data);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default getKontakFrontPage;
