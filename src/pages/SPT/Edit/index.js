import React, { useContext, useEffect, useState } from "react";
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
import SelectData from "react-select";
import { useHistory, useRouteMatch } from "react-router-dom";
import { GlobalContext } from "../../../context/Provider";
import { editSpt, getEditSpt } from "../../../context/actions/SPT";
import { FormSkeletonLoading } from "../../../components/SkeletonLoading";
import { Formik } from "formik";
import initState from "../Formik/initState";
import validationSchema from "../Formik/validationSchema";
import TimePicker from "react-time-picker-input";

const Edit = () => {
  const match = useRouteMatch();
  const { params } = match;
  const history = useHistory();
  const [spt, setSpt] = useState("");
  const [loading, setLoading] = useState(false);
  const { sptDispatch } = useContext(GlobalContext);

  useEffect(() => {
    getEditSpt(params.id, setSpt);
  }, [params]);

  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];

  // const optionsPelanggan = spt
  //   ? spt.data_pelanggan.map((item) => ({
  //       value: item.id_pelanggan,
  //       label: `${item.nm_pelanggan} (${item.id_pelanggan})`,
  //     }))
  //   : [];

  const optionsMarine = spt
    ? spt.data_marine.map((item) => ({
        value: item.id_marine,
        label: `${item.nm_marine}`,
      }))
    : [];

  const optionsDriver = spt
    ? spt.data_driver.map((item) => ({
        value: item.id_driver,
        label: `${item.nm_driver}`,
      }))
    : [];

  const optionsTujuan = spt
    ? spt.data_tujuan.map((item) => ({
        value: item.id_tujuan,
        label: `${item.nm_tujuan}`,
      }))
    : [];

  const handleFormSubmit = (values) => {
    // console.log(values);
    // alert(JSON.stringify(values, null, 2));
    editSpt(params.id, values, setLoading, history, sptDispatch);
  };

  return (
    <>
      <PageTitle backButton={true}>Edit SPT</PageTitle>

      <Card className="overflow-visible mb-32">
        <CardBody>
          {!spt ? (
            <FormSkeletonLoading jumlahInput={7} />
          ) : (
            <Formik
              initialValues={initState(spt.data_spt)}
              validationSchema={validationSchema}
              enableReinitialize
              onSubmit={handleFormSubmit}
            >
              {(props) => {
                const {
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  isValid,
                } = props;
                return (
                  <form className="grid md:grid-cols-2" onSubmit={handleSubmit}>
                    <div>
                      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
                      <Label>
                        <span>No. SPT</span>
                        <Input
                          name="no_spt"
                          type="text"
                          placeholder="No. SPT"
                          value={values.no_spt || ""}
                          readOnly="readOnly"
                        />
                      </Label>
                      <Label className="mt-4">
                        <span>Pelanggan</span>
                        <Input
                          name="nm_pelanggan"
                          type="text"
                          placeholder="Pelanggan"
                          value={values.nm_pelanggan || ""}
                          readOnly="readOnly"
                        />
                      </Label>
                      {/* <Label className="space-y-1 mt-4">
                        <span>Pelanggan</span>
                        <SelectData
                          name="id_pelanggan"
                          inputId="id_pelanggan"
                          options={optionsPelanggan}
                          placeholder="-- Pilih Pelanggan --"
                          onChange={(opt) =>
                            setFieldValue("id_pelanggan", opt ? opt.value : "")
                          }
                          onBlur={handleBlur}
                          isClearable
                          defaultValue={{
                            value: spt.data_spt.id_pelanggan,
                            label: `${spt.data_spt.nm_pelanggan} (${spt.data_spt.id_pelanggan})`,
                          }}
                        />
                        {errors.id_pelanggan && touched.id_pelanggan && (
                          <HelperText valid={false}>
                            {errors.id_pelanggan}
                          </HelperText>
                        )}
                      </Label> */}
                      <Label className="space-y-1 mt-4">
                        <span>Marine</span>
                        <SelectData
                          name="id_marine"
                          inputId="id_marine"
                          options={optionsMarine}
                          placeholder="-- Pilih Marine --"
                          onChange={(opt) =>
                            setFieldValue("id_marine", opt ? opt.value : "")
                          }
                          onBlur={handleBlur}
                          isClearable
                          defaultValue={{
                            value: spt.data_spt.id_marine,
                            label: `${spt.data_spt.nm_marine}`,
                          }}
                        />
                        {errors.id_marine && touched.id_marine && (
                          <HelperText valid={false}>
                            {errors.id_marine}
                          </HelperText>
                        )}
                      </Label>
                      <Label className="space-y-1 mt-4">
                        <span>Driver</span>
                        <SelectData
                          name="id_driver"
                          inputId="id_driver"
                          options={optionsDriver}
                          placeholder="-- Pilih Driver --"
                          onChange={(opt) =>
                            setFieldValue("id_driver", opt ? opt.value : "")
                          }
                          onBlur={handleBlur}
                          isClearable
                          defaultValue={{
                            value: spt.data_spt.id_driver,
                            label: `${spt.data_spt.nm_driver}`,
                          }}
                        />
                        {errors.id_driver && touched.id_driver && (
                          <HelperText valid={false}>
                            {errors.id_driver}
                          </HelperText>
                        )}
                      </Label>

                      <Label className="space-y-1 mt-4">
                        <span>Tujuan</span>
                        <SelectData
                          name="id_tujuan"
                          inputId="id_tujuan"
                          options={optionsTujuan}
                          placeholder="-- Pilih Tujuan --"
                          onChange={(opt) =>
                            setFieldValue("id_tujuan", opt ? opt.value : "")
                          }
                          onBlur={handleBlur}
                          isClearable
                          defaultValue={{
                            value: spt.data_spt.id_tujuan,
                            label: `${spt.data_spt.nm_tujuan}`,
                          }}
                        />
                        {errors.id_tujuan && touched.id_tujuan && (
                          <HelperText valid={false}>
                            {errors.id_tujuan}
                          </HelperText>
                        )}
                      </Label>

                      <Label className="mt-4">
                        <span>Tanggal Keberangkatan</span>
                        <Input
                          name="tgl_keberangkatan"
                          type="date"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.tgl_keberangkatan || ""}
                          className={`mt-1 ${
                            errors.tgl_keberangkatan &&
                            touched.tgl_keberangkatan
                              ? "border-red-500"
                              : null
                          }`}
                        />
                        {errors.tgl_keberangkatan &&
                          touched.tgl_keberangkatan && (
                            <HelperText valid={false}>
                              {errors.tgl_keberangkatan}
                            </HelperText>
                          )}
                      </Label>

                      <Label className="mt-4">
                        <span>Jam Keberangkatan</span>

                        <TimePicker
                          onChange={(newValue) =>
                            setFieldValue("waktu_keberangkatan", newValue)
                          }
                          value={values.waktu_keberangkatan}
                          eachInputDropdown={true}
                        />
                        {errors.waktu_keberangkatan &&
                          touched.waktu_keberangkatan && (
                            <HelperText valid={false}>
                              {errors.waktu_keberangkatan}
                            </HelperText>
                          )}
                      </Label>

                      <Label className="mt-4">
                        <span>Keterangan</span>
                        <Textarea
                          name="keterangan"
                          type="text"
                          placeholder="Keterangan"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.keterangan || ""}
                          className={`mt-1 ${
                            errors.keterangan && touched.keterangan
                              ? "border-red-500"
                              : null
                          }`}
                        />
                        {errors.keterangan && touched.keterangan && (
                          <HelperText valid={false}>
                            {errors.keterangan}
                          </HelperText>
                        )}
                      </Label>

                      <div className="mt-5 flex justify-end gap-2">
                        {/* <Button
                        type="button"
                        layout="outline"
                        onClick={handleReset}
                      >
                        Reset
                      </Button> */}
                        <Button
                          type="submit"
                          disabled={loading || !isValid ? true : false}
                        >
                          {loading ? "Loading..." : "Simpan"}
                        </Button>
                      </div>
                    </div>
                  </form>
                );
              }}
            </Formik>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default Edit;
