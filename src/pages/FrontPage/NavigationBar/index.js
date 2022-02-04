import React, { useState } from "react";
import getImage from "../../../context/actions/Files/getImage";
import { MenuIcon } from "../../../icons";
import { Link, animateScroll as scroll } from "react-scroll";

const NavigationBar = ({ dataKonten }) => {
  const closeBarClassName = "-translate-y-64 opacity-0";
  const [openBar, setOpenBar] = useState(closeBarClassName);
  const [linkActive, setLinkActive] = useState("beranda");

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
          <h1 className="text-xl font-semibold">{dataKonten.nm_perusahaan}</h1>
        </div>
        <div className="navbar-menu flex gap-20 items-center text-gray-500">
          <Link
            className={`hover:text-gray-900 cursor-pointer ${
              linkActive === "beranda" && "text-gray-900"
            }`}
            activeClass="active"
            to="section-beranda"
            spy={true}
            smooth={true}
            duration={800}
            onClick={() => setLinkActive("beranda")}
          >
            Beranda
          </Link>
          <Link
           className={`hover:text-gray-900 cursor-pointer ${
              linkActive === "tentang" && "text-gray-900"
            }`}
            activeClass="active"
            to="section-tentang"
            spy={true}
            smooth={true}
            duration={800}
            offset={-100}
            onClick={() => setLinkActive("tentang")}
          >
            Tentang
          </Link>
          <Link
           className={`hover:text-gray-900 cursor-pointer ${
              linkActive === "pelayanan" && "text-gray-900"
            }`}
            activeClass="active"
            to="section-pelayanan"
            spy={true}
            smooth={true}
            duration={800}
            offset={-100}
            onClick={() => setLinkActive("pelayanan")}
          >
            Pelayanan
          </Link>
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
        className={`navbar-menu-items fixed left-0 right-0 opacity-1 bg-white px-10 py-8 transition-all duration-300 transform z-20 shadow-lg ${openBar}`}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          alignItems: "center",
          top: 72,
        }}
      >
        <Link
          className="hover:text-gray-900 cursor-pointer"
          activeClass="active"
          to="section-beranda"
          spy={true}
          smooth={true}
          duration={800}
        >
          Beranda
        </Link>
        <Link
          className="hover:text-gray-900 cursor-pointer"
          activeClass="active"
          to="section-tentang"
          spy={true}
          smooth={true}
          duration={800}
          offset={-100}
        >
          Tentang
        </Link>
        <Link
          className="hover:text-gray-900 cursor-pointer"
          activeClass="active"
          to="section-pelayanan"
          spy={true}
          smooth={true}
          duration={800}
          offset={-100}
        >
          Pelayanan
        </Link>
      </div>
      {/* End of Mobile Device */}
      {/* End of Navigation Bar */}
    </>
  );
};

export default NavigationBar;
