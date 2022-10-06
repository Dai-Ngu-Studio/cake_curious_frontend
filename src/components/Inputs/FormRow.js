import React from "react";

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  style,
  placeholder,
}) => {
  return (
    <div>
      {/* <label htmlFor={name}>{labelText || name}</label> */}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className={style}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormRow;
