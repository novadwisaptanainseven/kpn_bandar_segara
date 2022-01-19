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
import { selectPelanggan } from "../../../context/actions/Pelanggan";
import SelectData from "react-select";
import ModalTambahItem from "./ModalTambahItem";

const BuatNota = () => {
  const [pelanggan, setPelanggan] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    selectPelanggan(setPelanggan);
  }, []);

  const optionsPelanggan = pelanggan.map((item) => ({
    value: item.id_pelanggan,
    label: `${item.nm_pelanggan} (${item.nm_perusahaan})`,
  }));

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
                placeholder="-- Pilih Pelanggan --"
                isClearable
              />
            </Label>
          </form>

          <div className="list-item-sewa">
            <h1 className="text-lg font-semibold mb-2">
              List Item Penyewaan Kapal
            </h1>

            <button
              className="bg-teal-400 text-white px-3 py-1 text-sm rounded-md mb-2"
              onClick={openModal}
            >
              Tambah Item
            </button>
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
                    <TableCell>Diskon</TableCell>
                    <TableCell>Potongan</TableCell>
                    <TableCell>Harga</TableCell>
                    <TableCell>Aksi</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Palaran</TableCell>
                    <TableCell>Egi</TableCell>
                    <TableCell>Ranto</TableCell>
                    <TableCell>21-10-2022</TableCell>
                    <TableCell>10.00</TableCell>
                    <TableCell>
                      <Input
                        id="diskon1"
                        type="number"
                        name="diskon1"
                        placeholder="%"
                        style={{ width: 80 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        id="potongan1"
                        type="number"
                        name="potongan1"
                        style={{ width: 150 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        id="harga1"
                        type="number"
                        name="harga1"
                        value={1000000}
                        style={{ width: 150 }}
                      />
                    </TableCell>
                    <TableCell>
                      <button className="bg-red-400 text-white px-3 py-1 text-sm rounded-md">
                        Hapus
                      </button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>Anggana</TableCell>
                    <TableCell>Egi</TableCell>
                    <TableCell>Ranto</TableCell>
                    <TableCell>21-10-2022</TableCell>
                    <TableCell>14.00</TableCell>
                    <TableCell>
                      <Input
                        id="diskon2"
                        type="number"
                        name="diskon2"
                        placeholder="%"
                      />
                    </TableCell>
                    <TableCell>
                      <Input id="potongan2" type="number" name="potongan2" />
                    </TableCell>
                    <TableCell>
                      <Input
                        id="harga2"
                        type="number"
                        name="harga2"
                        value={1000000}
                      />
                    </TableCell>
                    <TableCell>
                      <button className="bg-red-400 text-white px-3 py-1 text-sm rounded-md">
                        Hapus
                      </button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className="font-semibold text-lg text-center"
                      colSpan={7}
                    >
                      Total
                    </TableCell>
                    <TableCell>
                      <Input
                        id="totPotongan"
                        type="number"
                        name="totPotongan"
                        value={1000000}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        id="totHarga"
                        type="number"
                        name="totHarga"
                        value={1000000}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="flex justify-between">
            <Label className="w-64">
              <span>Status Pembayaran</span>
              <Select className="mt-1" id="statusBayar" name="statusBayar">
                <option value="1">Belum Bayar</option>
                <option value="2">Belum Lunas</option>
                <option value="3">Lunas</option>
              </Select>
            </Label>
            <Button className="h-10">Simpan Transaksi</Button>
          </div>
        </CardBody>
      </Card>

      {/* Modal Tambah Item Penyewaan */}
      <ModalTambahItem isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default BuatNota;
