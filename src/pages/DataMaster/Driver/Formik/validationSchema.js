import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  nm_driver: Yup.string().required("Nama driver harus diisi"),
});

export default validationSchema;
