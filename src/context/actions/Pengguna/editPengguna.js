import { getPengguna } from ".";
import {
  showAlertSuccess,
  showAlertError,
} from "../../../components/AlertMessages";
import axiosInstance from "../../../helpers/axios";

const editPengguna = (id, values, setLoading, history, dispatch) => {
  const messageSuccess = "Edit Data Berhasil";
  const messageError = "Edit Data Gagal. Terjadi Kesalahan Server";

  setLoading(true);

  axiosInstance
    .post(`pengguna/update/${id}`, values, {
      header: {
        "Content-Type": `multipart/form-data; boundary=${values._boundary}`,
      },
    })
    .then((res) => {
      setLoading(false);
      showAlertSuccess(messageSuccess, "users", history);
      getPengguna(dispatch);
      document.location.href = "/app/users";
    })
    .catch((err) => {
      setLoading(false);
      showAlertError(err.response.data, messageError);

      // console.log(err.response.data);
    });
};

export default editPengguna;
