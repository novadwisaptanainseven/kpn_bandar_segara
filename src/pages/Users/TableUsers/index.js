import React, { useEffect, useState } from "react";

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

import { EditIcon, TrashIcon } from "../../../icons";
import { useHistory, useRouteMatch } from "react-router-dom";
import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FotoProfil } from "../../../assets";

const Swal = withReactContent(swal2);

const TableUsers = ({ resultsPerPage, response, filterText }) => {
  const match = useRouteMatch();
  const history = useHistory();
  const { path } = match;

  // Go To Edit
  const goToEdit = (id) => {
    history.push(`${path}/edit/${id}`);
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
          item.name.toLowerCase().includes(filterText.toLowerCase()) ||
          item.job.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    setDataTable(response2);
  }, [pageTable, filterText]);

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
        // deleteAgama(id, agamaDispatch);
        Swal.fire({
          icon: "success",
          title: "Terhapus",
          text: "Data berhasil dihapus",
        });
      }
    });
  };

  return (
    <TableContainer className="mb-8">
      <Table>
        <TableHeader>
          <tr>
            <TableCell>Username</TableCell>
            <TableCell>Nama</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Foto</TableCell>
            <TableCell>Aksi</TableCell>
          </tr>
        </TableHeader>
        <TableBody>
          {dataTable.map((item, i) => (
            <TableRow key={i}>
              <TableCell>
                <span className="text-sm">{item.name}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{item.name}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">Admin</span>
              </TableCell>
              <TableCell>
                <img className="w-16" src={FotoProfil} alt="foto-profil" />
              </TableCell>

              <TableCell>
                <div className="flex items-center space-x-4">
                  <Button
                    layout="link"
                    size="icon"
                    aria-label="Edit"
                    onClick={(e) => goToEdit(i + 1)}
                  >
                    <EditIcon className="w-5 h-5" aria-hidden="true" />
                  </Button>
                  <Button
                    layout="link"
                    size="icon"
                    aria-label="Delete"
                    onClick={() => handleDelete(i + 1)}
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

export default TableUsers;
