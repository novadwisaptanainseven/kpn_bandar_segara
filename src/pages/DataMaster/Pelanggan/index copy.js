import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import {
  Card,
  CardBody,
  Button,
  Input,
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
} from "@windmill/react-ui";

import response from "../../../utils/demo/tableData";
import TableWithActions from "../../../components/TableWithActions";

const Pelanggan = () => {
  // Setup pages control for every table
  const [pageTable, setPageTable] = useState(1);

  // Setup data for table
  const [dataTable, setDataTable] = useState([]);

  // Pagination setup
  const resultsPerPage = 10;
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
    <div>
      <PageTitle>Pengguna</PageTitle>

      <Card className="mb-8 shadow-md">
        <CardBody>
          <div className="flex flex-wrap justify-between flex-col md:flex-row mb-5">
            <div className="flex flex-wrap flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-1">
              <Button>Tambah</Button>
              <Button>Excel</Button>
            </div>

            <div className="mt-2 md:w-64 md:mt-0">
              <Input type="text" className="w-4" placeholder="Pencarian..." />
            </div>
          </div>

          {/* Table */}
          <TableWithActions response={response} resultsPerPage={10} />
        </CardBody>
      </Card>
    </div>
  );
};

export default Pelanggan;
