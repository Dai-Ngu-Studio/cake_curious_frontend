import React, { useEffect } from "react";
import NoImg from "../../assets/img/no-store.png";
import TableDropdown from "../Dropdowns/TableDropdown";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../utils/Loading";
import StatusCard from "./StatusCard";
import { getAllReportedComments } from "../../features/comments/commentSlice";
import { ReportStatus } from "../../utils/StatusOptions";

export default function ReportCommentCardTable() {
  const { user } = useSelector((store) => store.user);
  let priorityRole = 99;
  for (let i = 0; i < user.hasRoles.length; i++) {
    var roleId = user.hasRoles[i].roleId;
    if (roleId < priorityRole) {
      priorityRole = roleId;
    }
  }
  const { reportedComments, isLoading, page, search, type, status, sort } =
    useSelector((store) => store.comment);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReportedComments());
  }, [page, search, type, status, sort]);

  if (isLoading) {
    return <Loading />;
  }
  console.log(reportedComments);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        {reportedComments.length === 0 ? (
          <div className="block w-full overflow-x-auto">
            <h2 className="text-center pb-3">No reports to display...</h2>
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
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left ">
                    Báo cáo chờ giải quyết
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
                      <th className="pl-6 align-middle p-1 text-left flex justify-center">
                        <img src={comment.images[0].mediaUrl || NoImg}></img>
                      </th>
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
                              a.getHours() +
                              ":" +
                              a.getMinutes()
                            );
                          })()}
                        </div>
                      </td>
                      <td className="pl-6 align-middle p-4">
                        {comment.content}
                      </td>

                      <td className="pl-6 align-middle p-4">
                        {comment.totalPendingReports}

                        {/* <div className="flex items-center">
                          <span
                            className="mr-2 cursor-pointer"
                            onClick={() => {
                              let storeEditing = {};
                              setModalStore({
                                id: store.id,
                                status: store.status,
                              });
                              setOpenModal(true);
                              setIsConfirmModal(true);
                              changeStoreStatus(store.id, store.status);
                            }}
                          >
                            {store.status === 0 ? (
                              <StatusCard
                                text="Hoạt động"
                                backgroundColor="bg-green-200"
                                dotColor="bg-green-600"
                              />
                            ) : (
                              <StatusCard
                                text="Dừng hoạt động"
                                backgroundColor="bg-gray-200"
                                dotColor="bg-gray-600"
                              />
                            )}
                          </span>
                        </div> */}
                      </td>
                      <td className="pl-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        {/* <BsEyeFill
                          onClick={() => {
                            setModalStore(store);
                            setOpenModal(true);
                            setIsConfirmModal(false);
                          }}
                          className="p-2 w-10 h-10 text-gray-500 border border-gray-600 hover:bg-gray-600 hover:text-white rounded-md cursor-pointer"
                        /> */}
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
