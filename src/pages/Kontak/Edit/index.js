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
import validationSchemaEdit from "../Formik/validationSchemaEdit";
import { GlobalContext } from "../../../context/Provider";
import { editKontak, getKontakById } from "../../../context/actions/Kontak";
import { useHistory, useRouteMatch } from "react-router-dom";
import getImage from "../../../context/actions/Files/getImage";
import { FormSkeletonLoading } from "../../../components/SkeletonLoading";

const Edit = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { params } = match;
  const [loading, setLoading] = useState(false);
  const { kontakDispatch } = useContext(GlobalContext);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [kontak, setKontak] = useState("");

  // Get kontak by id
  useEffect(() => {
    getKontakById(params.id, setKontak);
  }, [params]);

  // Menangani preview input gambar setelah dipilih
  const handleSelectedFile = useCallback(() => {
    const kontak2 = kontak ? getImage("foto_kontak", kontak.icon) : null;
    if (!selectedFile) {
      setPreview(kontak2);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // Free memory when ever this component is unmounted
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile, kontak]);

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

    formData.append("nm_kontak", values.nm_kontak);
    formData.append("keterangan", values.keterangan);
    formData.append("link", values.link);
    if (values.icon) {
      formData.append("icon", values.icon);
    }

    for (let pair of formData.entries()) {
      // console.log(pair);
    }

    editKontak(params.id, formData, setLoading, history, kontakDispatch);
  };

  return (
    <>
      <PageTitle backButton={true}>Edit Kontak</PageTitle>

      <Card className="overflow-visible mb-32">
        <CardBody>
          {!kontak ? (
            <FormSkeletonLoading jumlahInput={4} />
          ) : (
            <Formik
              initialValues={initState(kontak)}
              validationSchema={validationSchemaEdit}
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
                setFieldValue,
                touched,
                isValid,
              }) => (
                <form className="grid md:grid-cols-2" onSubmit={handleSubmit}>
                  <div>
                    <Label>
                      <span>Nama Kontak</span>
                      <Input
                        placeholder="Nama Kontak"
                        name="nm_kontak"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nm_kontak || ""}
                        className={`mt-1 ${
                          errors.nm_kontak ? "border-red-500" : null
                        }`}
                      />
                      {errors.nm_kontak && (
                        <HelperText valid={false}>
                          {errors.nm_kontak}
                        </HelperText>
                      )}
                    </Label>
                    <Label className="mt-4">
                      <span>Link Kontak</span>
                      <Input
                        placeholder="Link Kontak"
                        name="link"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.link || ""}
                        className={`mt-1 ${
                          errors.link ? "border-red-500" : null
                        }`}
                      />
                      {errors.link && (
                        <HelperText valid={false}>{errors.link}</HelperText>
                      )}
                      <HelperText className="mt-1 text-xs text-gray-400">
                        Jika tidak ada link, isi dengan "#"
                      </HelperText>
                    </Label>
                    <Label className="mt-4">
                      <span>Keterangan</span>
                      <Input
                        placeholder="Keterangan"
                        name="keterangan"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.keterangan || ""}
                        className={`mt-1 ${
                          errors.keterangan ? "border-red-500" : null
                        }`}
                      />
                      {errors.keterangan && (
                        <HelperText valid={false}>
                          {errors.keterangan}
                        </HelperText>
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
                        disabled={loading || !isValid ? true : false}
                      >
                        {loading ? "Loading..." : "Simpan"}
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default Edit;
