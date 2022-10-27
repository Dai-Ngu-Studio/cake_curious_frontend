import React from "react";

const FormRowSelect = ({
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
      <select
        name={name}
        id={name}
        disabled={disabledSelection}
        value={value}
        onChange={handleChange}
        className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 w-28"
      >
        {list?.map((item, index) => {
          return (
            <option
              disabled={disabledOption === (item.id || index) ? true : false}
              key={index}
              value={item.value || item.id}
              className="block py-2 px-4 hover:bg-gray-100"
            >
              {item.name || item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
