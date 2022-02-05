import React, { useContext, useEffect, useState } from "react";
import ThemedSuspense from "../../components/ThemedSuspense";
import { getKontenFrontPage } from "../../context/actions/Konten";
import { getGaleriFrontPage } from "../../context/actions/Galeri";
import { GlobalContext } from "../../context/Provider";
import Carousel from "./Carousel";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";
import Pelayanan from "./Pelayanan";
import Tentang from "./Tentang";

const FrontPage = () => {
  const { kontenState, kontenDispatch } = useContext(GlobalContext);
  const { data: dataKonten, loading } = kontenState;
  const [galeri, setGaleri] = useState("");

  useEffect(() => {
    // Get konten
    getKontenFrontPage(kontenDispatch);
    // Get galeri carousel image
    getGaleriFrontPage(setGaleri);
  }, [kontenDispatch]);

  return (
    <>
      {!dataKonten && !galeri ? (
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
            <Tentang />

            {/* Section Pelayanan */}
            <Pelayanan dataKonten={dataKonten} />
          </div>

          {/* Footer */}
          <Footer dataKonten={dataKonten} />
        </>
      )}
    </>
  );
};

export default FrontPage;
