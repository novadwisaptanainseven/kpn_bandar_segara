import { getTujuan } from ".";
import axiosInstance from "../../../helpers/axios";

const deleteTujuan = (id, dispatch, Swal) => {
  axiosInstance
    .get(`tujuan/hapus/${id}`)
    .then((res) => {
      getTujuan(dispatch);

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

export default deleteTujuan;
