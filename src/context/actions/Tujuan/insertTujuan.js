import axiosInstance from "../../../helpers/axios";

const insertTujuan = (values, setLoading, showAlertSuccess, showAlertError) => {
  setLoading(true);

  axiosInstance
    .post(`tujuan/insert`, values)
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

export default insertTujuan;
