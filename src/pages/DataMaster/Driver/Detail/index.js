import React, { useState, useEffect } from "react";
import PageTitle from "../../../../components/Typography/PageTitle";
import { Card, CardBody } from "@windmill/react-ui";
import { useRouteMatch } from "react-router-dom";
import { getDriverById } from "../../../../context/actions/Driver";
import { DetailSkeletonLoading } from "../../../../components/SkeletonLoading";

const Detail = () => {
  const match = useRouteMatch();
  const { params } = match;
  const [driver, setDriver] = useState("");

  // Get detail driver
  useEffect(() => {
    getDriverById(params.id, setDriver);
  }, [params]);

  return (
    <>
      <PageTitle backButton={true}>Detail Driver</PageTitle>

      <Card>
        <CardBody className="text-gray-900 dark:text-gray-200">
          {!driver ? (
            <DetailSkeletonLoading jumlahInput={6} />
          ) : (
            <>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">ID Driver</div>
                <div className="col-span-2">{driver.id_driver}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Nama Driver</div>
                <div className="col-span-2">{driver.nm_driver}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Pembuat</div>
                <div className="col-span-2">{driver.nm_pembuat}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Penggubah</div>
                <div className="col-span-2">{driver.nm_penggubah}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Dibuat pada tanggal</div>
                <div className="col-span-2">{driver.waktu_buat}</div>
              </div>
              <div className="grid grid-cols-3 mb-2">
                <div className="font-semibold">Diubah pada tanggal</div>
                <div className="col-span-2">{driver.waktu_ubah}</div>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default Detail;
