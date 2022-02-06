import React, { useContext, useState, useEffect, useCallback } from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import {
  Card,
  CardBody,
  Button,
  Input,
  Label,
  HelperText,
  Textarea,
} from "@windmill/react-ui";

import { Formik } from "formik";

import initState from "../Formik/initState";
import validationSchema from "../Formik/validationSchema";
import { GlobalContext } from "../../../context/Provider";
import { insertPelayanan } from "../../../context/actions/Pelayanan";
import { useHistory } from "react-router-dom";

const Tambah = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { pelayananDispatch } = useContext(GlobalContext);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  // Menangani preview input gambar setelah dipilih
  const handleSelectedFile = useCallback(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // Free memory when ever this component is unmounted
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  useEffect(() => {
    handleSelectedFile();
  }, [handleSelectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const handleFormSubmit = (values) => {
    const formData = new FormData();

    formData.append("nm_pelayanan", values.nm_pelayanan);
    formData.append("keterangan", values.keterangan);
    formData.append("icon", values.icon);

    // for (let pair of formData.entries()) {
    //   console.log(pair);
    // }

    insertPelayanan(formData, setLoading, pelayananDispatch, history);
  };

  return (
    <>
      <PageTitle backButton={true}>Tambah Pelayanan</PageTitle>

      <Card className="overflow-visible">
        <CardBody>
          <Formik
            initialValues={initState}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
              setFieldValue,
              isValid,
              dirty,
            }) => (
              <form className="grid md:grid-cols-2" onSubmit={handleSubmit}>
                <div>
                  <Label>
                    <span>Nama Pelayanan</span>
                    <Input
                      placeholder="Nama Pelayanan"
                      name="nm_pelayanan"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nm_pelayanan || ""}
                      className={`mt-1 ${
                        errors.nm_pelayanan ? "border-red-500" : null
                      }`}
                    />
                    {errors.nm_pelayanan && (
                      <HelperText valid={false}>
                        {errors.nm_pelayanan}
                      </HelperText>
                    )}
                  </Label>
                  <Label className="mt-4">
                    <span>Keterangan</span>
                    <Textarea
                      placeholder="Keterangan"
                      name="keterangan"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.keterangan || ""}
                      rows={3}
                      className={`mt-1 ${
                        errors.keterangan ? "border-red-500" : null
                      }`}
                    />
                    {errors.keterangan && (
                      <HelperText valid={false}>{errors.keterangan}</HelperText>
                    )}
                  </Label>
                  <Label className="mt-4">
                    <span>Icon</span>
                    <Input
                      type="file"
                      name="icon"
                      onChange={(e) => {
                        onSelectFile(e);
                        setFieldValue("icon", e.target.files[0]);
                      }}
                      onBlur={handleBlur}
                      className={`mt-1 ${
                        errors.icon && touched.icon ? "border-red-500" : null
                      }`}
                    />
                    {errors.icon && touched.icon && (
                      <HelperText valid={false}>
                        {errors.icon}
                        <br />
                      </HelperText>
                    )}
                    {preview && (
                      <img
                        src={preview}
                        alt={preview}
                        className="w-48 mt-2"
                        width={200}
                      />
                    )}
                    <span className="inline-block mt-1 text-xs text-gray-400">
                      Icon harus bertipe jpg, jpeg, atau png dengan ukuran
                      kurang dari 1 MB
                    </span>
                  </Label>

                  <div className="mt-5 flex justify-end gap-2">
                    <Button layout="outline" onClick={handleReset}>
                      Reset
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading || !isValid || !dirty ? true : false}
                    >
                      {loading ? "Loading..." : "Simpan"}
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

export default Tambah;
