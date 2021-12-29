import React from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import {
  Card,
  CardBody,
  Button,
  Input,
  Label,
  Textarea,
} from "@windmill/react-ui";
import SelectData from "react-select";

const Edit = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <>
      <PageTitle backButton={true}>Edit SPT</PageTitle>

      <Card className="overflow-visible mb-32">
        <CardBody>
          <div className="grid md:grid-cols-2">
            <div>
              <Label className="mt-1">
                <span>Kode SPT</span>
                <Input
                  type="text"
                  className="mt-1"
                  placeholder="Kode SPT"
                  readOnly
                />
              </Label>
              <Label className="space-y-1 mt-4">
                <span>Pelanggan</span>
                <SelectData
                  options={options}
                  placeholder="-- Pilih Pelanggan --"
                />
              </Label>
              <Label className="space-y-1 mt-4">
                <span>Marine</span>
                <SelectData
                  options={options}
                  placeholder="-- Pilih Marine --"
                />
              </Label>
              <Label className="space-y-1 mt-4">
                <span>Driver</span>
                <SelectData
                  options={options}
                  placeholder="-- Pilih Driver --"
                />
              </Label>

              <Label className="space-y-1 mt-4">
                <span>Tujuan</span>
                <SelectData
                  options={options}
                  placeholder="-- Pilih Tujuan --"
                />
              </Label>

              <Label className="mt-4">
                <span>Nama Kapal</span>
                <Input type="text" className="mt-1" placeholder="Nama Kapal" />
              </Label>
              <Label className="mt-4">
                <span>Tanggal</span>
                <Input type="date" className="mt-1" />
              </Label>

              <div className="mt-5 flex flex-col-reverse gap-2 md:justify-end md:flex-row">
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

export default Edit;
