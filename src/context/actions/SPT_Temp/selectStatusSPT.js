import axiosInstance from "../../../helpers/axios";

const selectStatusSPT = (setData) => {
  axiosInstance
    .get(`status_spt`)
    .then((res) => {
      setData(res.data.data_status_spt);
      // console.log(res.data);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default selectStatusSPT;
