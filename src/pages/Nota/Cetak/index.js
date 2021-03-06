import React, { useContext, useEffect, useRef, useState } from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import { Card, CardBody, Button } from "@windmill/react-ui";
import { useReactToPrint } from "react-to-print";
import { GlobalContext } from "../../../context/Provider";
import { useRouteMatch } from "react-router-dom";
import { format } from "date-fns";
import { getNotaById, simpanCetakNota } from "../../../context/actions/Nota";
import { ComponentToPrint } from "./ComponentToPrint";
import {
  FooterNota,
  PrintingComponentHeaderNota,
} from "../../../components/PrintingComponent";
import { useHistory } from "react-router-dom";

const Cetak = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { params } = match;
  const { kontenState, notaDispatch, listCetakNotaState } =
    useContext(GlobalContext);
  const { data: dataKonten } = kontenState;
  const { data: listCetakNota } = listCetakNotaState;
  const [nota, setNota] = useState("");
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
    documentTitle: nota && nota.data_nota.id_nota,
    onAfterPrint: () => simpanCetakNota(listCetakNota, history, notaDispatch),
  });

  // Get data Nota by ID
  useEffect(() => {
    getNotaById(params.id, setNota);
  }, [params]);

  const hitungTotalHarga = () => {
    const totHarga = nota.data_spt.reduce(add, 0);
    function add(accumulator, a) {
      return accumulator + parseInt(a.harga);
    }

    return totHarga.toLocaleString("id", {
      style: "currency",
      currency: "IDR",
    });
  };

  const hitungTotalPotongan = () => {
    const totPotongan = nota.data_spt.reduce(add, 0);

    function add(accumulator, a) {
      const potonganHarga = (a.diskon / 100) * a.harga_tujuan;
      return accumulator + potonganHarga;
    }

    return totPotongan.toLocaleString("id", {
      style: "currency",
      currency: "IDR",
    });
  };

  const hitungPotonganHarga = (diskon, hargaTujuan) => {
    return ((diskon / 100) * hargaTujuan).toLocaleString("id", {
      style: "currency",
      currency: "IDR",
    });
  };

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
                        <td>{nota.data_nota.no_nota}</td>
                      </tr>
                      <tr>
                        <td>Tanggal</td>
                        <td>:</td>
                        <td>
                          {format(
                            new Date(nota.data_nota.waktu_buat),
                            "dd-MMM-y"
                          )}
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div>
                    <table className="" style={{ width: 350 }}>
                      <tr valign="top">
                        <td className="w-32">Pelanggan</td>
                        <td>:</td>
                        <td>{nota.data_nota.nm_pelanggan}</td>
                      </tr>
                      <tr valign="top">
                        <td>Perusahaan</td>
                        <td>:</td>
                        <td>{nota.data_nota.nm_perusahaan}</td>
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
                        <th>Keterangan</th>
                        <th>Marine</th>
                        <th>Harga</th>
                        <th>Potongan</th>
                        {/* <th>Potongan</th> */}
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
                            {parseInt(item.harga_tujuan).toLocaleString("id", {
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
                        <td>{hitungTotalPotongan()}</td>
                        <td>{hitungTotalHarga()}</td>
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
          <ComponentToPrint
            ref={componentPrintRef}
            nota={nota}
            dataKonten={dataKonten}
          />
        </div>
      )}
    </>
  );
};

export default Cetak;
