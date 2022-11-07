import React from "react";

const FormRadioSelect = ({
  labelText,
  name,
  value,
  handleChange,
  list,
  style,
  disabledSelection,
  disabledOption,
}) => {
  return (
    <div>
      {labelText ? <label htmlFor={labelText}>{labelText}: </label> : null}
      {/* {console.log("ENDED")} */}
      {list?.map((item, index) => {
        console.log(index);
        return (
          <div key={index}>
            <input
              type="radio"
              name={name}
              value={item.value}
              id={item.value}
              onClick={handleChange}
              className="block py-2 px-4 hover:bg-gray-100"
            ></input>
            <label htmlFor={item.value}>{item.name}</label>
          </div>
        );
      })}
    </div>
  );
};

export default FormRadioSelect;
