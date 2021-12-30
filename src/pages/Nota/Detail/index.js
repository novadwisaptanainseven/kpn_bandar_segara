import React, { useEffect } from "react";
import { Card, CardBody } from "@windmill/react-ui";
import PageTitle from "../../../components/Typography/PageTitle";

import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
} from "@windmill/react-ui";

const Detail = () => {
  return (
    <>
      <PageTitle backButton={true}>Detail Nota Transaksi</PageTitle>
      <Card className="mb-32">
        <CardBody>
          <TableContainer className="text-sm">
            <Table>
              <TableBody>
                <TableRow className="bg-gray-200 dark:bg-gray-700">
                  <TableCell className="font-semibold">Kode Nota</TableCell>
                  <TableCell>NTR0001</TableCell>
                </TableRow>
                <TableRow className="bg-gray-100 dark:bg-gray-800">
                  <TableCell className="font-semibold">Kode SPT</TableCell>
                  <TableCell>SPT0001</TableCell>
                </TableRow>
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
                  <TableCell className="font-semibold">Tanggal</TableCell>
                  <TableCell>10/12/2021</TableCell>
                </TableRow>
                <TableRow className="bg-gray-100 dark:bg-gray-800">
                  <TableCell className="font-semibold">Harga</TableCell>
                  <TableCell>Rp. 1.200.000,00</TableCell>
                </TableRow>
                <TableRow className="bg-gray-200 dark:bg-gray-700">
                  <TableCell className="font-semibold">Diskon (%)</TableCell>
                  <TableCell>20</TableCell>
                </TableRow>
                <TableRow className="bg-gray-100 dark:bg-gray-800">
                  <TableCell className="font-semibold">Total Harga</TableCell>
                  <TableCell>Rp 1.100.000,00</TableCell>
                </TableRow>
                <TableRow className="bg-gray-200 dark:bg-gray-700">
                  <TableCell className="font-semibold">
                    Jumlah Yg Dibayar
                  </TableCell>
                  <TableCell>Rp 1.100.000,00</TableCell>
                </TableRow>
                <TableRow className="bg-gray-100 dark:bg-gray-800">
                  <TableCell className="font-semibold">
                    Sisa Yg Belum Dibayar
                  </TableCell>
                  <TableCell>0</TableCell>
                </TableRow>
                <TableRow className="bg-gray-200 dark:bg-gray-700">
                  <TableCell className="font-semibold">
                    Status Pembayaran
                  </TableCell>
                  <TableCell className="space-x-2">
                    <span className="text-sm bg-red-500 px-5 py-2 font-semibold rounded-sm">
                      Belum Bayar
                    </span>
                    <span className="text-sm bg-yellow-300 px-5 py-2 font-semibold rounded-sm">
                      Belum Lunas
                    </span>
                    <span className="text-sm bg-lime-500 px-5 py-2 font-semibold rounded-sm">
                      Lunas
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </>
  );
};

export default Detail;
