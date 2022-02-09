import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  nm_perusahaan: Yup.string().required("Nama perusahaan harus diisi"),
  // keterangan: Yup.string().required("Keterangan perusahaan harus diisi"),
});

export default validationSchema;
