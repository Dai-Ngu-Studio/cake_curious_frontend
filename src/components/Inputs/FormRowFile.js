import React from "react";
import { DefaultImage } from "../../ultils/DefaultImage";

const FormRowFile = ({ type, name, value, handleChange, keyword }) => {
  return (
    <div>
      <img src={value || DefaultImage(keyword)} alt="nothing-important" />
      <input type={type} name={name} onChange={handleChange} />
    </div>
  );
};

export default FormRowFile;
