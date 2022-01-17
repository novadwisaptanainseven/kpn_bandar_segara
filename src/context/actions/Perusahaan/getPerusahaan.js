import axiosInstance from "../../../helpers/axios";
import { LOADING, SUCCESS } from "../../actionTypes";

const getPerusahaan = (dispatch) => {
  dispatch({
    type: LOADING,
  });

  axiosInstance
    .get(`perusahaan`)
    .then((res) => {
      dispatch({
        type: SUCCESS,
        payload: res.data.data_perusahaan,
      });
      // console.log(res.data);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default getPerusahaan;
