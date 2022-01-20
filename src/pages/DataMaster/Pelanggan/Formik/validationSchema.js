import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  nm_pelanggan: Yup.string().required("Nama harus diisi"),
  id_perusahaan: Yup.string().required("Perusahaan harus diisi"),
  keterangan: Yup.string().required("Keterangan harus diisi"),
});

export default validationSchema;
