import React, { useContext, useState } from "react";
import PageTitle from "../../../../components/Typography/PageTitle";
import {
  Card,
  CardBody,
  Button,
  Input,
  Label,
  HelperText,
} from "@windmill/react-ui";
import { useHistory } from "react-router-dom";
import { insertTujuan } from "../../../../context/actions/Tujuan";
import { Formik } from "formik";
import initState from "../Formik/initState";
import validationSchema from "../Formik/validationSchema";
import { GlobalContext } from "../../../../context/Provider";

const Tambah = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { tujuanDispatch } = useContext(GlobalContext);

  const handleFormSubmit = (values) => {
    // console.log(values);

    insertTujuan(values, setLoading, history, tujuanDispatch);
  };

  return (
    <>
      <PageTitle backButton={true}>Tambah Tujuan</PageTitle>

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
                    <span>Nama Tujuan</span>
                    <Input
                      placeholder="Nama Tujuan"
                      name="nm_tujuan"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nm_tujuan || ""}
                      className={`mt-1 ${
                        errors.nm_tujuan ? "border-red-500" : null
                      }`}
                    />
                    {errors.nm_tujuan && (
                      <HelperText valid={false}>{errors.nm_tujuan}</HelperText>
                    )}
                  </Label>
                  <Label className="mt-4">
                    <span>Harga Tujuan</span>
                    <Input
                      placeholder="Harga Tujuan"
                      name="harga"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.harga || ""}
                      className={`mt-1 ${
                        errors.harga ? "border-red-500" : null
                      }`}
                    />
                    {errors.harga && (
                      <HelperText valid={false}>{errors.harga}</HelperText>
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
