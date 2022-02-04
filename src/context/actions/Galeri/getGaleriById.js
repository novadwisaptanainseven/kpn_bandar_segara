import axiosInstance from "../../../helpers/axios";

const getGaleriById = (id, setData) => {
  axiosInstance
    .get(`galeri/detail/${id}`)
    .then((res) => {
      setData(res.data.data_galeri);
      // console.log(res.data.data_galeri);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default getGaleriById;
