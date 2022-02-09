import React from "react";
import format from "date-fns/format";
import Interweave from "interweave";
import { PrintingComponentHeaderNotaV2 } from "../../../components/PrintingComponent";

export class ComponentToPrint extends React.Component {
  render() {
    const { dataKonten, nota } = this.props;

    const hitungTotalHarga = () => {
      const totHarga = nota.data_cetak_nota.reduce(add, 0);
      function add(accumulator, a) {
        return accumulator + a.harga;
      }

      return totHarga.toLocaleString("id", {
        style: "currency",
        currency: "IDR",
      });
    };

    const hitungTotalPotongan = () => {
      const totPotongan = nota.data_cetak_nota.reduce(add, 0);

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

    const marginTop = "30px";
    const marginBottom = "30px";
    const marginRight = "30px";
    const marginLeft = "30px";

    const getPageMargins = () => {
      return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
    };

    return (
      <>
        {/* <style>
        {getPageMargins()}
      </style> */}
        <div className="grid md:grid-cols-1">
          {/* Header */}
          <PrintingComponentHeaderNotaV2 dataKonten={dataKonten} />
          <div className="nota-sub-header flex justify-between pt-1 px-4 mb-10">
            <div>
              <table className="text-sm" style={{ width: 350 }}>
                <tr>
                  <td>No. Nota</td>
                  <td>:</td>
                  <td>{nota.no_nota}</td>
                </tr>
                <tr>
                  <td>Tanggal</td>
                  <td>:</td>
                  <td>{format(new Date(nota.tgl_nota), "dd-MM-y")}</td>
                </tr>
              </table>
            </div>
            <div>
              <table className="text-sm" style={{ width: 350 }}>
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
            <table className="w-full text-xs">
              <thead>
                <tr className="border-t-2 border-b-2 border-black text-left">
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
                {nota.data_cetak_nota.map((item, index) => (
                  <tr key={index} valign="top">
                    <td
                      className={
                        index + 1 === nota.data_cetak_nota.length
                          ? "pb-2"
                          : null
                      }
                    >
                      {index + 1}
                    </td>
                    <td>{format(new Date(item.waktu_buat), "dd-MM-y")}</td>
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
                      {hitungPotonganHarga(item.diskon, item.harga_tujuan)}
                    </td>
                    <td>
                      {item.harga.toLocaleString("id", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                ))}

                <tr className="border-t-2 border-b-2 border-black">
                  <td
                    colSpan={6}
                    className="font-semibold text-center border-r-2 border-black"
                  >
                    Total
                  </td>
                  <td>{hitungTotalPotongan()}</td>
                  <td>{hitungTotalHarga()}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="nota-ttd flex justify-between mt-3 px-10 text-sm">
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
    );
  }
}
