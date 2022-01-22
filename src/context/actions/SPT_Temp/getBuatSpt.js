import axiosInstance from "../../../helpers/axios";

const getBuatSpt = (setData) => {
  axiosInstance
    .get(`spt/tambah`)
    .then((res) => {
      setData(res.data);
      // console.log(res.data);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default getBuatSpt;
