import { getNota } from ".";
import {
  showAlertError,
  showAlertSuccess,
} from "../../../components/AlertMessages";
import axiosInstance from "../../../helpers/axios";

const editNotaById = (id, values, setLoading, history, dispatch) => {
  const messageSuccess = "Edit Nota Transaksi Berhasil";
  const messageError = "Edit Nota Transaksi Gagal. Terjadi Kesalahan Server";

  setLoading(true);

  axiosInstance
    .post(`nota/update/${id}`, values)
    .then((res) => {
      setLoading(false);
      showAlertSuccess(messageSuccess, "nota", history);
      getNota(dispatch);
    })
    .catch((err) => {
      setLoading(false);
      showAlertError(err.response.data, messageError);
      // console.log(err.response.data);
    });
};

export default editNotaById;
