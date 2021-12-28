import React from "react";

const ButtonExcel = ({ onClick = null }) => {
  return (
    <button
      onClick={onClick}
      className="bg-lime-300 px-4 text-sm font-semibold rounded-md text-gray-700 transition ease-in-out duration-150 focus:outline-none hover:bg-lime-400 hover:border-2 hover:border-lime-200 py-2"
    >
      Excel
    </button>
  );
};

export default ButtonExcel;
