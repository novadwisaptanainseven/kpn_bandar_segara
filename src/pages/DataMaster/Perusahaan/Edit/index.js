import React, { useContext, useEffect, useState } from "react";
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

import { Formik } from "formik";

import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FormSkeletonLoading } from "../../../../components/SkeletonLoading";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  editPerusahaan,
  getPerusahaanById,
} from "../../../../context/actions/Perusahaan";
import { GlobalContext } from "../../../../context/Provider";

const Swal = withReactContent(swal2);

const Edit = () => {
  const match = useRouteMatch();
  const { params } = match;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [perusahaan, setPerusahaan] = useState("");
  const { perusahaanDispatch } = useContext(GlobalContext);

  // Get tujuan by id tujuan
  useEffect(() => {
    getPerusahaanById(params.id, setPerusahaan);
  }, [params]);

  const handleFormSubmit = (values) => {
    editPerusahaan(params.id, values, setLoading, history, perusahaanDispatch);
  };

  return (
    <>
      <PageTitle backButton={true}>Edit Perusahaan</PageTitle>

      <Card className="overflow-visible">
        <CardBody>
          {!perusahaan ? (
            <FormSkeletonLoading jumlahInput={3} />
          ) : (
            <Formik
              initialValues={initState(perusahaan)}
              enableReinitialize={true}
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
                      <span>ID Perusahaan</span>
                      <Input
                        className="mt-1"
                        name="id_perusahaan"
                        value={values.id_perusahaan || ""}
                        disabled
                      />
                    </Label>
                    <Label className="mt-4">
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
