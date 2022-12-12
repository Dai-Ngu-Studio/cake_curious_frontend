import React from "react";
import { useSelector } from "react-redux";
import CardPaging from "../../components/Cards/CardPaging";
import CardSearch from "../../components/Cards/CardSearch";
import StoreCardTable from "../../components/Cards/Store/StoreCardTable";
import {
  changeStorePage,
  handleStoreChange,
} from "../../features/stores/storeSlice";
import { StoreFilterOptions } from "../../utils/ViewOptions";

// components

export default function StoreTables() {
  const { totalStorePages, page, search, filter } = useSelector(
    (selector) => selector.store
  );
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardSearch
            filter={filter}
            search={search}
            filterOptions={StoreFilterOptions}
            handleChange={handleStoreChange}
          />
          <StoreCardTable />
          {totalStorePages > 1 && (
            <CardPaging
              totalPages={totalStorePages}
              page={page}
              handleChangePage={changeStorePage}
            />
          )}
        </div>
      </div>
    </>
  );
}
