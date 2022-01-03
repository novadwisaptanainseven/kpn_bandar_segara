import axiosInstance from "../../../helpers/axios";

const insertDriver = (values, setLoading, showAlertSuccess, showAlertError) => {
  setLoading(true);

  axiosInstance
    .post(`driver/insert`, values)
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

export default insertDriver;
