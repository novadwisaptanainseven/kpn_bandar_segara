import axiosInstance from "../../../helpers/axios";
import { LOADING, SUCCESS } from "../../actionTypes";
import { baseUrlImg } from "../../../helpers/url";

const getKonten = (dispatch) => {
  dispatch({
    type: LOADING,
  });
  // const baseUrlImg = "http://localhost/kpn_bandar_segara_api/public/images/";
  const logoApp = document.getElementById("logoApp");

  axiosInstance
    .get(`konten`)
    .then((res) => {
      dispatch({
        type: SUCCESS,
        payload: res.data,
      });
      // console.log(res.data);
      document.title = res.data.title_website;
      logoApp.setAttribute("href", baseUrlImg + res.data.logo);
      // console.log(logoApp);
    })
    .catch((err) => {
      // console.log(err.response.data);
    });
};

export default getKonten;
