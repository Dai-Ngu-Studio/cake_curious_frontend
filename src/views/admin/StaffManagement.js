import React from "react";
import { useSelector } from "react-redux";
import { StaffCardTable } from "../../components/Cards/Account/StaffCardTable";
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

export default function StaffManagement() {
  const { totalAccountPages, page, search, filter, sort } = useSelector(
    (store) => store.account
  );
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardSearch
            sort={sort}
            filter={filter}
            search={search}
            filterOptions={AccountFilterOptions}
            sortOptions={AccountSortingOptions}
            handleChange={handleAccountChange}
          />
          <StaffCardTable />
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
