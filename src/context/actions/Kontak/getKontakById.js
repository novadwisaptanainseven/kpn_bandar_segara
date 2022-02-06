import axiosInstance from "../../../helpers/axios";

const getKontakById = (id, setData) => {
  axiosInstance
    .get(`kontak/detail/${id}`)
    .then((res) => {
      setData(res.data.data_kontak);
      // console.log(res.data.data_kontak);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default getKontakById;
