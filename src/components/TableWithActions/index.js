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

import { EditIcon, TrashIcon } from "../../icons";

const TableWithActions = ({ resultsPerPage, response, children }) => {
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
            <TableCell>Client</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </tr>
        </TableHeader>
        <TableBody>
          {dataTable.map((user, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center text-sm">
                  <Avatar
                    className="hidden mr-3 md:block"
                    src={user.avatar}
                    alt="User avatar"
                  />
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {user.job}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm">$ {user.amount}</span>
              </TableCell>
              <TableCell>
                <Badge type={user.status}>{user.status}</Badge>
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {new Date(user.date).toLocaleDateString()}
                </span>
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

export default TableWithActions;
