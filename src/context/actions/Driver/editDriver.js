import axiosInstance from "../../../helpers/axios";

const editDriver = (
  id,
  values,
  setLoading,
  showAlertSuccess,
  showAlertError
) => {
  setLoading(true);

  axiosInstance
    .post(`driver/update/${id}`, values)
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

export default editDriver;
