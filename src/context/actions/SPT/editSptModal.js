import {
  showAlertError,
  showAlertSuccess,
} from "../../../components/AlertMessages";
import axiosInstance from "../../../helpers/axios";
import { getNotaById } from "../Nota";

const editSptModal = (
  idNota,
  idSpt,
  values,
  setLoading,
  setData,
  closeModal
) => {
  const messageSuccess = "Edit SPT Berhasil";
  const messageError = "Edit SPT Temp Gagal. Terjadi Kesalahan Server";

  setLoading(true);

  axiosInstance
    .post(`spt/update/${idSpt}`, values)
    .then((res) => {
      setLoading(false);

      getNotaById(idNota, setData);
      closeModal();
    })
    .catch((err) => {
      setLoading(false);
      showAlertError(err.response.data, messageError);
      // console.log(err.response.data);
    });
};

export default editSptModal;
