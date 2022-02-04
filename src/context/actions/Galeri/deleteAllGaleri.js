import { getGaleri } from ".";
import axiosInstance from "../../../helpers/axios";

const deleteAllGaleri = (dispatch, Swal) => {
  axiosInstance
    .get(`galeri/hapus_all`)
    .then((res) => {
      getGaleri(dispatch);

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

export default deleteAllGaleri;
