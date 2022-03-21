import React, { useContext, useEffect, useRef, useState } from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import { Card, CardBody, Button } from "@windmill/react-ui";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "./ComponentToPrint";
import { GlobalContext } from "../../../context/Provider";
import { getSptById } from "../../../context/actions/SPT";
import { useRouteMatch } from "react-router-dom";
import { format } from "date-fns";
import { PrintingComponentHeaderSPT } from "../../../components/PrintingComponent";

const CetakSPT = () => {
  const match = useRouteMatch();
  const { params } = match;
  const { kontenState } = useContext(GlobalContext);
  const { data: dataKonten } = kontenState;
  const [spt, setSpt] = useState("");
  const componentPrintRef = useRef();
  // Handle print SPT
  const handlePrint = useReactToPrint({
    content: () => componentPrintRef.current,
    pageStyle: `
      @media print {
        @page {
          size: 100mm 150mm;
          margin: 5mm 5mm 5mm 5mm !important;
        }
      }
    `,
    copyStyles: true,
    documentTitle: spt.id_spt,
  });

  // Get data SPT by ID
  useEffect(() => {
    getSptById(params.id, setSpt);
  }, [params]);

  return (
    <>
      <PageTitle backButton={true}>Cetak SPT</PageTitle>
      <Card className="mb-32 text-sm">
        <CardBody className="text-gray-900 dark:text-gray-200">
          {!spt ? (
            <h1 className="text-xl">Loading ...</h1>
          ) : (
            <>
              <Button className="mb-3" onClick={handlePrint}>
                Cetak
              </Button>
              <div className=" grid md:grid-cols-2">
                <div className="border-2 border-black dark:border-gray-300 py-6">
                  {/* Header */}
                  <PrintingComponentHeaderSPT dataKonten={dataKonten} />

                  {/* Title */}
                  <h1 className="text-md text-center my-3 font-semibold border-t-2 border-b-2 border-black dark:border-gray-300 w-full">
                    SURAT PERINTAH TUGAS
                  </h1>

                  {/* Body */}
                  <div className="spt-body mx-8 mt-8">
                    <div className="flex justify-between">
                      <span>
                        <b>Tgl. SPT :</b> {spt.tgl_spt}
                      </span>
                      <span>
                        <b>No : </b>
                        {spt.no_spt}
                      </span>
                    </div>

                    <div className="mt-8 mb-20">
                      <table className="w-full" style={{ lineHeight: "2em" }}>
                        <tr>
                          <th align="left">Pengguna</th>
                          <th align="left">:</th>
                          <td align="left">{spt.nm_pelanggan.toUpperCase()}</td>
                        </tr>
                        <tr>
                          <th align="left">Perusahaan</th>
                          <th align="left">:</th>
                          <td align="left">
                            {spt.nm_perusahaan.toUpperCase()}
                          </td>
                        </tr>
                        <tr>
                          <th align="left">Kode / Marine</th>
                          <th align="left">:</th>
                          <td align="left">{spt.nm_marine.toUpperCase()}</td>
                        </tr>
                        <tr>
                          <th align="left">Kode / Driver</th>
                          <th align="left">:</th>
                          <td align="left">{spt.nm_driver.toUpperCase()}</td>
                        </tr>
                        <tr>
                          <th align="left">Tujuan</th>
                          <th align="left">:</th>
                          <td align="left">{spt.nm_tujuan.toUpperCase()}</td>
                        </tr>
                        <tr>
                          <th align="left">Tanggal</th>
                          <th align="left">:</th>
                          <td align="left">
                            {format(new Date(spt.tgl_keberangkatan), "dd-MM-y")}
                          </td>
                        </tr>
                        <tr>
                          <th align="left">Jam</th>
                          <th align="left">:</th>
                          <td align="left">
                            {spt.waktu_keberangkatan.toUpperCase()}
                          </td>
                        </tr>
                        <tr>
                          <th align="left">Keterangan</th>
                          <th align="left">:</th>
                          <td align="left">{spt.keterangan}</td>
                        </tr>
                      </table>
                    </div>

                    <div className="flex justify-between text-center">
                      <div>
                        <h1 className="mb-12">Mengetahui</h1>
                        <br />
                        <p>( .................................. )</p>
                      </div>
                      <div>
                        <h1 className="mb-12">Pengguna</h1>
                        <br />
                        <p>( .................................. )</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Component For Printing */}
          {spt && (
            <div style={{ display: "none" }}>
              <ComponentToPrint
                ref={componentPrintRef}
                spt={spt}
                dataKonten={dataKonten}
              />
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default CetakSPT;
