import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import { Card, CardBody, Button, Input } from "@windmill/react-ui";

import response from "../../../utils/demo/tableData";
import TablePelanggan from "./TablePelanggan";
import ButtonExcel from "../../../components/Buttons/ButtonExcel";
import { useRouteMatch, useHistory } from "react-router-dom";
import ModalExcel from "./ModalExcel";

const Pelanggan = () => {
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
          <TablePelanggan
            response={response}
            filterText={filterText}
            resultsPerPage={10}
          />
        </CardBody>
      </Card>

      {/* Modal Excel */}
      <ModalExcel isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default Pelanggan;
