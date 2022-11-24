import React from "react";
import { useSelector } from "react-redux";
import CardPaging from "../../components/Cards/CardPaging";
import CardSearch from "../../components/Cards/CardSearch";
import ReportRecipeCardTable from "../../components/Cards/ReportRecipeCardTable";

// components

import {
  changeRecipePage,
  handleRecipeChange,
} from "../../features/recipes/recipeSlice";
import {
  ReportSortingOptions,
  ReportFilterStatusOptions,
  ReportFilterTypeOptions,
} from "../../utils/ViewOptions";

export default function ReportRecipeTables() {
  const { totalPage, page, search, type, status, sort } = useSelector(
    (store) => store.recipe
  );
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardSearch
            sort={sort}
            type={type}
            status={status}
            search={search}
            // statusOptions={ReportFilterStatusOptions}
            // typeOptions={ReportFilterTypeOptions}
            // sortOptions={ReportSortingOptions}
            handleChange={handleRecipeChange}
          />
          <ReportRecipeCardTable />
          {totalPage > 1 && (
            <CardPaging
              totalPages={totalPage}
              page={page}
              handleChangePage={changeRecipePage}
            />
          )}
        </div>
      </div>
    </>
  );
}
