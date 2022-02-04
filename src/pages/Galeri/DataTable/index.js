import React, { useContext, useState, useEffect } from "react";

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
import { MenuIcon, TrashIcon } from "../../../icons";
import { SampleImage } from "../../../assets";
import { useRouteMatch, useHistory } from "react-router-dom";
import { GlobalContext } from "../../../context/Provider";
import getImage from "../../../context/actions/Files/getImage";

import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { deleteGaleri } from "../../../context/actions/Galeri";
const Swal = withReactContent(swal2);

const DataTable = ({ resultsPerPage, response }) => {
  const match = useRouteMatch();
  const history = useHistory();
  const { path } = match;
  const { galeriDispatch } = useContext(GlobalContext);

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
    response2 = response.slice(
      (pageTable - 1) * resultsPerPage,
      pageTable * resultsPerPage
    );

    setDataTable(response2);
  }, [pageTable, response]);

  // Go To Detail
  const goToDetail = (id) => {
    history.push(`${path}/detail/${id}`);
  };

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
        deleteGaleri(id, galeriDispatch, Swal);
      }
    });
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Gambar</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataTable.map((item, i) => (
              <TableRow key={i}>
                <TableCell className="w-20">{i + 1}</TableCell>
                <TableCell>
                  <a href={getImage("foto_galeri", item.foto)} target="_blank">
                    <img
                      src={getImage("foto_galeri", item.foto)}
                      alt="img-carousel1.jpg"
                      className="w-32 rounded-md"
                    />
                  </a>
                </TableCell>
                <TableCell className="flex items-center space-x-4">
                  {localStorage.level === "1" && (
                    <Button
                      layout="link"
                      size="icon"
                      aria-label="Detail"
                      onClick={() => goToDetail(item.id_galeri)}
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
                    aria-label="Delete"
                    onClick={() => handleDelete(item.id_galeri)}
                  >
                    <TrashIcon
                      className="w-5 h-5 text-red-600"
                      aria-hidden="true"
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  );
};

export default DataTable;
