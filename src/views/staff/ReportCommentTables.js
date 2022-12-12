import React from "react";
import { useSelector } from "react-redux";
import CardPaging from "../../components/Cards/CardPaging";
import CardSearch from "../../components/Cards/CardSearch";
import ReportCommentCardTable from "../../components/Cards/Report/ReportCommentCardTable";
import {
  changeCommentPage,
  handleCommentChange,
} from "../../features/comments/commentSlice";

// components
import { ReportedItemSortingOptions } from "../../utils/ViewOptions";

export default function ReportCommentTables() {
  const { totalPage, page, search, sort } = useSelector(
    (store) => store.comment
  );
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardSearch search={search} handleChange={handleCommentChange} />
          <ReportCommentCardTable />
          {totalPage > 1 && (
            <CardPaging
              totalPages={totalPage}
              page={page}
              handleChangePage={changeCommentPage}
            />
          )}
        </div>
      </div>
    </>
  );
}
