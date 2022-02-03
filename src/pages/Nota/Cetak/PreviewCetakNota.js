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

const PreviewCetakNota = () => {
  const { cetakNotaState, kontenState, listCetakNotaState, notaDispatch } =
    useContext(GlobalContext);
  const { data: nota } = cetakNotaState;
  const { data: listCetakNota } = listCetakNotaState;
  const { data: dataKonten } = kontenState;
  const componentPrintRef = useRef();

  // Handle print nota
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
    documentTitle: nota && nota.id_nota,
    onAfterPrint: () => simpanCetakNota(listCetakNota, history, notaDispatch),
  });

  const history = useHistory();

  if (!nota) {
    history.push(`/app/nota`);
  }

  return (
    <>
      <PageTitle backButton={true}>Cetak Nota</PageTitle>
      <Card className="mb-32 text-sm">
        <CardBody className="text-gray-900 dark:text-gray-200">
          {!nota ? (
            <h1 className="text-xl">Loading ...</h1>
          ) : (
            <>
              <Button className="mb-3" onClick={handlePrint}>
                Cetak
              </Button>
              <div className="grid md:grid-cols-1">
                <div className="nota-header flex gap-5 justify-between items-center border-t-4 border-b-4 border-black dark:border-gray-200 py-2 px-4 ">
                  <div className="font-semibold text-xl">NOTA TRANSAKSI</div>
                  <div className="text-right">
                    <span className="font-semibold text-lg block">
                      {dataKonten.title_website}
                    </span>
                    <span>
                      <Interweave content={dataKonten.alamat} />
                    </span>
                  </div>
                </div>
                <div className="nota-sub-header flex justify-between pt-1 px-4 mb-10">
                  <div>
                    <table className="" style={{ width: 350 }}>
                      <tr>
                        <td>No. Nota</td>
                        <td>:</td>
                        <td>{nota.no_cetak_nota}</td>
                      </tr>
                      <tr>
                        <td>Tanggal</td>
                        <td>:</td>
                        <td>{format(new Date(nota.tgl_nota), "dd-MM-y")}</td>
                      </tr>
                    </table>
                  </div>
                  <div>
                    <table className="" style={{ width: 350 }}>
                      <tr valign="top">
                        <td className="w-32">Pelanggan</td>
                        <td>:</td>
                        <td>{nota.nm_pelanggan}</td>
                      </tr>
                      <tr valign="top">
                        <td>Perusahaan</td>
                        <td>:</td>
                        <td>{nota.nm_perusahaan}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div className="nota-table-items w-full">
                  <table className="w-full">
                    <thead>
                      <tr className="border-t-2 border-b-2 border-black dark:border-gray-200 text-left">
                        <th>No.</th>
                        <th>Tujuan</th>
                        <th>Driver</th>
                        <th>Marine</th>
                        <th>Harga</th>
                        <th>Diskon</th>
                        <th>Potongan</th>
                        <th>Total Harga</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nota.data_spt.map((item, index) => (
                        <tr key={item.id_spt} valign="top">
                          <td
                            className={
                              index + 1 === nota.data_spt.length ? "pb-2" : null
                            }
                          >
                            {index + 1}
                          </td>
                          <td>{item.nm_tujuan}</td>
                          <td>{item.nm_driver}</td>
                          <td>{item.nm_marine}</td>
                          <td>
                            {item.harga_tujuan.toLocaleString("id", {
                              style: "currency",
                              currency: "IDR",
                            })}
                          </td>
                          <td>{item.diskon} %</td>
                          <td>
                            {hitungPotonganHarga(
                              item.diskon,
                              item.harga_tujuan
                            )}
                          </td>
                          <td>
                            {item.harga.toLocaleString("id", {
                              style: "currency",
                              currency: "IDR",
                            })}
                          </td>
                        </tr>
                      ))}

                      <tr className="border-t-2 border-b-2 border-black dark:border-gray-200">
                        <td
                          colSpan={6}
                          className="font-semibold text-center border-r-2 border-black dark:border-gray-200"
                        >
                          Total
                        </td>
                        <td>{hitungTotalPotongan(nota)}</td>
                        <td>{hitungTotalHarga(nota)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="nota-ttd flex justify-between mt-3 px-10">
                  <div className="text-center w-48">
                    <h1 className="font-semibold">Tanda Terima</h1>
                    <br />
                    <br />
                    <br />
                    <span>.......................................</span>
                  </div>
                  <div className="text-center w-48">
                    <h1 className="font-semibold">Hormat Kami</h1>
                    <br />
                    <br />
                    <br />
                    <span>.......................................</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardBody>
      </Card>

      {/* Component For Printing */}
      {nota && (
        <div style={{ display: "none" }}>
          <ComponentToPrint2
            ref={componentPrintRef}
            nota={nota}
            dataKonten={dataKonten}
          />
        </div>
      )}
    </>
  );
};

export default PreviewCetakNota;
