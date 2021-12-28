import React from "react";
import PageTitle from "../../../../components/Typography/PageTitle";
import {
  Card,
  CardBody,
  Button,
  Input,
  Label,
  Select,
} from "@windmill/react-ui";
import SelectData from "react-select";

const Tambah = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

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
