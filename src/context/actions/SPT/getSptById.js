import axiosInstance from "../../../helpers/axios";

const getSptById = (id, setData) => {
  axiosInstance
    .get(`spt/detail/${id}`)
    .then((res) => {
      setData(res.data.data_spt);
      console.log(res.data.data_spt);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export default getSptById;
