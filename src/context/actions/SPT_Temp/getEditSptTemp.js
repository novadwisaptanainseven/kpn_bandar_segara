import axiosInstance from "../../../helpers/axios";

const getEditSptTemp = (id, setData) => {
  axiosInstance
    .get(`spt_temp/ubah/${id}`)
    .then((res) => {
      setData(res.data);
      // console.log(res.data);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default getEditSptTemp;
