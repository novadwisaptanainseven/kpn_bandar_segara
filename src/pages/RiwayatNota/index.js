import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import { Card, CardBody, Button, Input, Label } from "@windmill/react-ui";
import { useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { GlobalContext } from "../../context/Provider";
import { getRiwayatNota } from "../../context/actions/RiwayatNota";
import { TableSkeletonLoading } from "../../components/SkeletonLoading";
import DataTable from "./DataTable";

const RiwayatNota = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { path } = match;
  const { riwayatNotaState, riwayatNotaDispatch } = useContext(GlobalContext);
  const { loading, data: dataRiwayatNota } = riwayatNotaState;
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    getRiwayatNota(riwayatNotaDispatch);
  }, [riwayatNotaDispatch]);

  return (
    <>
      <PageTitle>Riwayat Cetak Nota</PageTitle>

      <Card>
        <CardBody className="mb-8 shadow-md">
          <div className="flex flex-wrap justify-between flex-col md:flex-row mb-2 mt-4">
            <div className="mt-2 md:w-64 md:mt-0">
              <Input
                type="text"
                className="w-4"
                placeholder="Pencarian..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
          </div>

          {!dataRiwayatNota && loading && <TableSkeletonLoading />}

          {/* Table */}
          {dataRiwayatNota && (
            <DataTable
              response={dataRiwayatNota}
              resultsPerPage={10}
              filterText={filterText}
            />
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default RiwayatNota;
