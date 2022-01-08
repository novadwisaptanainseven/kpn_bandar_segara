import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  id_pelanggan: Yup.string().required("Pelanggan harus diisi"),
  id_marine: Yup.string().required("Marine harus diisi"),
  id_driver: Yup.string().required("Driver harus diisi"),
  id_tujuan: Yup.string().required("Tujuan harus diisi"),
  nm_kapal: Yup.string().required("Nama kapal harus diisi"),
  tgl_spt: Yup.string().required("Tanggal SPT harus diisi"),
});

export default validationSchema;
