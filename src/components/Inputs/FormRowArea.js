import React from "react";

const FormRowArea = ({
  name,
  value,
  handleChange,
  labelText,
  disabled,
  style,
}) => {
  return (
    <div>
      <label htmlFor={labelText}>{labelText}</label>
      <textarea
        name={name}
        id={name}
        rows="4"
        disabled={disabled}
        className={style}
        value={value}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default FormRowArea;
