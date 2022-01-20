import React, { useContext, useEffect, useRef, useState } from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import { Card, CardBody } from "@windmill/react-ui";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "../ReactToPrint/ComponentToPrint";
import { GlobalContext } from "../../../context/Provider";
import getImage from "../../../context/actions/Files/getImage";
import style from "./printStyle.module.css";
import { getSptById } from "../../../context/actions/SPT";
import { useRouteMatch } from "react-router-dom";
import { format } from "date-fns";

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
          size: 330mm 210mm;
        }
      }
    `,
    copyStyles: true,
    documentTitle: "SPT",
  });

  // Get data SPT by ID
  useEffect(() => {
    getSptById(params.id, setSpt);
  }, [params]);

  return (
    <>
      <PageTitle backButton={true}>Cetak SPT</PageTitle>
      <Card className="mb-32 text-sm">
        <CardBody className="text-gray-900 dark:text-gray-200 grid md:grid-cols-2">
          {!spt ? (
            <h1 className="text-xl">Loading ...</h1>
          ) : (
            <div className="border-2 border-black dark:border-gray-300 py-6">
              {/* Header */}
              <div className="spt-header flex items-center flex-col mx-10">
                <img
                  src={getImage("", dataKonten.logo)}
                  alt="logo"
                  className="w-24 mb-3"
                />
                <h1 className="text-lg font-semibold">
                  {dataKonten.title_website}
                </h1>
                <h2 className="text-md">
                  {dataKonten.alamat
                    ? dataKonten.alamat
                    : "Jalan Yos Sudarso No. 2 Samarinda, Kalimantan Timur"}
                </h2>
                <h2 className="text-md">
                  No. HP:
                  {" " +
                    (dataKonten.no_hp ? dataKonten.no_hp : "+62 857-5013-8028")}
                </h2>
              </div>

              {/* Title */}
              <h1 className="text-md text-center my-3 font-semibold border-t-2 border-b-2 border-black dark:border-gray-300 w-full">
                SURAT PERINTAH TUGAS
              </h1>

              {/* Body */}
              <div className="spt-body mx-8 mt-8">
                <div className="flex justify-between">
                  <span>
                    Tanggal: {format(new Date(spt.tgl_spt), "dd/MM/y")} | 09:00
                  </span>
                  <span>{spt.id_spt}</span>
                </div>

                <div className="mt-8 mb-20">
                  <table className="w-full" style={{ lineHeight: "2em" }}>
                    <tr>
                      <th align="left">Nama Pengguna</th>
                      <th align="left">:</th>
                      <td align="left">{spt.nm_pelanggan.toUpperCase()}</td>
                    </tr>
                    <tr>
                      <th align="left">Nama Perusahaan</th>
                      <th align="left">:</th>
                      <td align="left">{spt.nm_perusahaan.toUpperCase()}</td>
                    </tr>
                    <tr>
                      <th align="left">Kode / Nama Marine</th>
                      <th align="left">:</th>
                      <td align="left">M15 / {spt.nm_marine.toUpperCase()}</td>
                    </tr>
                    <tr>
                      <th align="left">Kode / Nama Driver</th>
                      <th align="left">:</th>
                      <td align="left">DS1 / {spt.nm_driver.toUpperCase()}</td>
                    </tr>
                    <tr>
                      <th align="left">Tujuan</th>
                      <th align="left">:</th>
                      <td align="left">{spt.nm_tujuan.toUpperCase()}</td>
                    </tr>
                    <tr>
                      <th align="left">Keterangan</th>
                      <th align="left">:</th>
                      <td align="left">Survei TB DANNY 96</td>
                    </tr>
                  </table>
                </div>

                <div className="flex justify-between text-center">
                  <div>
                    <h1 className="mb-12">Mengetahui</h1>
                    <p>( .................................. )</p>
                  </div>
                  <div>
                    <h1 className="mb-12">Pengguna</h1>
                    <p>( .................................. )</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default CetakSPT;