import { getPelayanan } from ".";
import axiosInstance from "../../../helpers/axios";

const deletePelayanan = (id, dispatch, Swal) => {
  axiosInstance
    .get(`pelayanan/hapus/${id}`)
    .then((res) => {
      getPelayanan(dispatch);

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

export default deletePelayanan;
