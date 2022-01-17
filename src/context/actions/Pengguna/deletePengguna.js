import { getPengguna } from ".";
import axiosInstance from "../../../helpers/axios";

const deletePengguna = (id, dispatch, Swal) => {
  axiosInstance
    .get(`pengguna/hapus/${id}`)
    .then((res) => {
      getPengguna(dispatch);

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

export default deletePengguna;
