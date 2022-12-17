import React, { useEffect } from "react";
import NoImg from "../../../assets/img/no-store.png";
import TableDropdown from "../../Dropdowns/TableDropdown";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../utils/Loading";
import {
  getAllReportedRecipes,
  handleRecipeChange,
} from "../../../features/recipes/recipeSlice";
import { BsCaretDownFill, BsCaretUpFill, BsEyeFill } from "react-icons/bs";
import StatusCard from "../StatusCard";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReasonModal from "./ReasonModal";
import {
  handleReasonChange,
  getReasonForItem,
} from "../../../features/reasons/reasonSlice";
export default function ReportRecipeCardTable() {
  const { isRecipesLoading, reportedRecipes, page, search, sort } = useSelector(
    (selector) => selector.recipe
  );
  const { reason, isDoneLoadingReason, IdRequesting } = useSelector(
    (store) => store.reason
  );
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllReportedRecipes());
  }, [page, search, sort]);

  useEffect(() => {
    // console.log(IdRequesting);
    if (IdRequesting !== "") {
      dispatch(getReasonForItem({ itemId: IdRequesting }));
    }
  }, [IdRequesting]);
  useEffect(() => {
    if (isDoneLoadingReason === true && IdRequesting !== "") {
      ShowModal();
    }
  }, [isDoneLoadingReason]);

  if (isRecipesLoading && isDoneLoadingReason === false) {
    return <Loading />;
  }
  async function ShowModal() {
    const MySwal = withReactContent(Swal);
    await MySwal.fire({
      title: "Thông tin chi tiết",
      html: <ReasonModal reason={reason} />,
      showConfirmButton: false,
      showCloseButton: true,
    });
    dispatch(
      handleReasonChange({
        name: "IdRequesting",
        value: "",
      })
    );
  }
  function smallestRoleID(roles) {
    // console.log(roles);
    let smallestRoleID = 10;
    roles.map((role) => {
      if (role.roleId < smallestRoleID) {
        smallestRoleID = role.roleId;
      }
    });
    return smallestRoleID;
  }
  //DescPendingReport
  function updateFilter() {
    if (sort === "AscPendingReport") {
      dispatch(
        handleRecipeChange({ name: "sort", value: "DescPendingReport" })
      );
    } else {
      dispatch(handleRecipeChange({ name: "sort", value: "AscPendingReport" }));
    }
  }
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
        }
      >
        {reportedRecipes.length === 0 ? (
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
                    Tên công thức
                  </th>
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left ">
                    Người tạo
                  </th>
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left ">
                    Ngày tạo
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
                {reportedRecipes.map((recipe, index) => {
                  return (
                    <tr
                      key={recipe.id}
                      className={
                        "hover:bg-green-50 " +
                        (index % 2 === 1 ? "bg-gray-50" : "bg-white")
                      }
                    >
                      <th className="pl-6 align-middle p-1 text-left flex justify-center max-h-52">
                        <img
                          className="rounded-lg object-cover"
                          src={recipe.photoUrl || NoImg}
                        ></img>
                      </th>
                      <td className="pl-6 align-middle p-4">{recipe.name}</td>
                      <td className="pl-6 p-4">
                        <div className="flex items-center">
                          {recipe.user.photoUrl && (
                            <img
                              src={recipe.user.photoUrl}
                              className="mr-2 h-12 w-12 rounded-full border"
                              referrerPolicy="no-referrer"
                            ></img>
                          )}
                          <div>{recipe.user.displayName}</div>
                        </div>
                      </td>
                      <td className="pl-6 align-middle p-4">
                        <div className="flex">
                          {(() => {
                            let a = new Date(recipe.publishedDate + "Z");
                            return (
                              a.getDate() +
                              " Tháng " +
                              (a.getMonth() + 1) +
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
                        {recipe.totalPendingReports}
                      </td>
                      <td className="pl-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <div className="flex items-center">
                          <span className="mr-2">
                            {recipe.status === 0 ? (
                              <StatusCard
                                text="Đang hiển thị"
                                backgroundColor="bg-yellow-50"
                                dotColor="bg-yellow-600"
                              />
                            ) : (
                              <StatusCard
                                text="Đã bị gỡ bỏ"
                                backgroundColor="bg-red-50"
                                dotColor="bg-red-600"
                              />
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="pl-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <div className="flex items-center">
                          {recipe.status !== 0 && (
                            <BsEyeFill
                              onClick={() => {
                                dispatch(
                                  handleReasonChange({
                                    name: "IdRequesting",
                                    value: recipe.id,
                                  })
                                );
                              }}
                              className="p-2 w-10 h-10 text-gray-500 border border-gray-600 hover:bg-gray-600 hover:text-white rounded-md cursor-pointer"
                            />
                          )}
                          <TableDropdown
                            link={
                              smallestRoleID(user.hasRoles) === 0
                                ? `/admin/report-recipe/${recipe.id}`
                                : `/staff/report-recipe/${recipe.id}`
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
