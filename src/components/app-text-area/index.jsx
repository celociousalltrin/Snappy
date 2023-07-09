import React, { useRef } from "react";
import "./style.css";

const AppTextArea = ({ placeholder, rows, cols, callback = () => {} }) => {
  const elementRef = useRef();

  const handleChange = (e) => {
    elementRef.current.style.height = `${e.target.scrollHeight}px`;
  };
  return (
    <div>
      <textarea
        ref={elementRef}
        className="snapp-text-area"
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
      />
    </div>
  );
};

export default AppTextArea;
