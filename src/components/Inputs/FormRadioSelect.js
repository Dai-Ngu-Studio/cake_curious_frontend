import React from "react";

const FormRadioSelect = ({ labelText, name, handleChange, list }) => {
  let blueBtn =
    "peer-checked:bg-blue-100 peer-checked:border peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100";
  let greenBtn =
    "peer-checked:bg-green-100 peer-checked:border peer-checked:border-green-600 peer-checked:text-green-600 hover:text-gray-600 hover:bg-gray-100";
  let grayBtn =
    "peer-checked:bg-gray-200 peer-checked:border peer-checked:border-gray-600 peer-checked:text-grays-600 hover:text-gray-600 hover:bg-gray-100";
  let redBtn =
    "peer-checked:bg-red-100 peer-checked:border peer-checked:border-red-600 peer-checked:text-red-600 hover:text-gray-600 hover:bg-gray-100";
  let yellowBtn =
    "peer-checked:bg-yellow-50 peer-checked:border peer-checked:border-yellow-300 peer-checked:text-yellow-500 hover:text-gray-600 hover:bg-gray-100";

  return (
    <div>
      {labelText ? <label htmlFor={labelText}>{labelText}: </label> : null}
      {list?.map((item, index) => {
        return (
          <div key={index} className="inline-flex pr-4">
            <input
              type="radio"
              name={name}
              value={item.value}
              id={name + item.value}
              onClick={handleChange}
              className="hidden peer"
            ></input>
            <label
              htmlFor={name + item.value}
              className={
                "inline-flex justify-between items-center p-2 w-full bg-white rounded-lg cursor-pointer " +
                // (item.value == "All" ? blueBtn : greenBtn)
                (() => {
                  if (item.value === "Inactive" || item.value === "Rejected")
                    return grayBtn;
                  else if (item.value === "Active") return greenBtn;
                  else if (item.value === "Pending") return yellowBtn;
                  else if (item.value === "Censored") return redBtn;
                  else return blueBtn;
                })()
              }
            >
              <div className="w-full pr-1">{item.name}</div>
              <div
                className={(() => {
                  let widthHeightStyle = "w-6 h-6 ";
                  if (item.value === "All")
                    return widthHeightStyle + "bg-blue-500";
                  else if (
                    item.value === "Inactive" ||
                    item.value === "Rejected"
                  )
                    return widthHeightStyle + "bg-gray-500";
                  else if (item.value === "Active")
                    return widthHeightStyle + "bg-green-500";
                  else if (item.value === "Censored")
                    return widthHeightStyle + "bg-red-500";
                  else if (item.value === "Pending")
                    return widthHeightStyle + "bg-yellow-400";
                })()}
              ></div>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default FormRadioSelect;
