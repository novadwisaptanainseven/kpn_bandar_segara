import { getPelayanan } from ".";
import {
  showAlertSuccess,
  showAlertError,
} from "../../../components/AlertMessages";
import axiosInstance from "../../../helpers/axios";

const editPelayanan = (id, values, setLoading, history, dispatch) => {
  const messageSuccess = "Edit Data Berhasil";
  const messageError = "Edit Data Gagal. Terjadi Kesalahan Server";

  setLoading(true);

  axiosInstance
    .post(`pelayanan/update/${id}`, values, {
      header: {
        "Content-Type": `multipart/form-data; boundary=${values._boundary}`,
      },
    })
    .then((res) => {
      setLoading(false);
      showAlertSuccess(messageSuccess, "pelayanan", history);
      getPelayanan(dispatch);
    })
    .catch((err) => {
      setLoading(false);
      showAlertError(err.response.data.errors, messageError);

      // console.log(err.response.data);
    });
};

export default editPelayanan;
