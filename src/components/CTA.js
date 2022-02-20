import React, { useContext } from "react";
import { GlobalContext } from "../context/Provider";

function CTA() {
  const {kontenState} = useContext(GlobalContext);
  const {data: dataKonten} = kontenState;

  return (
    <div className="p-4 mb-8 text-sm text-purple-100 bg-purple-600 rounded-lg shadow-md">
      <h1 className="text-4xl mb-2 font-semibold">
        {dataKonten.nm_perusahaan}
      </h1>
      <p className="text-md">
        {dataKonten.deskripsi_aplikasi}
      </p>
    </div>
  );
}

export default CTA;
