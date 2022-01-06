import { getSpt } from ".";
import axiosInstance from "../../../helpers/axios";

const deleteSpt = (id, dispatch, Swal) => {
  axiosInstance
    .get(`spt/hapus/${id}`)
    .then((res) => {
      getSpt(dispatch);

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
      console.log(err.response.data);
    });
};

export default deleteSpt;
