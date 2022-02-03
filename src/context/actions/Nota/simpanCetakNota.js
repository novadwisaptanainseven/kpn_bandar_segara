import { getNota } from ".";
import {
  showAlertError,
  showAlertSuccess,
} from "../../../components/AlertMessages";
import axiosInstance from "../../../helpers/axios";

const simpanCetakNota = (values, history, dispatch) => {
  const messageSuccess = "Pembuatan Nota Transaksi Berhasil";
  const messageError =
    "Pembuatan Nota Transaksi Gagal. Terjadi Kesalahan Server";

  axiosInstance
    .post(`spt/nota_checklist_cetak`, values)
    .then((res) => {
      // showAlertSuccess(messageSuccess, "nota", history);
      history.push(`/app/nota`);
      getNota(dispatch);
    })
    .catch((err) => {
      showAlertError(err.response.data, messageError);
      // console.log(err.response.data);
    });
};

export default simpanCetakNota;
