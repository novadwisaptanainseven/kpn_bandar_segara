import { getPelanggan } from ".";
import axiosInstance from "../../../helpers/axios";

const deletePelanggan = (id, dispatch, Swal) => {
  axiosInstance
    .get(`pelanggan/hapus/${id}`)
    .then((res) => {
      getPelanggan(dispatch);

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

export default deletePelanggan;
