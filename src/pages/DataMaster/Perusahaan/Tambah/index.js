import React, { useContext, useState } from "react";
import PageTitle from "../../../../components/Typography/PageTitle";
import {
  Card,
  CardBody,
  Button,
  Input,
  Label,
  Textarea,
  HelperText,
} from "@windmill/react-ui";

import validationSchema from "../Formik/validationSchema";
import initState from "../Formik/initState";
import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useHistory } from "react-router-dom";
import { insertPerusahaan } from "../../../../context/actions/Perusahaan";
import { Formik } from "formik";
import { GlobalContext } from "../../../../context/Provider";
const Swal = withReactContent(swal2);

const Tambah = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { perusahaanDispatch } = useContext(GlobalContext);

  const handleFormSubmit = (values) => {
    // console.log(values);

    insertPerusahaan(values, setLoading, history, perusahaanDispatch);
  };

  return (
    <>
      <PageTitle backButton={true}>Tambah Perusahaan</PageTitle>

      <Card className="overflow-visible">
        <CardBody>
          <Formik
            initialValues={initState}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            }) => (
              <form className="grid md:grid-cols-2" onSubmit={handleSubmit}>
                <div>
                  <Label>
                    <span>Nama Perusahaan</span>
                    <Input
                      className={`mt-1 ${
                        errors.nm_perusahaan ? "border-red-500" : null
                      }`}
                      placeholder="Nama Perusahaan"
                      name="nm_perusahaan"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nm_perusahaan || ""}
                    />
                    {errors.nm_perusahaan && (
                      <HelperText valid={false}>
                        {errors.nm_perusahaan}
                      </HelperText>
                    )}
                  </Label>
                  <Label className="mt-4">
                    <span>Keterangan Perusahaan</span>
                    <Textarea
                      className={`mt-1 ${
                        errors.keterangan ? "border-red-500" : null
                      }`}
                      rows="3"
                      placeholder="Keterangan Perusahaan"
                      name="keterangan"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.keterangan || ""}
                    />
                    {errors.keterangan && (
                      <HelperText valid={false}>{errors.keterangan}</HelperText>
                    )}
                  </Label>

                  <div className="mt-5 flex justify-end gap-2">
                    <Button layout="outline" onClick={handleReset}>
                      Reset
                    </Button>
                    <Button type="submit" disabled={loading ? true : false}>
                      {loading ? "Loading..." : "Simpan"}
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default Tambah;
