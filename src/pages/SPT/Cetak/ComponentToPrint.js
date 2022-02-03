import format from "date-fns/format";
import React from "react";
import { PrintingComponentHeaderSPT } from "../../../components/PrintingComponent";
import getImage from "../../../context/actions/Files/getImage";

export class ComponentToPrint extends React.Component {
  render() {
    const { dataKonten, spt } = this.props;

    return (
      <>
        <div style={{ width: "279.4mm" }}>
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
                  <b>Tgl. SPT :</b>{" "}
                  {format(new Date(spt.waktu_buat), "dd/MM/y")}
                </span>
                <span>
                  <b>No : </b>
                  {spt.no_spt}
                </span>
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
                    <td align="left">{spt.nm_marine.toUpperCase()}</td>
                  </tr>
                  <tr>
                    <th align="left">Kode / Nama Driver</th>
                    <th align="left">:</th>
                    <td align="left">{spt.nm_driver.toUpperCase()}</td>
                  </tr>
                  <tr>
                    <th align="left">Tujuan</th>
                    <th align="left">:</th>
                    <td align="left">{spt.nm_tujuan.toUpperCase()}</td>
                  </tr>
                  <tr>
                    <th align="left">Tanggal Keberangkatan</th>
                    <th align="left">:</th>
                    <td align="left">
                      {format(new Date(spt.tgl_keberangkatan), "dd-MM-y")}
                    </td>
                  </tr>
                  <tr>
                    <th align="left">Jam Keberangkatan</th>
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
    );
  }
}
