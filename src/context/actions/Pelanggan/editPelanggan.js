import axiosInstance from "../../../helpers/axios";

const editPelanggan = (
  id,
  values,
  setLoading,
  showAlertSuccess,
  showAlertError
) => {
  setLoading(true);

  axiosInstance
    .post(`pelanggan/update/${id}`, values)
    .then((res) => {
      setLoading(false);
      showAlertSuccess();
    })
    .catch((err) => {
      setLoading(false);
      showAlertError(err.response.data);
      // console.log(err.response.data);
    });
};

export default editPelanggan;
