import { getSpt } from ".";
import {
  showAlertError,
  showAlertSuccess,
} from "../../../components/AlertMessages";
import axiosInstance from "../../../helpers/axios";

const insertSpt = (values, setLoading, history, dispatch) => {
  const messageSuccess = "Pembuatan SPT Berhasil";
  const messageError = "Pembuatan SPT Gagal. Terjadi Kesalahan Server";

  setLoading(true);

  axiosInstance
    .post(`spt/insert`, values)
    .then((res) => {
      setLoading(false);
      showAlertSuccess(messageSuccess, "spt", history);
      getSpt(dispatch);
    })
    .catch((err) => {
      setLoading(false);
      showAlertError(err.response.data, messageError);
      // console.log(err.response.data);
    });
};

export default insertSpt;
