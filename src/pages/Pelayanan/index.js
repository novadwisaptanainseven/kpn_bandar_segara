import React, { useState, useContext, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { GlobalContext } from "../../context/Provider";
import { getPelayanan } from "../../context/actions/Pelayanan";
import PageTitle from "../../components/Typography/PageTitle";
import { Card, CardBody, Button, Input } from "@windmill/react-ui";
import { TableSkeletonLoading } from "../../components/SkeletonLoading";
import DataTable from "./DataTable";

const Pelayanan = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { path } = match;
  const { pelayananState, pelayananDispatch } = useContext(GlobalContext);
  const { loading, data: dataPelayanan } = pelayananState;
  const [filterText, setFilterText] = useState("");

  // Get data pelayanan
  useEffect(() => {
    getPelayanan(pelayananDispatch);
  }, [pelayananDispatch]);

  // Menuju halaman tambah
  const goToTambah = () => {
    history.push(`${path}/tambah`);
  };

  return (
    <>
      <PageTitle>Pelayanan</PageTitle>

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
          {!dataPelayanan && loading && <TableSkeletonLoading />}

          {/* Table */}
          {dataPelayanan && (
            <DataTable
              response={dataPelayanan}
              resultsPerPage={10}
              filterText={filterText}
            />
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default Pelayanan;
