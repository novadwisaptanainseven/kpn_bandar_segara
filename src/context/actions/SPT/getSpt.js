import axiosInstance from "../../../helpers/axios";
import { LOADING, SUCCESS } from "../../actionTypes";

const getSpt = (dispatch) => {
  dispatch({
    type: LOADING,
  });

  axiosInstance
    .get(`spt`)
    .then((res) => {
      dispatch({
        type: SUCCESS,
        payload: res.data.data_spt,
      });
      // console.log(res.data);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default getSpt;
