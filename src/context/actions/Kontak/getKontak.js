import axiosInstance from "../../../helpers/axios";
import { LOADING, SUCCESS } from "../../actionTypes";

const getKontak = (dispatch) => {
  dispatch({
    type: LOADING,
  });

  axiosInstance
    .get(`kontak`)
    .then((res) => {
      dispatch({
        type: SUCCESS,
        payload: res.data.data_kontak,
      });
      // console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export default getKontak;
