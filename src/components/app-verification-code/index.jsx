import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./style.css";
import { useNavigate } from "react-router-dom";
import AppEmail from "../app-email";

const AppVerificationCode = () => {
  const navigate = useNavigate();
  const [isNotRecieved, setIsNotRecieved] = useState(false);
  return (
    <>
      {isNotRecieved ? (
        <AppEmail isVerifyCode setIsNotRecieved={setIsNotRecieved} />
      ) : (
        <div className="verify-code-container">
          <p className="fw-bold mb-2">We Sent you a Code</p>
          <p className="text-muted fs-6 mb-2">
            {" "}
            Enter it below to verify{" "}
            <span className="fw-bold">lorem@gmail.com</span>
          </p>
          <Form.Control type="text" placeholder="Enter a Code" />
          <p
            className="fs-6 text-primary mb-0 mt-1 cursor-pointer"
            onClick={() => setIsNotRecieved(true)}
          >
            Didn't receive an email?
          </p>
        </div>
      )}
    </>
  );
};

export default AppVerificationCode;
