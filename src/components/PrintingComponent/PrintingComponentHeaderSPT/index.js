import Interweave from "interweave";
import React from "react";
import getImage from "../../../context/actions/Files/getImage";

const PrintingComponentHeaderSPT = ({ dataKonten }) => {
  return (
    <div className="spt-header flex items-center flex-col mx-10 text-center">
      <img
        src={getImage("", dataKonten.logo)}
        alt="logo"
        className="w-24 mb-3"
      />
      <h1 className="text-lg font-semibold">{dataKonten.nm_perusahaan}</h1>
      <h2 className="text-md">
        <Interweave content={dataKonten.alamat} />
      </h2>
      <h2 className="text-md">
        No. HP:
        {" " + (dataKonten.no_hp ? dataKonten.no_hp : "+62 857-5013-8028")}
      </h2>
    </div>
  );
};

export default PrintingComponentHeaderSPT;
