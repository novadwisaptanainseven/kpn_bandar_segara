import { getSptTemp } from ".";
import axiosInstance from "../../../helpers/axios";

const updateStatusSptTemp = (
  idSptTemp,
  idPelanggan,
  values,
  setLoading,
  setData
) => {
  setLoading(true);

  axiosInstance
    .post(`spt_temp/update/status/${idSptTemp}`, values)
    .then((res) => {
      setLoading(false);
      getSptTemp(idPelanggan, setLoading, setData);
    })
    .catch((err) => {
      setLoading(false);
      console.log(err.response.data);
    });
};

export default updateStatusSptTemp;
