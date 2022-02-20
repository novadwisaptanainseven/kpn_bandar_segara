import format from "date-fns/format";
import React from "react";
import { PrintingComponentHeaderSPT } from "../../../components/PrintingComponent";
import getImage from "../../../context/actions/Files/getImage";

export class ComponentToPrint2 extends React.Component {
  render() {
    let printingPages = [];
    const { spt, dataKonten } = this.props;
    const fontSize = "text-md";

    for (const item of spt) {
      const TempTemplate = () => {
        return (
          <>
            <div
              key={item.id_spt}
              // style={{ width: "279.4mm" }}
            >
              <div className="pt-32">
                {/* Header */}
                {/* <PrintingComponentHeaderSPT dataKonten={dataKonten} /> */}

                {/* Title */}
                {/* <h1 className="text-md text-center my-3 font-semibold border-t-2 border-b-2 border-black dark:border-gray-300 w-full">
              SURAT PERINTAH TUGAS
            </h1> */}

                {/* Body */}
                <div className={`spt-body mx-5 mt-8 text-md ${fontSize}`}>
                  <div className="flex justify-between">
                    <span>
                      <b>Tgl. SPT :</b> {item.tgl_spt}
                    </span>
                    <span>
                      <b>No : </b>
                      {item.no_spt}
                    </span>
                  </div>

                  <div className="mt-8 mb-20">
                    <table
                      className={`w-full ${fontSize}`}
                      style={{ lineHeight: "2em" }}
                    >
                      <tr>
                        <th align="left">Pengguna</th>
                        <th align="left">:</th>
                        <td align="left">{item.nm_pelanggan.toUpperCase()}</td>
                      </tr>
                      <tr>
                        <th align="left">Perusahaan</th>
                        <th align="left">:</th>
                        <td align="left">{item.nm_perusahaan.toUpperCase()}</td>
                      </tr>
                      <tr>
                        <th align="left">Kode / Marine</th>
                        <th align="left">:</th>
                        <td align="left">{item.nm_marine.toUpperCase()}</td>
                      </tr>
                      <tr>
                        <th align="left">Kode / Driver</th>
                        <th align="left">:</th>
                        <td align="left">{item.nm_driver.toUpperCase()}</td>
                      </tr>
                      <tr>
                        <th align="left">Tujuan</th>
                        <th align="left">:</th>
                        <td align="left">{item.nm_tujuan.toUpperCase()}</td>
                      </tr>
                      <tr>
                        <th align="left">Tgl.Keberangkatan</th>
                        <th align="left">:</th>
                        <td align="left">{item.tgl_keberangkatan}</td>
                      </tr>
                      <tr>
                        <th align="left">Jam</th>
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

                  {/* <div className="flex justify-between text-center">
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
              </div> */}
                </div>
              </div>
            </div>
            <div style={{ pageBreakAfter: "always" }}></div>
          </>
        );
      };

      printingPages.push(<TempTemplate />);
    }

    return <div>{printingPages}</div>;
  }
}
