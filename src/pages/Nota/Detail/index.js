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
                      <TableCell>{nota.data_nota.no_nota}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100 dark:bg-gray-800">
                      <TableCell className="font-semibold">
                        Tanggal Nota
                      </TableCell>
                      <TableCell>
                        {format(new Date(nota.data_nota.waktu_buat), "dd-MM-y")}
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-200 dark:bg-gray-700">
                      <TableCell className="font-semibold">
                        Nama Pelanggan
                      </TableCell>
                      <TableCell>{nota.data_nota.nm_pelanggan}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100 dark:bg-gray-800">
                      <TableCell className="font-semibold">
                        Total Harga
                      </TableCell>
                      <TableCell>
                        {nota.data_nota.total_harga.toLocaleString("id", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-200 dark:bg-gray-700">
                      <TableCell className="font-semibold">
                        Jumlah yg Dibayar
                      </TableCell>
                      <TableCell>
                        {nota.data_nota.bayar.toLocaleString("id", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100 dark:bg-gray-800">
                      <TableCell className="font-semibold">
                        Status Pembayaran
                      </TableCell>
                      <TableCell className="space-x-2">
                        {nota.data_nota.id_status_nota === 3 && (
                          <span className="text-sm bg-red-500 px-5 py-2 font-semibold rounded-sm dark:text-gray-900">
                            {nota.data_nota.nm_status_nota}
                          </span>
                        )}
                        {nota.data_nota.id_status_nota === 2 && (
                          <span className="text-sm bg-yellow-300 px-5 py-2 font-semibold rounded-sm dark:text-gray-900">
                            {nota.data_nota.nm_status_nota}
                          </span>
                        )}
                        {nota.data_nota.id_status_nota === 1 && (
                          <span className="text-sm bg-lime-500 px-5 py-2 font-semibold rounded-sm dark:text-gray-900">
                            {nota.data_nota.nm_status_nota}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-200 dark:bg-gray-700">
                      <TableCell className="font-semibold">
                        Dibuat Oleh
                      </TableCell>
                      <TableCell>{nota.data_nota.nm_pembuat}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100 dark:bg-gray-800">
                      <TableCell className="font-semibold">
                        Waktu Buat
                      </TableCell>
                      <TableCell>{nota.data_nota.waktu_buat}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-200 dark:bg-gray-700">
                      <TableCell className="font-semibold">
                        Diubah Oleh
                      </TableCell>
                      <TableCell>{nota.data_nota.nm_penggubah}</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100 dark:bg-gray-800">
                      <TableCell className="font-semibold">
                        Waktu Ubah
                      </TableCell>
                      <TableCell>{nota.data_nota.waktu_ubah}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <h1 className="text-lg font-semibold mb-2 mt-4 dark:text-gray-200">
                Rincian Item Penyewaan Kapal
              </h1>
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
                          {item.id_status_spt === 3 && (
                            <span className="text-sm text-white bg-red-500 px-5 py-2 font-semibold rounded-sm">
                              {item.nm_status_spt}
                            </span>
                          )}
                          {item.id_status_spt === 2 && (
                            <span className="text-sm bg-yellow-300 px-5 py-2 font-semibold rounded-sm">
                              {item.nm_status_spt}
                            </span>
                          )}
                          {item.id_status_spt === 1 && (
                            <span className="text-sm bg-lime-400 px-5 py-2 font-semibold rounded-sm">
                              {item.nm_status_spt}
                            </span>
                          )}
                        </TableCell> */}
                      </TableRow>
                    ))}

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
