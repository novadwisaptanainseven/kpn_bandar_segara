import axiosInstance from "../../../helpers/axios";
import { LOADING, SUCCESS } from "../../actionTypes";

const getTujuan = (dispatch) => {
  dispatch({
    type: LOADING,
  });

  axiosInstance
    .get(`tujuan`)
    .then((res) => {
      dispatch({
        type: SUCCESS,
        payload: res.data.data_tujuan,
      });
      // console.log(res.data);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default getTujuan;
