import { getSptTemp } from ".";
import {
  showAlertError,
  showAlertSuccess,
} from "../../../components/AlertMessages";
import axiosInstance from "../../../helpers/axios";

const editSptTemp = (
  idSptTemp,
  idPelanggan,
  values,
  setLoading,
  setData,
  history
) => {
  const messageSuccess = "Edit SPT Berhasil";
  const messageError = "Edit SPT Gagal. Terjadi Kesalahan Server";

  setLoading(true);

  axiosInstance
    .post(`spt/update/${idSptTemp}`, values)
    .then((res) => {
      setLoading(false);
      showAlertSuccess(messageSuccess, "spt", history);
      getSptTemp(idPelanggan, setLoading, setData);
    })
    .catch((err) => {
      setLoading(false);
      showAlertError(err.response.data, messageError);
      // console.log(err.response.data);
    });
};

export default editSptTemp;
