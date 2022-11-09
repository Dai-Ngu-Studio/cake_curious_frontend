import React from "react";
import { useSelector } from "react-redux";
import CardPaging from "../../components/Cards/CardPaging";
import CardSearch from "../../components/Cards/CardSearch";
import ReportCardTable from "../../components/Cards/ReportCardTable";

// components

import {
  changeReportPage,
  handleReportChange,
} from "../../features/reports/reportSlice";
import { ReportSortingOptions } from "../../ultils/ViewOptions";

export default function ReportTables() {
  const {
    totalReportPages,
    page,
    search,
    type,
    status,
    isReportLoading,
    sort,
    statusOptions,
    typeOptions,
  } = useSelector((store) => store.report);
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardSearch
            sort={sort}
            type={type}
            status={status}
            search={search}
            loading={isReportLoading}
            statusOptions={statusOptions}
            typeOptions={typeOptions}
            sortOptions={ReportSortingOptions}
            handleChange={handleReportChange}
          />
          <ReportCardTable />
          {totalReportPages > 1 && (
            <CardPaging
              totalPages={totalReportPages}
              page={page}
              handleChangePage={changeReportPage}
            />
          )}
        </div>
      </div>
    </>
  );
}
