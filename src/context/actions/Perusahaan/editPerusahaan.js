import axiosInstance from "../../../helpers/axios";

const editPerusahaan = (
  id,
  values,
  setLoading,
  showAlertSuccess,
  showAlertError
) => {
  setLoading(true);

  axiosInstance
    .post(`perusahaan/update/${id}`, values)
    .then((res) => {
      setLoading(false);
      showAlertSuccess();
    })
    .catch((err) => {
      setLoading(false);
      showAlertError(err.response.data);
      console.log(err.response.data);
    });
};

export default editPerusahaan;
