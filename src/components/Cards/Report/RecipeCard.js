import { useEffect, useState } from "react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsClock,
  BsPerson,
  BsFillExclamationTriangleFill,
} from "react-icons/bs";
export default function RecipeCard({ recipe, handleDeleteRecipe }) {
  const [isHoverRight, setIsHoverRight] = useState(false);
  const [currentCarouselPage, setCurrentCarouselPage] = useState(0);
  function mod(n, m) {
    return ((n % m) + m) % m;
  }
  function getCurrentStep() {
    return mod(currentCarouselPage, recipe.recipeSteps.length + 1);
  }
  return (
    <div
      className="shadow-lg rounded-lg overflow-hidden"
      onMouseOver={() => {
        setIsHoverRight(true);
      }}
      onMouseOut={() => {
        setIsHoverRight(false);
      }}
    >
      {isHoverRight && (
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
      )}
      {mod(currentCarouselPage, recipe.recipeSteps.length + 1) === 0 ? (
        <>
          <img src={recipe.photoUrl} className="w-full"></img>
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
      ) : (
        <>
          <video
            src={recipe.recipeMedia[0].mediaUrl}
            className="w-full"
            controls
          ></video>
          <div className="flex items-center justify-center p-5">
            <div className="font-bold text-2xl">Bước {getCurrentStep()}</div>
          </div>
          <div className="px-10 text-xl">
            {recipe.recipeSteps[getCurrentStep() - 1].recipeStepMaterials.map(
              (recipeStepMaterial, index) => {
                let material = recipeStepMaterial.recipeMaterial;
                return (
                  <div className="flex items-center gap-10 py-2" key={index}>
                    <div
                      className={"w-3 h-3 rounded-full"}
                      style={{
                        backgroundColor: `${material.color}`,
                      }}
                    />
                    <div className="flex justify-between w-full">
                      <div>{material.materialName}</div>
                      <div className="flex">
                        <div className="pr-2">{material.amount}</div>
                        <div>{material.measurement}</div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
            <div className="pt-10 text-justify">
              {recipe.recipeSteps[getCurrentStep() - 1].content}
            </div>
          </div>
        </>
      )}

      <div className="">
        <button
          type="button"
          className="absolute ml-44 bottom-0 mb-20 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 text-center mr-2 text-lg"
          onClick={() => {
            handleDeleteRecipe();
          }}
        >
          <div className="flex items-center justify-center">
            Xóa bỏ công thức
            <BsFillExclamationTriangleFill className="ml-2" />
          </div>
        </button>
      </div>
    </div>
  );
}
