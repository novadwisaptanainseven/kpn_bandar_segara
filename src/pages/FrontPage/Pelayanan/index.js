import React from "react";
import getImage from "../../../context/actions/Files/getImage";

const Pelayanan = ({ pelayanan }) => {
  return (
    <>
      <div className="section-pelayanan mt-20">
        <div className="title flex flex-col items-center">
          <h1 className="text-2xl font-semibold mb-3 text-center">PELAYANAN</h1>
          <div className="line-container flex gap-5 mb-5">
            <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
            <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
            <span className="w-40 h-2 bg-blue-600 rounded-full inline-block"></span>
          </div>
        </div>

        <div className="pelayanan-cards mt-3 flex justify-center flex-wrap gap-10">
          {pelayanan.map((item, index) => (
            <div
              key={index}
              className="w-full md:w-64 card bg-white p-4 rounded-md shadow-lg border border-gray-200 text-center text-gray-600 transition duration-200 ease-in-out hover:bg-blue-600 hover:text-white"
            >
              <img
                src={getImage("foto_pelayanan", item.icon)}
                alt={item.icon}
                className="w-24 mx-auto mb-6"
              />
              <h1 className="font-semibold text-lg mb-3">
                {item.nm_pelayanan}
              </h1>
              <p className="text-md">{item.keterangan}</p>
            </div>
          ))}
          {/* <div className="w-full md:w-64 card bg-white p-4 rounded-md shadow-lg border border-gray-200 text-center text-gray-600 transition duration-200 ease-in-out hover:bg-blue-600 hover:text-white">
            <img src="img/boat.png" alt="boat" className="w-24 mx-auto mb-6" />
            <h1 className="font-semibold text-lg mb-3">Transportasi</h1>
            <p className="text-md">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Assumenda ut consequuntur maxime dolores nesciunt doloremque eum
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Pelayanan;
