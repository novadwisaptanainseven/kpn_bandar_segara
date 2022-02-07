import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import PageTitle from "../../../components/Typography/PageTitle";
import { getRiwayatNotaById } from "../../../context/actions/RiwayatNota";
import { Card, CardBody } from "@windmill/react-ui";
import { DetailSkeletonLoading } from "../../../components/SkeletonLoading";
import { format } from "date-fns";

const Detail = () => {
  const match = useRouteMatch();
  const { params } = match;
  const [riwayatNota, setRiwayatNota] = useState("");
  console.log(riwayatNota);

  // Get detail riwayat nota
  useEffect(() => {
    getRiwayatNotaById(params.id, setRiwayatNota);
  }, [params]);

  return (
    <>
      <PageTitle backButton={true}>Detail Riwayat Cetak Nota</PageTitle>
      <Card>
        <CardBody className="text-gray-900 dark:text-gray-200">
          {!riwayatNota ? (
            <DetailSkeletonLoading jumlahInput={6} />
          ) : (
            <>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">ID Riwayat Cetak Nota</div>
                <div className="col-span-2">{riwayatNota.id_cetak_nota}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">No. Nota</div>
                <div className="col-span-2">{riwayatNota.no_cetak_nota}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Pembuat</div>
                <div className="col-span-2">{riwayatNota.nm_pembuat}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Penggubah</div>
                <div className="col-span-2">{riwayatNota.nm_penggubah}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Dibuat pada Tanggal</div>
                <div className="col-span-2">
                  {format(new Date(riwayatNota.waktu_buat), "dd-MM-y")}
                </div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Diubah pada Tanggal</div>
                <div className="col-span-2">
                  {format(new Date(riwayatNota.waktu_ubah), "dd-MM-y")}
                </div>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default Detail;
