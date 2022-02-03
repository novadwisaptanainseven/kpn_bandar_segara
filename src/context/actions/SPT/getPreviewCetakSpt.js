import axiosInstance from "../../../helpers/axios";
import { ERROR, LOADING, SUCCESS } from "../../actionTypes";

const getPreviewCetakSpt = (dispatch, values, history) => {
  dispatch({
    type: LOADING,
  });

  axiosInstance
    .post(`spt/spt_checklist`, values)
    .then((res) => {
      dispatch({
        type: SUCCESS,
        payload: res.data,
      });

      history.push(`/app/spt/preview-cetak`);
      console.log(res.data);
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        payload: err.response.data,
      });
      console.log(err.response.data);
    });
};

export default getPreviewCetakSpt;
