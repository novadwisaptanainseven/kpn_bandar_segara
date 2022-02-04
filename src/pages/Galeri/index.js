import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Input,
  Label,
  HelperText,
} from "@windmill/react-ui";
import PageTitle from "../../components/Typography/PageTitle";
import DataTable from "./DataTable";
import { useHistory, useRouteMatch } from "react-router-dom";
import { GlobalContext } from "../../context/Provider";
import { getGaleri, insertGaleri } from "../../context/actions/Galeri";
import { TableSkeletonLoading } from "../../components/SkeletonLoading";

const Galeri = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { path } = match;
  const { galeriState, galeriDispatch } = useContext(GlobalContext);
  const { loading, data: dataGaleri } = galeriState;
  const [foto, setFoto] = useState({
    value: "",
    error: "",
  });
  const [loadingUpload, setLoadingUpload] = useState(false);

  // Get galeri
  useEffect(() => {
    getGaleri(galeriDispatch);
  }, [galeriDispatch]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    const errorMessages = {
      required: "Gambar belum dipilih",
      wrongType: "Ekstensi gambar harus bertipe jpg, jpeg, atau png",
    };

    // Allowed Extension
    const EXT_ALLOW = ["image/jpg", "image/jpeg", "image/png"];

    // Validation
    // Required
    if (!file) {
      setFoto({
        ...foto,
        error: errorMessages.required,
      });

      return;
    }

    // Extension Checking
    if (!EXT_ALLOW.includes(file.type)) {
      setFoto({
        ...foto,
        error: errorMessages.wrongType,
      });

      return;
    }

    // If all validation success, clean the error
    setFoto({
      ...foto,
      value: file,
      error: "",
    });
  };

  // Fungsi handle upload foto galeri
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("foto", foto.value);

    for (let pair of formData.entries()) {
      console.log(pair);
    }

    insertGaleri(formData, setLoadingUpload, galeriDispatch);
  };

  return (
    <>
      <PageTitle>Foto Galeri</PageTitle>

      <Card className="mb-8 shadow-md">
        <CardBody>
          <div className="flex flex-col-reverse md:flex-row gap-2 mb-5 md:items-center">
            <Button
              onClick={handleUpload}
              disabled={
                !foto.value || foto.error || loadingUpload ? true : false
              }
            >
              {loadingUpload ? "Loading..." : "Upload"}
            </Button>
            <Label>
              <Input
                type="file"
                name="foto"
                placeholder="Upload foto galeri"
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleChange(e)}
              />
            </Label>
            <HelperText valid={false}>{foto.error}</HelperText>
          </div>

          {!dataGaleri && loading && <TableSkeletonLoading />}

          {/* Table */}
          {dataGaleri && (
            <DataTable response={dataGaleri} resultsPerPage={10} />
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default Galeri;
