import axiosInstance from "../../../helpers/axios";

const getEditSpt = (id, setData) => {
  axiosInstance
    .get(`spt/ubah/${id}`)
    .then((res) => {
      setData(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export default getEditSpt;
