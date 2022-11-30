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

import RecipeReportCard from "../../components/Cards/RecipeReportCard";
import ReportTableCard from "../../components/Cards/ReportTableCard";
export default function AdminRecipeReportForm() {
  const { recipe, isRecipesLoading, isRecipeDoneUpdating } = useSelector(
    (store) => store.recipe
  );
  const { reports, isReportLoading, isReportDoneUpdating } = useSelector(
    (store) => store.report
  );
  const dispatch = useDispatch();
  const { recipeId } = useParams();

  useEffect(() => {
    dispatch(getRecipe({ id: recipeId }));
  }, []);
  useEffect(() => {
    dispatch(getReportsOfAnItem({ itemId: recipeId }));
  }, [isReportDoneUpdating, isRecipeDoneUpdating]);

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
        <ReportTableCard
          reports={reports}
          handleUpdateReports={handleUpdateReports}
        />
      </div>
      <RecipeReportCard
        recipe={recipe}
        handleDeleteRecipe={handleDeleteRecipe}
      />
    </div>
  );
}
