import React, { useEffect } from "react";
import NoImg from "../../../assets/img/no-store.png";
import TableDropdown from "../../Dropdowns/TableDropdown";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../utils/Loading";
import {
  getAllReportedComments,
  handleCommentChange,
} from "../../../features/comments/commentSlice";
import { BsCaretDownFill, BsCaretUpFill, BsEyeFill } from "react-icons/bs";
import StatusCard from "../StatusCard";

export default function ReportCommentCardTable() {
  const { user } = useSelector((store) => store.user);
  let priorityRole = 99;
  for (let i = 0; i < user.hasRoles.length; i++) {
    var roleId = user.hasRoles[i].roleId;
    if (roleId < priorityRole) {
      priorityRole = roleId;
    }
  }
  const { reportedComments, isCommentsLoading, page, search, sort } =
    useSelector((store) => store.comment);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReportedComments());
  }, [page, search, sort]);

  if (isCommentsLoading) {
    return <Loading />;
  }
  function smallestRoleID(roles) {
    let smallestRoleID = 10;
    roles.map((role) => {
      if (role.roleId < smallestRoleID) {
        smallestRoleID = role.roleId;
      }
    });
    return smallestRoleID;
  }
  function updateFilter() {
    if (sort === "AscPendingReport") {
      dispatch(
        handleCommentChange({ name: "sort", value: "DescPendingReport" })
      );
    } else {
      dispatch(
        handleCommentChange({ name: "sort", value: "AscPendingReport" })
      );
    }
  }
  console.log(reportedComments);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        {reportedComments.length === 0 ? (
          <div className="block w-full overflow-x-auto">
            <h2 className="text-center pb-3">
              Không có báo cáo để hiển thị...
            </h2>
          </div>
        ) : (
          <div className="block w-full overflow-x-auto pb-5">
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 align-middle py-3 text-xs uppercase font-semibold text-center w-60">
                    Ảnh
                  </th>
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left ">
                    Người đăng
                  </th>
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left ">
                    Ngày tạo
                  </th>
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left ">
                    Nội dung
                  </th>
                  <th
                    className="px-6 align-middle text-xs uppercase font-semibold text-left cursor-pointer"
                    onClick={() => {
                      updateFilter();
                    }}
                  >
                    <div className="flex items-center">
                      <div>Báo cáo chờ giải quyết</div>
                      {sort === "AscPendingReport" ? (
                        <BsCaretDownFill className="text-md ml-2" />
                      ) : (
                        <BsCaretUpFill className="text-md ml-2" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left ">
                    Trạng thái
                  </th>
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left "></th>
                </tr>
              </thead>
              <tbody>
                {reportedComments.map((comment, index) => {
                  return (
                    <tr
                      key={comment.id}
                      className={
                        "hover:bg-green-50 " +
                        (index % 2 === 1 ? "bg-gray-50" : "bg-white")
                      }
                    >
                      <td className="pl-6 align-middle p-1 text-left flex justify-center">
                        <img
                          className="rounded-lg"
                          src={comment.images[0]?.mediaUrl || NoImg}
                        ></img>
                      </td>
                      <td className="pl-6 p-4">
                        <div className="flex items-center">
                          {comment.user.photoUrl && (
                            <img
                              src={comment.user.photoUrl}
                              className="mr-2 h-12 w-12 rounded-full border"
                              referrerPolicy="no-referrer"
                            ></img>
                          )}
                          <div>{comment.user.displayName}</div>
                        </div>
                      </td>
                      <td className="pl-6 align-middle p-4">
                        <div className="flex">
                          {(() => {
                            let a = new Date(comment.submittedDate + "Z");
                            return (
                              a.getDate() +
                              " Tháng " +
                              a.getMonth() +
                              ", " +
                              a.getFullYear() +
                              " lúc " +
                              (a.getHours() < 10
                                ? "0" + a.getHours()
                                : a.getHours()) +
                              ":" +
                              (a.getMinutes() < 10
                                ? "0" + a.getMinutes()
                                : a.getMinutes())
                            );
                          })()}
                        </div>
                      </td>
                      <td className="pl-6 align-middle p-4">
                        {comment.content}
                      </td>

                      <td className="pl-6 align-middle p-4">
                        {comment.totalPendingReports}
                      </td>
                      <td className="pl-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <div className="flex items-center">
                          <span className="mr-2">
                            {comment.status === 0 ? (
                              <StatusCard
                                text="Hoạt động"
                                backgroundColor="bg-green-50"
                                dotColor="bg-green-600"
                              />
                            ) : (
                              <StatusCard
                                text="Dừng hoạt động"
                                backgroundColor="bg-gray-50"
                                dotColor="bg-gray-600"
                              />
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="pl-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <div className="flex items-center">
                          <BsEyeFill
                            onClick={() => {}}
                            className="p-2 w-10 h-10 text-gray-500 border border-gray-600 hover:bg-gray-600 hover:text-white rounded-md cursor-pointer"
                          />
                          <TableDropdown
                            link={
                              smallestRoleID(user.hasRoles) === 0
                                ? `/admin/report-comment/${comment.id}`
                                : `/staff/report-comment/${comment.id}`
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

// CardTable.defaultProps = {
//   color: "light",
// };

// CardTable.propTypes = {
//   color: PropTypes.oneOf(["light", "dark"]),
// };
