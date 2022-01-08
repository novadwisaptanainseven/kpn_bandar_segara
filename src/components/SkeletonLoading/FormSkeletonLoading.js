import React from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FormSkeletonLoading = ({ jumlahInput = 3 }) => {
  return (
    <>
      {/* Loading Skeleton Light Theme */}
      {localStorage.theme === "light" && (
        <>
          {Array.from(new Array(jumlahInput)).map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-3 gap-2">
                <Skeleton height={30} className="mb-1" />
              </div>
              <div className="grid grid-cols-2">
                <Skeleton height={30} className="mb-3" />
              </div>
            </div>
          ))}

          <div className="grid grid-cols-6 gap-2">
            <div className="col-start-2">
              <Skeleton height={30} />
            </div>
            <div className="col-start-3">
              <Skeleton height={30} />
            </div>
          </div>
        </>
      )}
      {/* Loading Skeleton Dark Theme */}
      {localStorage.theme === "dark" && (
        <>
          {Array.from(new Array(jumlahInput)).map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-3 gap-2">
                <Skeleton
                  height={30}
                  className="mb-1"
                  baseColor="#1f2937"
                  highlightColor="#374151"
                />
              </div>
              <div className="grid grid-cols-2">
                <Skeleton
                  height={30}
                  className="mb-3"
                  baseColor="#1f2937"
                  highlightColor="#374151"
                />
              </div>
            </div>
          ))}

          <div className="grid grid-cols-6 gap-2">
            <div className="col-start-2">
              <Skeleton
                height={30}
                baseColor="#1f2937"
                highlightColor="#374151"
              />
            </div>
            <div className="col-start-3">
              <Skeleton
                height={30}
                baseColor="#1f2937"
                highlightColor="#374151"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FormSkeletonLoading;
