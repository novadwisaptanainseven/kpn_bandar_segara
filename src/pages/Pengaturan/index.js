import React, { useCallback, useEffect, useState, useContext } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import {
  Card,
  CardBody,
  Button,
  Input,
  Label,
  Textarea,
  HelperText,
} from "@windmill/react-ui";
import { GlobalContext } from "../../context/Provider";
import { editKonten, getKonten } from "../../context/actions/Konten";
import getImage from "../../context/actions/Files/getImage";
import { Formik } from "formik";
import initState from "./Formik/initState";
import validationSchema from "./Formik/validationSchema";
import { useHistory } from "react-router-dom";

const Pengaturan = () => {
  const history = useHistory();
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFile2, setSelectedFile2] = useState();
  const [preview, setPreview] = useState();
  const [preview2, setPreview2] = useState();
  const { kontenState, kontenDispatch } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const { data: dataKonten } = kontenState;

  // Get data kontent
  useEffect(() => {
    getKonten(kontenDispatch);
  }, [kontenDispatch]);

  // Menangani preview input gambar setelah dipilih
  const handleSelectedFile = useCallback(() => {
    const logo2 = dataKonten ? getImage("", dataKonten.logo) : null;

    if (!selectedFile) {
      setPreview(logo2);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // Free memory when ever this component is unmounted
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile, dataKonten]);

  // Menangani preview input gambar setelah dipilih
  const handleSelectedFile2 = useCallback(() => {
    const logo2 = dataKonten
      ? getImage("", dataKonten.foto_tentang_kami)
      : null;

    if (!selectedFile2) {
      setPreview2(logo2);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile2);
    setPreview2(objectUrl);

    // Free memory when ever this component is unmounted
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile2, dataKonten]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const onSelectFile2 = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile2(undefined);
      return;
    }

    setSelectedFile2(e.target.files[0]);
  };

  useEffect(() => {
    handleSelectedFile();
    handleSelectedFile2();
  }, [handleSelectedFile, handleSelectedFile2]);

  const handleFormSubmit = (values) => {
    // alert(JSON.stringify(values));
    const formData = new FormData();
    formData.append("title_website", values.title_website);
    formData.append("deskripsi_aplikasi", values.deskripsi_aplikasi);
    formData.append("tentang_kami", values.tentang_kami);
    formData.append("link_map", values.link_map);
    formData.append("alamat", values.alamat);
    formData.append("nm_perusahaan", values.nm_perusahaan);
    if (values.foto_tentang_kami) {
      formData.append("foto_tentang_kami", values.foto_tentang_kami);
    }
    if (values.logo) {
      formData.append("logo", values.logo);
    }

    editKonten(formData, setLoading, history, kontenDispatch);
  };

  return (
    <>
      <PageTitle>Pengaturan</PageTitle>

      <Card className="mb-32">
        <CardBody>
          <Formik
            initialValues={initState(dataKonten)}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
            enableReinitialize
          >
            {({
              values,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
              touched,
              setFieldValue,
              dirty,
              isValid,
            }) => (
              <form
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-4"
              >
                <div>
                  <Label className="mt-4">
                    <span>Nama Aplikasi</span>
                    <Input
                      type="text"
                      placeholder="Nama Aplikasi"
                      name="title_website"
                      value={values.title_website}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-1 ${
                        errors.title_website && touched.title_website
                          ? "border-red-500"
                          : null
                      }`}
                    />
                    {errors.title_website && touched.title_website && (
                      <HelperText valid={false}>
                        {errors.title_website}
                      </HelperText>
                    )}
                  </Label>
                  <Label className="mt-4">
                    <span>Deskripsi Aplikasi</span>
                    <Textarea
                      rows={3}
                      placeholder="Deskripsi Aplikasi"
                      name="deskripsi_aplikasi"
                      value={values.deskripsi_aplikasi}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-1 ${
                        errors.deskripsi_aplikasi && touched.deskripsi_aplikasi
                          ? "border-red-500"
                          : null
                      }`}
                    />
                    {errors.deskripsi_aplikasi &&
                      touched.deskripsi_aplikasi && (
                        <HelperText valid={false}>
                          {errors.deskripsi_aplikasi}
                        </HelperText>
                      )}
                  </Label>
                  <Label className="mt-4">
                    <span>Logo</span>
                    <Input
                      type="file"
                      className="mt-4 mb-3"
                      onChange={(e) => {
                        onSelectFile(e);
                        setFieldValue("logo", e.target.files[0]);
                      }}
                      onBlur={handleBlur}
                      name="logo"
                      className={`mt-1 ${
                        errors.logo && touched.logo ? "border-red-500" : null
                      }`}
                    />
                    {errors.logo && touched.logo && (
                      <HelperText valid={false}>
                        {errors.logo} <br />
                      </HelperText>
                    )}
                    {preview && (
                      <img
                        src={preview}
                        alt={preview}
                        classname="w-48"
                        width={200}
                      />
                    )}
                    <span className="inline-block mt-1 text-xs text-gray-400">
                      Foto harus bertipe jpg, jpeg, atau png dengan ukuran
                      kurang dari 1 MB
                    </span>
                  </Label>
                  <div className="mt-5 flex-col-reverse md:flex-row justify-end gap-2 hidden md:flex">
                    <Button onClick={handleReset} layout="outline">
                      Reset
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading || !isValid ? true : false}
                    >
                      {loading ? "Loading" : "Simpan"}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="mt-4">
                    <span>Nama Perusahaan</span>
                    <Input
                      type="text"
                      placeholder="Nama Perusahaan"
                      name="nm_perusahaan"
                      value={values.nm_perusahaan}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-1 ${
                        errors.nm_perusahaan && touched.nm_perusahaan
                          ? "border-red-500"
                          : null
                      }`}
                    />
                    {errors.nm_perusahaan && touched.nm_perusahaan && (
                      <HelperText valid={false}>
                        {errors.nm_perusahaan}
                      </HelperText>
                    )}
                  </Label>
                  <Label className="mt-4">
                    <span>Link Google Map</span>
                    <Input
                      type="text"
                      placeholder="Link Google Map"
                      name="link_map"
                      value={values.link_map}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-1 ${
                        errors.link_map && touched.link_map
                          ? "border-red-500"
                          : null
                      }`}
                    />
                    {errors.link_map && touched.link_map && (
                      <HelperText valid={false}>{errors.link_map}</HelperText>
                    )}
                  </Label>

                  <Label className="mt-4">
                    <span>Tentang Perusahaan</span>
                    <Textarea
                      rows={7}
                      placeholder="Tentang Perusahaan"
                      name="tentang_kami"
                      value={values.tentang_kami}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-1 ${
                        errors.tentang_kami && touched.tentang_kami
                          ? "border-red-500"
                          : null
                      }`}
                    />
                    {errors.tentang_kami && touched.tentang_kami && (
                      <HelperText valid={false}>
                        {errors.tentang_kami}
                      </HelperText>
                    )}
                  </Label>
                  <Label className="mt-4">
                    <span>Foto Tentang Perusahaan</span>
                    <Input
                      type="file"
                      className="mt-4 mb-3"
                      onChange={(e) => {
                        onSelectFile2(e);
                        setFieldValue("foto_tentang_kami", e.target.files[0]);
                      }}
                      onBlur={handleBlur}
                      name="foto_tentang_kami"
                      className={`mt-1 ${
                        errors.foto_tentang_kami && touched.foto_tentang_kami
                          ? "border-red-500"
                          : null
                      }`}
                    />
                    {errors.foto_tentang_kami && touched.foto_tentang_kami && (
                      <HelperText valid={false}>
                        {errors.foto_tentang_kami} <br />
                      </HelperText>
                    )}
                    {preview && (
                      <img
                        src={preview2}
                        alt={preview2}
                        classname="w-48"
                        width={200}
                      />
                    )}
                    <span className="inline-block mt-1 text-xs text-gray-400">
                      Foto harus bertipe jpg, jpeg, atau png dengan ukuran
                      kurang dari 1 MB
                    </span>
                  </Label>
                  <div className="mt-5 flex-col-reverse md:flex-row justify-end gap-2 flex md:hidden">
                    <Button onClick={handleReset} layout="outline">
                      Reset
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading || !isValid ? true : false}
                    >
                      {loading ? "Loading" : "Simpan"}
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default Pengaturan;
