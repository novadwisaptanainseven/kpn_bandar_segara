import Interweave from "interweave";
import React from "react";
import getImage from "../../../context/actions/Files/getImage";

const PrintingComponentHeaderNotaV2 = ({ dataKonten }) => {
  return (
    <div className="nota-header flex gap-5 justify-between items-center border-t-4 border-b-4 border-black py-2 px-4">
      <div className="font-semibold text-lg">NOTA TRANSAKSI</div>
      <div className="text-right flex items-center gap-5">
        <div>
          <span className="font-semibold text-sm block">
            {dataKonten.nm_perusahaan}
          </span>
          <span className="text-sm">
            <Interweave content={dataKonten.alamat} />
          </span>
        </div>
        <div>
          <img
            className="w-12"
            src={getImage("", dataKonten.logo)}
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
};

export default PrintingComponentHeaderNotaV2;
