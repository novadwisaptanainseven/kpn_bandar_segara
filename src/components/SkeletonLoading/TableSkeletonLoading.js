import React from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TableSkeletonLoading = () => {
  return (
    <>
      {/* Loading Skeleton Light Theme */}
      {localStorage.theme === "light" && (
        <>
          <Skeleton height={40} className="mb-3" />
          <Skeleton count={5} />
        </>
      )}
      {/* Loading Skeleton Dark Theme */}
      {localStorage.theme === "dark" && (
        <>
          <SkeletonTheme baseColor="#1f2937" highlightColor="#374151">
            <Skeleton height={40} className="mb-3" />
            <Skeleton count={5} />
          </SkeletonTheme>
        </>
      )}
    </>
  );
};

export default TableSkeletonLoading;
