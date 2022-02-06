import { getKontak } from ".";
import axiosInstance from "../../../helpers/axios";

const deleteKontak = (id, dispatch, Swal) => {
  axiosInstance
    .get(`kontak/hapus/${id}`)
    .then((res) => {
      getKontak(dispatch);

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

export default deleteKontak;
