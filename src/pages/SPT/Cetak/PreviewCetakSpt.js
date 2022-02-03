import React, { useContext, useEffect, useRef } from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import { Card, CardBody, Button } from "@windmill/react-ui";
import { GlobalContext } from "../../../context/Provider";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import {
  hitungPotonganHarga,
  hitungTotalHarga,
  hitungTotalPotongan,
} from "../../../helpers/GlobalFunctions";
import Interweave from "interweave";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint2 } from "./ComponentToPrint2";
import { simpanCetakNota } from "../../../context/actions/Nota";
import getImage from "../../../context/actions/Files/getImage";

const PreviewCetakSpt = () => {
  const { cetakSptState, kontenState, sptDispatch } = useContext(GlobalContext);
  const { data: spt } = cetakSptState;
  const { data: dataKonten } = kontenState;
  const componentPrintRef = useRef();

  // Handle print Spt
  const handlePrint = useReactToPrint({
    content: () => componentPrintRef.current,
    pageStyle: `
      @media print {
        @page {
          size: 210mm 297mm;
          margin: 10mm 10mm 10mm 10mm !important;
        }
      }
    `,
    copyStyles: true,
    documentTitle: "SPT",
  });

  const history = useHistory();

  if (!spt) {
    history.push(`/app/spt`);
  }

  return (
    <>
      <PageTitle backButton={true}>Cetak SPT</PageTitle>
      <Card className="mb-32 text-sm">
        <CardBody>
          {!spt ? (
            <h1 className="text-xl">Loading ...</h1>
          ) : (
            <>
              <Button className="mb-3" onClick={handlePrint}>
                Cetak
              </Button>
              <div className="grid md:grid-cols-2 gap-3">
                {spt.data_spt.map((item, index) => (
                  <div className="border-2 border-black dark:border-gray-300 py-6">
                    {/* Header */}
                    <div className="spt-header flex items-center flex-col mx-10 text-center">
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
                          (dataKonten.no_hp
                            ? dataKonten.no_hp
                            : "+62 857-5013-8028")}
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
                          <b>Tgl. SPT :</b>{" "}
                          {format(new Date(item.waktu_buat), "dd/MM/y")}
                        </span>
                        <span>
                          <b>No : </b>
                          {item.no_spt}
                        </span>
                      </div>

                      <div className="mt-8 mb-20">
                        <table className="w-full" style={{ lineHeight: "2em" }}>
                          <tr>
                            <th align="left">Nama Pengguna</th>
                            <th align="left">:</th>
                            <td align="left">
                              {item.nm_pelanggan.toUpperCase()}
                            </td>
                          </tr>
                          <tr>
                            <th align="left">Nama Perusahaan</th>
                            <th align="left">:</th>
                            <td align="left">
                              {item.nm_perusahaan.toUpperCase()}
                            </td>
                          </tr>
                          <tr>
                            <th align="left">Kode / Nama Marine</th>
                            <th align="left">:</th>
                            <td align="left">{item.nm_marine.toUpperCase()}</td>
                          </tr>
                          <tr>
                            <th align="left">Kode / Nama Driver</th>
                            <th align="left">:</th>
                            <td align="left">{item.nm_driver.toUpperCase()}</td>
                          </tr>
                          <tr>
                            <th align="left">Tujuan</th>
                            <th align="left">:</th>
                            <td align="left">{item.nm_tujuan.toUpperCase()}</td>
                          </tr>
                          <tr>
                            <th align="left">Tanggal Keberangkatan</th>
                            <th align="left">:</th>
                            <td align="left">
                              {format(
                                new Date(item.tgl_keberangkatan),
                                "dd-MM-y"
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th align="left">Jam Keberangkatan</th>
                            <th align="left">:</th>
                            <td align="left">
                              {item.waktu_keberangkatan.toUpperCase()}
                            </td>
                          </tr>
                          <tr>
                            <th align="left">Keterangan</th>
                            <th align="left">:</th>
                            <td align="left">{item.keterangan}</td>
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
                ))}
              </div>
            </>
          )}
        </CardBody>
      </Card>

      {/* Component For Printing */}
      {spt && (
        <div style={{ display: "none" }}>
          <ComponentToPrint2
            ref={componentPrintRef}
            spt={spt.data_spt}
            dataKonten={dataKonten}
          />
        </div>
      )}
    </>
  );
};

export default PreviewCetakSpt;
