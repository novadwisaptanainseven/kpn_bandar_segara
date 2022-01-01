import axiosInstance from "../../../helpers/axios";

export const checkToken = (history, Swal) => {
  axiosInstance
    .get(`${localStorage.baseURL}ceklogin`)
    .then((res) => {
      Swal.fire({
        icon: "error",
        title: "Akses Dilarang",
        text: "Anda harus logout terlebih dahulu!",
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          history.goBack();
        }
      });
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};
