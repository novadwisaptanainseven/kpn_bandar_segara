import React, { useState, useEffect, useContext } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import { Card, CardBody, Button, Input, Label } from "@windmill/react-ui";
import ButtonExcel from "../../components/Buttons/ButtonExcel";
import DataTable from "./DataTable";
import { useHistory, useRouteMatch } from "react-router-dom";
import ModalExcel from "../../components/Modals/ModalExcel";
import { GlobalContext } from "../../context/Provider";
import { getSpt, getSptByFilter } from "../../context/actions/SPT";
import { TableSkeletonLoading } from "../../components/SkeletonLoading";

const SPT = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { path } = match;
  const [filterText, setFilterText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { sptState, sptDispatch } = useContext(GlobalContext);
  const { loading, data: dataSpt } = sptState;
  const [filterTgl, setFilterTgl] = useState({
    dari_tgl: "",
    sampai_tgl: "",
  });

  // Get data spt
  useEffect(() => {
    getSpt(sptDispatch);
  }, [sptDispatch]);

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

  // Handle filter tanggal
  const handleChangleTgl = (e) => {
    setFilterTgl({
      ...filterTgl,
      [e.target.name]: e.target.value,
    });
  };

  // Handle tombol filter pencarian
  const handleFilterCari = () => {
    getSptByFilter(sptDispatch, filterTgl);
  };

  // Handle tombol filter reset
  const handleFilterReset = () => {
    setFilterTgl({
      dari_tgl: "",
      sampai_tgl: "",
    });
    getSpt(sptDispatch);
  };

  return (
    <>
      <PageTitle>SPT (Surat Perintah Tugas)</PageTitle>

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
                  <Input
                    type="date"
                    name="dari_tgl"
                    className="mt-1"
                    onChange={(e) => handleChangleTgl(e)}
                  />
                </Label>
                <Label>
                  <span>Sampai tanggal</span>
                  <Input
                    type="date"
                    name="sampai_tgl"
                    className="mt-1"
                    onChange={(e) => handleChangleTgl(e)}
                  />
                </Label>
              </div>
              <div className="flex gap-2 flex-col-reverse md:flex-row md:justify-end mt-4">
                <Button
                  layout="outline"
                  onClick={handleFilterReset}
                  disabled={
                    !filterTgl.dari_tgl || !filterTgl.sampai_tgl ? true : false
                  }
                >
                  Reset
                </Button>
                <Button
                  disabled={
                    !filterTgl.dari_tgl || !filterTgl.sampai_tgl || loading
                      ? true
                      : false
                  }
                  onClick={handleFilterCari}
                >
                  {loading ? "Loading..." : "Cari"}
                </Button>
              </div>
            </CardBody>
          </Card>

          <div className="flex flex-wrap justify-between flex-col md:flex-row mb-5 mt-4">
            <div className="flex flex-wrap flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-1">
              {/* <Button onClick={goToTambah}>Buat SPT</Button> */}
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

          {!dataSpt && loading && <TableSkeletonLoading />}

          {/* Table */}
          {dataSpt && (
            <DataTable
              response={dataSpt}
              resultsPerPage={10}
              filterText={filterText}
            />
          )}

          {/* Modal Excel */}
          <ModalExcel
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            path={"spt"}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default SPT;
