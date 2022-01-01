import axiosInstance from "../../../helpers/axios";
import { ERROR, SUCCESS } from "../../actionTypes";

const getDashboard = (dispatch) => {
  axiosInstance
    .get(`admin`)
    .then((res) => {
      dispatch({
        type: SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        payload: err.response.data,
      });
      console.log(err.response.data);
    });
};

export default getDashboard;
