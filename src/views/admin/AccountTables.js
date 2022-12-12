import React from "react";
import { useSelector } from "react-redux";
import { AccountCardTable } from "../../components/Cards/Account/AccountCardTable";
import CardPaging from "../../components/Cards/CardPaging";
import CardSearch from "../../components/Cards/CardSearch";
import {
  changeAccountPage,
  handleAccountChange,
} from "../../features/accounts/accountSlice";
import {
  AccountSortingOptions,
  AccountFilterOptions,
} from "../../utils/ViewOptions";
// components

export default function AccountTables() {
  const { totalAccountPages, page, search, filter, sort } = useSelector(
    (store) => store.account
  );
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardSearch
            filter={filter}
            search={search}
            filterOptions={AccountFilterOptions}
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
