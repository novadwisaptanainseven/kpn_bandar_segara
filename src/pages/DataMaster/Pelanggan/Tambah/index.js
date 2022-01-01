import React, { useEffect, useState } from "react";
import PageTitle from "../../../../components/Typography/PageTitle";
import { Card, CardBody, Button, Input, Label } from "@windmill/react-ui";
import SelectData from "react-select";
import { selectPerusahaan } from "../../../../context/actions/Perusahaan";

const Tambah = () => {
  const [dataPerusahaan, setDataPerusahaan] = useState([]);
  const [formValue, setFormValue] = useState({
    nm_perusahaan: "",
    id_perusahaan: "",
  });

  // Get Select Perusahaan
  useEffect(() => {
    selectPerusahaan(setDataPerusahaan);
  }, []);

  const options = dataPerusahaan.map((item) => ({
    value: item.id_perusahaan,
    label: item.nm_perusahaan,
  }));

  return (
    <>
      <PageTitle backButton={true}>Tambah Pelanggan</PageTitle>

      <Card className="overflow-visible">
        <CardBody>
          <div className="grid md:grid-cols-2">
            <div>
              <Label>
                <span>Nama</span>
                <Input className="mt-1" placeholder="Nama Pelanggan" />
              </Label>
              <Label className="mt-4 space-y-1">
                <span>Perusahaan</span>
                {/* <Select className="mt-1">
                  <option>Perusahaan 1</option>
                  <option>Perusahaan 2</option>
                  <option>Perusahaan 3</option>
                </Select> */}
                <SelectData options={options} />
              </Label>
              <div className="mt-5 flex justify-end gap-2">
                <Button layout="outline">Reset</Button>
                <Button>Simpan</Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default Tambah;
