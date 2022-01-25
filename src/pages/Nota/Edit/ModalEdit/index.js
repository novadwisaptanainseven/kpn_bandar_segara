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
  Textarea,
} from "@windmill/react-ui";
import { selectPelanggan } from "../../../../context/actions/Pelanggan";
import { selectMarine } from "../../../../context/actions/Marine";
import { selectTujuan } from "../../../../context/actions/Tujuan";
import { selectDriver } from "../../../../context/actions/Driver";
import { Formik } from "formik";
import initState from "../Formik/initState";
import validationSchema from "../Formik/validationSchema";
import SelectData from "react-select";
import TimePicker from "react-time-picker-input";
import { getEditSpt } from "../../../../context/actions/SPT";
import FormSkeletonLoading from "../../../../components/SkeletonLoading/FormSkeletonLoading";
import initStateEdit from "../Formik/initStateEdit";
import { editSptModal } from "../../../../context/actions/SPT";

const ModalEdit = ({
  isModalOpen,
  closeModal,
  setSpt,
  idNota,
  setValuesChanged,
}) => {
  const [value, setValue] = useState("10:00");
  const [marine, setMarine] = useState([]);
  const [driver, setDriver] = useState([]);
  const [tujuan, setTujuan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataSpt, setDataSpt] = useState("");

  useEffect(() => {
    if (isModalOpen.modal) {
      getEditSpt(isModalOpen.id, setDataSpt);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (dataSpt) {
      const potonganHarga = hitungTotalHargaSetelahDiskon(
        dataSpt.data_spt.diskon,
        dataSpt.data_spt.harga_tujuan
      );
    }
  }, [dataSpt]);

  const optionsMarine = dataSpt
    ? dataSpt.data_marine.map((item) => ({
        value: item.id_marine,
        label: `${item.nm_marine}`,
      }))
    : [];

  const optionsTujuan = dataSpt
    ? dataSpt.data_tujuan.map((item) => ({
        value: item.id_tujuan,
        label: `${item.nm_tujuan}`,
      }))
    : [];

  const optionsDriver = dataSpt
    ? dataSpt.data_driver.map((item) => ({
        value: item.id_driver,
        label: `${item.nm_driver}`,
      }))
    : [];

  const handleFormSubmit = (values) => {
    console.log(values);

    editSptModal(
      idNota,
      isModalOpen.id,
      values,
      setLoading,
      setSpt,
      closeModal
    );

    setValuesChanged(true);
  };

  const hitungTotalHargaSetelahDiskon = (diskon, harga_tujuan) => {
    const totHargaAwal = harga_tujuan;
    const potonganHarga = (diskon / 100) * totHargaAwal;

    const previewPotonganHarga = document.getElementById(
      "previewPotonganHarga"
    );
    const inputPotongan = document.getElementById("potongan");
    const hargaSetelahDiskon = totHargaAwal - potonganHarga;
    inputPotongan.value = potonganHarga;
    previewPotonganHarga.innerHTML = potonganHarga.toLocaleString("id", {
      style: "currency",
      currency: "IDR",
    });

    // console.log(potonganHarga);

    return hargaSetelahDiskon;
  };

  const resetPotonganHarga = () => {
    const previewPotonganHarga = document.getElementById(
      "previewPotonganHarga"
    );
    const inputPotongan = document.getElementById("potongan");

    inputPotongan.value = 0;
    previewPotonganHarga.innerHTML = inputPotongan.value.toLocaleString("id", {
      style: "currency",
      currency: "IDR",
    });
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen.modal}
        onClose={() => {
          closeModal();
          setDataSpt("");
        }}
      >
        <ModalHeader>Tambah Item Penyewaan</ModalHeader>
        <div className=" overflow-scroll" style={{ height: "500px" }}>
          {!dataSpt ? (
            <div className="mt-4">
              <FormSkeletonLoading jumlahInput={8} />
            </div>
          ) : (
            <Formik
              initialValues={initStateEdit(dataSpt.data_spt)}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
              enableReinitialize
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
                        onChange={(opt) => {
                          setFieldValue("id_marine", opt ? opt.value : "");
                        }}
                        onBlur={handleBlur}
                        isClearable
                        defaultValue={{
                          label: dataSpt.data_spt.nm_marine,
                          value: dataSpt.data_spt.id_marine,
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
                          label: dataSpt.data_spt.nm_driver,
                          value: dataSpt.data_spt.id_driver,
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
                        onChange={(opt) => {
                          setFieldValue("id_tujuan", opt ? opt.value : "");
                          setFieldValue("harga_tujuan", opt ? opt.harga : 0);
                          setFieldValue("harga", opt ? opt.harga : 0);
                        }}
                        onBlur={handleBlur}
                        isClearable
                        defaultValue={{
                          label: dataSpt.data_spt.nm_tujuan,
                          value: dataSpt.data_spt.id_tujuan,
                        }}
                      />
                      {errors.id_tujuan && touched.id_tujuan && (
                        <HelperText valid={false}>
                          {errors.id_tujuan}
                        </HelperText>
                      )}
                    </Label>

                    <Label className="space-y-1 mt-4">
                      <span>Harga Tujuan</span>
                      <Input
                        type="number"
                        name="harga_tujuan"
                        value={values.harga_tujuan}
                        readOnly
                      />
                      <HelperText>
                        {values.harga_tujuan.toLocaleString("id", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </HelperText>
                    </Label>

                    <Label className="mt-4">
                      <span>Diskon (%)</span>
                      <Input
                        min={0}
                        type="number"
                        name="diskon"
                        placeholder="Masukkan diskon / potongan harga"
                        onChange={(e) => {
                          handleChange(e);
                          setFieldValue(
                            "harga",
                            hitungTotalHargaSetelahDiskon(
                              e.target.value,
                              values.harga_tujuan
                            )
                          );
                        }}
                        onBlur={handleBlur}
                        value={values.diskon}
                        className={`mt-1 ${
                          errors.diskon ? "border-red-500" : null
                        }`}
                      />
                      {errors.diskon && (
                        <HelperText valid={false}>{errors.diskon}</HelperText>
                      )}
                    </Label>

                    <Label className="mt-4">
                      <span>Potongan Harga</span>
                      <Input
                        id="potongan"
                        type="number"
                        name="potongan"
                        readOnly="readOnly"
                        defaultValue={0}
                      />
                      <HelperText>
                        <span id="previewPotonganHarga">Potongan Harga</span>
                      </HelperText>
                    </Label>

                    <Label className="mt-4">
                      <span>Total Harga</span>
                      <Input
                        type="number"
                        className="mt-1"
                        id="harga"
                        name="harga"
                        placeholder="Masukkan total harga"
                        onChange={handleChange}
                        onKeyUp={() => {
                          resetPotonganHarga();
                          setFieldValue("diskon", 0);
                        }}
                        onBlur={handleBlur}
                        value={values.harga}
                        className={`mt-1 ${
                          errors.harga ? "border-red-500" : null
                        }`}
                      />
                      {errors.harga && (
                        <HelperText valid={false}>
                          {errors.harga} <br />
                        </HelperText>
                      )}
                      {values.harga.toLocaleString("id", {
                        style: "currency",
                        currency: "IDR",
                      })}
                      <br />
                      <HelperText>
                        Total harga bisa diubah. Namun akan mereset potongan
                        harga dan diskon ke 0
                      </HelperText>
                    </Label>

                    <Label className="mt-4">
                      <span>Keterangan / Keperluan</span>
                      <Textarea
                        name="keterangan"
                        type="text"
                        placeholder="Keterangan / keperluan"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.keterangan || ""}
                        rows={3}
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

                    <Label className="mt-4">
                      <span>Tanggal Keberangkatan</span>
                      <Input
                        name="tgl_keberangkatan"
                        type="date"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.tgl_keberangkatan || ""}
                        className={`mt-1 ${
                          errors.tgl_keberangkatan && touched.tgl_keberangkatan
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
                      {/* <Input
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
                    )} */}
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
                      <Button type="submit" disabled={loading ? true : false}>
                        {loading ? "Sedang Menyimpan..." : "Simpan"}
                      </Button>
                    </div>
                  </ModalFooter>
                </form>
              )}
            </Formik>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ModalEdit;
