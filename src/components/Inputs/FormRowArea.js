import React from "react";

const FormRowArea = ({
  name,
  value,
  handleChange,
  labelText,
  disabled,
  className,
}) => {
  return (
    <div>
      <label htmlFor={labelText}>{labelText}</label>
      <textarea
        name={name}
        id={name}
        rows="4"
        disabled={disabled}
        className={className}
        value={value}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default FormRowArea;
