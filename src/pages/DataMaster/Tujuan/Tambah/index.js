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
      <PageTitle backButton={true}>Tambah Tujuan</PageTitle>

      <Card className="overflow-visible">
        <CardBody>
          <div className="grid md:grid-cols-2">
            <div>
              <Label>
                <span>Nama Tujuan</span>
                <Input className="mt-1" placeholder="Nama Tujuan" />
              </Label>
              <Label className="mt-4">
                <span>Harga Tujuan</span>
                <Textarea
                  className="mt-1"
                  rows="3"
                  placeholder="Harga Tujuan"
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
