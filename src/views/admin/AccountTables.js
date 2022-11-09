import React from "react";
import { useSelector } from "react-redux";
import { AccountCardTable } from "../../components/Cards/AccountCardTable";
import CardPaging from "../../components/Cards/CardPaging";
import CardSearch from "../../components/Cards/CardSearch";
import {
  changeAccountPage,
  handleAccountChange,
} from "../../features/accounts/accountSlice";
import { AccountSortingOptions } from "../../ultils/ViewOptions";
// components

export default function AccountTables() {
  const {
    totalAccountPages,
    page,
    search,
    filter,
    isAccountLoading,
    sort,
    filterOptions,
  } = useSelector((store) => store.account);
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardSearch
            sort={sort}
            filter={filter}
            search={search}
            loading={isAccountLoading}
            filterOptions={filterOptions}
            sortOptions={AccountSortingOptions}
            handleChange={handleAccountChange}
          />
          <AccountCardTable />
          {totalAccountPages > 1 && (
            <CardPaging
              totalPages={totalAccountPages}
              page={page}
              handleChangePage={changeAccountPage}
            />
          )}
        </div>
      </div>
    </>
  );
}
