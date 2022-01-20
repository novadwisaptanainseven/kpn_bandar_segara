import React, { useState, useEffect } from "react";
import PageTitle from "../../../../components/Typography/PageTitle";
import { Card, CardBody } from "@windmill/react-ui";
import { useRouteMatch } from "react-router-dom";
import { getMarineById } from "../../../../context/actions/Marine";
import { DetailSkeletonLoading } from "../../../../components/SkeletonLoading";
import Interweave from "interweave";

const Detail = () => {
  const match = useRouteMatch();
  const { params } = match;
  const [marine, setMarine] = useState("");

  // Get detail marine
  useEffect(() => {
    getMarineById(params.id, setMarine);
  }, [params]);

  return (
    <>
      <PageTitle backButton={true}>Detail Marine</PageTitle>

      <Card>
        <CardBody className="text-gray-900 dark:text-gray-200">
          {!marine ? (
            <DetailSkeletonLoading jumlahInput={6} />
          ) : (
            <>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">ID Marine</div>
                <div className="col-span-2">{marine.id_marine}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Nama Marine</div>
                <div className="col-span-2">{marine.nm_marine}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Keterangan</div>
                <div className="col-span-2">
                  <Interweave content={marine.keterangan} />
                </div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Pembuat</div>
                <div className="col-span-2">{marine.nm_pembuat}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Penggubah</div>
                <div className="col-span-2">{marine.nm_penggubah}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Dibuat pada tanggal</div>
                <div className="col-span-2">{marine.waktu_buat}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Diubah pada tanggal</div>
                <div className="col-span-2">{marine.waktu_ubah}</div>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default Detail;
