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
} from "@windmill/react-ui";

const BuatNota = () => {
  const [statusBayar, setStatusBayar] = useState("belum");
  const [statusDiskon, setStatusDiskon] = useState("0");

  useEffect(() => {
    console.log(statusDiskon);
  }, [statusDiskon]);

  return (
    <>
      <PageTitle backButton>Pembuatan Nota Transaksi</PageTitle>

      <Card className="overflow-visible mb-32">
        <CardBody>
          <TableContainer className="text-sm mb-4">
            <Table>
              <TableBody>
                <TableRow className="bg-gray-200 dark:bg-gray-700">
                  <TableCell className="font-semibold">Pelanggan</TableCell>
                  <TableCell>Nova Dwi Sapta</TableCell>
                </TableRow>
                <TableRow className="bg-gray-100 dark:bg-gray-800">
                  <TableCell className="font-semibold">Perusahaan</TableCell>
                  <TableCell>PT. Lintas Samudera</TableCell>
                </TableRow>
                <TableRow className="bg-gray-200 dark:bg-gray-700">
                  <TableCell className="font-semibold">Marine</TableCell>
                  <TableCell>Marine</TableCell>
                </TableRow>
                <TableRow className="bg-gray-100 dark:bg-gray-800">
                  <TableCell className="font-semibold">Driver</TableCell>
                  <TableCell>Lyntom Irfan Darmawan</TableCell>
                </TableRow>
                <TableRow className="bg-gray-200 dark:bg-gray-700">
                  <TableCell className="font-semibold">Nama Kapal</TableCell>
                  <TableCell>Speed Boat XX1</TableCell>
                </TableRow>
                <TableRow className="bg-gray-100 dark:bg-gray-800">
                  <TableCell className="font-semibold">Tujuan</TableCell>
                  <TableCell>Samarinda - Palu</TableCell>
                </TableRow>
                <TableRow className="bg-gray-200 dark:bg-gray-700">
                  <TableCell className="font-semibold">Harga</TableCell>
                  <TableCell>Rp. 1.200.000,00</TableCell>
                </TableRow>
                <TableRow className="bg-gray-100 dark:bg-gray-800">
                  <TableCell className="font-semibold">Tanggal</TableCell>
                  <TableCell>10/12/2021</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <div className="grid md:grid-cols-2">
            <div>
              <Label>
                <span>Ada Diskon ?</span>
                <Select
                  className="mt-1"
                  onChange={(e) => setStatusDiskon(e.target.value)}
                >
                  <option value="0">Tidak Ada</option>
                  <option value="1">Ada</option>
                </Select>
              </Label>
              {statusDiskon === "1" && (
                <Label className="mt-4">
                  <span>Diskon (%)</span>
                  <Input
                    type="number"
                    className="mt-1"
                    placeholder="Masukkan diskon / potongan harga"
                  />
                </Label>
              )}
              <Label className="mt-4">
                <span>Total Harga</span>
                <Input
                  type="number"
                  className="mt-1"
                  placeholder="Masukkan total harga"
                  readOnly={statusDiskon === "1" ? true : false}
                />
              </Label>
              <Label className="mt-4">
                <span>
                  Status Bayar{" "}
                  <div
                    className={`inline-block w-3 h-3 rounded-full ${
                      statusBayar === "belum" ? "bg-red-500" : "bg-lime-500"
                    }`}
                  ></div>
                </span>
                <Select
                  className="mt-1"
                  onChange={(e) => setStatusBayar(e.target.value)}
                >
                  <option value="belum">Belum Bayar</option>
                  <option value="lunas">Lunas</option>
                </Select>
              </Label>
              <div className="mt-5 flex flex-col-reverse md:flex-row justify-end gap-2">
                <Button layout="outline">Reset</Button>
                <Button>Buat Nota</Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default BuatNota;
