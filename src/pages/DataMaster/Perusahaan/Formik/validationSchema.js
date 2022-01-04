import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  nm_perusahaan: Yup.string().required("Nama perusahaan harus diisi"),
  almt_perusahaan: Yup.string().required("Alamat perusahaan harus diisi"),
});

export default validationSchema;
