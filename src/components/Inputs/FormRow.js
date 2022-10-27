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
      {labelText ? <label htmlFor={labelText}>{labelText}</label> : null}
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
