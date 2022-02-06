import axiosInstance from "../../../helpers/axios";
import { LOADING, SUCCESS } from "../../actionTypes";

const getPelayanan = (dispatch) => {
  dispatch({
    type: LOADING,
  });

  axiosInstance
    .get(`pelayanan`)
    .then((res) => {
      dispatch({
        type: SUCCESS,
        payload: res.data.data_pelayanan,
      });
      // console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export default getPelayanan;
