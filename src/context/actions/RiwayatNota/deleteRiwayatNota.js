import { getRiwayatNota } from ".";
import axiosInstance from "../../../helpers/axios";

const deleteRiwayatNota = (id, dispatch, Swal) => {
  axiosInstance
    .get(`cetak_nota/hapus/${id}`)
    .then((res) => {
      getRiwayatNota(dispatch);

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

export default deleteRiwayatNota;
