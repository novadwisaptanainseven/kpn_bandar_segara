import React, { useState, useEffect } from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import { Card, CardBody } from "@windmill/react-ui";
import { useRouteMatch } from "react-router-dom";

import { DetailSkeletonLoading } from "../../../components/SkeletonLoading";
import getImage from "../../../context/actions/Files/getImage";
import { getKontakById } from "../../../context/actions/Kontak";

const Detail = () => {
  const match = useRouteMatch();
  const { params } = match;
  const [kontak, setKontak] = useState("");

  useEffect(() => {
    getKontakById(params.id, setKontak);
  }, [params]);

  return (
    <>
      <PageTitle backButton={true}>Detail Kontak</PageTitle>

      <Card>
        <CardBody className="text-gray-900 dark:text-gray-200">
          {!kontak ? (
            <DetailSkeletonLoading jumlahInput={8} />
          ) : (
            <>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">ID Kontak</div>
                <div className="col-span-2">{kontak.id_kontak}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Nama Kontak</div>
                <div className="col-span-2">{kontak.nm_kontak}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Keterangan</div>
                <div className="col-span-2">{kontak.keterangan}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Link</div>
                <div className="col-span-2">{kontak.link}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Foto</div>
                <div className="col-span-2">
                  <img
                    src={getImage("foto_kontak", kontak.icon)}
                    alt={kontak.icon}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Pembuat</div>
                <div className="col-span-2">{kontak.nm_pembuat}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Penggubah</div>
                <div className="col-span-2">{kontak.nm_penggubah}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Dibuat pada tanggal</div>
                <div className="col-span-2">{kontak.waktu_buat}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Diubah pada tanggal</div>
                <div className="col-span-2">{kontak.waktu_ubah}</div>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default Detail;
