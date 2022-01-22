import { getSptTemp } from ".";
import {
  showAlertError,
  showAlertSuccess,
} from "../../../components/AlertMessages";
import axiosInstance from "../../../helpers/axios";

const insertSptTemp = (
  idPelanggan,
  values,
  setLoading,
  setData,
  closeModal
) => {
  const messageSuccess = "Penambahan Item Penyewaan Berhasil";
  const messageError =
    "Penambahan Item Penyewaan Gagal. Terjadi Kesalahan Server";

  setLoading(true);

  axiosInstance
    .post(`spt_temp/insert/${idPelanggan}`, values)
    .then((res) => {
      setLoading(false);
      // showAlertSuccess(messageSuccess, "spt_temp", history);
      getSptTemp(idPelanggan, setLoading, setData);
      closeModal();
    })
    .catch((err) => {
      setLoading(false);
      showAlertError(err.response.data, messageError);
      console.log(err.response.data);
    });
};

export default insertSptTemp;
