import React, { useState, useContext, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { GlobalContext } from "../../context/Provider";
import { getKontak } from "../../context/actions/Kontak";
import PageTitle from "../../components/Typography/PageTitle";
import { Card, CardBody, Button, Input } from "@windmill/react-ui";
import { TableSkeletonLoading } from "../../components/SkeletonLoading";
import DataTable from "./DataTable";

const Kontak = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { path } = match;
  const { kontakState, kontakDispatch } = useContext(GlobalContext);
  const { loading, data: dataKontak } = kontakState;
  const [filterText, setFilterText] = useState("");

  // Get data kontak
  useEffect(() => {
    getKontak(kontakDispatch);
  }, [kontakDispatch]);

  // Menuju halaman tambah
  const goToTambah = () => {
    history.push(`${path}/tambah`);
  };

  return (
    <>
      <PageTitle>Kontak</PageTitle>

      <Card className="mb-8 shadow-md">
        <CardBody>
          <div className="flex flex-wrap justify-between flex-col md:flex-row mb-5">
            <div className="flex flex-wrap flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-1">
              <Button onClick={goToTambah}>Tambah</Button>
            </div>

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

          {/* Loading Skeleton */}
          {!dataKontak && loading && <TableSkeletonLoading />}

          {/* Table */}
          {dataKontak && (
            <DataTable
              response={dataKontak}
              resultsPerPage={10}
              filterText={filterText}
            />
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default Kontak;
