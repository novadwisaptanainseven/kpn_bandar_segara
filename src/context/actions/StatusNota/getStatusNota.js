import axiosInstance from "../../../helpers/axios";
import { LOADING, SUCCESS } from "../../actionTypes";

const getStatusNota = (dispatch) => {
  dispatch({
    type: LOADING,
  });

  axiosInstance
    .get(`status_nota`)
    .then((res) => {
      dispatch({
        type: SUCCESS,
        payload: res.data.data_status_nota,
      });
      // console.log(res.data);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default getStatusNota;
