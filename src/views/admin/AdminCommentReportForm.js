import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getComment,
  deleteComment,
} from "../../features/comments/commentSlice";
import {
  getReportsOfAnItem,
  updateBulkReports,
} from "../../features/reports/reportSlice";
import Loading from "../../utils/Loading";
import CommentCard from "../../components/Cards/CommentCard";
import ReportTableCard from "../../components/Cards/ReportTableCard";
export default function AdminCommentReportForm() {
  const { comment, isCommentsLoading, isCommentDoneUpdating } = useSelector(
    (store) => store.comment
  );
  const { reports, isReportLoading, isReportDoneUpdating } = useSelector(
    (store) => store.report
  );
  const dispatch = useDispatch();
  const { commentId } = useParams();

  useEffect(() => {
    dispatch(getComment({ id: commentId }));
  }, []);
  useEffect(() => {
    dispatch(getReportsOfAnItem({ itemId: commentId }));
  }, [isReportDoneUpdating, isCommentDoneUpdating]);

  if (isCommentsLoading || isReportLoading) {
    return <Loading />;
  }
  function handleDeleteComment() {
    dispatch(deleteComment({ id: commentId }));
  }
  function handleUpdateReports(reportIds) {
    dispatch(updateBulkReports({ reportIds: { reportIds } }));
  }
  console.log(comment);
  return (
    <div className="grid grid-cols-5 pt-28 gap-5">
      <div className="col-span-4 shadow-lg rounded-xl">
        <ReportTableCard
          reports={reports}
          handleUpdateReports={handleUpdateReports}
        />
      </div>
      <CommentCard
        handleDeleteComment={handleDeleteComment}
        comment={comment}
      />
    </div>
  );
}
