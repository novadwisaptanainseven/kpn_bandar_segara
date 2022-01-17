import axiosInstance from "../../../helpers/axios";
import { LOADING, SUCCESS } from "../../actionTypes";

const getNota = (dispatch) => {
  dispatch({
    type: LOADING,
  });

  axiosInstance
    .get(`nota`)
    .then((res) => {
      dispatch({
        type: SUCCESS,
        payload: res.data.data_nota,
      });
      // console.log(res.data);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default getNota;
