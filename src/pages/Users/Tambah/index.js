import React, { useCallback, useEffect, useState } from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import {
  Card,
  CardBody,
  Button,
  Input,
  Label,
  Select,
} from "@windmill/react-ui";

const Tambah = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  // Menangani preview input gambar setelah dipilih
  const handleSelectedFile = useCallback(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // Free memory when ever this component is unmounted
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  useEffect(() => {
    handleSelectedFile();
  }, [handleSelectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  return (
    <>
      <PageTitle backButton={true}>Tambah Users</PageTitle>

      <Card className="overflow-visible mb-32">
        <CardBody>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>
                <span>Nama Lengkap</span>
                <Input className="mt-1" placeholder="Nama Users" />
              </Label>
              <Label className="mt-4">
                <span>Username</span>
                <Input className="mt-1" placeholder="Username" />
              </Label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 mt-4 gap-4">
            <Label>
              <span>Password</span>
              <Input className="mt-1" placeholder="********" />
            </Label>
            <Label>
              <span>Konfirmasi Password</span>
              <Input className="mt-1" placeholder="********" />
            </Label>
          </div>

          <div className="grid md:grid-cols-2 mt-4 gap-4">
            <div>
              <Label>
                <span>Level</span>
                <Select className="mt-1">
                  <option>Super Administrator</option>
                  <option>Administrator</option>
                </Select>
              </Label>
              <Label className="mt-4">
                <span>Foto</span>
                <Input
                  type="file"
                  className="mt-1"
                  onChange={(e) => onSelectFile(e)}
                />
                {preview && (
                  <img
                    src={preview}
                    alt={preview}
                    className="w-48 mt-2"
                    width={200}
                  />
                )}
                <span className="inline-block mt-1 text-xs text-gray-400">
                  Foto harus bertipe jpg, jpeg, atau png dengan ukuran kurang
                  dari 2 MB
                </span>
              </Label>
              <div className="mt-5 flex flex-col-reverse md:flex-row justify-end gap-2">
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
