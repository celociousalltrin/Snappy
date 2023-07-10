import React, { useRef } from "react";
import "./style.css";

const AppTextArea = ({ placeholder, rows, cols, type }) => {
  const elementRef = useRef();

  const handleChange = (e) => {
    elementRef.current.style.height = `${e.target.scrollHeight}px`;
  };
  return (
    <div>
      <textarea
        ref={elementRef}
        // className={
        //   type == 1 ? "snapp-text-area border mt-3" : "snapp-text-area"
        // }
        className={`${type === 1 ? "border mt-3" : ""} snapp-text-area`}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
      />
    </div>
  );
};

export default AppTextArea;
