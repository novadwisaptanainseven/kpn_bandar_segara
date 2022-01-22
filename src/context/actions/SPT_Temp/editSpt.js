import { getSptTemp } from ".";
import {
  showAlertError,
  showAlertSuccess,
} from "../../../components/AlertMessages";
import axiosInstance from "../../../helpers/axios";

const editSpt = (id, values, setLoading, history, dispatch) => {
  const messageSuccess = "Edit SPT Berhasil";
  const messageError = "Edit SPT Gagal. Terjadi Kesalahan Server";

  setLoading(true);

  axiosInstance
    .post(`spt/update/${id}`, values)
    .then((res) => {
      setLoading(false);
      showAlertSuccess(messageSuccess, "spt", history);
      getSptTemp(dispatch);
    })
    .catch((err) => {
      setLoading(false);
      showAlertError(err.response.data, messageError);
      // console.log(err.response.data);
    });
};

export default editSpt;
