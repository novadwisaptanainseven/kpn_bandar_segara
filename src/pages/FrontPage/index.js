import React, { useContext, useEffect, useState } from "react";
import ThemedSuspense from "../../components/ThemedSuspense";
import { getKonten } from "../../context/actions/Konten";
import { GlobalContext } from "../../context/Provider";
import Carousel from "./Carousel";
import NavigationBar from "./NavigationBar";
import Tentang from "./Tentang";

const FrontPage = () => {
  const { kontenState, kontenDispatch } = useContext(GlobalContext);
  const { data: dataKonten, loading } = kontenState;

  // Get konten
  useEffect(() => {
    getKonten(kontenDispatch);
  }, [kontenDispatch]);

  return (
    <>
      {!dataKonten ? (
        <>
          <ThemedSuspense />
        </>
      ) : (
        <>
          {/* Navigation Bar */}
          <NavigationBar dataKonten={dataKonten} />

          {/* Slideshow */}
          <Carousel dataKonten={dataKonten} autoPlay={true} interval={10000} />

          {/* Content */}
          <div className="content px-5 md:px-24 py-12 ">
            {/* Section Tentang */}
            <Tentang />
          </div>
        </>
      )}
    </>
  );
};

export default FrontPage;
