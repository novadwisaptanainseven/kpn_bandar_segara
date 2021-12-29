import React, { useEffect, useState } from "react";
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

const Swal = withReactContent(swal2);

const DataTable = ({ resultsPerPage, response, filterText }) => {
  const history = useHistory();
  const match = useRouteMatch();
  const { path } = match;
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

  return (
    <>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Kode Nota</TableCell>
              <TableCell>Kode SPT</TableCell>
              <TableCell>Diskon (%)</TableCell>
              <TableCell>Total Harga</TableCell>
              <TableCell>Status Pembayaran</TableCell>
              <TableCell>Aksi</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((item, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{item.id_nota}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.id_spt}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.diskon}</span>
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
                  {item.id_status_nota === 1 && (
                    <span className="text-sm bg-red-500 px-5 py-2 font-semibold rounded-sm">
                      Belum Bayar
                    </span>
                  )}
                  {item.id_status_nota === 2 && (
                    <span className="text-sm bg-yellow-300 px-5 py-2 font-semibold rounded-sm">
                      Belum Lunas
                    </span>
                  )}
                  {item.id_status_nota === 3 && (
                    <span className="text-sm bg-lime-500 px-5 py-2 font-semibold rounded-sm">
                      Lunas
                    </span>
                  )}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1">
                    <button
                      className="flex-1 bg-teal-400 text-white px-3 py-1 text-sm rounded-md"
                      onClick={() => goToDetail(i + 1)}
                    >
                      Detail
                    </button>
                    <button
                      className="flex-1 bg-lime-500 text-white px-3 py-1 text-sm rounded-md"
                      onClick={() => goToEdit(i + 1)}
                    >
                      Edit
                    </button>
                    <button
                      className="flex-1 bg-red-400 text-white px-3 py-1 text-sm rounded-md"
                      onClick={() => handleDelete(i + 1)}
                    >
                      Hapus
                    </button>
                  </div>
                  <div className="flex items-center mt-1">
                    <button className="w-full bg-gray-500 text-white px-3 py-1 text-sm rounded-md">
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
