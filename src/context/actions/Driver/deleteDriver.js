import { getDriver } from ".";
import axiosInstance from "../../../helpers/axios";

const deleteDriver = (id, dispatch, Swal) => {
  axiosInstance
    .get(`driver/hapus/${id}`)
    .then((res) => {
      getDriver(dispatch);

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

export default deleteDriver;
