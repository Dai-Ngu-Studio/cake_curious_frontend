import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Shop from "../../assets/img/shop.png";
// components

import TableDropdown from "../Dropdowns/TableDropdown";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../ultils/Loading";
import StatusCard from "./StatusCard";
import {
  getAllReports,
  setUpdateReport,
} from "../../features/reports/reportSlice";
import { ReportStatus } from "../../ultils/StatusOptions";

export default function ReportCardTable() {
  const { user } = useSelector((store) => store.user);
  let priorityRole = 99;
  for (let i = 0; i < user.hasRoles.length; i++) {
    var roleId = user.hasRoles[i].roleId;
    if (roleId < priorityRole) {
      priorityRole = roleId;
    }
  }
  const { reports, isReportLoading, page, search, type, status, sort } =
    useSelector((store) => store.report);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReports());
  }, [page, search, type, status, sort]);

  if (isReportLoading) {
    return <Loading />;
  }

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
        }
      >
        {reports.length === 0 ? (
          <div className="block w-full overflow-x-auto">
            <h2 className="text-center pb-3">No reports to display...</h2>
          </div>
        ) : (
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    Title
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    Reporter
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    Baker
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    Type
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    Status
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  ></th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => {
                  return (
                    <tr key={report.id} className="bg-white hover:bg-green-50">
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        {report.title}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        {report.reporter.displayName}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        {report.reportedUser.displayName}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        <div className="flex">
                          {report.itemType === 1 ? "Comment" : "Recipe"}
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">
                            {ReportStatus.map((status) => {
                              return (
                                // <StatusCard
                                //   text={status.name}
                                //   backgroundColor="bg-gray-200"
                                //   dotColor="bg-gray-600"
                                // />
                                <div key={status.id}>
                                  {report.status === status.id ? (
                                    <StatusCard
                                      text={status.name}
                                      backgroundColor={status.backgroundColor}
                                      dotColor={status.dotColor}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              );
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <TableDropdown
                          link={
                            priorityRole === 0
                              ? "/admin/report-form"
                              : "/staff/report-form"
                          }
                          setUpdate={setUpdateReport({
                            editReportId: report.id,
                            submittedDate: report.submittedDate,
                            itemType: report.itemType,
                            comment: report.commet,
                            recipe: report.recipe,
                            reporter: report.reporter,
                            title: report.title,
                            itemId: report.itemId,
                            staff: report.staff,
                            reportedUser: report.reportedUser,
                            status: report.status,
                          })}
                        />
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
