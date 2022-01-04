import { getTujuan } from ".";
import {
  showAlertError,
  showAlertSuccess,
} from "../../../components/AlertMessages";
import axiosInstance from "../../../helpers/axios";

const insertTujuan = (values, setLoading, history, dispatch) => {
  const messageSuccess = "Tambah Data Berhasil";
  const messageError = "Tambah Data Gagal. Terjadi Kesalahan Server";

  setLoading(true);

  axiosInstance
    .post(`tujuan/insert`, values)
    .then((res) => {
      setLoading(false);
      showAlertSuccess(messageSuccess, "tujuan", history);
      getTujuan(dispatch);
    })
    .catch((err) => {
      setLoading(false);
      showAlertError(err.response.data, messageError);
      console.log(err.response.data);
    });
};

export default insertTujuan;
