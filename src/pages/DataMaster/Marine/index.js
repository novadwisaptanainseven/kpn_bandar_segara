import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import { Card, CardBody, Button, Input } from "@windmill/react-ui";

import response from "../../../utils/demo/tableData";
import TableMarine from "./TableMarine";
import ButtonExcel from "../../../components/Buttons/ButtonExcel";
import { useHistory, useRouteMatch } from "react-router-dom";
import ModalExcel from "../../../components/Modals/ModalExcel";
import { GlobalContext } from "../../../context/Provider";
import { getMarine } from "../../../context/actions/Marine";
import { exportExcel } from "../../../context/actions/Export/exportExcel";
import { TableSkeletonLoading } from "../../../components/SkeletonLoading";

const Marine = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { path } = match;
  const [filterText, setFilterText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { marineState, marineDispatch } = useContext(GlobalContext);
  const { loading, data: dataMarine } = marineState;

  // Get data marine
  useEffect(() => {
    getMarine(marineDispatch);
  }, [marineDispatch]);

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
      <PageTitle>Marine</PageTitle>

      <Card className="mb-8 shadow-md">
        <CardBody>
          <div className="flex flex-wrap justify-between flex-col md:flex-row mb-5">
            <div className="flex flex-wrap flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-1">
              <Button onClick={goToTambah}>Tambah</Button>
              <ButtonExcel onClick={() => exportExcel("marine")} />
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

          {!dataMarine && loading && <TableSkeletonLoading />}

          {/* Table */}
          {dataMarine && (
            <TableMarine
              response={dataMarine}
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

export default Marine;
