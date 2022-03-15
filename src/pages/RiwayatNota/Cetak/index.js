import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import PageTitle from "../../../components/Typography/PageTitle";
import { cetakRiwayatNotaById } from "../../../context/actions/RiwayatNota";
import { GlobalContext } from "../../../context/Provider";
import { Card, CardBody, Button } from "@windmill/react-ui";
import { format } from "date-fns";
import { PrintingComponentHeaderNota } from "../../../components/PrintingComponent";
import { ComponentToPrint } from "./ComponentToPrint";

const Cetak = () => {
  const match = useRouteMatch();
  const { params } = match;
  const { kontenState } = useContext(GlobalContext);
  const { data: dataKonten } = kontenState;
  const [riwayatNota, setRiwayatNota] = useState("");
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
    documentTitle: riwayatNota && riwayatNota.no_nota,
  });

  // Get data Nota by ID
  useEffect(() => {
    cetakRiwayatNotaById(params.id, setRiwayatNota);
  }, [params]);

  const hitungTotalHarga = () => {
    const totHarga = riwayatNota.data_cetak_nota.reduce(add, 0);
    function add(accumulator, a) {
      return accumulator + parseInt(a.harga);
    }

    return totHarga.toLocaleString("id", {
      style: "currency",
      currency: "IDR",
    });
  };

  const hitungTotalPotongan = () => {
    const totPotongan = riwayatNota.data_cetak_nota.reduce(add, 0);

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
          {!riwayatNota ? (
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
                        <td>{riwayatNota.no_nota}</td>
                      </tr>
                      <tr>
                        <td>Tanggal Nota</td>
                        <td>:</td>
                        <td>{riwayatNota.tgl_nota}</td>
                      </tr>
                    </table>
                  </div>
                  <div>
                    <table className="" style={{ width: 350 }}>
                      <tr valign="top">
                        <td className="w-32">Pelanggan</td>
                        <td>:</td>
                        <td>{riwayatNota.nm_pelanggan}</td>
                      </tr>
                      <tr valign="top">
                        <td>Perusahaan</td>
                        <td>:</td>
                        <td>{riwayatNota.nm_perusahaan}</td>
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
                        <th>Driver</th>
                        <th>Marine</th>
                        <th>Harga</th>
                        {/* <th>Diskon</th> */}
                        <th>Potongan</th>
                        <th>Total Harga</th>
                      </tr>
                    </thead>
                    <tbody>
                      {riwayatNota.data_cetak_nota.map((item, index) => (
                        <tr key={index} valign="top">
                          <td
                            className={
                              index + 1 === riwayatNota.data_cetak_nota.length
                                ? "pb-2"
                                : null
                            }
                          >
                            {index + 1}
                          </td>
                          <td>{item.tgl_spt}</td>
                          <td>{item.nm_tujuan}</td>
                          <td>{item.nm_driver}</td>
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
                          className="font-semibold text-cente dark:border-gray-200"
                        >
                          Total
                        </td>
                        <td>{hitungTotalPotongan()}</td>
                        <td>{hitungTotalHarga()}</td>
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
      {riwayatNota && (
        <div style={{ display: "none" }}>
          <ComponentToPrint
            ref={componentPrintRef}
            nota={riwayatNota}
            dataKonten={dataKonten}
          />
        </div>
      )}
    </>
  );
};

export default Cetak;
