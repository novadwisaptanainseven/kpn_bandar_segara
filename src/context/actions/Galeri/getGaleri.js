import axiosInstance from "../../../helpers/axios";
import { LOADING, SUCCESS } from "../../actionTypes";

const getGaleri = (dispatch) => {
  dispatch({
    type: LOADING,
  });

  axiosInstance
    .get(`galeri`)
    .then((res) => {
      dispatch({
        type: SUCCESS,
        payload: res.data.data_galeri,
      });
      // console.log(res.data);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default getGaleri;
