import React, { useContext, useEffect, useState } from "react";
import ThemedSuspense from "../../components/ThemedSuspense";
import { getKontenFrontPage } from "../../context/actions/Konten";
import { getGaleriFrontPage } from "../../context/actions/Galeri";
import { getPelayananFrontPage } from "../../context/actions/Pelayanan";
import { GlobalContext } from "../../context/Provider";
import Carousel from "./Carousel";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";
import Pelayanan from "./Pelayanan";
import Tentang from "./Tentang";
import { getKontakFrontPage } from "../../context/actions/Kontak";

const FrontPage = () => {
  const { kontenState, kontenDispatch } = useContext(GlobalContext);
  const { data: dataKonten, loading } = kontenState;
  const [galeri, setGaleri] = useState("");
  const [pelayanan, setPelayanan] = useState("");
  const [kontak, setKontak] = useState("");

  useEffect(() => {
    // Get konten
    getKontenFrontPage(kontenDispatch);
    // Get galeri carousel image
    getGaleriFrontPage(setGaleri);
    // Get pelayanan
    getPelayananFrontPage(setPelayanan);
    // Get kontak
    getKontakFrontPage(setKontak);
  }, [kontenDispatch]);

  return (
    <>
      {!dataKonten || !galeri || !pelayanan || !kontak ? (
        <>
          <ThemedSuspense />
        </>
      ) : (
        <>
          {/* Navigation Bar */}
          <NavigationBar dataKonten={dataKonten} />

          {/* Slideshow */}
          <Carousel
            dataKonten={dataKonten}
            galeri={galeri}
            autoPlay={true}
            interval={10000}
          />

          {/* Content */}
          <div className="content px-5 md:px-24 py-12 ">
            {/* Section Tentang */}
            <Tentang dataKonten={dataKonten} />

            {/* Section Pelayanan */}
            <Pelayanan pelayanan={pelayanan} />
          </div>

          {/* Footer */}
          <Footer dataKonten={dataKonten} kontak={kontak} />
        </>
      )}
    </>
  );
};

export default FrontPage;
