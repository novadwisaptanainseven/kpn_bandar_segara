import React, { useEffect, useState } from "react";
import PageTitle from "../../../../components/Typography/PageTitle";
import {
  Card,
  CardBody,
  Button,
  Input,
  Label,
  HelperText,
} from "@windmill/react-ui";
import SelectData from "react-select";
import { selectPerusahaan } from "../../../../context/actions/Perusahaan";
import validationSchema from "../Formik/validationSchema";
import initState from "../Formik/initState";

import { Formik } from "formik";

import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useHistory } from "react-router-dom";
import { insertPelanggan } from "../../../../context/actions/Pelanggan";

const Swal = withReactContent(swal2);

const Tambah = () => {
  const history = useHistory();
  const [dataPerusahaan, setDataPerusahaan] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get Select Perusahaan
  useEffect(() => {
    selectPerusahaan(setDataPerusahaan);
  }, []);

  const options = dataPerusahaan.map((item) => ({
    value: item.id_perusahaan,
    label: item.nm_perusahaan,
  }));

  // Fungsi untuk menampilkan alert success tambah data
  const showAlertSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Tambah Data Berhasil",
      showConfirmButton: false,
      timer: 1500,
    }).then((res) => {
      history.push("/app/pelanggan");
    });
  };

  // Fungsi untuk menampilkan alert error tambah data
  const showAlertError = (message) => {
    let err_message = "";

    for (const key in message) {
      err_message += `${message[key]}, `;
    }

    Swal.fire({
      icon: "error",
      title: "Tambah Data Gagal",
      text: err_message,
    }).then((result) => {});
  };

  const handleFormSubmit = (values) => {
    console.log(values);

    insertPelanggan(values, setLoading, showAlertSuccess, showAlertError);
  };

  return (
    <>
      <PageTitle backButton={true}>Tambah Pelanggan</PageTitle>

      <Card className="overflow-visible">
        <CardBody>
          <Formik
            initialValues={initState}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
              setFieldValue,
            }) => (
              <form className="grid md:grid-cols-2" onSubmit={handleSubmit}>
                <div>
                  <Label>
                    <span>Nama</span>
                    <Input
                      className={`mt-1 ${
                        errors.nm_pelanggan ? "border-red-500" : null
                      }`}
                      name="nm_pelanggan"
                      placeholder="Nama Pelanggan"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nm_pelanggan || ""}
                    />
                    {errors.nm_pelanggan && (
                      <HelperText valid={false}>
                        {errors.nm_pelanggan}
                      </HelperText>
                    )}
                  </Label>
                  <Label className="mt-4 space-y-1">
                    <span>Perusahaan</span>
                    <SelectData
                      options={options}
                      name="id_perusahaan"
                      onChange={(opt) =>
                        setFieldValue("id_perusahaan", opt ? opt.value : "")
                      }
                      onBlur={handleBlur}
                      isClearable
                    />
                    {errors.id_perusahaan && (
                      <HelperText valid={false}>
                        {errors.id_perusahaan}
                      </HelperText>
                    )}
                  </Label>
                  <div className="mt-5 flex justify-end gap-2">
                    <Button
                      type="button"
                      layout="outline"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                    <Button type="submit" disabled={loading ? true : false}>
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
