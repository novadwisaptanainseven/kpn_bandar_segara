import React from "react";

const Tentang = () => {
  return (
    <>
      <div className="section-tentang flex flex-col md:grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-8">
        <div className="section-tentang-description">
          <div className="title flex flex-col items-center md:block">
            <h1 className="text-center md:text-left text-2xl font-semibold mb-3">
              TENTANG KAMI
            </h1>
            <div className="line-container flex gap-5 mb-5">
              <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
              <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
              <span className="w-40 h-2 bg-blue-600 rounded-full inline-block"></span>
            </div>
          </div>
          <p className="text-lg font-thin text-gray-600 line leading-8 text-justify md:text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            amet, quae libero assumenda, debitis illo illum optio tempore omnis
            praesentium fugiat dignissimos officia aperiam atque officiis dolore
            reiciendis cumque perspiciatis! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Repellat hic aliquam quam molestiae,
            soluta molestias libero tempora nemo numquam recusandae voluptatibus
            provident quos laboriosam necessitatibus totam suscipit consequatur
            eaque at?
          </p>
        </div>
        <div className="section-tentang-gambar">
          <img src="img/about.svg" alt="gambar-about" />
        </div>
      </div>
    </>
  );
};

export default Tentang;
