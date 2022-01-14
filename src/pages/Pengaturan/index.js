import React, { useCallback, useEffect, useState, useContext } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import {
  Card,
  CardBody,
  Button,
  Input,
  Label,
  Textarea,
} from "@windmill/react-ui";
import { GlobalContext } from "../../context/Provider";
import { getKonten } from "../../context/actions/Konten";
import { Formik } from "formik";

const Pengaturan = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const { kontenState, kontenDispatch } = useContext(GlobalContext);
  const { loading, dataKonten: data } = kontenState;

  // Get data kontent
  useEffect(() => {
    getKonten(kontenDispatch);
  }, [kontenDispatch]);

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
    alert(JSON.stringify(values));
  };

  return (
    <>
      <PageTitle>Pengaturan</PageTitle>

      <Card className="mb-32">
        <CardBody>
          <Formik
            initialValues={initState}
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
                      className="mt-1"
                      placeholder="Nama Aplikasi"
                    />
                  </Label>
                  <Label className="mt-4">
                    <span>Deskripsi Aplikasi</span>
                    <Textarea
                      className="mt-1"
                      rows={3}
                      placeholder="Deskripsi Aplikasi"
                    />
                  </Label>
                  <Label className="mt-4">
                    <span>Logo</span>
                    <Input
                      type="file"
                      className="mt-1 mb-2"
                      onChange={(e) => onSelectFile(e)}
                    />
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
                    <Button layout="outline">Reset</Button>
                    <Button>Simpan</Button>
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
