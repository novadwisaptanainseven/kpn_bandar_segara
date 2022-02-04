import { getGaleri } from ".";
import {
  showAlertError,
  showAlertSuccess,
  showAlertSuccessV2,
} from "../../../components/AlertMessages";
import axiosInstance from "../../../helpers/axios";

const insertGaleri = (values, setLoading, dispatch) => {
  const messageSuccess = "Tambah Data Berhasil";
  const messageError = "Tambah Data Gagal. Terjadi Kesalahan Server";

  setLoading(true);

  axiosInstance
    .post(`galeri/insert`, values, {
      header: {
        "Content-Type": `multipart/form-data; boundary=${values._boundary}`,
      },
    })
    .then((res) => {
      setLoading(false);
      showAlertSuccessV2(messageSuccess);
      getGaleri(dispatch);
    })
    .catch((err) => {
      setLoading(false);
      showAlertError(err.response.data, messageError);
      // console.log(err.response.data);
    });
};

export default insertGaleri;
