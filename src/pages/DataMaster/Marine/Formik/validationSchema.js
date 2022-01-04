import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  nm_marine: Yup.string().required("Nama marine harus diisi"),
});

export default validationSchema;
