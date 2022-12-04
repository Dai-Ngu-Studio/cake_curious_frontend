import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipe, deleteRecipe } from "../../features/recipes/recipeSlice";
import {
  changeReportPage,
  getReportsOfAnItem,
  handleReportChange,
  updateBulkReports,
} from "../../features/reports/reportSlice";
import Loading from "../../utils/Loading";

import CardPaging from "../../components/Cards/CardPaging";
import { ReportFilterStatusOptions, ReportSortingOptions } from "../../utils/ViewOptions";
import FormRadioSelect from "../../components/Inputs/FormRadioSelect";
import RecipeCard from "../../components/Cards/Report/RecipeCard";
import ReportTableCard from "../../components/Cards/Report/ReportTableCard";
export default function AdminRecipeReportForm() {
  const { recipe, isRecipesLoading, isRecipeDoneUpdating } = useSelector(
    (store) => store.recipe
  );
  const { reports, isReportLoading, isReportDoneUpdating, totalReportPages, page, sort, filter } = useSelector(
    (store) => store.report
  );
  const dispatch = useDispatch();
  const { recipeId } = useParams();

  useEffect(() => {
    dispatch(getRecipe({ id: recipeId }));
  }, []);
  useEffect(() => {
    dispatch(getReportsOfAnItem({ itemId: recipeId }));
  }, [isReportDoneUpdating, isRecipeDoneUpdating, page, sort, filter]);

  const handleInputChange = (e) => {
    dispatch(handleReportChange({ name: e.target.name, value: e.target.value }));
  };

  if (isRecipesLoading || isReportLoading) {
    return <Loading />;
  }
  function handleDeleteRecipe() {
    dispatch(deleteRecipe({ id: recipeId }));
  }
  function handleUpdateReports(reportIds) {
    dispatch(updateBulkReports({ reportIds: { reportIds } }));
  }
  return (
    <div className="grid grid-cols-3 pt-28 gap-5">
      <div className="col-span-2 shadow-lg rounded-xl">
        <div className="relative">
          <FormRadioSelect
            name="filter"
            value={filter}
            list={ReportFilterStatusOptions}
            handleChange={handleInputChange}
          />
        </div>  
        <div className="inline-flex justify-center items-center">
          <p className="pr-2">Sắp xếp theo</p>
          <FormRadioSelect
          name="sort"
          value={sort}
          list={ReportSortingOptions}
          handleChange={handleInputChange}
          />
        </div>
        <ReportTableCard
          reports={reports}
          handleUpdateReports={handleUpdateReports}
        />
        {totalReportPages > 1 && (
            <CardPaging
              totalPages={totalReportPages}
              page={page}
              handleChangePage={changeReportPage}
            />
          )}
      </div>
      <RecipeCard recipe={recipe} handleDeleteRecipe={handleDeleteRecipe} />
    </div>
  );
}
