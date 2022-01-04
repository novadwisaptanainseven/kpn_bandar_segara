import { getPerusahaan } from ".";
import {
  showAlertError,
  showAlertSuccess,
} from "../../../components/AlertMessages";
import axiosInstance from "../../../helpers/axios";

const insertPerusahaan = (values, setLoading, history, dispatch) => {
  const messageSuccess = "Tambah Data Berhasil";
  const messageError = "Tambah Data Gagal. Terjadi Kesalahan Server";

  setLoading(true);

  axiosInstance
    .post(`perusahaan/insert`, values)
    .then((res) => {
      setLoading(false);
      showAlertSuccess(messageSuccess, "perusahaan", history);
      getPerusahaan(dispatch);
    })
    .catch((err) => {
      setLoading(false);
      showAlertError(err.response.data, messageError);
      console.log(err.response.data);
    });
};

export default insertPerusahaan;
