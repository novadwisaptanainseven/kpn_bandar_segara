import React from "react";
import Interweave from "interweave";
import getImage from "../../../context/actions/Files/getImage";

const Footer = ({ dataKonten, kontak }) => {
  return (
    <>
      <div className="footer mt-10 flex justify-between flex-col md:flex-row gap-6 bg-gray-200 py-10 px-6 md:px-24">
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-700 mb-2">
            {dataKonten.nm_perusahaan}
          </h1>

          <div className="flex flex-col h-full justify-between md:pb-10">
            <div>
              <p className="text-gray-600 text-sm">
                <Interweave content={dataKonten.alamat} />
              </p>
              <div className="mt-2 flex gap-2">
                {kontak.map((item, index) => (
                  <div
                    key={index}
                    className="icon bg-blue-600 w-8 h-8 rounded-md p-1 transition ease-in-out duration-200 transform cursor-pointer hover:scale-110"
                  >
                    <a href={item.link} target="_blank" title={item.nm_kontak}>
                      <img
                        className="w-full"
                        src={getImage("foto_kontak", item.icon)}
                        alt={item.icon}
                      />
                    </a>
                  </div>
                ))}
                {/* <div className="icon bg-blue-600 w-8 h-8 rounded-md"></div> */}
              </div>
            </div>
            <p className="text-gray-600 text-sm italic mt-3 md:mt-0">
              Copyright &copy; {new Date().getFullYear()} |{" "}
              {dataKonten.nm_perusahaan}
            </p>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-700 mb-2">PETA</h1>
          <iframe
            src={dataKonten.link_map}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Footer;
