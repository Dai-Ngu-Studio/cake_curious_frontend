import React from "react";
import { useSelector } from "react-redux";
import CardPaging from "../../components/Cards/CardPaging";
import CardSearch from "../../components/Cards/CardSearch";
import ReportRecipeCardTable from "../../components/Cards/Report/ReportRecipeCardTable";

// components

import {
  changeRecipePage,
  handleRecipeChange,
} from "../../features/recipes/recipeSlice";
import {
  ReportedItemSortingOptions
} from "../../utils/ViewOptions";

export default function ReportRecipeTables() {
  const { totalPage, page, search, status, sort } = useSelector(
    (store) => store.recipe
  );
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardSearch
            sort={sort}
            status={status}
            search={search}
            sortOptions={ReportedItemSortingOptions}
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
