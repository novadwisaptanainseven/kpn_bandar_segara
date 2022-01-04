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
import { GlobalContext } from "../../../../context/Provider";
import { insertMarine } from "../../../../context/actions/Marine";
import { Formik } from "formik";

import initState from "../Formik/initState";
import validationSchema from "../Formik/validationSchema";

const Tambah = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { marineDispatch } = useContext(GlobalContext);

  const handleFormSubmit = (values) => {
    console.log(values);

    insertMarine(values, setLoading, history, marineDispatch);
  };

  return (
    <>
      <PageTitle backButton={true}>Tambah Marine</PageTitle>

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
                    <span>Nama Marine</span>
                    <Input
                      className="mt-1"
                      placeholder="Nama Marine"
                      name="nm_marine"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nm_marine || ""}
                      className={`mt-1 ${
                        errors.nm_marine ? "border-red-500" : null
                      }`}
                    />
                    {errors.nm_marine && (
                      <HelperText valid={false}>{errors.nm_marine}</HelperText>
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
