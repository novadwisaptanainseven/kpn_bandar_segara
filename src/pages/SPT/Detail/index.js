import React from "react";
import { Card, CardBody } from "@windmill/react-ui";
import PageTitle from "../../../components/Typography/PageTitle";

import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
} from "@windmill/react-ui";

const Detail = () => {
  return (
    <>
      <PageTitle backButton={true}>Detail SPT</PageTitle>
      <Card>
        <CardBody>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow className="bg-gray-200">
                  <TableCell className="font-semibold">Pelanggan</TableCell>
                  <TableCell>Nova Dwi Sapta</TableCell>
                </TableRow>
                <TableRow className="bg-gray-100">
                  <TableCell className="font-semibold">Perusahaan</TableCell>
                  <TableCell>PT. Lintas Samudera</TableCell>
                </TableRow>
                <TableRow className="bg-gray-200">
                  <TableCell className="font-semibold">Marine</TableCell>
                  <TableCell>Marine</TableCell>
                </TableRow>
                <TableRow className="bg-gray-100">
                  <TableCell className="font-semibold">Driver</TableCell>
                  <TableCell>Lyntom Irfan Darmawan</TableCell>
                </TableRow>
                <TableRow className="bg-gray-200">
                  <TableCell className="font-semibold">Nama Kapal</TableCell>
                  <TableCell>Speed Boat XX1</TableCell>
                </TableRow>
                <TableRow className="bg-gray-100">
                  <TableCell className="font-semibold">Tujuan</TableCell>
                  <TableCell>Samarinda - Palu</TableCell>
                </TableRow>
                <TableRow className="bg-gray-200">
                  <TableCell className="font-semibold">Tanggal</TableCell>
                  <TableCell>10/12/2021</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </>
  );
};

export default Detail;
