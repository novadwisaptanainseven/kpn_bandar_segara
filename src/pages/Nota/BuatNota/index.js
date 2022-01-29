import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import { Card, CardBody, Button, Input, Label } from "@windmill/react-ui";

import {
  Table,
  TableHeader,
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
import { GlobalContext } from "../../../context/Provider";
import { insertNota } from "../../../context/actions/Nota";
import { selectStatusSPT } from "../../../context/actions/SPT";
import { selectPelanggan } from "../../../context/actions/Pelanggan";
import SelectData from "react-select";
import ModalTambahItem from "./ModalTambahItem";
import {
  deleteSptTemp,
  getSptTemp,
  updateStatusSptTemp,
} from "../../../context/actions/SPT_Temp";
import { LoadingIcon } from "../../../assets";

import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Interweave from "interweave";
import ModalEdit from "./ModalEdit";
import { selectStatusNota } from "../../../context/actions/StatusNota";

const Swal = withReactContent(swal2);

const BuatNota = () => {
  const history = useHistory();
  const [pelanggan, setPelanggan] = useState([]);
  const [idPelanggan, setIdPelanggan] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState({
    id: "",
    modal: false,
  });
  const { notaDispatch } = useContext(GlobalContext);
  const [statusNota, setStatusNota] = useState([]);
  const [sptTemp, setSptTemp] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusBayar, setStatusBayar] = useState("2");
  const [idSptTempModal, setIdSptTempModal] = useState("");
  const [jumlahBayar, setJumlahBayar] = useState(0);
  const jumlahMaksimalItem = 9;

  useEffect(() => {
    // console.log(statusBayar);
  }, [statusBayar]);

  useEffect(() => {
    // Get data status nota
    selectStatusNota(setStatusNota);
    // Get data SPT Temporary by ID Pelanggan
    if (idPelanggan) getSptTemp(idPelanggan, setLoading, setSptTemp);
  }, [idPelanggan]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  useEffect(() => {
    selectPelanggan(setPelanggan);
  }, []);

  const optionsPelanggan = pelanggan.map((item) => ({
    value: item.id_pelanggan,
    label: `${item.nm_pelanggan} (${item.nm_perusahaan})`,
  }));

  const hitungPotonganHarga = (diskon, hargaTujuan) => {
    return ((diskon / 100) * hargaTujuan).toLocaleString("id", {
      style: "currency",
      currency: "IDR",
    });
  };

  const hitungTotalHarga = () => {
    const totHarga = sptTemp.reduce(add, 0);
    function add(accumulator, a) {
      return accumulator + a.harga;
    }

    return totHarga.toLocaleString("id", {
      style: "currency",
      currency: "IDR",
    });
  };

  const hitungTotalPotongan = () => {
    const totPotongan = sptTemp.reduce(add, 0);

    function add(accumulator, a) {
      const potonganHarga = (a.diskon / 100) * a.harga_tujuan;
      return accumulator + potonganHarga;
    }

    return totPotongan.toLocaleString("id", {
      style: "currency",
      currency: "IDR",
    });
  };

  // Menangani tombol hapus
  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Anda yakin ingin menghapus list item penyewaan ini ?",
      text: "Jika yakin, klik YA",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "YA",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteSptTemp(id, idPelanggan, setSptTemp, setLoading, Swal);
      }
    });
  };

  const handleChangeStatusBayar = (idSptTemp, status) => {
    const values = {
      id_status_spt: status,
    };
    updateStatusSptTemp(idSptTemp, idPelanggan, values, setLoading, setSptTemp);
  };

  const handleSimpanTransaksi = () => {
    const values = {
      id_status_nota: statusBayar,
      bayar: jumlahBayar,
    };
    insertNota(idPelanggan, values, setLoading, history, notaDispatch);
  };

  return (
    <>
      <PageTitle backButton>Pembuatan Nota Transaksi</PageTitle>

      <Card className="overflow-visible mb-32 pb-20">
        <CardBody>
          <form className="grid md:grid-cols-2 mb-3">
            <Label className="space-y-1">
              <span>Pelanggan</span>
              <SelectData
                name="id_pelanggan"
                inputId="id_pelanggan"
                options={optionsPelanggan}
                onChange={(opt) => setIdPelanggan(opt ? opt.value : "")}
                placeholder="-- Pilih Pelanggan --"
                // isClearable
              />
            </Label>
          </form>

          <div className="list-item-sewa">
            <h1 className="text-lg font-semibold mb-2 dark:text-gray-100">
              List Item Penyewaan Kapal
            </h1>

            {sptTemp.length > jumlahMaksimalItem && (
              <div className="text-sm bg-red-600 text-white p-3 rounded-md mb-2">
                Item penyewaan barang sudah mencapai jumlah maksimal. Silahkan
                simpan transaksi terlebih dahulu
              </div>
            )}

            <div className="flex justify-between">
              <button
                className={`bg-teal-400 text-white px-3 py-2 text-sm rounded-md mb-2 transition duration-100 hover:bg-teal-500  ${
                  !idPelanggan || sptTemp.length > jumlahMaksimalItem
                    ? "opacity-50 cursor-not-allowed"
                    : " "
                }`}
                onClick={openModal}
                disabled={
                  !idPelanggan || sptTemp.length > jumlahMaksimalItem
                    ? true
                    : false
                }
              >
                Tambah Item
              </button>

              {loading && (
                <img src={LoadingIcon} alt="loading-icon" className="w-10" />
              )}
            </div>
            <TableContainer className="text-sm mb-3">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>No.</TableCell>
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
                  {sptTemp.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center">
                        Item Penyewaan Belum Ada
                      </TableCell>
                    </TableRow>
                  )}
                  {sptTemp.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
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
                          {hitungPotonganHarga(item.diskon, item.harga_tujuan)}
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
                          defaultValue={item.id_status_spt}
                          onChange={(e) =>
                            handleChangeStatusBayar(
                              item.id_spt_temp,
                              e.target.value
                            )
                          }
                        >
                          {statusNota.map((item) => (
                            <option
                              key={item.id_status_spt}
                              value={item.id_status_spt}
                            >
                              {item.nm_status_spt}
                            </option>
                          ))}
                        </Select>
                      </TableCell> */}

                      <TableCell className="space-x-2">
                        <button
                          onClick={() => openModalEdit(item.id_spt_temp)}
                          className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md transition duration-100 hover:bg-blue-600"
                        >
                          Ubah
                        </button>
                        <button
                          onClick={() => handleDelete(item.id_spt_temp)}
                          className="bg-red-400 text-white px-3 py-1 text-sm rounded-md transition duration-100 hover:bg-red-500"
                        >
                          Hapus
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {sptTemp.length > 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={8}
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
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Label className="w-64">
                <span>Jumlah yg Dibayar</span>
                <Input
                  type="number"
                  id="jumlahBayar"
                  name="jumlahBayar"
                  onChange={(e) => setJumlahBayar(e.target.value)}
                  value={jumlahBayar}
                  className="mt-1"
                  disabled={!idPelanggan || sptTemp.length === 0 ? true : false}
                />
                <HelperText>
                  {parseFloat(jumlahBayar).toLocaleString("id", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </HelperText>
              </Label>
              <Label className="w-64">
                <span>Status Pembayaran</span>
                <Select
                  className="mt-1"
                  id="statusBayar"
                  name="statusBayar"
                  onChange={(e) => setStatusBayar(e.target.value)}
                  disabled={!idPelanggan || sptTemp.length === 0 ? true : false}
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
              </Label>
            </div>
            <Button
              className="h-10"
              disabled={
                !idPelanggan || !jumlahBayar || sptTemp.length === 0 || loading
                  ? true
                  : false
              }
              onClick={handleSimpanTransaksi}
            >
              {loading ? "Loading..." : "Simpan Transaksi"}
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Modal Tambah Item Penyewaan */}
      <ModalTambahItem
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        setSptTemp={setSptTemp}
        idPelanggan={idPelanggan}
      />

      {/* Modal Edit Item Penyewaan */}
      <ModalEdit
        isModalOpen={isModalEditOpen}
        closeModal={closeModalEdit}
        setSptTemp={setSptTemp}
      />
    </>
  );
};

export default BuatNota;
