import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../../../components/Typography/PageTitle";
import {
  Card,
  CardBody,
  Button,
  Input,
  Label,
  HelperText,
} from "@windmill/react-ui";
import { useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../../../context/Provider";
import { editDriver, getDriverById } from "../../../../context/actions/Driver";
import initState from "../Formik/initState";
import validationSchema from "../Formik/validationSchema";
import { Formik } from "formik";
import { FormSkeletonLoading } from "../../../../components/SkeletonLoading";

const Edit = () => {
  const match = useRouteMatch();
  const { params } = match;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [driver, setDriver] = useState("");
  const { driverDispatch } = useContext(GlobalContext);

  // Get driver by id marine
  useEffect(() => {
    getDriverById(params.id, setDriver);
  }, [params]);

  const handleFormSubmit = (values) => {
    editDriver(params.id, values, setLoading, history, driverDispatch);
  };

  return (
    <>
      <PageTitle backButton={true}>Edit Driver</PageTitle>

      <Card className="overflow-visible">
        <CardBody>
          {!driver ? (
            <FormSkeletonLoading jumlahInput={2} />
          ) : (
            <Formik
              initialValues={initState(driver)}
              validationSchema={validationSchema}
              enableReinitialize
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
                      <span>ID Driver</span>
                      <Input
                        className="mt-1"
                        name="id_driver"
                        value={values.id_driver || ""}
                        disabled
                      />
                    </Label>
                    <Label className="mt-4">
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
                        <HelperText valid={false}>
                          {errors.nm_driver}
                        </HelperText>
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
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default Edit;
