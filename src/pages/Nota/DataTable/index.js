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
  TableFooter,
  Pagination,
  TableContainer,
  Input,
} from "@windmill/react-ui";
import { GlobalContext } from "../../../context/Provider";
import { deleteNota } from "../../../context/actions/Nota";
import useSortableData from "../../../helpers/useSortableData";
import ArrowUp from "../../../components/DataTableIcons/ArrowUp";
import ArrowDown from "../../../components/DataTableIcons/ArrowDown";
import { format } from "date-fns";
import { removeArrayByValue } from "../../../helpers/GlobalFunctions";
import { handleDelete } from "../../../components/AlertMessages";

const Swal = withReactContent(swal2);

const DataTable = ({
  resultsPerPage,
  response,
  filterText,
  setListCheckbox,
  listCheckbox,
  listIdPelanggan,
  setListIdPelanggan,
}) => {
  const history = useHistory();
  const match = useRouteMatch();
  const { path } = match;
  const { notaDispatch } = useContext(GlobalContext);

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
          item.no_nota.toLowerCase().includes(filterText.toLowerCase()) ||
          item.nm_pelanggan.toLowerCase().includes(filterText.toLowerCase()) ||
          item.waktu_buat.toLowerCase().includes(filterText.toLowerCase()) ||
          item.nm_status_nota.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    setDataTable(response2);
  }, [pageTable, filterText, response]);

  // Menuju halaman detail
  const goToDetail = (id) => {
    history.push(`${path}/detail/${id}`);
  };

  // Menuju halaman edit
  const goToEdit = (id) => {
    history.push(`${path}/edit/${id}`);
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

  // Handle checkbox for printing selected data
  const handleCheckBox = (e, idNota, idPelanggan) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setListCheckbox([...listCheckbox, idNota]);
      setListIdPelanggan([...listIdPelanggan, idPelanggan]);
    } else {
      const arrAfterRemove = removeArrayByValue([...listCheckbox], idNota);
      const arrAfterRemove2 = removeArrayByValue(
        [...listIdPelanggan],
        idPelanggan
      );
      setListCheckbox(arrAfterRemove);
      setListIdPelanggan(arrAfterRemove2);
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
                      sortConfig && sortConfig.key === "no_nota"
                        ? "text-gray-900 dark:text-gray-100"
                        : ""
                    }`}
                    href="."
                    onClick={(e) => handleSorting(e, "no_nota")}
                  >
                    No. Nota
                  </a>
                  {sortConfig &&
                    sortConfig.key === "no_nota" &&
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
                    Tgl. Nota
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
                    Pelanggan
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
                      sortConfig && sortConfig.key === "harga"
                        ? "text-gray-900 dark:text-gray-100"
                        : ""
                    }`}
                    href="."
                    onClick={(e) => handleSorting(e, "harga")}
                  >
                    Total Harga
                  </a>
                  {sortConfig &&
                    sortConfig.key === "harga" &&
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
                      sortConfig && sortConfig.key === "bayar"
                        ? "text-gray-900 dark:text-gray-100"
                        : ""
                    }`}
                    href="."
                    onClick={(e) => handleSorting(e, "bayar")}
                  >
                    Jumlah yg Dibayar
                  </a>
                  {sortConfig &&
                    sortConfig.key === "bayar" &&
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
                      sortConfig && sortConfig.key === "id_status_nota"
                        ? "text-gray-900 dark:text-gray-100"
                        : ""
                    }`}
                    href="."
                    onClick={(e) => handleSorting(e, "id_status_nota")}
                  >
                    Status
                  </a>
                  {sortConfig &&
                    sortConfig.key === "id_status_nota" &&
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
                <TableCell className="text-center">
                  <Input
                    type="checkbox"
                    className="cursor-pointer"
                    onChange={(e) =>
                      handleCheckBox(e, item.id_nota, item.id_pelanggan)
                    }
                    disabled={item.id_status_nota === 2 ? false : true}
                  />
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.no_nota}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {item.waktu_buat &&
                      format(new Date(item.waktu_buat), "dd-MM-y")}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.nm_pelanggan}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {item.total_harga &&
                      item.total_harga.toLocaleString("id", {
                        style: "currency",
                        currency: "IDR",
                      })}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {item.bayar &&
                      item.bayar.toLocaleString("id", {
                        style: "currency",
                        currency: "IDR",
                      })}
                  </span>
                </TableCell>

                <TableCell>
                  {item.id_status_nota === 3 && (
                    <span className="text-sm text-white bg-red-500 px-5 py-2 font-semibold rounded-sm dark:text-gray-900">
                      {item.nm_status_nota}
                    </span>
                  )}
                  {item.id_status_nota === 2 && (
                    <span className="text-sm bg-yellow-300 px-5 py-2 font-semibold rounded-sm dark:text-gray-900">
                      {item.nm_status_nota}
                    </span>
                  )}
                  {item.id_status_nota === 1 && (
                    <span className="text-sm bg-lime-400 px-5 py-2 font-semibold rounded-sm dark:text-gray-900">
                      {item.nm_status_nota}
                    </span>
                  )}
                </TableCell>

                <TableCell className="text-xs">
                  <div className="flex items-center gap-1">
                    <button
                      className="flex-1 bg-teal-400 text-white px-3 py-1 rounded-md hover:bg-teal-500 transition duration-100"
                      onClick={() => goToDetail(item.id_nota)}
                    >
                      Detail
                    </button>
                    <button
                      className="flex-1 bg-lime-500 text-white px-3 py-1 rounded-md hover:bg-lime-600 transition duration-100"
                      onClick={() => goToEdit(item.id_nota)}
                    >
                      Edit
                    </button>
                    <button
                      className="flex-1 bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-500 transition duration-100"
                      onClick={() =>
                        handleDelete(item.id_nota, deleteNota, notaDispatch)
                      }
                    >
                      Hapus
                    </button>
                  </div>
                  <div className="flex items-center mt-1">
                    <button
                      onClick={() => goToCetak(item.id_nota)}
                      className="w-full bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition duration-100"
                    >
                      Cetak Nota
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
