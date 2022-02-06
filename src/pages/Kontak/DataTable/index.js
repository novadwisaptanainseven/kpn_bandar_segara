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
import { EditIcon, MenuIcon, TrashIcon } from "../../../icons";
import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useHistory, useRouteMatch } from "react-router-dom";
import { GlobalContext } from "../../../context/Provider";
import getImage from "../../../context/actions/Files/getImage";
import { deleteKontak } from "../../../context/actions/Kontak";
import { handleDelete } from "../../../components/AlertMessages";
import useSortableData from "../../../helpers/useSortableData";
import ArrowUp from "../../../components/DataTableIcons/ArrowUp";
import ArrowDown from "../../../components/DataTableIcons/ArrowDown";
import Interweave from "interweave";

const Swal = withReactContent(swal2);

const DataTable = ({ resultsPerPage, response, filterText }) => {
  const match = useRouteMatch();
  const history = useHistory();
  const { path } = match;
  const { kontakDispatch } = useContext(GlobalContext);

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
          item.nm_kontak.toLowerCase().includes(filterText.toLowerCase()) ||
          item.keterangan.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    setDataTable(response2);
  }, [pageTable, filterText, response]);

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
              <TableCell>Icon</TableCell>
              <TableCell>
                <div className="flex gap-1 items-center">
                  <a
                    className={`${
                      sortConfig && sortConfig.key === "nm_kontak"
                        ? "text-gray-900 dark:text-gray-100"
                        : ""
                    }`}
                    href="."
                    onClick={(e) => handleSorting(e, "nm_kontak")}
                  >
                    Nama Kontak
                  </a>
                  {sortConfig &&
                    sortConfig.key === "nm_kontak" &&
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
              <TableCell>
                <div className="flex gap-1 items-center">
                  <a
                    className={`${
                      sortConfig && sortConfig.key === "link"
                        ? "text-gray-900 dark:text-gray-100"
                        : ""
                    }`}
                    href="."
                    onClick={(e) => handleSorting(e, "link")}
                  >
                    Link
                  </a>
                  {sortConfig &&
                    sortConfig.key === "link" &&
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
              <TableRow key={i + 1}>
                <TableCell>
                  <span className="text-sm">
                    {i+1}
                  </span>
                </TableCell>
                <TableCell>
                  <a
                    href={getImage("foto_kontak", item.icon)}
                    target="_blank"
                  >
                    <img
                      src={getImage("foto_kontak", item.icon)}
                      alt="img-carousel1.jpg"
                      className="w-32 rounded-md"
                    />
                  </a>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.nm_kontak}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    <Interweave content={item.keterangan} />
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    <Interweave content={item.link} />
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    {localStorage.level === "1" && (
                      <Button
                        layout="link"
                        size="icon"
                        aria-label="Detail"
                        onClick={(e) => goToDetail(item.id_kontak)}
                      >
                        <MenuIcon
                          className="w-5 h-5 text-blue-500"
                          aria-hidden="true"
                        />
                      </Button>
                    )}
                    <Button
                      layout="link"
                      size="icon"
                      aria-label="Edit"
                      onClick={(e) => goToEdit(item.id_kontak)}
                    >
                      <EditIcon
                        className="w-5 h-5 text-lime-600"
                        aria-hidden="true"
                      />
                    </Button>
                    <Button
                      layout="link"
                      size="icon"
                      aria-label="Delete"
                      onClick={() =>
                        handleDelete(
                          item.id_kontak,
                          deleteKontak,
                          kontakDispatch
                        )
                      }
                    >
                      <TrashIcon
                        className="w-5 h-5 text-red-600"
                        aria-hidden="true"
                      />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DataTable;
