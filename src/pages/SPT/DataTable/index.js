import React, { useContext, useEffect, useState, useRef } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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
import { GlobalContext } from "../../../context/Provider";
import { deleteSpt } from "../../../context/actions/SPT";
import { handleDelete } from "../../../components/AlertMessages";
import useSortableData from "../../../helpers/useSortableData";
import ArrowUp from "../../../components/DataTableIcons/ArrowUp";
import ArrowDown from "../../../components/DataTableIcons/ArrowDown";
import { format } from "date-fns";
import { removeArrayByValue } from "../../../helpers/GlobalFunctions";

const Swal = withReactContent(swal2);

const DataTable = ({
  resultsPerPage,
  response,
  filterText,
  listCheckbox,
  setListCheckbox,
}) => {
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
          item.no_spt.toLowerCase().includes(filterText.toLowerCase()) ||
          item.nm_pelanggan.toLowerCase().includes(filterText.toLowerCase()) ||
          item.tgl_spt.toLowerCase().includes(filterText.toLowerCase()) ||
          item.nm_tujuan.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    setDataTable(response2);
  }, [pageTable, filterText, response]);

  // Menuju halaman cetak
  const goToCetak = (id) => {
    history.push(`${path}/cetak/${id}`);
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

  // useEffect(() => {
  //   console.log(listCheckbox);
  // }, [listCheckbox]);

  // Handle checkbox for printing selected data
  const handleCheckBox = (e, idNota) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setListCheckbox([...listCheckbox, idNota]);
    } else {
      const arrAfterRemove = removeArrayByValue([...listCheckbox], idNota);
      setListCheckbox(arrAfterRemove);
    }
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
              <TableCell>Checklist</TableCell>
              <TableCell>
                <div className="flex gap-1 items-center">
                  <a
                    className={`${
                      sortConfig && sortConfig.key === "no_spt"
                        ? "text-gray-900 dark:text-gray-100"
                        : ""
                    }`}
                    href="."
                    onClick={(e) => handleSorting(e, "no_spt")}
                  >
                    NO. SPT
                  </a>
                  {sortConfig &&
                    sortConfig.key === "no_spt" &&
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
                    Nama Pengguna
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
            {sortedDatatable.map((item, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{i + 1}</span>
                </TableCell>
                <TableCell className="text-center ">
                  <Input
                    type="checkbox"
                    className="cursor-pointer"
                    onChange={(e) => handleCheckBox(e, item.id_spt)}
                  />
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.no_spt}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.nm_pelanggan}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.nm_tujuan}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {format(new Date(item.tgl_keberangkatan), "dd-MM-y")}
                  </span>
                </TableCell>

                <TableCell className="text-xs">
                  <div className="flex items-center gap-1 ">
                    <button
                      className="bg-teal-400 text-white px-3 py-1 text-sm rounded-md transition duration-100 hover:bg-teal-500"
                      onClick={() => goToDetail(item.id_spt)}
                    >
                      Detail
                    </button>
                    <button
                      className="bg-lime-500 text-white px-3 py-1 text-sm rounded-md transition duration-100 hover:bg-lime-600"
                      onClick={() => goToEdit(item.id_spt)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-400 text-white px-3 py-1 text-sm rounded-md transition duration-100 hover:bg-red-500"
                      onClick={() =>
                        handleDelete(item.id_spt, deleteSpt, sptDispatch)
                      }
                    >
                      Hapus
                    </button>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {/* <button
                      className="bg-yellow-300 text-black px-3 py-1 text-sm rounded-md transition duration-100 hover:bg-teal-500"
                      onClick={() => goToBuatNota(item.id_spt)}
                    >
                      Buat Nota
                    </button> */}
                    <button
                      className="bg-gray-500 text-white px-3 py-1 text-sm rounded-md transition duration-100 hover:bg-gray-600"
                      onClick={() => goToCetak(item.id_spt)}
                    >
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
