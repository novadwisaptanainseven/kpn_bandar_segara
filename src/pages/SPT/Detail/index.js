import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/Typography/PageTitle";

import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Card,
  CardBody,
} from "@windmill/react-ui";
import { useRouteMatch } from "react-router-dom";
import { getSptById } from "../../../context/actions/SPT";
import { DetailSkeletonLoading } from "../../../components/SkeletonLoading";
import { format } from "date-fns";

const Detail = () => {
  const match = useRouteMatch();
  const { params } = match;
  const [spt, setSpt] = useState("");

  // Get detail SPT
  useEffect(() => {
    getSptById(params.id, setSpt);
  }, [params]);

  return (
    <>
      <PageTitle backButton={true}>Detail SPT</PageTitle>
      <Card className="mb-32 text-sm">
        <CardBody className="text-gray-900 dark:text-gray-200">
          {!spt ? (
            <DetailSkeletonLoading jumlahInput={7} />
          ) : (
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow className="bg-gray-100 dark:bg-gray-800">
                    <TableCell className="font-semibold">No. SPT</TableCell>
                    <TableCell>{spt.id_spt}</TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-200 dark:bg-gray-700">
                    <TableCell className="font-semibold">Tanggal SPT</TableCell>
                    <TableCell>{spt.tgl_spt}</TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-100 dark:bg-gray-800">
                    <TableCell className="font-semibold">Pelanggan</TableCell>
                    <TableCell>{spt.nm_pelanggan}</TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-200 dark:bg-gray-700">
                    <TableCell className="font-semibold">Perusahaan</TableCell>
                    <TableCell>{spt.nm_perusahaan}</TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-100 dark:bg-gray-800">
                    <TableCell className="font-semibold">Marine</TableCell>
                    <TableCell>{spt.nm_marine}</TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-200 dark:bg-gray-700">
                    <TableCell className="font-semibold">Driver</TableCell>
                    <TableCell>{spt.nm_driver}</TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-100 dark:bg-gray-800">
                    <TableCell className="font-semibold">Tujuan</TableCell>
                    <TableCell>{spt.nm_tujuan}</TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-200 dark:bg-gray-700">
                    <TableCell className="font-semibold">Keterangan</TableCell>
                    <TableCell>{spt.keterangan}</TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-100 dark:bg-gray-800">
                    <TableCell className="font-semibold">
                      Tanggal Keberangkatan
                    </TableCell>
                    <TableCell>
                      {format(new Date(spt.tgl_keberangkatan), "dd-MM-y")}
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-200 dark:bg-gray-700">
                    <TableCell className="font-semibold">
                      Jam Keberangkatan
                    </TableCell>
                    <TableCell>{spt.waktu_keberangkatan}</TableCell>
                  </TableRow>
                  {localStorage.level === "1" && (
                    <>
                      <TableRow className="bg-gray-100 dark:bg-gray-800">
                        <TableCell className="font-semibold">Pembuat</TableCell>
                        <TableCell>{spt.nm_pembuat}</TableCell>
                      </TableRow>
                      <TableRow className="bg-gray-200 dark:bg-gray-700">
                        <TableCell className="font-semibold">
                          Penggubah
                        </TableCell>
                        <TableCell>{spt.nm_penggubah}</TableCell>
                      </TableRow>
                      <TableRow className="bg-gray-200 dark:bg-gray-800">
                        <TableCell className="font-semibold">
                          Dibuat pada tanggal
                        </TableCell>
                        <TableCell>{spt.waktu_buat}</TableCell>
                      </TableRow>
                      <TableRow className="bg-gray-100 dark:bg-gray-700">
                        <TableCell className="font-semibold">
                          Diubah pada tanggal
                        </TableCell>
                        <TableCell>{spt.waktu_ubah}</TableCell>
                      </TableRow>
                    </>
                  )}
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
