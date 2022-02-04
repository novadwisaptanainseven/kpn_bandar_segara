import React from "react";
import Interweave from "interweave";

const Footer = ({ dataKonten }) => {
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
                <div className="icon bg-blue-600 w-8 h-8 rounded-md"></div>
                <div className="icon bg-blue-600 w-8 h-8 rounded-md"></div>
                <div className="icon bg-blue-600 w-8 h-8 rounded-md"></div>
                <div className="icon bg-blue-600 w-8 h-8 rounded-md"></div>
              </div>
            </div>
            <p className="text-gray-600 text-sm italic mt-3 md:mt-0">
              Copyright &copy; {new Date().getFullYear()} |{" "}
              {dataKonten.nm_perusahaan}
            </p>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-700 mb-2">MAP</h1>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.4159110625418!2d117.15001641219295!3d-0.5045149848747043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df67f9f638b58dd%3A0xaff59e53b9b54536!2sKoperasi%20Bandar%20Segara!5e0!3m2!1sid!2sid!4v1643975070682!5m2!1sid!2sid"
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
