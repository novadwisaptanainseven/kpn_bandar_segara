import axiosInstance from "../../../helpers/axios";
import { LOADING, SUCCESS } from "../../actionTypes";

const getSptTemp = (idPelanggan, setLoading, setData) => {
  setLoading(true);

  axiosInstance
    .get(`spt_temp/ubah/${idPelanggan}`)
    .then((res) => {
      setData(res.data.data_spt_temp);
      setLoading(false);
      // console.log(res.data);
    })
    .catch((err) => {
      setLoading(false);
      // console.log(err.response.data);
    });
};

export default getSptTemp;
