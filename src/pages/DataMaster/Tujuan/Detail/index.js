import React, { useState, useEffect } from "react";
import PageTitle from "../../../../components/Typography/PageTitle";
import { Card, CardBody } from "@windmill/react-ui";
import { useRouteMatch } from "react-router-dom";
import { getTujuanById } from "../../../../context/actions/Tujuan";
import { DetailSkeletonLoading } from "../../../../components/SkeletonLoading";

const Detail = () => {
  const match = useRouteMatch();
  const { params } = match;
  const [tujuan, setTujuan] = useState("");

  // Get detail tujuan
  useEffect(() => {
    getTujuanById(params.id, setTujuan);
  }, [params]);

  return (
    <>
      <PageTitle backButton={true}>Detail Tujuan</PageTitle>

      <Card>
        <CardBody className="text-gray-900 dark:text-gray-200">
          {!tujuan ? (
            <DetailSkeletonLoading jumlahInput={7} />
          ) : (
            <>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">ID Tujuan</div>
                <div className="col-span-2">{tujuan.id_tujuan}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Nama Tujuan</div>
                <div className="col-span-2">{tujuan.nm_tujuan}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Harga Tujuan</div>
                <div className="col-span-2">
                  {tujuan.harga.toLocaleString("id", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Pembuat</div>
                <div className="col-span-2">{tujuan.nm_pembuat}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Penggubah</div>
                <div className="col-span-2">{tujuan.nm_penggubah}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Dibuat pada tanggal</div>
                <div className="col-span-2">{tujuan.waktu_buat}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Diubah pada tanggal</div>
                <div className="col-span-2">{tujuan.waktu_ubah}</div>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default Detail;
