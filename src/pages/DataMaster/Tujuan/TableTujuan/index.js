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
import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { EditIcon, MenuIcon, TrashIcon } from "../../../../icons";
import { useHistory, useRouteMatch } from "react-router-dom";
import { GlobalContext } from "../../../../context/Provider";
import { deleteTujuan } from "../../../../context/actions/Tujuan";
import useSortableData from "../../../../helpers/useSortableData";
import ArrowUp from "../../../../components/DataTableIcons/ArrowUp";
import ArrowDown from "../../../../components/DataTableIcons/ArrowDown";
import Interweave from "interweave";

const Swal = withReactContent(swal2);

const TableTujuan = ({ resultsPerPage, response, filterText }) => {
  const match = useRouteMatch();
  const history = useHistory();
  const { path } = match;
  const { tujuanDispatch } = useContext(GlobalContext);

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
          item.nm_tujuan.toLowerCase().includes(filterText.toLowerCase()) ||
          item.keterangan.toLowerCase().includes(filterText.toLowerCase()) ||
          item.harga.toString().includes(filterText)
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
        deleteTujuan(id, tujuanDispatch, Swal);
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
                    sortConfig && sortConfig.key === "nm_tujuan"
                      ? "text-gray-900 dark:text-gray-100"
                      : ""
                  }`}
                  href="."
                  onClick={(e) => handleSorting(e, "nm_tujuan")}
                >
                  Nama Tujuan
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
                    sortConfig && sortConfig.key === "harga"
                      ? "text-gray-900 dark:text-gray-100"
                      : ""
                  }`}
                  href="."
                  onClick={(e) => handleSorting(e, "harga")}
                >
                  Harga
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
                <span className="text-sm">
                  {item.harga.toLocaleString("id", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  <Interweave content={item.keterangan} />
                </span>
              </TableCell>

              <TableCell>
                <div className="flex items-center space-x-4">
                  {localStorage.level === "1" && (
                    <Button
                      layout="link"
                      size="icon"
                      aria-label="Detail"
                      onClick={(e) => goToDetail(item.id_tujuan)}
                    >
                      <MenuIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  )}
                  <Button
                    layout="link"
                    size="icon"
                    aria-label="Edit"
                    onClick={(e) => goToEdit(item.id_tujuan)}
                  >
                    <EditIcon className="w-5 h-5" aria-hidden="true" />
                  </Button>
                  <Button
                    layout="link"
                    size="icon"
                    aria-label="Delete"
                    onClick={() => handleDelete(item.id_tujuan)}
                  >
                    <TrashIcon className="w-5 h-5" aria-hidden="true" />
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
  );
};

export default TableTujuan;
