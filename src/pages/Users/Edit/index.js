import React, { useCallback, useContext, useEffect, useState } from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import {
  Card,
  CardBody,
  Button,
  Input,
  Label,
  Select,
} from "@windmill/react-ui";
import { useHistory, useRouteMatch } from "react-router-dom";
import { GlobalContext } from "../../../context/Provider";
import { getPenggunaById } from "../../../context/actions/Pengguna";
import getImage from "../../../context/actions/Files/getImage";
import { Formik } from "formik";
import validationSchema from "../Formik/validationSchema";
import initState from "../Formik/initState";

const Edit = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { params } = match;
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const { penggunaDispatch } = useContext(GlobalContext);
  const [pengguna, setPengguna] = useState("");

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
    for (const key in values) {
      formData.append(key, values[key]);
    }
    for (const pair of formData.entries()) {
      console.log(pair);
    }
    // insertPengguna(formData, setLoading, history, penggunaDispatch);
  };

  return (
    <>
      <PageTitle backButton={true}>Edit Users</PageTitle>

      <Card className="overflow-visible mb-32">
        <CardBody>
          <Formik
            initialValues={initState(pengguna)}
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
              setFieldValue,
              touched,
              dirty,
              isValid,
            }) => (
              <form>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>
                      <span>Nama Lengkap</span>
                      <Input className="mt-1" placeholder="Nama Users" />
                    </Label>
                    <Label className="mt-4">
                      <span>Username</span>
                      <Input className="mt-1" placeholder="Username" />
                    </Label>
                  </div>
                </div>
                <p className="mt-4 text-red-500 italic mb-1 text-sm">
                  Kosongkan password jika tidak ingin mengubah password!
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <Label>
                    <span>Password</span>
                    <Input className="mt-1" placeholder="********" />
                  </Label>
                  <Label>
                    <span>Konfirmasi Password</span>
                    <Input className="mt-1" placeholder="********" />
                  </Label>
                </div>

                <div className="grid md:grid-cols-2 mt-4 gap-4">
                  <div>
                    <Label className="mt-4">
                      <span>Foto</span>
                      <Input
                        type="file"
                        className="mt-1"
                        onChange={(e) => onSelectFile(e)}
                      />
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
                        kurang dari 2 MB
                      </span>
                    </Label>
                    <div className="mt-5 flex flex-col-reverse md:flex-row justify-end gap-2">
                      <Button layout="outline">Reset</Button>
                      <Button>Simpan</Button>
                    </div>
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

export default Edit;
