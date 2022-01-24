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
  closeModal
) => {
  const messageSuccess = "Edit SPT Berhasil";
  const messageError = "Edit SPT Temp Gagal. Terjadi Kesalahan Server";

  setLoading(true);

  axiosInstance
    .post(`spt_temp/update/${idSptTemp}`, values)
    .then((res) => {
      setLoading(false);

      getSptTemp(idPelanggan, setLoading, setData);
      closeModal();
    })
    .catch((err) => {
      setLoading(false);
      showAlertError(err.response.data, messageError);
      // console.log(err.response.data);
    });
};

export default editSptTemp;
