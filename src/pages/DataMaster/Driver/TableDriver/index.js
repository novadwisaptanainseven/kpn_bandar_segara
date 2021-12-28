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
  Badge,
  Avatar,
} from "@windmill/react-ui";

import { EditIcon, TrashIcon } from "../../../../icons";

const TableDriver = ({ resultsPerPage, response }) => {
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
    setDataTable(
      response.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    );
  }, [pageTable]);

  return (
    <TableContainer className="mb-8">
      <Table>
        <TableHeader>
          <tr>
            <TableCell>ID</TableCell>
            <TableCell>Nama</TableCell>
            <TableCell>Perusahaan</TableCell>
            <TableCell>Aksi</TableCell>
          </tr>
        </TableHeader>
        <TableBody>
          {dataTable.map((item, i) => (
            <TableRow key={i}>
              <TableCell>
                <span className="text-sm">PLG000</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{item.name}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{item.job}</span>
              </TableCell>

              <TableCell>
                <div className="flex items-center space-x-4">
                  <Button layout="link" size="icon" aria-label="Edit">
                    <EditIcon className="w-5 h-5" aria-hidden="true" />
                  </Button>
                  <Button layout="link" size="icon" aria-label="Delete">
                    <TrashIcon className="w-5 h-5" aria-hidden="true" />
                  </Button>
                </div>
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
  );
};

export default TableDriver;
