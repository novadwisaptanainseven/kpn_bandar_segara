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
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint2 } from "./ComponentToPrint2";
import { simpanCetakNota } from "../../../context/actions/Nota";
import {
  FooterNota,
  PrintingComponentHeaderNota,
} from "../../../components/PrintingComponent";

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
    history.push(`/simantra/nota`);
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
                {/* Header */}
                <PrintingComponentHeaderNota dataKonten={dataKonten} />
                <div className="nota-sub-header flex justify-between pt-1 px-4 mb-2">
                  <div>
                    <table className="" style={{ width: 350 }}>
                      <tr>
                        <td>No. Nota</td>
                        <td>:</td>
                        <td>{nota.no_cetak_nota}</td>
                      </tr>
                      <tr>
                        <td>Tanggal Nota</td>
                        <td>:</td>
                        <td>{nota.tgl_nota}</td>
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
                        <th>Tanggal</th>
                        <th>Tujuan</th>
                        {/* <th>Driver</th> */}
                        <th>Keterangan</th>
                        <th>Marine</th>
                        <th>Harga</th>
                        {/* <th>Diskon</th> */}
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
                          <td>{item.tgl_keberangkatan}</td>
                          <td>{item.nm_tujuan}</td>
                          <td>{item.keterangan}</td>
                          <td>{item.nm_marine}</td>
                          <td>
                            {item.harga_tujuan.toLocaleString("id", {
                              style: "currency",
                              currency: "IDR",
                            })}
                          </td>
                          {/* <td>{item.diskon} %</td> */}
                          <td>
                            {hitungPotonganHarga(
                              item.diskon,
                              item.harga_tujuan
                            )}
                          </td>
                          <td>
                            {parseInt(item.harga).toLocaleString("id", {
                              style: "currency",
                              currency: "IDR",
                            })}
                          </td>
                        </tr>
                      ))}

                      <tr className="border-t-2 border-b-2 border-black dark:border-gray-200">
                        <td
                          colSpan={6}
                          className="font-semibold text-center dark:border-gray-200"
                        >
                          Total
                        </td>
                        <td>{hitungTotalPotongan(nota)}</td>
                        <td>{hitungTotalHarga(nota)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <FooterNota />
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
