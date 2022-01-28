import format from "date-fns/format";
import React from "react";
import getImage from "../../../context/actions/Files/getImage";

export class ComponentToPrint extends React.Component {
  render() {
    return (
      <>
        <div style={{ width: "279.4mm" }}>
          <div className="border-2 border-black dark:border-gray-300 py-6">
            {/* Header */}
            <div className="spt-header flex items-center flex-col mx-10">
              <img
                src={getImage("", this.props.dataKonten.logo)}
                alt="logo"
                className="w-24 mb-3"
              />
              <h1 className="text-lg font-semibold">
                {this.props.dataKonten.title_website}
              </h1>
              <h2 className="text-md text-center">
                {this.props.dataKonten.alamat
                  ? this.props.dataKonten.alamat
                  : "Jalan Yos Sudarso No. 2 Samarinda, Kalimantan Timur"}
              </h2>
              <h2 className="text-md">
                No. HP:
                {" " +
                  (this.props.dataKonten.no_hp
                    ? this.props.dataKonten.no_hp
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
                  {format(new Date(this.props.spt.waktu_buat), "dd/MM/y")}
                </span>
                <span>
                  <b>No : </b>
                  {this.props.spt.no_spt}
                </span>
              </div>

              <div className="mt-8 mb-20">
                <table className="w-full" style={{ lineHeight: "2em" }}>
                  <tr>
                    <th align="left">Nama Pengguna</th>
                    <th align="left">:</th>
                    <td align="left">
                      {this.props.spt.nm_pelanggan.toUpperCase()}
                    </td>
                  </tr>
                  <tr>
                    <th align="left">Nama Perusahaan</th>
                    <th align="left">:</th>
                    <td align="left">
                      {this.props.spt.nm_perusahaan.toUpperCase()}
                    </td>
                  </tr>
                  <tr>
                    <th align="left">Kode / Nama Marine</th>
                    <th align="left">:</th>
                    <td align="left">
                      {this.props.spt.nm_marine.toUpperCase()}
                    </td>
                  </tr>
                  <tr>
                    <th align="left">Kode / Nama Driver</th>
                    <th align="left">:</th>
                    <td align="left">
                      {this.props.spt.nm_driver.toUpperCase()}
                    </td>
                  </tr>
                  <tr>
                    <th align="left">Tujuan</th>
                    <th align="left">:</th>
                    <td align="left">
                      {this.props.spt.nm_tujuan.toUpperCase()}
                    </td>
                  </tr>
                  <tr>
                    <th align="left">Tanggal Keberangkatan</th>
                    <th align="left">:</th>
                    <td align="left">
                      {format(
                        new Date(this.props.spt.tgl_keberangkatan),
                        "dd-MM-y"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th align="left">Jam Keberangkatan</th>
                    <th align="left">:</th>
                    <td align="left">
                      {this.props.spt.waktu_keberangkatan.toUpperCase()}
                    </td>
                  </tr>
                  <tr>
                    <th align="left">Keterangan</th>
                    <th align="left">:</th>
                    <td align="left">{this.props.spt.keterangan}</td>
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
