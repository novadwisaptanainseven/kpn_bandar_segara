import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
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
import { GlobalContext } from "../../../context/Provider";
import { editNotaById, getEditNotaById } from "../../../context/actions/Nota";
import { DetailSkeletonLoading } from "../../../components/SkeletonLoading";
import { format } from "date-fns";
import { Formik } from "formik";
import initState from "../Formik/initState";
import validationSchema from "../Formik/validationSchema";

const Edit = () => {
  const match = useRouteMatch();
  const { params } = match;
  const history = useHistory();
  const [buatNota, setBuatNota] = useState("");
  const [loading, setLoading] = useState(false);
  const { notaDispatch } = useContext(GlobalContext);

  const [statusBayar, setStatusBayar] = useState("2");
  const [statusDiskon, setStatusDiskon] = useState("0");

  const PreviewInputPotonganHarga = ({ dataDiskon }) => {
    return (
      <>
        <Label className="mt-4">
          <span>Potongan Harga</span>
          <Input
            id="potongan"
            type="number"
            name="potongan"
            readOnly="readOnly"
            onClick={() => hitungTotalHargaSetelahDiskon(dataDiskon)}
          />
          <HelperText>
            <span id="previewPotonganHarga">Potongan Harga</span>
          </HelperText>
        </Label>
      </>
    );
  };

  const MemoizePreviewInputPotonganHarga = React.memo(
    PreviewInputPotonganHarga
  );

  useEffect(() => {
    const sts = buatNota && buatNota.data_nota.diskon > 0 ? "1" : "0";
    const stsBayar = buatNota ? buatNota.data_nota.id_status_nota : "2";

    setStatusDiskon(sts);
    setStatusBayar(`${stsBayar}`);
  }, [buatNota]);

  const hitungTotalHargaSetelahDiskon = (diskon) => {
    const totHargaAwal = buatNota.data_nota.harga_tujuan;
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

    return hargaSetelahDiskon;
  };

  useEffect(() => {
    getEditNotaById(params.id, setBuatNota);
  }, [params]);

  const handleFormSubmit = (values) => {
    // alert(JSON.stringify(values, null, 2));
    editNotaById(params.id, values, setLoading, history, notaDispatch);
  };

  // Cek apakah ada diskon atau tidak
  const valueStatusDiskon = (diskon) => {
    if (diskon > "0") {
      return "1";
    }
    return "0";
  };

  return (
    <>
      <PageTitle backButton>Edit Nota Transaksi</PageTitle>

      <Card className="overflow-visible mb-32">
        <CardBody>
          {!buatNota ? (
            <DetailSkeletonLoading jumlahInput={10} />
          ) : (
            <>
              <TableContainer className="text-sm mb-4">
                <Table>
                  <TableBody>
                    <TableRow className="bg-gray-200 dark:bg-gray-700">
                      <TableCell className="font-semibold">Kode Nota</TableCell>
                      <TableCell>{buatNota.data_nota.id_nota}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100 dark:bg-gray-800">
                      <TableCell className="font-semibold">Kode SPT</TableCell>
                      <TableCell>{buatNota.data_nota.id_spt}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-200 dark:bg-gray-700">
                      <TableCell className="font-semibold">Pelanggan</TableCell>
                      <TableCell>{buatNota.data_nota.nm_pelanggan}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100 dark:bg-gray-800">
                      <TableCell className="font-semibold">
                        Perusahaan
                      </TableCell>
                      <TableCell>{buatNota.data_nota.nm_perusahaan}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-200 dark:bg-gray-700">
                      <TableCell className="font-semibold">Marine</TableCell>
                      <TableCell>{buatNota.data_nota.nm_marine}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100 dark:bg-gray-800">
                      <TableCell className="font-semibold">Driver</TableCell>
                      <TableCell>{buatNota.data_nota.nm_driver}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-200 dark:bg-gray-700">
                      <TableCell className="font-semibold">
                        Nama Kapal
                      </TableCell>
                      <TableCell>{buatNota.data_nota.nm_kapal}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100 dark:bg-gray-800">
                      <TableCell className="font-semibold">Tujuan</TableCell>
                      <TableCell>{buatNota.data_nota.nm_tujuan}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-200 dark:bg-gray-700">
                      <TableCell className="font-semibold">Harga</TableCell>
                      <TableCell>
                        {buatNota.data_nota.harga_tujuan.toLocaleString("id", {
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
                        {format(
                          new Date(buatNota.data_nota.tgl_spt),
                          "dd-MM-y"
                        )}
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
                      <Label className="mt-4">
                        <span>Diskon (%)</span>
                        <Input
                          min={0}
                          type="number"
                          name="diskon"
                          placeholder="Masukkan diskon / potongan harga"
                          onClick={() =>
                            hitungTotalHargaSetelahDiskon(values.diskon)
                          }
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
                          <HelperText valid={false}>{errors.diskon}</HelperText>
                        )}
                      </Label>

                      <MemoizePreviewInputPotonganHarga
                        dataDiskon={values.diskon}
                      />

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
                        {values.harga.toLocaleString("id", {
                          style: "currency",
                          currency: "IDR",
                        })}
                        <br />
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
                        {values.bayar.toLocaleString("id", {
                          style: "currency",
                          currency: "IDR",
                        })}
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
                      <Label className="mt-4">
                        <span>Tanggal</span>
                        <Input
                          name="tgl_nota"
                          type="date"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.tgl_nota || ""}
                          className={`mt-1 ${
                            errors.tgl_nota ? "border-red-500" : null
                          }`}
                        />
                        {errors.tgl_nota && (
                          <HelperText valid={false}>
                            {errors.tgl_nota}
                          </HelperText>
                        )}
                      </Label>
                      <div className="mt-5 flex flex-col-reverse md:flex-row justify-end gap-2">
                        <Button layout="outline" onClick={handleReset}>
                          Reset
                        </Button>
                        <Button
                          type="submit"
                          disabled={loading || !isValid ? true : false}
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

export default Edit;
