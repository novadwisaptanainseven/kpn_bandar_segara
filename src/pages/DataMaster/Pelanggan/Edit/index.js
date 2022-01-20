import React, { useEffect, useState } from "react";
import PageTitle from "../../../../components/Typography/PageTitle";
import {
  Card,
  CardBody,
  Button,
  Input,
  Label,
  HelperText,
  Textarea
} from "@windmill/react-ui";
import SelectData from "react-select";

import validationSchema from "../Formik/validationSchema";
import initState from "../Formik/initState";

import { Formik } from "formik";

import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useHistory, useRouteMatch } from "react-router-dom";
import { selectPerusahaan } from "../../../../context/actions/Perusahaan";
import {
  editPelanggan,
  getPelangganById,
} from "../../../../context/actions/Pelanggan";
import "react-loading-skeleton/dist/skeleton.css";
import { FormSkeletonLoading } from "../../../../components/SkeletonLoading";

const Swal = withReactContent(swal2);

const Edit = () => {
  const match = useRouteMatch();
  const { params } = match;
  const history = useHistory();
  const [dataPerusahaan, setDataPerusahaan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pelanggan, setPelanggan] = useState("");

  // Get select perusahaan
  useEffect(() => {
    selectPerusahaan(setDataPerusahaan);
  }, []);

  // Get pelanggan by id pelanggan
  useEffect(() => {
    getPelangganById(params.id, setPelanggan);
  }, [params]);

  const options = dataPerusahaan.map((item) => ({
    value: item.id_perusahaan,
    label: item.nm_perusahaan,
  }));

  // Fungsi untuk menampilkan alert success tambah data
  const showAlertSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Edit Data Berhasil",
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
      title: "Edit Data Gagal",
      text: err_message,
    }).then((result) => {});
  };

  const handleFormSubmit = (values) => {
    editPelanggan(
      params.id,
      values,
      setLoading,
      showAlertSuccess,
      showAlertError
    );
  };

  return (
    <>
      <PageTitle backButton={true}>Edit Pelanggan</PageTitle>

      <Card className="overflow-visible">
        <CardBody>
          {!pelanggan ? (
            <FormSkeletonLoading jumlahInput={2} />
          ) : (
            <Formik
              initialValues={initState(pelanggan)}
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              {({
                values,
                errors,
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
                        defaultValue={{
                          label: pelanggan.nm_perusahaan,
                          value: pelanggan.id_perusahaan,
                        }}
                      />
                      {errors.id_perusahaan && (
                        <HelperText valid={false}>
                          {errors.id_perusahaan}
                        </HelperText>
                      )}
                    </Label>
                    <Label className="mt-4">
                      <span>Keterangan</span>
                      <Textarea
                        className={`mt-1 ${
                          errors.keterangan ? "border-red-500" : null
                        }`}
                        rows="3"
                        placeholder="Keterangan Pelanggan"
                        name="keterangan"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.keterangan || ""}
                      />
                      {errors.keterangan && (
                        <HelperText valid={false}>
                          {errors.keterangan}
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
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default Edit;
