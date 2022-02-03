import Interweave from "interweave";
import React from "react";
import getImage from "../../../context/actions/Files/getImage";

const PrintingComponentHeaderNotaV2 = ({ dataKonten }) => {
  return (
    <div className="nota-header flex gap-5 justify-between items-center border-t-4 border-b-4 border-black py-2 px-4">
      <div className="font-semibold text-lg">NOTA TRANSAKSI</div>
      <div className="text-right">
        <span className="font-semibold text-md block">
          {dataKonten.title_website}
        </span>
        <span className="text-sm">
          <Interweave content={dataKonten.alamat} />
        </span>
      </div>
    </div>
  );
};

export default PrintingComponentHeaderNotaV2;
