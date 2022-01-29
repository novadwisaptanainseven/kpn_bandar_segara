import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody } from "@windmill/react-ui";
import PageTitle from "../../../components/Typography/PageTitle";

import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  TableHeader,
  Label,
  Input,
  Button,
  HelperText,
  Select,
} from "@windmill/react-ui";
import { useRouteMatch } from "react-router-dom";
import { editNotaById, getNotaById } from "../../../context/actions/Nota";
import { DetailSkeletonLoading } from "../../../components/SkeletonLoading";
import { format } from "date-fns";
import Interweave from "interweave";
import { selectStatusNota } from "../../../context/actions/StatusNota";
import { LoadingIcon } from "../../../assets";
import { deleteSptNota, updateStatusSpt } from "../../../context/actions/SPT";
import ModalEdit from "./ModalEdit";
import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Swal = withReactContent(swal2);

const Edit = () => {
  const match = useRouteMatch();
  const { params } = match;
  const [nota, setNota] = useState("");
  const [statusNota, setStatusNota] = useState([]);
  const [values, setValues] = useState();
  const [valuesChanged, setValuesChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState({
    id: "",
    modal: false,
  });
  const [totalHarga, setTotalHarga] = useState(0);

  const openModalEdit = (id) => {
    setIsModalEditOpen({
      id: id,
      modal: true,
    });
  };

  const closeModalEdit = () => {
    setIsModalEditOpen({
      id: "",
      modal: false,
    });
  };

  // Get detail Nota
  useEffect(() => {
    getNotaById(params.id, setNota);
  }, [params]);

  // Get Select Status Nota
  useEffect(() => {
    selectStatusNota(setStatusNota);
  }, []);

  useEffect(() => {
    if (nota) {
      setValues(nota.data_nota);
    }
  }, [nota]);

  useEffect(() => {
    const hitungTotalHargaNumber = () => {
      const totHarga = nota.data_spt.reduce(add, 0);
      function add(accumulator, a) {
        return accumulator + a.harga;
      }

      return totHarga;
    };

    if (nota) {
      setTotalHarga(hitungTotalHargaNumber());
    }
  }, [nota]);

  // Update values apabila total harga berubah
  useEffect(() => {
    setValues({
      ...values,
      total_harga: totalHarga,
    });
  }, [totalHarga]);

  // Cek apakah ada perubahan pada values, apabila ada perubahan maka tampilkan notifikasi peringatan bahwa user harus menyimpan perubahan
  useEffect(() => {
    if (valuesChanged) {
      setValues({
        ...values,
        total_harga: totalHarga,
      });
    }
  }, [valuesChanged]);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

    setValuesChanged(true);
  };

  const hitungSisa = (totHarga, totBayar) => {
    return (totHarga - totBayar).toLocaleString("id", {
      style: "currency",
      currency: "IDR",
    });
  };

  const hitungPotonganHarga = (diskon, hargaTujuan) => {
    return ((diskon / 100) * hargaTujuan).toLocaleString("id", {
      style: "currency",
      currency: "IDR",
    });
  };

  const hitungTotalHarga = () => {
    const totHarga = nota.data_spt.reduce(add, 0);
    function add(accumulator, a) {
      return accumulator + a.harga;
    }

    return totHarga.toLocaleString("id", {
      style: "currency",
      currency: "IDR",
    });
  };

  const hitungTotalPotongan = () => {
    const totPotongan = nota.data_spt.reduce(add, 0);

    function add(accumulator, a) {
      const potonganHarga = (a.diskon / 100) * a.harga_tujuan;
      return accumulator + potonganHarga;
    }

    return totPotongan.toLocaleString("id", {
      style: "currency",
      currency: "IDR",
    });
  };

  const handleChangeStatusBayar = (idSpt, status) => {
    const values = {
      id_status_spt: status,
    };
    updateStatusSpt(params.id, idSpt, values, setLoadingUpdate, setNota);
  };

  const handleFormSubmit = () => {
    editNotaById(params.id, values, setLoading);

    setValuesChanged(false);
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Anda yakin ingin menghapus data ini ?",
      text: "Jika yakin, klik YA",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "YA",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteSptNota(params.id, id, setNota, Swal);
      }
    });
  };

  return (
    <>
      <PageTitle backButton={true}>Edit Nota Transaksi</PageTitle>
      <Card className="mb-32">
        <CardBody>
          {!nota ? (
            <DetailSkeletonLoading jumlahInput={15} />
          ) : (
            <>
              <form className="grid md:grid-cols-2 mb-5">
                <div>
                  <Label className="mb-4">
                    <span>No. Nota</span>
                    <Input
                      type="text"
                      name="no_nota"
                      value={nota.data_nota.no_nota}
                      readOnly
                      className="mt-1"
                    />
                    <HelperText className="text-red-600 italic">
                      Tidak dapat diubah
                    </HelperText>
                  </Label>
                  <Label className="mb-4">
                    <span>Pelanggan</span>
                    <Input
                      type="text"
                      name="nm_pelanggan"
                      value={nota.data_nota.nm_pelanggan}
                      readOnly
                      className="mt-1"
                    />
                    <HelperText className="text-red-600 italic">
                      Tidak dapat diubah
                    </HelperText>
                  </Label>
                  <Label className="mb-4">
                    <span>Tanggal Nota</span>
                    <Input
                      type="text"
                      name="waktu_buat"
                      value={format(
                        new Date(nota.data_nota.waktu_buat),
                        "dd-MM-y"
                      )}
                      readOnly
                      className="mt-1"
                    />
                    <HelperText className="text-red-600 italic">
                      Tidak dapat diubah
                    </HelperText>
                  </Label>
                  <Label className="mb-4">
                    <span>Status Pembayaran</span>
                    <Select
                      name="id_status_nota"
                      value={values ? values.id_status_nota : ""}
                      className="mt-1"
                      onChange={(e) => handleChange(e)}
                    >
                      {statusNota.map((item, index) => (
                        <option key={index} value={item.id_status_nota}>
                          {item.nm_status_nota}
                        </option>
                      ))}
                    </Select>
                    <HelperText className="text-lime-600 italic">
                      Bisa Diubah
                    </HelperText>
                  </Label>
                  <Label className="mb-4">
                    <span>Jumlah yg Dibayar</span>
                    <Input
                      type="number"
                      name="bayar"
                      value={values ? values.bayar : 0}
                      className="mt-1"
                      onChange={(e) => handleChange(e)}
                    />
                    {values.bayar && (
                      <HelperText>
                        {parseFloat(values.bayar).toLocaleString("id", {
                          style: "currency",
                          currency: "IDR",
                        })}
                        <br />
                      </HelperText>
                    )}
                    <HelperText className="text-lime-600 italic">
                      Bisa diubah
                    </HelperText>
                  </Label>
                  <Label className="mb-4">
                    <span>Total Harga</span>
                    <Input
                      type="text"
                      name="total_harga"
                      value={totalHarga.toLocaleString("id", {
                        style: "currency",
                        currency: "IDR",
                      })}
                      className="mt-1"
                      readOnly
                      // onChange={(e) => handleChange(e)}
                    />
                    <HelperText className="text-lime-600 italic">
                      Terhitung otomatis dari list item penyewaan kapal
                    </HelperText>
                  </Label>
                  <div className="flex justify-end">
                    <Button
                      onClick={handleFormSubmit}
                      disabled={loading ? true : false}
                    >
                      {loading ? "Sedang Menyimpan..." : "Simpan"}
                    </Button>
                  </div>
                </div>
              </form>

              <hr />
              {/* Notifikasi Peringatan untuk save apabila ada perubahan values */}
              {valuesChanged && (
                <div className="bg-red-600 text-white p-3 rounded-md mt-3">
                  Terjadi perubahan, jangan lupa{" "}
                  <span className="font-semibold">disimpan!</span>
                </div>
              )}

              <div className="mb-2 mt-4 flex justify-between">
                <h1 className="text-lg font-semibold pb-4 dark:text-gray-200">
                  Rincian Item Penyewaan Kapal
                </h1>
                {loadingUpdate && (
                  <img src={LoadingIcon} alt="loading-icon" className="w-10" />
                )}
              </div>
              <TableContainer className="text-sm mb-3">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell>No.</TableCell>
                      <TableCell>No. SPT</TableCell>
                      <TableCell>Tujuan</TableCell>
                      <TableCell>Driver</TableCell>
                      <TableCell>Marine</TableCell>
                      <TableCell>Tanggal</TableCell>
                      <TableCell>Jam</TableCell>
                      <TableCell>Keterangan</TableCell>
                      <TableCell>Diskon</TableCell>
                      <TableCell>Potongan</TableCell>
                      <TableCell>Harga</TableCell>
                      {/* <TableCell>Status</TableCell> */}
                      <TableCell>Aksi</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {nota.data_spt.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.no_spt}</TableCell>
                        <TableCell>{item.nm_tujuan}</TableCell>
                        <TableCell>{item.nm_driver}</TableCell>
                        <TableCell>{item.nm_marine}</TableCell>
                        <TableCell>
                          {format(new Date(item.tgl_keberangkatan), "dd/MM/y")}
                        </TableCell>
                        <TableCell>{item.waktu_keberangkatan}</TableCell>
                        <TableCell>
                          <Interweave content={item.keterangan} />
                        </TableCell>
                        <TableCell>{item.diskon} %</TableCell>

                        <TableCell>
                          <TableCell>
                            {hitungPotonganHarga(
                              item.diskon,
                              item.harga_tujuan
                            )}
                          </TableCell>
                        </TableCell>
                        <TableCell>
                          <TableCell>
                            {item.harga.toLocaleString("id", {
                              style: "currency",
                              currency: "IDR",
                            })}
                          </TableCell>
                        </TableCell>
                        {/* <TableCell>
                          <Select
                            style={{ width: 150 }}
                            id="statusBayar"
                            name="statusBayar"
                            value={item.id_status_spt}
                            onChange={(e) =>
                              handleChangeStatusBayar(
                                item.id_spt,
                                e.target.value
                              )
                            }
                          >
                            {statusNota.map((item) => (
                              <option
                                key={item.id_status_nota}
                                value={item.id_status_nota}
                              >
                                {item.nm_status_nota}
                              </option>
                            ))}
                          </Select>
                        </TableCell> */}
                        <TableCell className="flex items-center gap-1">
                          <button
                            onClick={() => openModalEdit(item.id_spt)}
                            className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md transition duration-100 hover:bg-blue-600"
                          >
                            Ubah
                          </button>
                          <button
                            className="bg-red-400 text-white px-3 py-1 text-sm rounded-md transition duration-100 hover:bg-red-500"
                            onClick={() => handleDelete(item.id_spt)}
                          >
                            Hapus
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}

                    <TableRow>
                      <TableCell
                        colSpan={9}
                        className="text-center font-semibold"
                      >
                        Total
                      </TableCell>
                      <TableCell className="text-center">
                        {hitungTotalPotongan()}
                      </TableCell>
                      <TableCell className="text-center">
                        {hitungTotalHarga()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </CardBody>
      </Card>

      {/* Modal Edit Item Penyewaan */}
      <ModalEdit
        isModalOpen={isModalEditOpen}
        closeModal={closeModalEdit}
        setSpt={setNota}
        idNota={params.id}
        setValuesChanged={setValuesChanged}
      />
    </>
  );
};

export default Edit;
