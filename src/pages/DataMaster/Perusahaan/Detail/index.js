import React, { useState, useEffect } from "react";
import PageTitle from "../../../../components/Typography/PageTitle";
import { Card, CardBody } from "@windmill/react-ui";
import { useRouteMatch } from "react-router-dom";
import { getPerusahaanById } from "../../../../context/actions/Perusahaan";
import { DetailSkeletonLoading } from "../../../../components/SkeletonLoading";
import Interweave from "interweave";

const Detail = () => {
  const match = useRouteMatch();
  const { params } = match;
  const [perusahaan, setPerusahaan] = useState("");

  // Get detail perusahaan
  useEffect(() => {
    getPerusahaanById(params.id, setPerusahaan);
  }, [params]);

  return (
    <>
      <PageTitle backButton={true}>Detail Perusahaan</PageTitle>

      <Card>
        <CardBody className="text-gray-900 dark:text-gray-200">
          {!perusahaan ? (
            <DetailSkeletonLoading jumlahInput={7} />
          ) : (
            <>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">ID Perusahaan</div>
                <div className="col-span-2">{perusahaan.id_perusahaan}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Nama Perusahaan</div>
                <div className="col-span-2">{perusahaan.nm_perusahaan}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Keterangan Perusahaan</div>
                <div className="col-span-2">
                  <Interweave content={perusahaan.keterangan} />
                </div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Pembuat</div>
                <div className="col-span-2">{perusahaan.nm_pembuat}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Penggubah</div>
                <div className="col-span-2">{perusahaan.nm_penggubah}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Dibuat pada tanggal</div>
                <div className="col-span-2">{perusahaan.waktu_buat}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Diubah pada tanggal</div>
                <div className="col-span-2">{perusahaan.waktu_ubah}</div>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default Detail;
