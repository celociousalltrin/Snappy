import React, { useRef } from "react";
import "./style.css";

const AppTextArea = ({ placeholder, rows, cols, type, isNormalTextArea }) => {
  const elementRef = useRef();

  const handleAppTextAreaChange = (e) => {
    elementRef.current.style.height = `${e.target.scrollHeight}px`;
  };

  const handleChange = (e) => {
    console.log(e);
  };

  return (
    <div>
      <textarea
        ref={elementRef}
        className={`${type === 1 ? "border mt-2 ms-2 ms-md-0" : ""} ${
          isNormalTextArea ? "normal-text-area" : "app-text-area"
        }`}
        onChange={isNormalTextArea ? handleChange : handleAppTextAreaChange}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
      />
    </div>
  );
};

export default AppTextArea;
