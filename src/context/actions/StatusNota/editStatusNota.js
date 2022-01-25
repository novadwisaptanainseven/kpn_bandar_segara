import { getStatusNota } from ".";
import {
  showAlertSuccess,
  showAlertError,
} from "../../../components/AlertMessages";
import axiosInstance from "../../../helpers/axios";

const editStatusNota = (id, values, setLoading, history, dispatch) => {
  const messageSuccess = "Edit Data Berhasil";
  const messageError = "Edit Data Gagal. Terjadi Kesalahan Server";

  setLoading(true);

  axiosInstance
    .post(`status_nota/update/${id}`, values)
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

export default editStatusNota;
