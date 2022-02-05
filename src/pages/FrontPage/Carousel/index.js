import React, { useEffect } from "react";
import getImage from "../../../context/actions/Files/getImage";

const Carousel = ({ autoPlay, interval, galeri }) => {
  useEffect(() => {
    if (!galeri) {
      return;
    }

    const carouselContainer = document.querySelector(`.carousel`);
    const track = document.querySelector(`.carousel__track`);
    const slides = Array.from(track.children);
    const dotsNav = document.querySelector(`.carousel__nav`);
    const dots = Array.from(dotsNav.children);
    const nextButton = document.querySelector(`.carousel__button--right`);
    const prevButton = document.querySelector(`.carousel__button--left`);
    if (slides.length === 1) {
      nextButton.classList.add("is-hidden");
    }

    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange the slides next to one another
    const setSlidePosition = (slide, index) => {
      slide.style.left = slideWidth * index + "px";
    };
    slides.forEach(setSlidePosition);

    // Handle moving to the next slide
    const moveToSlide = (track, currentSlide, targetSlide) => {
      track.style.transform = `translateX(-${targetSlide.style.left})`;
      currentSlide.classList.remove(`current-slide`);
      targetSlide.classList.add(`current-slide`);
    };

    // Handle update dots
    const updateDots = (currentDot, targetDot) => {
      currentDot.classList.remove(`current-slide`);
      targetDot.classList.add(`current-slide`);
    };

    // Handle hide and show arrows
    const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
      if (targetIndex === 0) {
        prevButton.classList.add(`is-hidden`);
        nextButton.classList.remove(`is-hidden`);
      } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove(`is-hidden`);
        nextButton.classList.add(`is-hidden`);
      } else {
        prevButton.classList.remove(`is-hidden`);
        nextButton.classList.remove(`is-hidden`);
      }
    };

    // Handle reset inisialization slide in first condition
    const resetInitSlide = () => {
      slides.forEach((slide) => {
        slide.classList.remove(`current-slide`);
      });
      dots.forEach((dot) => {
        dot.classList.remove(`current-slide`);
      });
      slides[0].classList.add(`current-slide`);
      dots[0].classList.add(`current-slide`);
      track.style.transform = `translateX(0)`;
      prevButton.classList.add(`is-hidden`);
      nextButton.classList.remove(`is-hidden`);
    };

    // When click next button
    nextButton.addEventListener("click", (e) => {
      const currentSlide = track.querySelector(`.current-slide`);
      const nextSlide = currentSlide.nextElementSibling;
      const currentDot = dotsNav.querySelector(`.current-slide`);
      const nextDot = currentDot.nextElementSibling;
      const nextIndex = slides.findIndex((slide) => slide === nextSlide);

      moveToSlide(track, currentSlide, nextSlide);
      updateDots(currentDot, nextDot);
      hideShowArrows(slides, prevButton, nextButton, nextIndex);
    });

    // When click prev button
    prevButton.addEventListener("click", (e) => {
      const currentSlide = track.querySelector(`.current-slide`);
      const prevSlide = currentSlide.previousElementSibling;
      const currentDot = dotsNav.querySelector(`.current-slide`);
      const prevDot = currentDot.previousElementSibling;
      const prevIndex = slides.findIndex((slide) => slide === prevSlide);

      moveToSlide(track, currentSlide, prevSlide);
      updateDots(currentDot, prevDot);
      hideShowArrows(slides, prevButton, nextButton, prevIndex);
    });

    // When click indicator nav button
    dotsNav.addEventListener(`click`, (e) => {
      const targetDot = e.target.closest(`button`);

      if (!targetDot) return;

      const currentSlide = track.querySelector(`.current-slide`);
      const currentDot = dotsNav.querySelector(`.current-slide`);
      const targetIndex = dots.findIndex((dot) => dot === targetDot);
      const targetSlide = slides[targetIndex];

      moveToSlide(track, currentSlide, targetSlide);
      updateDots(currentDot, targetDot);

      hideShowArrows(slides, prevButton, nextButton, targetIndex);
    });

    // Autoplay Carousel
    if (galeri.length > 1 && autoPlay) {
      setInterval(() => {
        const currentSlide = track.querySelector(`.current-slide`);
        const targetSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector(`.current-slide`);
        const targetDot = currentDot.nextElementSibling;
        const currentSlideIndex = slides.findIndex(
          (slide) => slide === currentSlide
        );
        const targetDotIndex = dots.findIndex((dot) => dot === targetDot);

        // Jika sudah berada di slide akhir
        if (currentSlideIndex === slides.length - 1) {
          resetInitSlide();
        } else {
          moveToSlide(track, currentSlide, targetSlide);
          updateDots(currentDot, targetDot);
          hideShowArrows(slides, prevButton, nextButton, currentSlideIndex + 1);
        }
      }, [interval]);
    }
  }, []);

  return (
    <>
      <div className="section-beranda carousel">
        <button className="carousel__button carousel__button--left focus:outline-none opacity-50 hover:opacity-100 transition-opacity duration-200 is-hidden">
          <img src="img/arrow-left.png" alt="arrow left" />
        </button>
        <div
          className="carousel-text absolute z-10 left-0 right-0 text-center px-6 py-3 bg-black bg-opacity-25 md:hidden"
          style={{ top: "30%" }}
        >
          <h1
            className="text-4xl font-semibold text-white"
            style={{ textShadow: "1px 3px 6px rgba(0,0,0,0.5)" }}
          >
            KPN Bandar Segara
          </h1>
        </div>
        <div className="carousel__track-container">
          <ul className="carousel__track">
            {galeri && galeri.length === 0 && (
              <>
                {Array.from(new Array(4)).map((item, index) => (
                  <li
                    key={index}
                    className={`carousel__slide ${
                      index === 0 && `current-slide`
                    }`}
                  >
                    <img
                      className="carousel__image"
                      src={`img/img-carousel${index + 1}.jpg`}
                      alt="img-carousel"
                    />
                  </li>
                ))}
              </>
            )}

            {galeri && galeri.length > 0 && (
              <>
                {galeri.map((item, index) => (
                  <li
                    key={index}
                    className={`carousel__slide ${
                      index === 0 && `current-slide`
                    }`}
                  >
                    <img
                      className="carousel__image"
                      src={getImage("foto_galeri", item.foto)}
                      alt={item.foto}
                    />
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
        <button className="carousel__button carousel__button--right focus:outline-none opacity-50 hover:opacity-100 transition-opacity duration-200">
          <img src="img/arrow-right.png" alt="arrow right" />
        </button>

        <div className="carousel__nav">
          {Array.from(new Array(galeri.length)).map((item, index) => (
            <button
              key={index}
              className={`carousel__indicator focus:outline-none ${
                index === 0 && "current-slide"
              }`}
            ></button>
          ))}
          {/* <button className="carousel__indicator focus:outline-none"></button>
          <button className="carousel__indicator focus:outline-none"></button> */}
        </div>
      </div>
    </>
  );
};

export default Carousel;
