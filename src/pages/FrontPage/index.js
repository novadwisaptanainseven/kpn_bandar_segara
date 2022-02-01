import React, { useContext, useEffect, useState } from "react";
import ThemedSuspense from "../../components/ThemedSuspense";
import { getKonten } from "../../context/actions/Konten";
import { GlobalContext } from "../../context/Provider";
import NavigationBar from "./NavigationBar";

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
          <div className="carousel">
            <button className="carousel__button carousel__button--left">
              <img src="img/arrow-left.png" alt="arrow left" />
            </button>
            <div className="carousel__track-container">
              <ul className="carousel__track">
                <li className="carousel__slide">
                  <img className="carousel__image" src="img/img-carousel1.jpg" alt="img-carousel" />
                </li>
                <li className="carousel__slide">
                  <img className="carousel__image" src="img/img-carousel2.jpg" alt="img-carousel" />
                </li>
                <li className="carousel__slide">
                  <img className="carousel__image" src="img/img-carousel3.jpg" alt="img-carousel" />
                </li>
              </ul>
            </div>
            <button className="carousel__button carousel__button--right">
              <img src="img/arrow-right.png" alt="arrow right" />
            </button>

            <div className="carousel__nav">
              <button className="carousel__indicator current-slide"></button>
              <button className="carousel__indicator"></button>
              <button className="carousel__indicator"></button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FrontPage;
