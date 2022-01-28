import axiosInstance from "../../../helpers/axios";
import { getNotaById } from "../Nota";

const deleteSptNota = (idNota, idSpt, setData, Swal) => {
  axiosInstance
    .get(`spt/hapus/${idSpt}`)
    .then((res) => {
      getNotaById(idNota, setData);

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

export default deleteSptNota;
