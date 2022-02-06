import React, { useCallback, useContext, useEffect, useState } from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import {
  Card,
  CardBody,
  Button,
  Input,
  Label,
  HelperText,
} from "@windmill/react-ui";
import { useHistory, useRouteMatch } from "react-router-dom";
import { GlobalContext } from "../../../context/Provider";
import {
  editPengguna,
  getPenggunaById,
} from "../../../context/actions/Pengguna";
import getImage from "../../../context/actions/Files/getImage";
import { Formik } from "formik";
import validationSchemaEdit from "../Formik/validationSchemaEdit";
import initState from "../Formik/initState";
import { FormSkeletonLoading } from "../../../components/SkeletonLoading";

const Edit = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { params } = match;
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const { penggunaDispatch } = useContext(GlobalContext);
  const [pengguna, setPengguna] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPenggunaById(params.id, setPengguna);
  }, [params]);

  // Menangani preview input gambar setelah dipilih
  const handleSelectedFile = useCallback(() => {
    const pengguna2 = pengguna
      ? getImage("foto_pengguna", pengguna.foto)
      : null;
    if (!selectedFile) {
      setPreview(pengguna2);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // Free memory when ever this component is unmounted
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile, pengguna]);

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
    // alert(JSON.stringify(values));
    const formData = new FormData();
    formData.append("nama", values.nama);
    formData.append("username", values.username);
    if (values.password) {
      formData.append("password", values.password);
    }
    if (values.foto) {
      formData.append("foto", values.foto);
    }
    for (const pair of formData.entries()) {
      // console.log(pair);
    }
    editPengguna(params.id, formData, setLoading, history, penggunaDispatch);
  };

  return (
    <>
      <PageTitle backButton={true}>Edit Data Admin</PageTitle>

      <Card className="overflow-visible mb-32">
        <CardBody>
          {!pengguna ? (
            <FormSkeletonLoading jumlahInput={4} />
          ) : (
            <Formik
              initialValues={initState(pengguna)}
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
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>
                        <span>Nama Lengkap</span>
                        <Input
                          placeholder="Nama Admin"
                          name="nama"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.nama || ""}
                          className={`mt-1 ${
                            errors.nama && touched.nama
                              ? "border-red-500"
                              : null
                          }`}
                        />
                        {errors.nama && touched.nama && (
                          <HelperText valid={false}>{errors.nama}</HelperText>
                        )}
                      </Label>
                      <Label className="mt-4">
                        <span>Username</span>
                        <Input
                          placeholder="Username"
                          name="username"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username || ""}
                          className={`mt-1 ${
                            errors.username && touched.username
                              ? "border-red-500"
                              : null
                          }`}
                        />
                        {errors.username && touched.username && (
                          <HelperText valid={false}>
                            {errors.username}
                          </HelperText>
                        )}
                      </Label>
                    </div>
                  </div>
                  <p className="mt-4 text-red-500 italic mb-1 text-sm">
                    Kosongkan password jika tidak ingin mengubah password!
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Label>
                      <span>Password</span>
                      <Input
                        type="password"
                        placeholder="********"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password || ""}
                        className={`mt-1 ${
                          errors.password && touched.password
                            ? "border-red-500"
                            : null
                        }`}
                      />
                      {errors.password && touched.password && (
                        <HelperText valid={false}>{errors.password}</HelperText>
                      )}{" "}
                    </Label>
                    <Label>
                      <span>Konfirmasi Password</span>
                      <Input
                        type="password"
                        placeholder="********"
                        name="konfirmasi_password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.konfirmasi_password || ""}
                        className={`mt-1 ${
                          errors.konfirmasi_password &&
                          touched.konfirmasi_password
                            ? "border-red-500"
                            : null
                        }`}
                      />
                      {errors.konfirmasi_password &&
                        touched.konfirmasi_password && (
                          <HelperText valid={false}>
                            {errors.konfirmasi_password}
                          </HelperText>
                        )}
                    </Label>
                  </div>

                  <div className="grid md:grid-cols-2 mt-4 gap-4">
                    <div>
                      <Label className="mt-4">
                        <span>Foto</span>
                        <Input
                          type="file"
                          name="foto"
                          onChange={(e) => {
                            onSelectFile(e);
                            setFieldValue("foto", e.target.files[0]);
                          }}
                          onBlur={handleBlur}
                          className={`mt-1 ${
                            errors.foto && touched.foto
                              ? "border-red-500"
                              : null
                          }`}
                        />
                        {errors.foto && touched.foto && (
                          <HelperText valid={false}>
                            {errors.foto}
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
                          Foto harus bertipe jpg, jpeg, atau png dengan ukuran
                          kurang dari 1 MB
                        </span>
                      </Label>
                      <div className="mt-5 flex flex-col-reverse md:flex-row justify-end gap-2">
                        <Button layout="outline" onClick={handleReset}>
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
