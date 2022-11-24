import React from "react";
import { useSelector } from "react-redux";
import CardPaging from "../../components/Cards/CardPaging";
import CardSearch from "../../components/Cards/CardSearch";
import ReportCommentCardTable from "../../components/Cards/ReportCommentCardTable";

// components

import {
  changeReportPage,
  handleReportChange,
} from "../../features/reports/reportSlice";
import {
  ReportSortingOptions,
  ReportFilterStatusOptions,
  ReportFilterTypeOptions,
} from "../../utils/ViewOptions";

export default function ReportCommentTables() {
  const { totalPage, page, search, type, status, sort } = useSelector(
    (store) => store.comment
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
            statusOptions={ReportFilterStatusOptions}
            typeOptions={ReportFilterTypeOptions}
            sortOptions={ReportSortingOptions}
            handleChange={handleReportChange}
          />
          <ReportCommentCardTable />
          {totalPage > 1 && (
            <CardPaging
              totalPages={totalPage}
              page={page}
              handleChangePage={changeReportPage}
            />
          )}
        </div>
      </div>
    </>
  );
}
