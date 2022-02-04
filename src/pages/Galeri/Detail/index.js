import React, { useState, useEffect } from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import { Card, CardBody } from "@windmill/react-ui";
import { useRouteMatch } from "react-router-dom";
import { getGaleriById } from "../../../context/actions/Galeri";
import { DetailSkeletonLoading } from "../../../components/SkeletonLoading";
import getImage from "../../../context/actions/Files/getImage";

const Detail = () => {
  const match = useRouteMatch();
  const { params } = match;
  const [galeri, setGaleri] = useState("");

  // Get detail galeri
  useEffect(() => {
    getGaleriById(params.id, setGaleri);
  }, [params]);

  return (
    <>
      <PageTitle backButton={true}>Detail Galeri</PageTitle>

      <Card>
        <CardBody className="text-gray-900 dark:text-gray-200">
          {!galeri ? (
            <DetailSkeletonLoading jumlahInput={6} />
          ) : (
            <>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">ID Galeri</div>
                <div className="col-span-2">{galeri.id_galeri}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Foto</div>
                <div className="col-span-2">
                  <img
                    src={getImage("foto_galeri", galeri.foto)}
                    alt={galeri.foto}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Pembuat</div>
                <div className="col-span-2">{galeri.nm_pembuat}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Penggubah</div>
                <div className="col-span-2">{galeri.nm_penggubah}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Dibuat pada tanggal</div>
                <div className="col-span-2">{galeri.waktu_buat}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Diubah pada tanggal</div>
                <div className="col-span-2">{galeri.waktu_ubah}</div>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default Detail;
