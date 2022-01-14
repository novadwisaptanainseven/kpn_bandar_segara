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
  const [preview, setPreview] = useState();
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

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    handleSelectedFile();
  }, [handleSelectedFile]);

  const handleFormSubmit = (values) => {
    // alert(JSON.stringify(values));
    const formData = new FormData();
    formData.append("title_website", values.title_website);
    formData.append("deskripsi_aplikasi", values.deskripsi_aplikasi);
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
              <form onSubmit={handleFormSubmit} className="grid md:grid-cols-2">
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
                      kurang dari 2 MB
                    </span>
                  </Label>
                  <div className="mt-5 flex flex-col-reverse md:flex-row justify-end gap-2">
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
