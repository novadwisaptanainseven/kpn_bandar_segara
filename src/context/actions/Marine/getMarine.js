import axiosInstance from "../../../helpers/axios";
import { LOADING, SUCCESS } from "../../actionTypes";

const getMarine = (dispatch) => {
  dispatch({
    type: LOADING,
  });

  axiosInstance
    .get(`marine`)
    .then((res) => {
      dispatch({
        type: SUCCESS,
        payload: res.data.data_marine,
      });
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export default getMarine;
