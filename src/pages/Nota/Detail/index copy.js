import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@windmill/react-ui";
import PageTitle from "../../../components/Typography/PageTitle";

import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
} from "@windmill/react-ui";
import { useRouteMatch } from "react-router-dom";
import { getNotaById } from "../../../context/actions/Nota";
import { DetailSkeletonLoading } from "../../../components/SkeletonLoading";
import { format } from "date-fns";

const Detail = () => {
  const match = useRouteMatch();
  const { params } = match;
  const [nota, setNota] = useState("");

  // Get detail Nota
  useEffect(() => {
    getNotaById(params.id, setNota);
  }, [params]);

  const hitungSisa = (totHarga, totBayar) => {
    return (totHarga - totBayar).toLocaleString("id", {
      style: "currency",
      currency: "IDR",
    });
  };

  return (
    <>
      <PageTitle backButton={true}>Detail Nota Transaksi</PageTitle>
      <Card className="mb-32">
        <CardBody>
          {!nota ? (
            <DetailSkeletonLoading jumlahInput={15} />
          ) : (
            <TableContainer className="text-sm">
              <Table>
                <TableBody>
                  <TableRow className="bg-gray-200 dark:bg-gray-700">
                    <TableCell className="font-semibold">Kode Nota</TableCell>
                    <TableCell>{nota.id_nota}</TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-100 dark:bg-gray-800">
                    <TableCell className="font-semibold">Kode SPT</TableCell>
                    <TableCell>{nota.id_spt}</TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-200 dark:bg-gray-700">
                    <TableCell className="font-semibold">Pelanggan</TableCell>
                    <TableCell>{nota.nm_pelanggan}</TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-100 dark:bg-gray-800">
                    <TableCell className="font-semibold">Perusahaan</TableCell>
                    <TableCell>{nota.nm_perusahaan}</TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-200 dark:bg-gray-700">
                    <TableCell className="font-semibold">Marine</TableCell>
                    <TableCell>{nota.nm_marine}</TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-100 dark:bg-gray-800">
                    <TableCell className="font-semibold">Driver</TableCell>
                    <TableCell>{nota.nm_driver}</TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-200 dark:bg-gray-700">
                    <TableCell className="font-semibold">Nama Kapal</TableCell>
                    <TableCell>{nota.nm_kapal}</TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-100 dark:bg-gray-800">
                    <TableCell className="font-semibold">Tujuan</TableCell>
                    <TableCell>{nota.nm_tujuan}</TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-200 dark:bg-gray-700">
                    <TableCell className="font-semibold">Tanggal</TableCell>
                    <TableCell>
                      {format(new Date(nota.tgl_nota), "dd-MM-y")}
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-100 dark:bg-gray-800">
                    <TableCell className="font-semibold">Harga</TableCell>
                    <TableCell>
                      {nota.harga_tujuan.toLocaleString("id", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-200 dark:bg-gray-700">
                    <TableCell className="font-semibold">Diskon (%)</TableCell>
                    <TableCell>{nota.diskon}</TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-100 dark:bg-gray-800">
                    <TableCell className="font-semibold">Total Harga</TableCell>
                    <TableCell>
                      {nota.harga.toLocaleString("id", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-200 dark:bg-gray-700">
                    <TableCell className="font-semibold">
                      Jumlah Yg Dibayar
                    </TableCell>
                    <TableCell>
                      {nota.bayar.toLocaleString("id", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-100 dark:bg-gray-800">
                    <TableCell className="font-semibold">
                      Sisa Yg Belum Dibayar
                    </TableCell>
                    <TableCell>{hitungSisa(nota.harga, nota.bayar)}</TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-200 dark:bg-gray-700">
                    <TableCell className="font-semibold">
                      Status Pembayaran
                    </TableCell>
                    <TableCell className="space-x-2">
                      {nota.id_status_nota === 2 && (
                        <span className="text-sm bg-red-500 px-5 py-2 font-semibold rounded-sm">
                          Belum Bayar
                        </span>
                      )}
                      {nota.id_status_nota === 3 && (
                        <span className="text-sm bg-yellow-300 px-5 py-2 font-semibold rounded-sm">
                          Belum Lunas
                        </span>
                      )}
                      {nota.id_status_nota === 1 && (
                        <span className="text-sm bg-lime-500 px-5 py-2 font-semibold rounded-sm">
                          Lunas
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default Detail;
