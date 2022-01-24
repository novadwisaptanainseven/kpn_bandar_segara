import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@windmill/react-ui";
import PageTitle from "../../../components/Typography/PageTitle";

import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  TableHeader,
} from "@windmill/react-ui";
import { useRouteMatch } from "react-router-dom";
import { getNotaById } from "../../../context/actions/Nota";
import { DetailSkeletonLoading } from "../../../components/SkeletonLoading";
import { format } from "date-fns";
import Interweave from "interweave";

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
            <>
              <TableContainer className="text-sm">
                <Table>
                  <TableBody>
                    <TableRow className="bg-gray-200 dark:bg-gray-700">
                      <TableCell className="font-semibold">No Nota</TableCell>
                      <TableCell>{nota.no_nota}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100 dark:bg-gray-800">
                      <TableCell className="font-semibold">
                        Tanggal Nota
                      </TableCell>
                      <TableCell>
                        {format(new Date(nota.waktu_buat), "dd-MM-y")}
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-200 dark:bg-gray-700">
                      <TableCell className="font-semibold">
                        Nama Pelanggan
                      </TableCell>
                      <TableCell>{nota.nm_pelanggan}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100 dark:bg-gray-800">
                      <TableCell className="font-semibold">
                        Status Pembayaran
                      </TableCell>
                      <TableCell className="space-x-2">
                        {nota.id_status_nota === 3 && (
                          <span className="text-sm bg-red-500 px-5 py-2 font-semibold rounded-sm">
                            {nota.nm_status_nota}
                          </span>
                        )}
                        {nota.id_status_nota === 2 && (
                          <span className="text-sm bg-yellow-300 px-5 py-2 font-semibold rounded-sm">
                            {nota.nm_status_nota}
                          </span>
                        )}
                        {nota.id_status_nota === 1 && (
                          <span className="text-sm bg-lime-500 px-5 py-2 font-semibold rounded-sm">
                            {nota.nm_status_nota}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-200 dark:bg-gray-700">
                      <TableCell className="font-semibold">
                        Dibuat Oleh
                      </TableCell>
                      <TableCell>{nota.nm_pembuat}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100 dark:bg-gray-800">
                      <TableCell className="font-semibold">
                        Waktu Buat
                      </TableCell>
                      <TableCell>{nota.waktu_buat}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-200 dark:bg-gray-700">
                      <TableCell className="font-semibold">
                        Diubah Oleh
                      </TableCell>
                      <TableCell>{nota.nm_penggubah}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100 dark:bg-gray-800">
                      <TableCell className="font-semibold">
                        Waktu Ubah
                      </TableCell>
                      <TableCell>{nota.waktu_ubah}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <h1 className="text-lg font-semibold mb-2 mt-4">
                List Item Penyewaan Kapal
              </h1>
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
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Palaran</TableCell>
                      <TableCell>Anto</TableCell>
                      <TableCell>Marine X123A</TableCell>
                      <TableCell>20-01-2022</TableCell>
                      <TableCell>10:10</TableCell>
                      <TableCell>
                        <Interweave content={"Survey TB"} />
                      </TableCell>
                      <TableCell>10 %</TableCell>

                      <TableCell>
                        <TableCell>
                          {/* {hitungPotonganHarga(item.diskon, item.harga_tujuan)} */}
                          Potongan Harga
                        </TableCell>
                      </TableCell>
                      <TableCell>
                        <TableCell>
                          {(1000).toLocaleString("id", {
                            style: "currency",
                            currency: "IDR",
                          })}
                        </TableCell>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm bg-lime-400 px-5 py-2 font-semibold rounded-sm">
                          Lunas
                        </span>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center font-semibold"
                      >
                        Total
                      </TableCell>
                      <TableCell className="text-center">
                        Total Potongan
                      </TableCell>
                      <TableCell className="text-center">Total Harga</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default Detail;
