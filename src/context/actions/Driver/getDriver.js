import axiosInstance from "../../../helpers/axios";
import { LOADING, SUCCESS } from "../../actionTypes";

const getDriver = (dispatch) => {
  dispatch({
    type: LOADING,
  });

  axiosInstance
    .get(`driver`)
    .then((res) => {
      dispatch({
        type: SUCCESS,
        payload: res.data.data_driver,
      });
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export default getDriver;
