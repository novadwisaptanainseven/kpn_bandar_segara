import { getNota } from ".";
import {
  showAlertError,
  showAlertSuccess,
} from "../../../components/AlertMessages";
import axiosInstance from "../../../helpers/axios";

const insertNota = (values, setLoading, history, dispatch) => {
  const messageSuccess = "Pembuatan Nota Transaksi Berhasil";
  const messageError =
    "Pembuatan Nota Transaksi Gagal. Terjadi Kesalahan Server";

  setLoading(true);

  axiosInstance
    .post(`nota/insert`, values)
    .then((res) => {
      setLoading(false);
      showAlertSuccess(messageSuccess, "nota", history);
      getNota(dispatch);
    })
    .catch((err) => {
      setLoading(false);
      showAlertError(err.response.data, messageError);
      console.log(err.response.data);
    });
};

export default insertNota;
