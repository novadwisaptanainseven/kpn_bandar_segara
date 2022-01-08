import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import { Card, CardBody, Button, Input, Label } from "@windmill/react-ui";

import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Select,
  HelperText,
} from "@windmill/react-ui";
import { useHistory, useRouteMatch } from "react-router-dom";
import { getBuatNota } from "../../../context/actions/SPT";
import { DetailSkeletonLoading } from "../../../components/SkeletonLoading";
import { format } from "date-fns";
import { Formik } from "formik";
import initState from "./Formik/initState";
import validationSchema from "./Formik/validationSchema";

const BuatNota = () => {
  const match = useRouteMatch();
  const { params } = match;
  const history = useHistory();
  const [buatNota, setBuatNota] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalHarga, setTotalHarga] = useState(0);

  const [statusBayar, setStatusBayar] = useState("2");
  const [statusDiskon, setStatusDiskon] = useState("0");

  const hitungTotalHargaSetelahDiskon = (diskon) => {
    const totHargaAwal = buatNota.data_spt.harga;
    const potonganHarga = (diskon / 100) * totHargaAwal;

    const inputPotongan = document.getElementById("potongan");
    const hargaSetelahDiskon = totHargaAwal - potonganHarga;
    inputPotongan.value = potonganHarga;

    console.log(potonganHarga);

    return hargaSetelahDiskon;
  };

  useEffect(() => {
    getBuatNota(params.id, setBuatNota);
  }, [params]);

  const handleFormSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <>
      <PageTitle backButton>Pembuatan Nota Transaksi</PageTitle>

      <Card className="overflow-visible mb-32">
        <CardBody>
          {!buatNota ? (
            <DetailSkeletonLoading jumlahInput={10} />
          ) : (
            <>
              <TableContainer className="text-sm mb-4">
                <Table>
                  <TableBody>
                    <TableRow className="bg-gray-100 dark:bg-gray-800">
                      <TableCell className="font-semibold">Kode SPT</TableCell>
                      <TableCell>{buatNota.data_spt.id_spt}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-200 dark:bg-gray-700">
                      <TableCell className="font-semibold">Pelanggan</TableCell>
                      <TableCell>{buatNota.data_spt.nm_pelanggan}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100 dark:bg-gray-800">
                      <TableCell className="font-semibold">
                        Perusahaan
                      </TableCell>
                      <TableCell>{buatNota.data_spt.nm_perusahaan}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-200 dark:bg-gray-700">
                      <TableCell className="font-semibold">Marine</TableCell>
                      <TableCell>{buatNota.data_spt.nm_marine}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100 dark:bg-gray-800">
                      <TableCell className="font-semibold">Driver</TableCell>
                      <TableCell>{buatNota.data_spt.nm_driver}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-200 dark:bg-gray-700">
                      <TableCell className="font-semibold">
                        Nama Kapal
                      </TableCell>
                      <TableCell>{buatNota.data_spt.nm_kapal}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100 dark:bg-gray-800">
                      <TableCell className="font-semibold">Tujuan</TableCell>
                      <TableCell>{buatNota.data_spt.nm_tujuan}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-200 dark:bg-gray-700">
                      <TableCell className="font-semibold">Harga</TableCell>
                      <TableCell>
                        {buatNota.data_spt.harga.toLocaleString("id", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100 dark:bg-gray-800">
                      <TableCell className="font-semibold">
                        Tanggal SPT
                      </TableCell>
                      <TableCell>
                        {format(new Date(buatNota.data_spt.tgl_spt), "dd-MM-y")}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Formik
                initialValues={initState(buatNota)}
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
                  <form className="grid md:grid-cols-2" onSubmit={handleSubmit}>
                    <div>
                      <Label>
                        <span>Ada Diskon ?</span>
                        <Select
                          className="mt-1"
                          onChange={(e) => {
                            setStatusDiskon(e.target.value);
                            e.target.value === "0" && handleReset();
                          }}
                        >
                          <option value="0">Tidak Ada</option>
                          <option value="1">Ada</option>
                        </Select>
                      </Label>
                      {statusDiskon === "1" && (
                        <>
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
                                  hitungTotalHargaSetelahDiskon(e.target.value)
                                );
                              }}
                              onBlur={handleBlur}
                              value={values.diskon}
                              className={`mt-1 ${
                                errors.diskon ? "border-red-500" : null
                              }`}
                            />
                            {errors.diskon && (
                              <HelperText valid={false}>
                                {errors.diskon}
                              </HelperText>
                            )}
                          </Label>
                          <Label className="mt-4">
                            <span>Potongan Harga</span>
                            <Input
                              id="potongan"
                              type="number"
                              name="potongan"
                              readOnly="readOnly"
                            />
                          </Label>
                        </>
                      )}
                      <Label className="mt-4">
                        <span>Total Harga</span>
                        <Input
                          type="number"
                          className="mt-1"
                          id="harga"
                          name="harga"
                          placeholder="Masukkan total harga"
                          readOnly={statusDiskon === "1" ? true : false}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.harga}
                          className={`mt-1 ${
                            errors.harga && statusDiskon === "0"
                              ? "border-red-500"
                              : null
                          }`}
                        />
                        {errors.harga && statusDiskon === "0" && (
                          <HelperText valid={false}>
                            {errors.harga} <br />
                          </HelperText>
                        )}
                        <HelperText>
                          Total harga bisa diubah jika tidak ada diskon
                        </HelperText>
                      </Label>
                      <Label className="mt-4">
                        <span>Jumlah Yg Dibayar</span>
                        <Input
                          type="number"
                          className="mt-1"
                          placeholder="Masukkan jumlah yang dibayar pelanggan"
                          name="bayar"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.bayar}
                          className={`mt-1 ${
                            errors.bayar ? "border-red-500" : null
                          }`}
                        />
                        {errors.bayar && (
                          <HelperText valid={false}>{errors.bayar}</HelperText>
                        )}
                      </Label>
                      <Label className="mt-4">
                        <span>
                          Status Bayar{" "}
                          {statusBayar === "1" && (
                            <div
                              className={`inline-block w-3 h-3 rounded-full bg-lime-500`}
                            ></div>
                          )}
                          {statusBayar === "2" && (
                            <div
                              className={`inline-block w-3 h-3 rounded-full bg-red-600`}
                            ></div>
                          )}
                          {statusBayar === "3" && (
                            <div
                              className={`inline-block w-3 h-3 rounded-full bg-yellow-300`}
                            ></div>
                          )}
                        </span>
                        <Select
                          className="mt-1"
                          name="id_status_nota"
                          onChange={(e) => {
                            handleChange(e);
                            setStatusBayar(e.target.value);
                          }}
                          onBlur={handleBlur}
                          value={values.id_status_nota}
                          className={`mt-1 ${
                            errors.id_status_nota ? "border-red-500" : null
                          }`}
                        >
                          {buatNota.data_status_nota.map((item, index) => (
                            <option key={index} value={item.id_status_nota}>
                              {item.nm_status_nota}
                            </option>
                          ))}
                        </Select>
                        {errors.id_status_nota && (
                          <HelperText valid={false}>
                            {errors.id_status_nota}
                          </HelperText>
                        )}
                      </Label>
                      <div className="mt-5 flex flex-col-reverse md:flex-row justify-end gap-2">
                        <Button layout="outline">Reset</Button>
                        <Button
                          type="submit"
                          disabled={
                            loading || !dirty || !isValid ? true : false
                          }
                        >
                          {loading ? "Loading..." : "Buat Nota"}
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default BuatNota;
