import { getPerusahaan } from ".";
import axiosInstance from "../../../helpers/axios";

const deletePerusahaan = (id, dispatch, Swal) => {
  axiosInstance
    .get(`perusahaan/hapus/${id}`)
    .then((res) => {
      getPerusahaan(dispatch);

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

export default deletePerusahaan;
