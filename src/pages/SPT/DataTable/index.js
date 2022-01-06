import React, { useContext, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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
import { GlobalContext } from "../../../context/Provider";
import { deleteSpt } from "../../../context/actions/SPT";
import useSortableData from "../../../helpers/useSortableData";
import ArrowUp from "../../../components/DataTableIcons/ArrowUp";
import ArrowDown from "../../../components/DataTableIcons/ArrowDown";

const Swal = withReactContent(swal2);

const DataTable = ({ resultsPerPage, response, filterText }) => {
  const history = useHistory();
  const match = useRouteMatch();
  const { path } = match;
  const { sptDispatch } = useContext(GlobalContext);

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
          item.id_spt.toLowerCase().includes(filterText.toLowerCase()) ||
          item.nm_pelanggan.toLowerCase().includes(filterText.toLowerCase()) ||
          item.waktu_buat.toLowerCase().includes(filterText.toLowerCase()) ||
          item.nm_tujuan.toLowerCase().includes(filterText.toLowerCase())
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
        deleteSpt(id, sptDispatch, Swal);
      }
    });
  };

  // Menuju halaman detail
  const goToDetail = (id) => {
    history.push(`${path}/detail/${id}`);
  };

  // Menuju halaman edit
  const goToEdit = (id) => {
    history.push(`${path}/edit/${id}`);
  };

  // Menuju halaman pembuatan nota
  const goToBuatNota = (id) => {
    history.push(`${path}/${id}/buat-nota`);
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
                      sortConfig && sortConfig.key === "id_spt"
                        ? "text-gray-900 dark:text-gray-100"
                        : ""
                    }`}
                    href="."
                    onClick={(e) => handleSorting(e, "id_spt")}
                  >
                    ID SPT
                  </a>
                  {sortConfig &&
                    sortConfig.key === "id_spt" &&
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
                    Nama Pelanggan
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
                      sortConfig && sortConfig.key === "nm_tujuan"
                        ? "text-gray-900 dark:text-gray-100"
                        : ""
                    }`}
                    href="."
                    onClick={(e) => handleSorting(e, "nm_tujuan")}
                  >
                    Tujuan
                  </a>
                  {sortConfig &&
                    sortConfig.key === "nm_tujuan" &&
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
                      sortConfig && sortConfig.key === "waktu_buat"
                        ? "text-gray-900 dark:text-gray-100"
                        : ""
                    }`}
                    href="."
                    onClick={(e) => handleSorting(e, "waktu_buat")}
                  >
                    Tanggal SPT
                  </a>
                  {sortConfig &&
                    sortConfig.key === "waktu_buat" &&
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
            {dataTable.map((item, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{item.id_spt}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.nm_pelanggan}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.nm_tujuan}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.waktu_buat}</span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1">
                    <button
                      className="bg-teal-400 text-white px-3 py-1 text-sm rounded-md"
                      onClick={() => goToDetail(item.id_spt)}
                    >
                      Detail
                    </button>
                    <button
                      className="bg-lime-500 text-white px-3 py-1 text-sm rounded-md"
                      onClick={() => goToEdit(item.id_spt)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-400 text-white px-3 py-1 text-sm rounded-md"
                      onClick={() => handleDelete(item.id_spt)}
                    >
                      Hapus
                    </button>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <button
                      className="bg-yellow-300 text-black px-3 py-1 text-sm rounded-md"
                      onClick={() => goToBuatNota(item.id_spt)}
                    >
                      Buat Nota
                    </button>
                    <button className="bg-gray-500 text-white px-3 py-1 text-sm rounded-md">
                      Cetak SPT
                    </button>
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
    </>
  );
};

export default DataTable;
