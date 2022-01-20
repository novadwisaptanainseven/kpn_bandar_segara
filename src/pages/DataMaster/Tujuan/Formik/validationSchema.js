import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  nm_tujuan: Yup.string().required("Nama tujuan harus diisi"),
  // keterangan: Yup.string().required("Nama tujuan harus diisi"),
  harga: Yup.number()
    .typeError("Harga tujuan harus berupa bilangan")
    .required("Harga tujuan harus diisi!"),
});

export default validationSchema;
