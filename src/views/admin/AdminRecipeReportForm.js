import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FormRowSelect from "../../components/Inputs/FormRowSelect";
import { getRecipe } from "../../features/recipes/recipeSlice";
import { getReportsOfAnItem } from "../../features/reports/reportSlice";
import Loading from "../../utils/Loading";
import StatusCard from "../../components/Cards/StatusCard";
import { ReportStatus } from "../../utils/StatusOptions";
import {
  BsChevronLeft,
  BsChevronRight,
  BsClock,
  BsPerson,
} from "react-icons/bs";
export default function AdminRecipeReportForm() {
  const { recipe, isRecipesLoading } = useSelector((store) => store.recipe);
  const { reports } = useSelector((store) => store.report);
  const dispatch = useDispatch();
  const { recipeId } = useParams();

  const [isHoverRight, setIsHoverRight] = useState(false);
  const [currentCarouselPage, setCurrentCarouselPage] = useState(0);
  useEffect(() => {
    dispatch(getRecipe({ id: recipeId }));
    dispatch(getReportsOfAnItem({ itemId: recipeId }));
  }, []);
  if (isRecipesLoading) {
    return <Loading />;
  }
  console.log(reports);

  function mod(n, m) {
    return ((n % m) + m) % m;
  }
  return (
    <div className="grid grid-cols-3 pt-28 gap-5">
      <div className="bg-red-400 col-span-2">
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
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                      Title
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                      Reporter
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                      Baker
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                      Status
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"></th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => {
                    return (
                      <tr
                        key={report.id}
                        className="bg-white hover:bg-green-50"
                      >
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                          {report.title}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                          <div className="flex items-center">
                            {report.reporter.photoUrl && (
                              <img
                                src={report.reporter.photoUrl}
                                className="mr-2 h-12 w-12 rounded-full border"
                              ></img>
                            )}
                            <div>{report.reporter.displayName}</div>
                          </div>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                          <div className="flex items-center">
                            {report.reportedUser.photoUrl && (
                              <img
                                src={report.reportedUser.photoUrl}
                                className="mr-2 h-12 w-12 rounded-full border"
                              ></img>
                            )}
                            <div>{report.reportedUser.displayName}</div>
                          </div>
                        </td>
                        {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                          <div className="flex">
                            {report.itemType === 1 ? (
                              <StatusCard
                                text="Bình luận"
                                backgroundColor="bg-orange-200"
                                dotColor="bg-orange-600"
                              />
                            ) : (
                              <StatusCard
                                text="Công thức"
                                backgroundColor="bg-purple-200"
                                dotColor="bg-purple-600"
                              />
                            )}
                          </div>
                        </td> */}
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
          if (mod(currentCarouselPage, recipe.recipeSteps.length + 1) === 0) {
            return (
              <>
                <img src={recipe.thumbnailUrl} className="w-full"></img>
                <div className="flex items-center justify-center p-2">
                  <div className="font-bold text-2xl">{recipe.name}</div>
                </div>
                <div className="pl-16 text-xl">
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
                  src={recipe.videoUrl}
                  className="w-full"
                  controls
                ></video>
                <div className="flex items-center justify-center p-5">
                  <div className="font-bold text-2xl">
                    Step{" "}
                    {mod(currentCarouselPage, recipe.recipeSteps.length + 1)}
                  </div>
                </div>
                <div className="flex items-center p-2">
                  <div>
                    {
                      recipe.recipeSteps[
                        mod(
                          currentCarouselPage,
                          recipe.recipeSteps.length + 1
                        ) - 1
                      ].content
                    }
                  </div>
                </div>
              </>
            );
          }
        })()}
      </div>
    </div>
  );
}
