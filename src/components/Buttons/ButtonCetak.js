import React from "react";

const ButtonCetak = ({ onClick = null, children, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gray-600 px-4 text-sm font-semibold rounded-md text-gray-200 transition ease-in-out duration-150 focus:outline-none hover:bg-gray-700 hover:border-2 hover:border-lime-200 py-2 ${
        disabled && "cursor-not-allowed bg-gray-400"
      }`}
    >
      {children}
    </button>
  );
};

export default ButtonCetak;
