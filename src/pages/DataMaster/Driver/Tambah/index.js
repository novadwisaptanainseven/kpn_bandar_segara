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

import { Formik } from "formik";

import initState from "../Formik/initState";
import validationSchema from "../Formik/validationSchema";
import { GlobalContext } from "../../../../context/Provider";
import { insertDriver } from "../../../../context/actions/Driver";
import { useHistory } from "react-router-dom";

const Tambah = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { driverDispatch } = useContext(GlobalContext);

  const handleFormSubmit = (values) => {
    // console.log(values);

    insertDriver(values, setLoading, history, driverDispatch);
  };

  return (
    <>
      <PageTitle backButton={true}>Tambah Driver</PageTitle>

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
                    <span>Nama Driver</span>
                    <Input
                      placeholder="Nama Driver"
                      name="nm_driver"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nm_driver || ""}
                      className={`mt-1 ${
                        errors.nm_driver ? "border-red-500" : null
                      }`}
                    />
                    {errors.nm_driver && (
                      <HelperText valid={false}>{errors.nm_driver}</HelperText>
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
