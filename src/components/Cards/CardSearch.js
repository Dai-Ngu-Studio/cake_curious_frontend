import React from "react";
import { useDispatch } from "react-redux";
import { AccountSortingOptions } from "../../ultils/ViewOptions";
import FormRow from "../Inputs/FormRow";
import FormRadioSelect from "../Inputs/FormRadioSelect";

const CardSearch = ({
  loading,
  search,
  filter,
  handleChange,
  sortOptions,
  filterOptions,
  statusOptions,
  typeOptions,
  sort,
  status,
  type,
}) => {
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    if (loading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  return (
    <div className="flex justify-between items-center mt-40 bg-white p-3">
      {statusOptions && typeOptions ? (
        <>
          <div className="relative">
            <FormRadioSelect
              name="status"
              value={status}
              list={statusOptions}
              handleChange={handleInputChange}
            />
          </div>
          <div className="relative">
            <FormRadioSelect
              name="type"
              value={type}
              list={typeOptions}
              handleChange={handleInputChange}
            />
          </div>
        </>
      ) : (
        <div className="relative">
          <FormRadioSelect
            name="filter"
            value={filter}
            list={filterOptions}
            handleChange={handleInputChange}
          />
        </div>
      )}

      <div className="inline-flex justify-center items-center">
        <p className="pr-2">Sắp xếp theo</p>
        <FormRadioSelect
          name="sort"
          value={sort}
          list={sortOptions}
          handleChange={handleInputChange}
        />
      </div>

      <div className="relative">
        <div className="bg-green-200 flex absolute inset-y-0 left-0 items-center px-2 pointer-events-none rounded-lg">
          <svg
            className="w-5 h-5 text-green-500"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <FormRow
          type="text"
          name="search"
          value={search}
          handleChange={handleInputChange}
          style="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-green-100/25"
          placeholder="Search here..."
        />
      </div>
    </div>
  );
};

export default CardSearch;
