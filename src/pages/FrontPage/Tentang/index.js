import Interweave from "interweave";
import React from "react";
import getImage from "../../../context/actions/Files/getImage";

const Tentang = ({ dataKonten }) => {
  return (
    <>
      <div className="section-tentang flex flex-col md:grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-8">
        <div className="section-tentang-description">
          <div className="title flex flex-col items-center md:block">
            <h1 className="text-center md:text-left text-2xl font-semibold mb-3">
              TENTANG
            </h1>
            <div className="line-container flex gap-5 mb-5">
              <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
              <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
              <span className="w-40 h-2 bg-blue-600 rounded-full inline-block"></span>
            </div>
          </div>
          <p className="text-lg font-thin text-gray-600 line leading-8 text-justify md:text-left">
            <Interweave content={dataKonten.tentang_kami} />
          </p>
        </div>
        <div className="section-tentang-gambar">
          <img
            src={getImage("", dataKonten.foto_tentang_kami)}
            alt={dataKonten.foto_tentang_kami}
          />
        </div>
      </div>
    </>
  );
};

export default Tentang;
