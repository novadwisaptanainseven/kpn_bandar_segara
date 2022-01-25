import { getStatusNota } from ".";
import {
  showAlertError,
  showAlertSuccess,
} from "../../../components/AlertMessages";
import axiosInstance from "../../../helpers/axios";

const insertStatusNota = (values, setLoading, history, dispatch) => {
  const messageSuccess = "Tambah Data Berhasil";
  const messageError = "Tambah Data Gagal. Terjadi Kesalahan Server";

  setLoading(true);

  axiosInstance
    .post(`status_nota/insert`, values)
    .then((res) => {
      setLoading(false);
      showAlertSuccess(messageSuccess, "status_nota", history);
      getStatusNota(dispatch);
    })
    .catch((err) => {
      setLoading(false);
      showAlertError(err.response.data, messageError);
      // console.log(err.response.data);
    });
};

export default insertStatusNota;
