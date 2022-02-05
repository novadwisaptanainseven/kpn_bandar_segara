import axiosInstance from "../../../helpers/axios";
import { LOADING, SUCCESS } from "../../actionTypes";

const getRiwayatNota = (dispatch) => {
  dispatch({
    type: LOADING,
  });

  axiosInstance
    .get(`cetak_nota`)
    .then((res) => {
      dispatch({
        type: SUCCESS,
        payload: res.data.data_cetak_nota,
      });
      // console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export default getRiwayatNota;
