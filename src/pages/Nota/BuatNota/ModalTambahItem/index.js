import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  Input,
  HelperText,
} from "@windmill/react-ui";
import { selectPelanggan } from "../../../../context/actions/Pelanggan";
import { selectMarine } from "../../../../context/actions/Marine";
import { selectTujuan } from "../../../../context/actions/Tujuan";
import { selectDriver } from "../../../../context/actions/Driver";
import { Formik } from "formik";
import initState from "../Formik/initState";
import validationSchema from "../Formik/validationSchema";
import SelectData from "react-select";

const ModalTambahItem = ({ isModalOpen, closeModal }) => {
  const [pelanggan, setPelanggan] = useState([]);
  const [marine, setMarine] = useState([]);
  const [driver, setDriver] = useState([]);
  const [tujuan, setTujuan] = useState([]);

  useEffect(() => {
    if (isModalOpen) {
      selectPelanggan(setPelanggan);
      selectMarine(setMarine);
      selectTujuan(setTujuan);
      selectDriver(setDriver);
    }
  }, [isModalOpen]);

  const optionsPelanggan = pelanggan.map((item) => ({
    value: item.id_pelanggan,
    label: `${item.nm_pelanggan} (${item.nm_perusahaan})`,
  }));

  const optionsMarine = marine.map((item) => ({
    value: item.id_marine,
    label: `${item.nm_marine} (${item.id_marine})`,
  }));

  const optionsTujuan = tujuan.map((item) => ({
    value: item.id_tujuan,
    label: `${item.nm_tujuan} (${item.id_tujuan})`,
  }));

  const optionsDriver = driver.map((item) => ({
    value: item.id_driver,
    label: `${item.nm_driver} (${item.id_driver})`,
  }));

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Tambah Item Penyewaan</ModalHeader>
        <div className=" overflow-scroll" style={{ height: "500px" }}>
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
              setFieldValue,
              isValid,
              dirty,
              handleReset,
            }) => (
              <form onSubmit={handleSubmit}>
                <ModalBody>
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
                    />
                    {errors.id_marine && touched.id_marine && (
                      <HelperText valid={false}>{errors.id_marine}</HelperText>
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
                    />
                    {errors.id_driver && touched.id_driver && (
                      <HelperText valid={false}>{errors.id_driver}</HelperText>
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
                    />
                    {errors.id_tujuan && touched.id_tujuan && (
                      <HelperText valid={false}>{errors.id_tujuan}</HelperText>
                    )}
                  </Label>

                  <Label className="mt-4">
                    <span>Keterangan / Keperluan</span>
                    <Input
                      name="keterangan"
                      type="text"
                      placeholder="Nama Kapal"
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
                      <HelperText valid={false}>{errors.keterangan}</HelperText>
                    )}
                  </Label>

                  <Label className="mt-4">
                    <span>Tanggal</span>
                    <Input
                      name="tgl_spt"
                      type="date"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.tgl_spt || ""}
                      className={`mt-1 ${
                        errors.tgl_spt && touched.tgl_spt
                          ? "border-red-500"
                          : null
                      }`}
                    />
                    {errors.tgl_spt && touched.tgl_spt && (
                      <HelperText valid={false}>{errors.tgl_spt}</HelperText>
                    )}
                  </Label>

                  <Label className="mt-4">
                    <span>Jam Keberangkatan</span>
                    <Input
                      name="jam"
                      type="time"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.jam || ""}
                      className={`mt-1 ${
                        errors.jam && touched.jam ? "border-red-500" : null
                      }`}
                    />
                    {errors.jam && touched.jam && (
                      <HelperText valid={false}>{errors.jam}</HelperText>
                    )}
                  </Label>
                </ModalBody>
                <ModalFooter>
                  <div className="mt-5 flex justify-end gap-2">
                    <Button
                      type="button"
                      layout="outline"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                    <Button type="submit">Tambah</Button>
                  </div>
                </ModalFooter>
              </form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default ModalTambahItem;
