import axiosInstance from "../../../helpers/axios";

const insertPerusahaan = (
  values,
  setLoading,
  showAlertSuccess,
  showAlertError
) => {
  setLoading(true);

  axiosInstance
    .post(`pelanggan/insert`, values)
    .then((res) => {
      setLoading(false);
      showAlertSuccess();
    })
    .catch((err) => {
      setLoading(false);
      showAlertError();
      console.log(err.response.data);
    });
};

export default insertPerusahaan;
