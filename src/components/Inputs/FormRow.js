import React from "react";

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  style,
  placeholder,
  disabled,
}) => {
  return (
    <div>
      {labelText ? <label htmlFor={labelText}>{labelText}</label> : null}
      <input
        disabled={disabled}
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className={disabled ? style + " bg-gray-300" : style}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormRow;
