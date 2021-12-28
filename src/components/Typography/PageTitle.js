import React from "react";
import { useHistory } from "react-router-dom";

function PageTitle({ children, backButton }) {
  const history = useHistory();

  const goBack = (e) => {
    e.preventDefault();

    history.goBack();
  };

  return (
    <div
      className={`my-6 flex items-center space-x-2 text-gray-700 dark:text-gray-200`}
    >
      {backButton && (
        <a href="." onClick={(e) => goBack(e)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
        </a>
      )}
      <h1 className="text-2xl font-semibold ">{children}</h1>
    </div>
  );
}

export default PageTitle;
