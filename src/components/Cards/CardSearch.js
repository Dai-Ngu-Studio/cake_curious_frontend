import React from "react";
import { useDispatch } from "react-redux";
import { AccountSortingOptions } from "../../ultils/SortingOptions";
import FormRow from "../Inputs/FormRow";
import FormRowSelect from "../Inputs/FormRowSelect";

const CardSearch = ({
  loading,
  search,
  filter,
  handleChange,
  sortOptions,
  filterOptions,
  sort,
}) => {
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    if (loading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  return (
    <div className="flex justify-between items-center pb-2">
      <div className="relative">
        <FormRowSelect
          labelText="Filter"
          name="filter"
          value={filter}
          list={["All", ...filterOptions]}
          handleChange={handleInputChange}
        />
      </div>
      <div className="relative">
        <FormRowSelect
          labelText="Sort"
          name="sort"
          value={sort}
          list={sortOptions}
          handleChange={handleInputChange}
        />
      </div>

      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
          style="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search here..."
        />
      </div>
    </div>
  );
};

export default CardSearch;
