import axiosInstance from "../../../helpers/axios";
import { LOADING, SUCCESS } from "../../actionTypes";

const getNotaByFilter = (dispatch, filterTgl) => {
  dispatch({
    type: LOADING,
  });

  const dariTgl = filterTgl.dari_tgl;
  const sampaiTgl = filterTgl.sampai_tgl;

  axiosInstance
    .get(`nota/filter/${dariTgl}/${sampaiTgl}`)
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

export default getNotaByFilter;
