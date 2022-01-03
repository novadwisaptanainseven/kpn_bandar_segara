import axiosInstance from "../../../helpers/axios";

const insertMarine = (values, setLoading, showAlertSuccess, showAlertError) => {
  setLoading(true);

  axiosInstance
    .post(`marine/insert`, values)
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

export default insertMarine;
