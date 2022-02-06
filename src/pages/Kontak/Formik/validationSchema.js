import * as Yup from "yup";

// Setting validasi form menggunakan YUP & FORMIK
const FOTO_SIZE = 1048000; // Bytes => 1 mb x 1000 kb x 1000 bytes
const FOTO_SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
];

const validationSchema = Yup.object().shape({
  nm_kontak: Yup.string().required("Nama kontak harus diisi"),
  keterangan: Yup.string().required("Keterangan kontak harus diisi"),
  link: Yup.string().required("Link kontak harus diisi"),
  icon: Yup.mixed()
    .required("Icon harus diisi")
    .test("size", "Kapasitas file maksimal 1 mb", (value) => {
      if (value) {
        return value && value.size <= FOTO_SIZE;
      }
      return true;
    })
    .test(
      "type",
      "Ekstensi yang diperbolehkan hanya jpg, jpeg, svg, dan png",
      (value) => {
        if (value) {
          return value && FOTO_SUPPORTED_FORMATS.includes(value.type);
        }
        return true;
      }
    ),
});

export default validationSchema;
