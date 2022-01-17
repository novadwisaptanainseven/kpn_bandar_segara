import { getKonten } from ".";
import {
  showAlertError,
  showAlertSuccess,
} from "../../../components/AlertMessages";
import axiosInstance from "../../../helpers/axios";

const editKonten = (values, setLoading, history, dispatch) => {
  const messageSuccess = "Update Berhasil";
  const messageError = "Update Gagal. Terjadi Kesalahan Server";

  setLoading(true);

  axiosInstance
    .post(`konten/update`, values, {
      header: {
        "Content-Type": `multipart/form-data; boundary=${values._boundary}`,
      },
    })
    .then((res) => {
      setLoading(false);
      showAlertSuccess(messageSuccess, "pengaturan", history);
      getKonten(dispatch);
    })
    .catch((err) => {
      setLoading(false);
      showAlertError(err.response.data, messageError);
      console.log(err.response.data);
    });
};

export default editKonten;
