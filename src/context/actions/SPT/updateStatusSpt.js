import axiosInstance from "../../../helpers/axios";
import { getNotaById } from "../Nota";

const updateStatusSpt = (idNota, idSpt, values, setLoading, setData) => {
  setLoading(true);

  axiosInstance
    .post(`spt/update/status/${idSpt}`, values)
    .then((res) => {
      setLoading(false);
      getNotaById(idNota, setData);
    })
    .catch((err) => {
      setLoading(false);
      console.log(err.response.data);
    });
};

export default updateStatusSpt;
