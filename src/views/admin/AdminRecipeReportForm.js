import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FormRowSelect from "../../components/Inputs/FormRowSelect";
import { getRecipe } from "../../features/recipes/recipeSlice";
import { getReportsOfAnItem } from "../../features/reports/reportSlice";
import Loading from "../../utils/Loading";
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
      <div className="bg-red-400 col-span-2"></div>
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
