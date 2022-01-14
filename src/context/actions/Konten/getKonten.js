import axiosInstance from "../../../helpers/axios";
import { LOADING, SUCCESS } from "../../actionTypes";

const getKonten = (dispatch) => {
  dispatch({
    type: LOADING,
  });

  axiosInstance
    .get(`konten`)
    .then((res) => {
      dispatch({
        type: SUCCESS,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export default getKonten;
