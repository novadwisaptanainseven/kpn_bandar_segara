import React, { useState, useEffect } from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import { Card, CardBody } from "@windmill/react-ui";
import { useRouteMatch } from "react-router-dom";
import { getPenggunaById } from "../../../context/actions/Pengguna";

import getImage from "../../../context/actions/Files/getImage";
import { DetailSkeletonLoading } from "../../../components/SkeletonLoading";

const Detail = () => {
  const match = useRouteMatch();
  const { params } = match;
  const [pengguna, setPengguna] = useState("");

  // Get detail pengguna
  useEffect(() => {
    getPenggunaById(params.id, setPengguna);
  }, [params]);

  return (
    <>
      <PageTitle backButton={true}>Detail Pengguna</PageTitle>

      <Card>
        <CardBody className="text-gray-900 dark:text-gray-200">
          {!pengguna ? (
            <DetailSkeletonLoading jumlahInput={7} />
          ) : (
            <>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">ID Pengguna</div>
                <div className="col-span-2">{pengguna.id_user}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Nama Pengguna</div>
                <div className="col-span-2">{pengguna.nama}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Username</div>
                <div className="col-span-2">{pengguna.username}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Level</div>
                <div className="col-span-2">{pengguna.level}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Foto</div>
                <div className="col-span-2">
                  <img
                    src={getImage("foto_pengguna", pengguna.foto)}
                    alt="foto-pengguna"
                    className="w-64"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Nama Pembuat</div>
                <div className="col-span-2">{pengguna.nm_pembuat}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Dibuat pada tanggal</div>
                <div className="col-span-2">{pengguna.waktu_buat}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Nama Penggubah</div>
                <div className="col-span-2">{pengguna.nm_penggubah}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Diubah pada tanggal</div>
                <div className="col-span-2">{pengguna.waktu_ubah}</div>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default Detail;
