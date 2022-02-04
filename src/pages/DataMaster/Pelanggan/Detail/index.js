import React, { useState, useEffect } from "react";
import PageTitle from "../../../../components/Typography/PageTitle";
import { Card, CardBody } from "@windmill/react-ui";
import { useRouteMatch } from "react-router-dom";
import { getPelangganById } from "../../../../context/actions/Pelanggan";
import { DetailSkeletonLoading } from "../../../../components/SkeletonLoading";
import Interweave from "interweave";

const Detail = () => {
  const match = useRouteMatch();
  const { params } = match;
  const [pelanggan, setPelanggan] = useState("");

  // Get detail pelanggan
  useEffect(() => {
    getPelangganById(params.id, setPelanggan);
  }, [params]);

  return (
    <>
      <PageTitle backButton={true}>Detail Pengguna</PageTitle>

      <Card>
        <CardBody className="text-gray-900 dark:text-gray-200">
          {!pelanggan ? (
            <DetailSkeletonLoading jumlahInput={8} />
          ) : (
            <>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">ID Pengguna</div>
                <div className="col-span-2">{pelanggan.id_pelanggan}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Nama Pengguna</div>
                <div className="col-span-2">{pelanggan.nm_pelanggan}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">ID Perusahaan</div>
                <div className="col-span-2">{pelanggan.id_perusahaan}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Nama Perusahaan</div>
                <div className="col-span-2">{pelanggan.nm_perusahaan}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Keterangan</div>
                <div className="col-span-2">
                  <Interweave content={pelanggan.keterangan} />
                </div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Pembuat</div>
                <div className="col-span-2">{pelanggan.nm_pembuat}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Penggubah</div>
                <div className="col-span-2">{pelanggan.nm_penggubah}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Dibuat pada tanggal</div>
                <div className="col-span-2">{pelanggan.waktu_buat}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Diubah pada tanggal</div>
                <div className="col-span-2">{pelanggan.waktu_ubah}</div>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default Detail;
