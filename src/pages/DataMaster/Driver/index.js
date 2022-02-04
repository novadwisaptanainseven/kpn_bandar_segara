import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import { Card, CardBody, Button, Input } from "@windmill/react-ui";

import TableDriver from "./TableDriver";
import { useHistory, useRouteMatch } from "react-router-dom";
import ModalExcel from "../../../components/Modals/ModalExcel";
import { GlobalContext } from "../../../context/Provider";
import { getDriver } from "../../../context/actions/Driver";
import { TableSkeletonLoading } from "../../../components/SkeletonLoading";

const Driver = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { path } = match;
  const [filterText, setFilterText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { driverState, driverDispatch } = useContext(GlobalContext);
  const { loading, data: dataDriver } = driverState;

  // Get data driver
  useEffect(() => {
    getDriver(driverDispatch);
  }, [driverDispatch]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Menuju halaman tambah
  const goToTambah = () => {
    history.push(`${path}/tambah`);
  };

  return (
    <>
      <PageTitle>Driver</PageTitle>

      <Card className="mb-8 shadow-md">
        <CardBody>
          <div className="flex flex-wrap justify-between flex-col md:flex-row mb-5">
            <div className="flex flex-wrap flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-1">
              <Button onClick={goToTambah}>Tambah</Button>
              {/* <ButtonExcel onClick={() => exportExcel("driver")} /> */}
            </div>

            <div className="mt-2 md:w-64 md:mt-0">
              <Input
                type="text"
                className="w-4"
                placeholder="Pencarian..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
          </div>

          {!dataDriver && loading && <TableSkeletonLoading />}

          {/* Table */}
          {dataDriver && (
            <TableDriver
              response={dataDriver}
              resultsPerPage={10}
              filterText={filterText}
            />
          )}
        </CardBody>
      </Card>

      {/* Modal Excel */}
      <ModalExcel isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default Driver;
