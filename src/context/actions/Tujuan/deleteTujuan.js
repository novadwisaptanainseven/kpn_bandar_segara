import { getTujuan } from ".";
import axiosInstance from "../../../helpers/axios";

const deleteTujuan = (id, dispatch, Swal) => {
  axiosInstance
    .get(`tujuan/hapus/${id}`)
    .then((res) => {
      Swal.fire({
        icon: "success",
        title: "Terhapus",
        text: "Data berhasil dihapus",
      });
      getTujuan(dispatch);
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `"Data gagal dihapus. ${err.response.data.pesan}"`,
      });
      console.log(err.response.data);
    });
};

export default deleteTujuan;
