import * as Yup from "yup";

// Setting validasi form menggunakan YUP & FORMIK
const FOTO_SIZE = 1048000; // Bytes => 2 mb x 1000 kb x 1000 bytes
const FOTO_SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const validationSchema = Yup.object().shape({
  title_website: Yup.string().required("Title website harus diisi"),
  deskripsi_aplikasi: Yup.string().required("Deskripsi aplikasi harus diisi"),
  // no_hp: Yup.string().required("No. telepon perusahaan harus diisi"),
  // instagram: Yup.string().required("Instagram harus diisi"),
  alamat: Yup.string().required("Alamat perusahaan harus diisi"),
  nm_perusahaan: Yup.string().required("Nama perusahaan harus diisi"),
  tentang_kami: Yup.string().required("Tentang kami harus diisi"),
  link_map: Yup.string().required("Link google map harus diisi"),
  foto_tentang_kami: Yup.mixed()
    .test("size", "Kapasitas file maksimal 1 mb", (value) => {
      if (value) {
        return value && value.size <= FOTO_SIZE;
      }
      return true;
    })
    .test(
      "type",
      "Ekstensi yang diperbolehkan hanya jpg, jpeg, dan png",
      (value) => {
        if (value) {
          return value && FOTO_SUPPORTED_FORMATS.includes(value.type);
        }
        return true;
      }
    ),
  logo: Yup.mixed()
    .test("size", "Kapasitas file maksimal 1 mb", (value) => {
      if (value) {
        return value && value.size <= FOTO_SIZE;
      }
      return true;
    })
    .test(
      "type",
      "Ekstensi yang diperbolehkan hanya jpg, jpeg, dan png",
      (value) => {
        if (value) {
          return value && FOTO_SUPPORTED_FORMATS.includes(value.type);
        }
        return true;
      }
    ),
});

export default validationSchema;
