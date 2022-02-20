import React, { useContext, useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { GlobalContext } from "../../../context/Provider";
import useSortableData from "../../../helpers/useSortableData";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  Pagination,
  TableContainer,
  Input,
} from "@windmill/react-ui";
import ArrowUp from "../../../components/DataTableIcons/ArrowUp";
import ArrowDown from "../../../components/DataTableIcons/ArrowDown";
import { format } from "date-fns";
import { handleDelete } from "../../../components/AlertMessages";
import { deleteRiwayatNota } from "../../../context/actions/RiwayatNota";

const DataTable = ({ resultsPerPage, response, filterText }) => {
  const history = useHistory();
  const match = useRouteMatch();
  const { path } = match;
  const { riwayatNotaDispatch } = useContext(GlobalContext);

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
          item.waktu_buat.toLowerCase().includes(filterText.toLowerCase()) ||
          item.no_cetak_nota.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    setDataTable(response2);
  }, [pageTable, filterText, response]);

  // Menuju halaman detail
  const goToDetail = (id) => {
    history.push(`${path}/detail/${id}`);
  };

  // Menuju halaman cetak
  const goToCetak = (id) => {
    history.push(`${path}/cetak/${id}`);
  };

  const { sortedDatatable, requestSort, sortConfig } =
    useSortableData(dataTable);

  const handleSorting = (e, key) => {
    e.preventDefault();

    requestSort(key);
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
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
                      sortConfig && sortConfig.key === "no_cetak_nota"
                        ? "text-gray-900 dark:text-gray-100"
                        : ""
                    }`}
                    href="."
                    onClick={(e) => handleSorting(e, "no_cetak_nota")}
                  >
                    No. Nota
                  </a>
                  {sortConfig &&
                    sortConfig.key === "no_cetak_nota" &&
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
                    Tanggal Nota
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedDatatable.map((item, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{i + 1}</span>
                </TableCell>
                <TableCell>
                  <span>{item.no_cetak_nota}</span>
                </TableCell>
                <TableCell>
                  <span>{item.tgl_nota}</span>
                </TableCell>
                <TableCell className="text-xs">
                  <div className="flex items-center gap-1">
                    {localStorage.level === "1" && (
                      <button
                        className="bg-teal-400 text-white px-3 py-1 rounded-md hover:bg-teal-500 transition duration-100"
                        onClick={() => goToDetail(item.id_cetak_nota)}
                      >
                        Detail
                      </button>
                    )}
                    <button
                      onClick={() => goToCetak(item.id_cetak_nota)}
                      className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition duration-100"
                    >
                      Cetak Nota
                    </button>
                    <button
                      className="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-500 transition duration-100"
                      onClick={() =>
                        handleDelete(
                          item.id_cetak_nota,
                          deleteRiwayatNota,
                          riwayatNotaDispatch
                        )
                      }
                    >
                      Hapus
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
