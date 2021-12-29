import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import { Card, CardBody, Button, Input, Label } from "@windmill/react-ui";
import ButtonExcel from "../../components/Buttons/ButtonExcel";
import DataTable from "./DataTable";
import response from "../../utils/demo/notaData";
import ModalExcel from "../../components/Modals/ModalExcel";

const Nota = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { path } = match;
  const [filterText, setFilterText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Menuju halaman tambah
  const goToTambah = () => {
    history.push(`${path}/buat`);
  };

  return (
    <>
      <PageTitle>Nota Transaksi</PageTitle>

      <Card className="mb-8 shadow-md">
        <CardBody>
          <Card
            colored
            className="text-gray-600 bg-gray-200 dark:bg-gray-700 dark:text-gray-100"
          >
            <CardBody>
              <p className="mb-4 font-semibold">Filter Tanggal</p>
              <div className="grid gap-3 md:grid-cols-2">
                <Label>
                  <span>Dari tanggal</span>
                  <Input type="date" className="mt-1" />
                </Label>
                <Label>
                  <span>Sampai tanggal</span>
                  <Input type="date" className="mt-1" />
                </Label>
              </div>
              <div className="flex gap-2 flex-col-reverse md:flex-row md:justify-end mt-4">
                <Button layout="outline">Reset</Button>
                <Button>Cari</Button>
              </div>
            </CardBody>
          </Card>

          <div className="flex flex-wrap justify-between flex-col md:flex-row mb-5 mt-4">
            <div className="flex flex-wrap flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-1">
              <ButtonExcel onClick={openModal} />
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

          {/* Table */}
          <DataTable
            response={response}
            resultsPerPage={10}
            filterText={filterText}
          />

          {/* Modal Excel */}
          <ModalExcel isModalOpen={isModalOpen} closeModal={closeModal} />
        </CardBody>
      </Card>
    </>
  );
};

export default Nota;
