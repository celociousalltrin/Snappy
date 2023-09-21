import React, { useState } from "react";

import "./style.css";

import AppEmail from "../app-email";
import AppOTP from "../app-otp";
import { FramerCheckIcon } from "../../utils/framer-svgs";
import { signupStepIconVariants } from "../../utils/framer-variants";
import AppTimer from "../app-timer";
import toast from "react-hot-toast";

const AppVerificationCode = ({ isValid, setIsValid, email, formik }) => {
  const [isNotRecieved, setIsNotRecieved] = useState(false);
  const [generateCode, setGenerateCode] = useState(false);
  const [isOTPExpired, setIsOTPExpired] = useState(false);
  const [otp, setOtp] = useState("");

  const VerifyCodeNote = () => {
    return (
      <div className="verify-code-note mt-3">
        <h6 className="fw-bold fs-5">Note:</h6>
        <ul>
          <li>
            The code will be sent to the email address you provided in the User
            Information Form.
          </li>
          <li>
            {" "}
            You must enter the Code within 5 minutes. So, keep your mail logged
            in your device.
          </li>
        </ul>
      </div>
    );
  };

  return (
    <>
      {isNotRecieved ? (
        <AppEmail
          isVerifyCode
          setIsNotRecieved={setIsNotRecieved}
          data={email}
          handleChange={(e) => formik.setFieldValue("email", e.target.value)}
          formik={formik}
        />
      ) : (
        <>
          {!generateCode ? (
            <div className="verify-code">
              <button
                className="btn btn-primary"
                onClick={() => setGenerateCode(true)}
              >
                Generate Code
              </button>
              {VerifyCodeNote()}
            </div>
          ) : !isOTPExpired ? (
            <div className="verify-code-container">
              <p className="fw-bold mb-2">We Sent you a Code</p>
              <p className="text-muted fs-6 mb-2">
                {" "}
                Enter it below to verify{" "}
                <span className="fw-bold">{email}</span>
              </p>
              {!isValid ? (
                <>
                  {" "}
                  <AppOTP otp={otp} setOtp={setOtp} />
                  <AppTimer
                    minutes={5}
                    callback={(isExpired) => setIsOTPExpired(isExpired)}
                  />
                  <p
                    className="fs-6 text-primary mb-0 mt-1 cursor-pointer recieve-email"
                    onClick={() => setIsNotRecieved(true)}
                  >
                    Didn't receive an email?
                  </p>
                  <button
                    className="btn btn-success mt-3"
                    onClick={() => {
                      if (otp.length === 4) {
                        setIsValid(true);
                      } else {
                        toast.error(
                          otp.length >= 1
                            ? "Enter the all the OTP code "
                            : "Enter OTP"
                        );
                      }
                    }}
                  >
                    Verify Code
                  </button>{" "}
                </>
              ) : (
                <div>
                  <span className="rounded-circle signup-success-check-icon">
                    <FramerCheckIcon
                      variants={signupStepIconVariants}
                      color="white"
                      width="70"
                      height="90"
                      iconwidth="2.5"
                      isActive
                    />
                  </span>
                  <h5 className="text-success">Verified</h5>
                  <p className="text-muted">
                    To proceed, click the Next button.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
              <h5 className="text-danger">Time is Expired...</h5>
              <p className="text-muted">
                To re-generate the code, please click the Regenerate Code
                button.
              </p>
              <button
                className="btn btn-outline-primary"
                onClick={() => setIsOTPExpired(false)}
              >
                Regenerate Code
              </button>
              {VerifyCodeNote()}
            </>
          )}
        </>
      )}
    </>
  );
};

export default AppVerificationCode;
