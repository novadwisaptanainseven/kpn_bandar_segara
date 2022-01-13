import * as Yup from "yup";

// Setting validasi form menggunakan YUP & FORMIK
const FOTO_SIZE = 1048000; // Bytes => 2 mb x 1000 kb x 1000 bytes
const FOTO_SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username harus diisi"),
  nama: Yup.string().required("Nama harus diisi"),
  password: Yup.string().required("Password harus diisi"),
  konfirmasi_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Konfirmasi password tidak sesuai")
    .required("Konfirmasi password harus diisi"),
  foto: Yup.mixed()
    .required("File belum dipilih")
    .test(
      "size",
      "Kapasitas file maksimal 1 mb",
      (value) => value && value.size <= FOTO_SIZE
    )
    .test(
      "type",
      "Ekstensi yang diperbolehkan hanya jpg, jpeg, dan png",
      (value) => value && FOTO_SUPPORTED_FORMATS.includes(value.type)
    ),
});

export default validationSchema;
