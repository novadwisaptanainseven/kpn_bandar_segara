import axiosInstance from "../../../helpers/axios";
import { LOADING, SUCCESS } from "../../actionTypes";

const getPelanggan = (dispatch) => {
  dispatch({
    type: LOADING,
  });

  axiosInstance
    .get(`pelanggan`)
    .then((res) => {
      dispatch({
        type: SUCCESS,
        payload: res.data.data_pelanggan,
      });
      // console.log(res.data);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default getPelanggan;
