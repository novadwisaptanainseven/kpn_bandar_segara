import Interweave from "interweave";
import React from "react";
import getImage from "../../../context/actions/Files/getImage";

const PrintingComponentHeaderNota = ({ dataKonten }) => {
  return (
    <div className="nota-header flex gap-5 justify-between items-center border-t-4 border-b-4 border-black dark:border-gray-200 py-2 px-4 ">
      <div className="font-semibold text-xl">NOTA TRANSAKSI</div>
      <div className="text-right flex items-center gap-5">
        <div>
          <span className="font-semibold text-lg block">
            {dataKonten.nm_perusahaan}
          </span>
          <span>
            <Interweave content={dataKonten.alamat} />
          </span>
        </div>
        <div>
          <img
            className="w-16"
            src={getImage("", dataKonten.logo)}
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
};

export default PrintingComponentHeaderNota;
