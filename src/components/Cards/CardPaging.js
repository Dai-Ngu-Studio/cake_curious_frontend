import React from "react";
import { useDispatch } from "react-redux";

const CardPaging = ({ totalPages, page, handleChangePage }) => {
  const dispatch = useDispatch();
  const pages = Array.from({ length: totalPages }, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > totalPages) {
      newPage = 1;
    }
    dispatch(handleChangePage(newPage));
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = totalPages;
    }
    dispatch(handleChangePage(newPage));
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <button
            type="button"
            onClick={prevPage}
            className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
        {pages.map((pageNumber) => {
          return (
            <li key={pageNumber}>
              <button
                type="button"
                onClick={() => dispatch(handleChangePage(pageNumber))}
                className={
                  pageNumber === page
                    ? "z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 "
                    : "py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                }
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        <li>
          <button
            type="button"
            onClick={nextPage}
            className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default CardPaging;
