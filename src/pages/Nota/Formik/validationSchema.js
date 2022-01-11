import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  // diskon: Yup.number()
  //   .typeError("Diskon harus berupa bilangan")
  //   .required("Diskon harus diisi"),
  harga: Yup.number()
    .typeError("Total Harga harus berupa bilangan")
    .required("Total Harga harus diisi!"),
  bayar: Yup.number()
    .typeError("Nominal pembayaran harus berupa bilangan")
    .required("Nominal pembayaran harus diisi!"),
  tgl_nota: Yup.string().required("Tanggal nota harus diisi"),
});

export default validationSchema;
