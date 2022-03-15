import axiosInstance from "../../../helpers/axios";
import { ERROR, LOADING, SUCCESS } from "../../actionTypes";

const getPreviewCetakNota = (
  dispatch,
  listCetakNotaDispatch,
  values,
  history
) => {
  dispatch({
    type: LOADING,
  });

  axiosInstance
    .post(`spt/nota_checklist_preview`, values)
    .then((res) => {
      dispatch({
        type: SUCCESS,
        payload: res.data,
      });
      listCetakNotaDispatch({
        type: SUCCESS,
        payload: values,
      });
      history.push(`/simantra/nota/preview-cetak`);
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

export default getPreviewCetakNota;
