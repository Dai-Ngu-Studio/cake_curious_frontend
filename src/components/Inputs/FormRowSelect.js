import React from "react";

const FormRowSelect = ({
  labelText,
  name,
  value,
  handleChange,
  list,
  style,
}) => {
  return (
    <div>
      {/* <label htmlFor={name}>{labelText || name}</label> */}
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 w-28"
      >
        {list.map((item, index) => {
          return (
            <option
              key={index}
              value={item.value || item}
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
