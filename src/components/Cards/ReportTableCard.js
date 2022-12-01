import { useEffect, useState } from "react";
import StatusCard from "../../components/Cards/StatusCard";
import { ReportStatus } from "../../utils/StatusOptions";
import { BsFillPencilFill } from "react-icons/bs";
export default function ReportTableCard({ reports, handleUpdateReports }) {
  const [checkedState, setCheckedState] = useState([]);
  const [isHoverCheckboxAll, setIsHoverCheckboxAll] = useState(false);
  const [isHoverUpdateStatus, setIsHoverUpdateStatus] = useState(false);
  const [isCheckedAll, setCheckedAll] = useState(false);
  const [isShowBulkMenu, setShowBulkMenu] = useState(false);
  useEffect(() => {
    setCheckedState(new Array(reports.length).fill(false));
  }, []);
  useEffect(() => {
    setShowBulkMenu(checkedState.includes(true));
  }, [checkedState]);
  function handleOnChange(position) {
    let updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedAll(isArrayAllTrue(updatedCheckedState));
    setCheckedState(updatedCheckedState);
  }
  function handleCheckAll() {
    let updatedCheckedAll = !isCheckedAll;
    setCheckedAll(updatedCheckedAll);
    setCheckedState(new Array(reports.length).fill(updatedCheckedAll));
  }
  function handleBulkUpdate() {
    let reportIds = [];
    for (let i = 0; i < reports.length; i++) {
      if (checkedState[i]) {
        reportIds.push(reports[i].id);
      }
    }
    handleUpdateReports(reportIds);
  }
  function isArrayAllTrue(array) {
    for (const element of array) {
      if (element === false) return false;
    }
    return true;
  }
  return (
    <>
      <div className="flex bg-gray-200 w-full rounded-xl mb-2 ">
        <div
          className="m-2 px-2 py-1 ml-5 hover:bg-black/20 rounded-md cursor-pointer"
          onClick={() => {
            handleCheckAll();
          }}
          onMouseOver={() => {
            setIsHoverCheckboxAll(true);
          }}
          onMouseOut={() => {
            setIsHoverCheckboxAll(false);
          }}
        >
          <input
            className="w-4 h-4 text-green-600 bg-gray-100 rounded border-gray-300 focus:ring-green-500 focus:ring-2 "
            type="checkbox"
            checked={isCheckedAll || ""}
            onChange={(e) => {}}
          />
          {isHoverCheckboxAll ? (
            <div className="bg-black/70 rounded p-1 text-white absolute -ml-8 mt-2">
              Chọn tất cả
            </div>
          ) : (
            ""
          )}
        </div>
        {isShowBulkMenu ? (
          <div
            className="m-2 px-2 py-1 ml-5 hover:bg-black/20 rounded-md flex items-center cursor-pointer justify-center"
            onMouseOver={() => {
              setIsHoverUpdateStatus(true);
            }}
            onMouseOut={() => {
              setIsHoverUpdateStatus(false);
            }}
          >
            <div
              className="flex items-center justify-center"
              onClick={() => {
                handleBulkUpdate();
              }}
            >
              <BsFillPencilFill className="text-black/50 mr-2" />
              Không vấn đề
            </div>
            {isHoverUpdateStatus ? (
              <div className="bg-black/70 rounded p-1 text-white absolute mt-20">
                Đổi trạng thái
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      {reports.length === 0 ? (
        <div className="block w-full overflow-x-auto">
          <h2 className="text-center pb-3">Không có báo cáo nào để hiển thị</h2>
        </div>
      ) : (
        <div className="overflow-x-auto overflow-hidden rounded-md">
          {/* Projects table */}
          <table className="items-center w-full">
            <thead className="bg-gray-200 border">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-left"></th>
                <th className="px-6 py-3 text-xs font-semibold text-left">
                  Người báo cáo
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left max-w-200-px">
                  Tựa đề
                </th>

                <th className="px-6 py-3 text-xs font-semibold text-left">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left"></th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => {
                return (
                  <tr
                    key={report.id}
                    className={
                      "hover:drop-shadow-lg border" +
                      (checkedState[index] ? " bg-green-50" : "") +
                      (index % 2 === 1 ? " bg-gray-50" : " bg-white")
                    }
                    onClick={() => handleOnChange(index)}
                  >
                    <td className="border-t-0 px-6 align- border-none border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                      <input
                        className="w-4 h-4 text-green-600 bg-gray-100 rounded border-gray-300 focus:ring-green-500 focus:ring-2"
                        type="checkbox"
                        checked={checkedState[index] || ""}
                        onChange={(e) => {}}
                      />
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base break-words p-4">
                      <div className="flex items-center">
                        {report.reporter.photoUrl && (
                          <img
                            src={report.reporter.photoUrl}
                            className="mr-2 h-12 w-12 rounded-full border"
                            referrerPolicy="no-referrer"
                          ></img>
                        )}
                        <div>{report.reporter.displayName}</div>
                      </div>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base break-words p-4">
                      {report.title}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                      <div className="flex items-center">
                        <span className="mr-2">
                          {ReportStatus.map((status) => {
                            return (
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
                      {/* <TableDropdown
                        link={
                          priorityRole === 0
                            ? `/admin/report-form/${report.id}`
                            : `/staff/report-form/${report.id}`
                        }
                      /> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
