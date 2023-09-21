import React, { useRef } from "react";
import { Form } from "react-bootstrap";
import "./style.css";

const AppTextArea = ({
  placeholder,
  rows,
  cols,
  value,
  type,
  isNormalTextArea,
  handleChange,
  name,
  handleBlur,
  errors,
  touched,
}) => {
  const elementRef = useRef();

  const handleAppTextAreaChange = (e) => {
    elementRef.current.style.height = `${e.target.scrollHeight}px`;
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
        value={value}
        rows={rows}
        cols={cols}
        name={name}
        onBlur={handleBlur}
      />
      {touched && (
        <p className="text-danger ms-2" style={{ textAlign: "start" }}>
          {errors.about}
        </p>
      )}
    </div>
  );
};

export default AppTextArea;
