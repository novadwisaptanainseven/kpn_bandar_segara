import React, { useContext, useEffect, useState } from "react";

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  Button,
  TableFooter,
  Pagination,
  TableContainer,
} from "@windmill/react-ui";

import { EditIcon, TrashIcon, MenuIcon } from "../../../../icons";
import { useHistory, useRouteMatch } from "react-router-dom";
import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import ArrowUp from "../../../../components/DataTableIcons/ArrowUp";
import ArrowDown from "../../../../components/DataTableIcons/ArrowDown";
import useSortableData from "../../../../helpers/useSortableData";
import { deletePelanggan } from "../../../../context/actions/Pelanggan";
import { GlobalContext } from "../../../../context/Provider";
import Interweave from "interweave";
import ModalKeterangan from "../../../../components/ModalKeterangan";

const Swal = withReactContent(swal2);

const TablePelanggan = ({ resultsPerPage, response, filterText }) => {
  const match = useRouteMatch();
  const history = useHistory();
  const { path } = match;
  const { pelangganDispatch } = useContext(GlobalContext);
  const [modalKeterangan, setModalKeterangan] = useState(false);
  const [keterangan, setKeterangan] = useState("");

  // Open modal keterangan
  const openModalKeterangan = (value) => {
    setKeterangan(value);
    setModalKeterangan(true);
  };

  // Close modal keterangan
  const closeModalKeterangan = () => {
    setModalKeterangan(false);
  };

  // Go To Edit
  const goToEdit = (id) => {
    history.push(`${path}/edit/${id}`);
  };

  // Go To Detail
  const goToDetail = (id) => {
    history.push(`${path}/detail/${id}`);
  };

  // Setup pages control for every table
  const [pageTable, setPageTable] = useState(1);

  // Setup data for table
  const [dataTable, setDataTable] = useState([]);

  // Pagination setup
  const totalResults = response.length;

  // Pagination change control
  function onPageChangeTable(p) {
    setPageTable(p);
  }

  // On page change, load new sliced data
  // Here you would make another server request for new data
  useEffect(() => {
    let response2 = null;
    if (!filterText) {
      response2 = response.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      );
    } else {
      response2 = response.filter(
        (item) =>
          item.nm_pelanggan.toLowerCase().includes(filterText.toLowerCase()) ||
          item.nm_perusahaan.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    setDataTable(response2);
  }, [pageTable, filterText, response]);

  // Menangani tombol hapus
  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Anda yakin ingin menghapus data ini ?",
      text: "Jika yakin, klik YA",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "YA",
    }).then((res) => {
      if (res.isConfirmed) {
        deletePelanggan(id, pelangganDispatch, Swal);
      }
    });
  };

  const { sortedDatatable, requestSort, sortConfig } =
    useSortableData(dataTable);

  const handleSorting = (e, key) => {
    e.preventDefault();

    requestSort(key);
  };

  return (
    <>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>
                <div className="flex gap-1 items-center">
                  <a
                    className={`${
                      sortConfig && sortConfig.key === "nomor"
                        ? "text-gray-900 dark:text-gray-100"
                        : ""
                    }`}
                    href="."
                    onClick={(e) => handleSorting(e, "nomor")}
                  >
                    No.
                  </a>
                  {sortConfig &&
                    sortConfig.key === "nomor" &&
                    (sortConfig.direction === "ascending" ? (
                      <ArrowUp />
                    ) : (
                      <ArrowDown />
                    ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1 items-center">
                  <a
                    className={`${
                      sortConfig && sortConfig.key === "nm_pelanggan"
                        ? "text-gray-900 dark:text-gray-100"
                        : ""
                    }`}
                    href="."
                    onClick={(e) => handleSorting(e, "nm_pelanggan")}
                  >
                    Nama
                  </a>
                  {sortConfig &&
                    sortConfig.key === "nm_pelanggan" &&
                    (sortConfig.direction === "ascending" ? (
                      <ArrowUp />
                    ) : (
                      <ArrowDown />
                    ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1 items-center">
                  <a
                    className={`${
                      sortConfig && sortConfig.key === "nm_perusahaan"
                        ? "text-gray-900 dark:text-gray-100"
                        : ""
                    }`}
                    href="."
                    onClick={(e) => handleSorting(e, "nm_perusahaan")}
                  >
                    Perusahaan
                  </a>
                  {sortConfig &&
                    sortConfig.key === "nm_perusahaan" &&
                    (sortConfig.direction === "ascending" ? (
                      <ArrowUp />
                    ) : (
                      <ArrowDown />
                    ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1 items-center">
                  <a
                    className={`${
                      sortConfig && sortConfig.key === "keterangan"
                        ? "text-gray-900 dark:text-gray-100"
                        : ""
                    }`}
                    href="."
                    onClick={(e) => handleSorting(e, "keterangan")}
                  >
                    Keterangan
                  </a>
                  {sortConfig &&
                    sortConfig.key === "keterangan" &&
                    (sortConfig.direction === "ascending" ? (
                      <ArrowUp />
                    ) : (
                      <ArrowDown />
                    ))}
                </div>
              </TableCell>
              <TableCell>Aksi</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {sortedDatatable.map((item, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{i + 1}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.nm_pelanggan}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.nm_perusahaan}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {item.keterangan ? (
                      <>
                        {/* <Interweave content={item.keterangan} /> */}
                        <button
                          onClick={() => openModalKeterangan(item.keterangan)}
                          type="button"
                          className="transition-all duration-200 ease-in-out py-2 px-5 bg-gray-500 rounded-md text-white font-semibold hover:bg-gray-600"
                        >
                          Lihat
                        </button>
                      </>
                    ) : (
                      <>Tidak Ada</>
                    )}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-4">
                    {localStorage.level === "1" && (
                      <Button
                        layout="link"
                        size="icon"
                        aria-label="Detail"
                        onClick={(e) => goToDetail(item.id_pelanggan)}
                      >
                        <MenuIcon className="w-5 h-5 text-blue-500" aria-hidden="true" />
                      </Button>
                    )}
                    <Button
                      layout="link"
                      size="icon"
                      aria-label="Edit"
                      onClick={(e) => goToEdit(item.id_pelanggan)}
                    >
                      <EditIcon className="w-5 h-5 text-lime-600" aria-hidden="true" />
                    </Button>
                    <Button
                      layout="link"
                      size="icon"
                      aria-label="Delete"
                      onClick={() => handleDelete(item.id_pelanggan)}
                    >
                      <TrashIcon className="w-5 h-5 text-red-600" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          {!filterText && (
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={onPageChangeTable}
              label="Table navigation"
            />
          )}
        </TableFooter>
      </TableContainer>

      <ModalKeterangan
        isOpen={modalKeterangan}
        onClose={closeModalKeterangan}
        keterangan={keterangan}
      />
    </>
  );
};

export default TablePelanggan;
