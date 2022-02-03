import React, { useContext, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import { Card, CardBody, Button, Input, Label } from "@windmill/react-ui";
import ButtonExcel from "../../components/Buttons/ButtonExcel";
import DataTable from "./DataTable";
import ModalExcel from "../../components/Modals/ModalExcel";
import { GlobalContext } from "../../context/Provider";
import {
  getNota,
  getNotaByFilter,
  getPreviewCetakNota,
} from "../../context/actions/Nota";
import { TableSkeletonLoading } from "../../components/SkeletonLoading";
import ButtonCetak from "../../components/Buttons/ButtonCetak";

const Nota = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { path } = match;
  const [filterText, setFilterText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    notaState,
    notaDispatch,
    cetakNotaState,
    cetakNotaDispatch,
    listCetakNotaDispatch,
  } = useContext(GlobalContext);
  const { loading, data: dataNota } = notaState;
  const {
    loading: loadingCetakNota,
    data: dataCetakNota,
    error: errorCetakNota,
  } = cetakNotaState;
  const [filterTgl, setFilterTgl] = useState({
    dari_tgl: "",
    sampai_tgl: "",
  });
  const [listCheckbox, setListCheckbox] = useState([]);
  const [listIdPelanggan, setListIdPelanggan] = useState([]);

  // Get data nota
  useEffect(() => {
    getNota(notaDispatch);
  }, [notaDispatch]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
    getNotaByFilter(notaDispatch, filterTgl);
  };

  // Handle tombol filter reset
  const handleFilterReset = () => {
    setFilterTgl({
      dari_tgl: "",
      sampai_tgl: "",
    });
    getNota(notaDispatch);
  };

  // Halaman tambah transaksi
  const goToTambah = () => {
    history.push(`${path}/transaksi`);
  };

  // Halaman cetak nota terpilih
  const goToCetakNotaTerpilih = () => {
    const values = {
      id_nota: listCheckbox,
      id_pelanggan: listIdPelanggan,
    };

    getPreviewCetakNota(
      cetakNotaDispatch,
      listCetakNotaDispatch,
      values,
      history
    );
  };

  // Fungsi untuk menghilangkan alert error
  const handleCloseAlert = () => {
    const alertError = document.getElementById("alertError");
    alertError.classList.add("opacity-0");
    setTimeout(() => {
      alertError.classList.add("hidden");
    }, [150]);
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

          <div className="flex flex-wrap justify-between flex-col md:flex-row mb-2 mt-4">
            <div className="flex flex-wrap flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-1">
              <Button onClick={goToTambah}>Buat Transaksi</Button>
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

          {listCheckbox.length > 0 && (
            <div className="mb-2 text-center">
              <ButtonCetak
                onClick={goToCetakNotaTerpilih}
                disabled={loadingCetakNota ? true : false}
              >
                {loadingCetakNota ? (
                  "Loading..."
                ) : (
                  <>Cetak Nota Checklist ({listCheckbox.length})</>
                )}
              </ButtonCetak>
            </div>
          )}

          {errorCetakNota && (
            <div
              id="alertError"
              className="text-sm transition duration-150 ease-in-out bg-red-600 text-white p-3 rounded-md mb-5 flex gap-3"
            >
              <p>
                Daftar nota yang dichecklist hanya boleh 1 nama pengguna yg
                sama, tidak boleh lebih dari 2 nama pengguna yg berbeda
              </p>
              <span
                onClick={handleCloseAlert}
                className="text-2xl cursor-pointer opacity-50 hover:opacity-100"
              >
                &times;
              </span>
            </div>
          )}

          {!dataNota && loading && <TableSkeletonLoading />}

          {/* Table */}
          {dataNota && (
            <DataTable
              response={dataNota}
              resultsPerPage={10}
              filterText={filterText}
              listCheckbox={listCheckbox}
              setListCheckbox={setListCheckbox}
              listIdPelanggan={listIdPelanggan}
              setListIdPelanggan={setListIdPelanggan}
            />
          )}

          {/* Modal Excel */}
          <ModalExcel
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            path={"nota"}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default Nota;
