import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DetailSkeletonLoading = ({ jumlahInput = 5 }) => {
  return (
    <div>
      {/* Loading skeleton light theme */}
      {localStorage.theme === "light" && (
        <>
          {Array.from(new Array(jumlahInput)).map((item, index) => (
            <div key={index} className="grid grid-cols-3 mb-2 gap-2">
              <div>
                <Skeleton height={30} />
              </div>
              <div className="col-span-2">
                <Skeleton height={30} />
              </div>
            </div>
          ))}
        </>
      )}

      {/* Loading skeleton dark theme */}
      {localStorage.theme === "dark" && (
        <SkeletonTheme baseColor="#1f2937" highlightColor="#374151">
          {Array.from(new Array(jumlahInput)).map((item, index) => (
            <div key={index} className="grid grid-cols-3 mb-2 gap-2">
              <div>
                <Skeleton height={30} />
              </div>
              <div className="col-span-2">
                <Skeleton height={30} />
              </div>
            </div>
          ))}
        </SkeletonTheme>
      )}
    </div>
  );
};

export default DetailSkeletonLoading;
