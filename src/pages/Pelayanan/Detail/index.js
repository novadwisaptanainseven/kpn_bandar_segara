import React, { useState, useEffect } from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import { Card, CardBody } from "@windmill/react-ui";
import { useRouteMatch } from "react-router-dom";

import { DetailSkeletonLoading } from "../../../components/SkeletonLoading";
import getImage from "../../../context/actions/Files/getImage";
import { getPelayananById } from "../../../context/actions/Pelayanan";

const Detail = () => {
  const match = useRouteMatch();
  const { params } = match;
  const [pelayanan, setPelayanan] = useState("");

  useEffect(() => {
    getPelayananById(params.id, setPelayanan);
  }, [params]);

  return (
    <>
      <PageTitle backButton={true}>Detail Pelayanan</PageTitle>

      <Card>
        <CardBody className="text-gray-900 dark:text-gray-200">
          {!pelayanan ? (
            <DetailSkeletonLoading jumlahInput={6} />
          ) : (
            <>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">ID Pelayanan</div>
                <div className="col-span-2">{pelayanan.id_pelayanan}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Nama Pelayanan</div>
                <div className="col-span-2">{pelayanan.nm_pelayanan}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Keterangan</div>
                <div className="col-span-2">{pelayanan.keterangan}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Foto</div>
                <div className="col-span-2">
                  <img
                    src={getImage("foto_pelayanan", pelayanan.icon)}
                    alt={pelayanan.icon}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Pembuat</div>
                <div className="col-span-2">{pelayanan.nm_pembuat}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Penggubah</div>
                <div className="col-span-2">{pelayanan.nm_penggubah}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Dibuat pada tanggal</div>
                <div className="col-span-2">{pelayanan.waktu_buat}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Diubah pada tanggal</div>
                <div className="col-span-2">{pelayanan.waktu_ubah}</div>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default Detail;
