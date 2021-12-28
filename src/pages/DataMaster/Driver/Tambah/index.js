import React from "react";
import PageTitle from "../../../../components/Typography/PageTitle";
import {
  Card,
  CardBody,
  Button,
  Input,
  Label,
  Textarea,
} from "@windmill/react-ui";

const Tambah = () => {
  return (
    <>
      <PageTitle backButton={true}>Tambah Perusahaan</PageTitle>

      <Card className="overflow-visible">
        <CardBody>
          <div className="grid md:grid-cols-2">
            <div>
              <Label>
                <span>Nama Perusahaan</span>
                <Input className="mt-1" placeholder="Nama Perusahaan" />
              </Label>
              <Label className="mt-4">
                <span>Alamat Perusahaan</span>
                <Textarea
                  className="mt-1"
                  rows="3"
                  placeholder="Alamat Perusahaan"
                />
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
