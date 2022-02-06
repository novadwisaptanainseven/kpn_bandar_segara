import { getKontak } from ".";
import {
  showAlertError,
  showAlertSuccess,
} from "../../../components/AlertMessages";
import axiosInstance from "../../../helpers/axios";

const insertKontak = (values, setLoading, dispatch, history) => {
  const messageSuccess = "Tambah Data Berhasil";
  const messageError = "Tambah Data Gagal. Terjadi Kesalahan Server";

  setLoading(true);

  axiosInstance
    .post(`kontak/insert`, values, {
      header: {
        "Content-Type": `multipart/form-data; boundary=${values._boundary}`,
      },
    })
    .then((res) => {
      setLoading(false);
      showAlertSuccess(messageSuccess, "kontak", history);
      getKontak(dispatch);
    })
    .catch((err) => {
      setLoading(false);
      showAlertError(err.response.data.errors, messageError);
      // console.log(err.response.data);
    });
};

export default insertKontak;
