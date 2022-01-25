import {
  showAlertError,
  showAlertSuccessV2,
} from "../../../components/AlertMessages";
import axiosInstance from "../../../helpers/axios";

const editNotaById = (id, values, setLoading) => {
  const messageSuccess = "Edit Nota Transaksi Berhasil";
  const messageError = "Edit Nota Transaksi Gagal. Terjadi Kesalahan Server";

  setLoading(true);

  axiosInstance
    .post(`nota/update/${id}`, values)
    .then((res) => {
      setLoading(false);
      showAlertSuccessV2(messageSuccess);
    })
    .catch((err) => {
      setLoading(false);
      showAlertError(err.response.data, messageError);
      // console.log(err.response.data);
    });
};

export default editNotaById;
