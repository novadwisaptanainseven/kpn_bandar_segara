import { getNota } from ".";
import axiosInstance from "../../../helpers/axios";

const deleteNota = (id, dispatch, Swal) => {
  axiosInstance
    .get(`nota/hapus/${id}`)
    .then((res) => {
      getNota(dispatch);

      Swal.fire({
        icon: "success",
        title: "Terhapus",
        text: "Data berhasil dihapus",
      });
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `"Data gagal dihapus. ${err.response.data.pesan}"`,
      });
      // console.log(err.response.data);
    });
};

export default deleteNota;
