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
import { useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { GlobalContext } from "../../../../context/Provider";
import { editMarine, getMarineById } from "../../../../context/actions/Marine";
import validationSchema from "../Formik/validationSchema";
import initState from "../Formik/initState";
import { Formik } from "formik";
import { FormSkeletonLoading } from "../../../../components/SkeletonLoading";

const Edit = () => {
  const match = useRouteMatch();
  const { params } = match;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [marine, setMarine] = useState("");
  const { marineDispatch } = useContext(GlobalContext);

  // Get marine by id marine
  useEffect(() => {
    getMarineById(params.id, setMarine);
  }, [params]);

  const handleFormSubmit = (values) => {
    editMarine(params.id, values, setLoading, history, marineDispatch);
  };

  return (
    <>
      <PageTitle backButton={true}>Edit Marine</PageTitle>

      <Card className="overflow-visible">
        <CardBody>
          {!marine ? (
            <FormSkeletonLoading jumlahInput={2} />
          ) : (
            <Formik
              initialValues={initState(marine)}
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
                      <span>ID Marine</span>
                      <Input
                        className="mt-1"
                        name="id_marine"
                        value={values.id_marine || ""}
                        disabled
                      />
                    </Label>
                    <Label className="mt-4">
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
                        <HelperText valid={false}>
                          {errors.nm_marine}
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
