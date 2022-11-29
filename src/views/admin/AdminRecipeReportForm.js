import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FormRowSelect from "../../components/Inputs/FormRowSelect";
import { getRecipe, deleteRecipe } from "../../features/recipes/recipeSlice";
import {
  getReportsOfAnItem,
  updateBulkReports,
} from "../../features/reports/reportSlice";
import Loading from "../../utils/Loading";
import StatusCard from "../../components/Cards/StatusCard";
import { ReportStatus } from "../../utils/StatusOptions";
import {
  BsChevronLeft,
  BsChevronRight,
  BsClock,
  BsPerson,
  BsFillExclamationTriangleFill,
  BsFillPencilFill,
} from "react-icons/bs";
export default function AdminRecipeReportForm() {
  const [checkedState, setCheckedState] = useState([]);
  const [isShowBulkMenu, setShowBulkMenu] = useState(false);
  const [isCheckedAll, setCheckedAll] = useState(false);
  const [isHoverCheckboxAll, setIsHoverCheckboxAll] = useState(false);
  const [isHoverUpdateStatus, setIsHoverUpdateStatus] = useState(false);

  const { recipe, isRecipesLoading } = useSelector((store) => store.recipe);
  const { reports, isReportLoading, isReportDoneUpdating } = useSelector(
    (store) => store.report
  );
  const dispatch = useDispatch();
  const { recipeId } = useParams();

  const [isHoverRight, setIsHoverRight] = useState(false);
  const [currentCarouselPage, setCurrentCarouselPage] = useState(0);
  useEffect(() => {
    console.log("ASJKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaHD");
    dispatch(getRecipe({ id: recipeId }));
    dispatch(getReportsOfAnItem({ itemId: recipeId }));
  }, []);
  // useEffect(() => {
  //   dispatch(getReportsOfAnItem({ itemId: recipeId }));
  // }, [isReportDoneUpdating]);
  useEffect(() => {
    setCheckedState(new Array(reports.length).fill(false));
  }, [isReportLoading]);
  useEffect(() => {
    setShowBulkMenu(checkedState.includes(true));
  }, [checkedState]);
  console.log(isRecipesLoading);
  console.log(isReportLoading);
  if (isRecipesLoading || isReportLoading) {
    return <Loading />;
  }

  function mod(n, m) {
    return ((n % m) + m) % m;
  }
  function isArrayAllTrue(array) {
    for (const element of array) {
      if (element === false) return false;
    }
    return true;
  }
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

    dispatch(updateBulkReports({ reportIds: { reportIds } }));
  }
  console.log(reports);
  return (
    <div className="grid grid-cols-3 pt-28 gap-5">
      <div className="col-span-2 shadow-lg rounded-xl">
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
            <h2 className="text-center pb-3">
              Không có báo cáo nào để hiển thị
            </h2>
          </div>
        ) : (
          <div className="overflow-x-auto overflow-hidden rounded-md">
            {/* Projects table */}
            <table className="items-center w-full">
              <thead className="bg-gray-200 border">
                <tr>
                  <th className="px-6 align- border-none py-3 text-xs font-semibold text-left"></th>
                  <th className="px-6 align- border-none py-3 text-xs font-semibold text-left">
                    Người báo cáo
                  </th>
                  <th className="px-6 align- border-none py-3 text-xs font-semibold text-left">
                    Tựa đề
                  </th>

                  <th className="px-6 align- border-none py-3 text-xs font-semibold text-left">
                    Status
                  </th>
                  <th className="px-6 align- border-none py-3 text-xs font-semibold text-left"></th>
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
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
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
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
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
      </div>
      <div
        className="shadow-lg rounded-lg overflow-hidden"
        onMouseOver={() => {
          setIsHoverRight(true);
        }}
        onMouseOut={() => {
          setIsHoverRight(false);
        }}
      >
        {isHoverRight ? (
          <>
            <BsChevronLeft
              className="absolute cursor-pointer z-10 top-32 ml-2 text-gray-500 rounded-full bg-white/50 w-12 h-12 p-3 "
              onClick={() => {
                setCurrentCarouselPage(currentCarouselPage - 1);
              }}
            />
            <BsChevronRight
              className="absolute cursor-pointer z-10 top-32 right-12 text-gray-500 rounded-full bg-white/50 w-12 h-12 p-3"
              onClick={() => {
                setCurrentCarouselPage(currentCarouselPage + 1);
              }}
            />
          </>
        ) : (
          ""
        )}
        {(() => {
          if (mod(currentCarouselPage, recipe?.recipeSteps.length + 1) === 0) {
            return (
              <>
                <img src={recipe.thumbnailUrl} className="w-full"></img>
                <div className="flex items-center justify-center p-2">
                  <div className="font-bold text-2xl">{recipe.name}</div>
                </div>
                <div className="px-8 text-xl">
                  <div className="flex items-center p-2">
                    <BsClock className="text-green-600 mr-10" />
                    <div>Thời gian nấu {recipe.cookTime}</div>
                  </div>
                  <div className="flex items-center p-2">
                    <BsPerson className="text-green-600 mr-10" />
                    <div>Số người ăn {recipe.servingSize}</div>
                  </div>
                  <div className="flex items-center p-2">
                    <div>{recipe.description}</div>
                  </div>
                </div>
              </>
            );
          } else {
            return (
              <>
                <video
                  src={recipe?.videoUrl}
                  className="w-full"
                  controls
                ></video>
                <div className="flex items-center justify-center p-5">
                  <div className="font-bold text-2xl">
                    Step{" "}
                    {mod(currentCarouselPage, recipe?.recipeSteps.length + 1)}
                  </div>
                </div>
                <div className="flex items-center px-10 text-xl">
                  <div>
                    {
                      recipe?.recipeSteps[
                        mod(
                          currentCarouselPage,
                          recipe?.recipeSteps.length + 1
                        ) - 1
                      ].content
                    }
                  </div>
                </div>
              </>
            );
          }
        })()}
        <div className="">
          <button
            type="button"
            className="absolute ml-44 bottom-0 mb-20 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 text-center mr-2 text-lg"
            onClick={() => {
              dispatch(deleteRecipe({ id: recipeId }));
            }}
          >
            <div className="flex items-center justify-center">
              Xóa bỏ công thức
              <BsFillExclamationTriangleFill className="ml-2" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
