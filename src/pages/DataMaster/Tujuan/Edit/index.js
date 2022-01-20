import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../../../components/Typography/PageTitle";
import {
  Card,
  CardBody,
  Button,
  Input,
  Label,
  HelperText,
  Textarea,
} from "@windmill/react-ui";

import validationSchema from "../Formik/validationSchema";
import initState from "../Formik/initState";
import { Formik } from "formik";

import { useHistory, useRouteMatch } from "react-router-dom";

import { editTujuan, getTujuanById } from "../../../../context/actions/Tujuan";
import { FormSkeletonLoading } from "../../../../components/SkeletonLoading";
import { GlobalContext } from "../../../../context/Provider";

const Edit = () => {
  const match = useRouteMatch();
  const { params } = match;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [tujuan, setTujuan] = useState("");
  const { tujuanDispatch } = useContext(GlobalContext);

  // Get tujuan by id tujuan
  useEffect(() => {
    getTujuanById(params.id, setTujuan);
  }, [params]);

  const handleFormSubmit = (values) => {
    editTujuan(params.id, values, setLoading, history, tujuanDispatch);
  };

  return (
    <>
      <PageTitle backButton={true}>Edit Tujuan</PageTitle>

      <Card className="overflow-visible">
        <CardBody>
          {!tujuan ? (
            <FormSkeletonLoading jumlahInput={3} />
          ) : (
            <Formik
              initialValues={initState(tujuan)}
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
                      <span>ID Tujuan</span>
                      <Input
                        className="mt-1"
                        name="id_tujuan"
                        value={values.id_tujuan || ""}
                        disabled
                      />
                    </Label>
                    <Label className="mt-4">
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
                        <HelperText valid={false}>
                          {errors.nm_tujuan}
                        </HelperText>
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
                    <Label className="mt-4">
                      <span>Keterangan</span>
                      <Textarea
                        placeholder="Keterangan"
                        name="keterangan"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.keterangan || ""}
                        rows={3}
                        className={`mt-1 ${
                          errors.keterangan ? "border-red-500" : null
                        }`}
                      />
                      {errors.keterangan && (
                        <HelperText valid={false}>
                          {errors.keterangan}
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
