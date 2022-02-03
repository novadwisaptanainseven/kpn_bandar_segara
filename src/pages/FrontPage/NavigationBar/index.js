import React, { useState } from "react";
import getImage from "../../../context/actions/Files/getImage";
import { MenuIcon } from "../../../icons";

const NavigationBar = ({ dataKonten }) => {
  const closeBarClassName = "-translate-y-64 opacity-0";
  const [openBar, setOpenBar] = useState(closeBarClassName);

  // Handle Toggle Sidebar
  const toggleSidebar = () => {
    if (openBar === closeBarClassName) {
      // Jika bar masih tertutup
      setOpenBar("translate-y-0 opacity-1");
    } else {
      // Jika bar sedang tertutup
      setOpenBar(closeBarClassName);
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      {/* Desktop Device */}
      <div
        className="navbar fixed top-0 left-0 right-0 px-20 py-3 hidden md:flex md:justify-between bg-white shadow-lg"
        style={{ zIndex: 999 }}
      >
        <div className="navbar-brand flex items-center gap-4">
          <img
            src={getImage(dataKonten.logo, "")}
            alt="Logo Brand"
            className="w-12"
          />
          <h1 className="text-xl font-semibold">{dataKonten.title_website}</h1>
        </div>
        <div className="navbar-menu flex gap-20 items-center text-gray-500">
          <a href="." className="hover:text-gray-900">
            Beranda
          </a>
          <a href="." className="hover:text-gray-900">
            Tentang
          </a>
          <a href="." className="hover:text-gray-900">
            Kontak
          </a>
        </div>
      </div>
      {/* End of Desktop Device */}

      {/* Mobile Device*/}
      <div className="navbar fixed top-0 left-0 right-0 bg-white flex justify-between px-10 py-3 md:hidden z-20">
        <div className="navbar-brand flex items-center gap-4">
          <img
            src={getImage(dataKonten.logo, "")}
            alt="Logo Brand"
            className="w-12"
          />
          {/* <h1 className="text-xl font-semibold">
                {dataKonten.title_website}
              </h1> */}
        </div>
        <div className="navbar-menu flex gap-20 items-center text-gray-500">
          <button
            className="p-1 -ml-1 rounded-md focus:outline-none focus:shadow-outline-purple text-purple-600"
            onClick={toggleSidebar}
            aria-label="Menu"
          >
            <MenuIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      {/* List Menu Hamburger */}
      <div
        className={`navbar-menu-items fixed left-0 right-0 opacity-1 bg-white px-10 py-8 transition-all duration-300 transform z-20 ${openBar}`}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          alignItems: "center",
          top: 72,
        }}
      >
        <a href="." className="hover:text-gray-900">
          Beranda
        </a>
        <a href="." className="hover:text-gray-900">
          Tentang
        </a>
        <a href="." className="hover:text-gray-900">
          Kontak
        </a>
      </div>
      {/* End of Mobile Device */}
      {/* End of Navigation Bar */}
    </>
  );
};

export default NavigationBar;
