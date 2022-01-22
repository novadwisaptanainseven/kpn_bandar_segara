import { getSptTemp } from ".";
import axiosInstance from "../../../helpers/axios";

const deleteSptTemp = (id, idPelanggan, setData, setLoading, Swal) => {
  axiosInstance
    .get(`spt_temp/hapus/${id}`)
    .then((res) => {
      getSptTemp(idPelanggan, setLoading, setData);

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

export default deleteSptTemp;
