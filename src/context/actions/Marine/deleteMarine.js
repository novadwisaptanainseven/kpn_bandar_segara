import { getMarine } from ".";
import axiosInstance from "../../../helpers/axios";

const deleteMarine = (id, dispatch, Swal) => {
  axiosInstance
    .get(`marine/hapus/${id}`)
    .then((res) => {
      getMarine(dispatch);

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
        text: "Data gagal dihapus. Terjadi kesalahan server",
      });
      console.log(err.response.data);
    });
};

export default deleteMarine;
