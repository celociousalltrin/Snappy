import React from "react";
import { Form } from "react-bootstrap";
import "./style.css";

const AppVerificationCode = () => {
  return (
    <div className="verify-code-container">
      <p className="fw-bold mb-2">We Sent you a Code</p>
      <p className="text-muted fs-6 mb-2">
        {" "}
        Enter it below to verify{" "}
        <span className="fw-bold">lorem@gmail.com</span>
      </p>
      <Form.Control type="text" placeholder="Enter a Code" />
      <p className="fs-6 text-primary mb-0 mt-1 cursor-pointer">
        Didn't receive an email?
      </p>
    </div>
  );
};

export default AppVerificationCode;
