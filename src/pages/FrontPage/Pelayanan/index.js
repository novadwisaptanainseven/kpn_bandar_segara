import React from "react";

const Pelayanan = ({ dataKonten }) => {
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

        <div className="pelayanan-cards mt-3 flex justify-around gap-10 flex-col md:flex-row">
          <div className="card bg-white p-4 rounded-md shadow-lg border border-gray-200 text-center text-gray-600 transition duration-200 ease-in-out hover:bg-blue-600 hover:text-white">
            <h1 className="font-semibold text-lg mb-3">Pelayanan 1</h1>
            <p className="text-md">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Assumenda ut consequuntur maxime dolores nesciunt doloremque eum
            </p>
          </div>
          <div className="card bg-white p-4 rounded-md shadow-lg border border-gray-200 text-center text-gray-600 transition duration-200 ease-in-out hover:bg-blue-600 hover:text-white">
            <h1 className="font-semibold text-lg mb-3">Pelayanan 2</h1>
            <p className="text-md">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Assumenda ut consequuntur maxime dolores nesciunt doloremque eum
            </p>
          </div>
          <div className="card bg-white p-4 rounded-md shadow-lg border border-gray-200 text-center text-gray-600 transition duration-200 ease-in-out hover:bg-blue-600 hover:text-white">
            <h1 className="font-semibold text-lg mb-3">Pelayanan 3</h1>
            <p className="text-md">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Assumenda ut consequuntur maxime dolores nesciunt doloremque eum
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pelayanan;
