import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  id_marine: Yup.string().required("Marine harus diisi"),
  id_driver: Yup.string().required("Driver harus diisi"),
  id_tujuan: Yup.string().required("Tujuan harus diisi"),
  keterangan: Yup.string().required("Keterangan harus diisi"),
  tgl_keberangkatan: Yup.string().required("Tanggal keberangkatan harus diisi"),
  waktu_keberangkatan: Yup.string().required("Jam keberangkatan harus diisi"),
});

export default validationSchema;
