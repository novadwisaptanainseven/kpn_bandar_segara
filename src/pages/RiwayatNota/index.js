import React from "react";
import PageTitle from "../../components/Typography/PageTitle";
import { Card, CardBody, Button, Input, Label } from "@windmill/react-ui";

const RiwayatNota = () => {
  return (
    <>
      <PageTitle>Riwayat Cetak Nota</PageTitle>

      <Card>
        <CardBody className="mb-8 shadow-md">
          {/* Filter Data */}
          <Card
            colored
            className="text-gray-600 bg-gray-200 dark:bg-gray-700 dark:text-gray-100"
          >
            <CardBody>
              <p className="mb-4 font-semibold">Filter Tanggal</p>
              <div className="grid gap-3 md:grid-cols-2">
                <Label>
                  <span>Dari tanggal</span>
                  <Input
                    type="date"
                    name="dari_tgl"
                    className="mt-1"
                    onChange={(e) => handleChangleTgl(e)}
                  />
                </Label>
                <Label>
                  <span>Sampai tanggal</span>
                  <Input
                    type="date"
                    name="sampai_tgl"
                    className="mt-1"
                    onChange={(e) => handleChangleTgl(e)}
                  />
                </Label>
              </div>
              <div className="flex gap-2 flex-col-reverse md:flex-row md:justify-end mt-4">
                <Button
                  layout="outline"
                  onClick={handleFilterReset}
                  disabled={
                    !filterTgl.dari_tgl || !filterTgl.sampai_tgl ? true : false
                  }
                >
                  Reset
                </Button>
                <Button
                  disabled={
                    !filterTgl.dari_tgl || !filterTgl.sampai_tgl || loading
                      ? true
                      : false
                  }
                  onClick={handleFilterCari}
                >
                  {loading ? "Loading..." : "Cari"}
                </Button>
              </div>
            </CardBody>
          </Card>
        </CardBody>
      </Card>
    </>
  );
};

export default RiwayatNota;
