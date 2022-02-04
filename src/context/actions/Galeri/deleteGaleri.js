import { getGaleri } from ".";
import axiosInstance from "../../../helpers/axios";

const deleteGaleri = (id, dispatch, Swal) => {
  axiosInstance
    .get(`galeri/hapus/${id}`)
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

export default deleteGaleri;
