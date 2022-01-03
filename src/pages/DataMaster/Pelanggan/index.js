import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import { Card, CardBody, Button, Input } from "@windmill/react-ui";

import TablePelanggan from "./TablePelanggan";
import ButtonExcel from "../../../components/Buttons/ButtonExcel";
import { useRouteMatch, useHistory } from "react-router-dom";
import ModalExcel from "./ModalExcel";
import { GlobalContext } from "../../../context/Provider";
import { getPelanggan } from "../../../context/actions/Pelanggan";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { TableSkeletonLoading } from "../../../components/SkeletonLoading";
import { exportExcel } from "../../../context/actions/Export/exportExcel";

const Pelanggan = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { path } = match;
  const [filterText, setFilterText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pelangganState, pelangganDispatch } = useContext(GlobalContext);
  const { loading, data: dataPelanggan } = pelangganState;

  // Get data pelanggan
  useEffect(() => {
    getPelanggan(pelangganDispatch);
  }, [pelangganDispatch]);

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
      <PageTitle>Pelanggan</PageTitle>

      <Card className="mb-8 shadow-md">
        <CardBody>
          <div className="flex flex-wrap justify-between flex-col md:flex-row mb-5">
            <div className="flex flex-wrap flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-1">
              <Button onClick={goToTambah}>Tambah</Button>
              <ButtonExcel onClick={() => exportExcel("pelanggan")} />
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

          {!dataPelanggan && loading && <TableSkeletonLoading />}

          {/* Table */}
          {dataPelanggan && (
            <TablePelanggan
              response={dataPelanggan}
              filterText={filterText}
              resultsPerPage={10}
            />
          )}
        </CardBody>
      </Card>

      {/* Modal Excel */}
      <ModalExcel isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default Pelanggan;
