import axiosInstance from "../../../helpers/axios";

const editTujuan = (
  id,
  values,
  setLoading,
  showAlertSuccess,
  showAlertError
) => {
  setLoading(true);

  axiosInstance
    .post(`tujuan/update/${id}`, values)
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

export default editTujuan;
