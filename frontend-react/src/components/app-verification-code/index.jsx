import React, { useState } from "react";

import "./style.css";

import AppEmail from "../app-email";
import AppOTP from "../app-otp";
import { FramerCheckIcon } from "../../utils/framer-svgs";
import { signupStepIconVariants } from "../../utils/framer-variants";
import AppTimer from "../app-timer";
import toast from "react-hot-toast";
import { responseMessage } from "../../utils/response-message";
import {
  generateEmailVerificationOTP,
  verifyEmailVerificationOTP,
} from "../../services/method";

const AppVerificationCode = ({
  isValid,
  setIsValid,
  data,
  formik,
  issued_for,
}) => {
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

  const handleGenerateVerifyCode = async (input) => {
    const { email, first_name, last_name } = input;
    try {
      const response = await generateEmailVerificationOTP({
        email,
        name: `${first_name} ${last_name}`,
        issued_for,
      });
      responseMessage(response.data.code);
      setGenerateCode(true);
      setIsOTPExpired(false);
      setOtp("");
    } catch (err) {
      console.log(
        "🚀 ~ file: index.jsx:41 ~ handleGenerateVerifyCode ~ err:",
        err
      );
      responseMessage(err?.data?.code);
    }
  };

  const handleVerifyOTP = async (input) => {
    try {
      const {
        data: {
          response_data: { is_otp_verified },
          code,
        },
      } = await verifyEmailVerificationOTP(input);

      if (is_otp_verified) {
        setIsValid(true);
        responseMessage(code);
      }
    } catch (err) {
      console.log("🚀 ~ file: index.jsx:66 ~ handleVerifyOTP ~ err:", err);
      responseMessage(err.data.code, 3000);
    }
  };

  return (
    <>
      {isNotRecieved ? (
        <AppEmail
          isVerifyCode
          setIsNotRecieved={setIsNotRecieved}
          data={data}
          handleChange={(e) => formik.setFieldValue("email", e.target.value)}
          formik={formik}
          GenerateVerifyCode={handleGenerateVerifyCode}
        />
      ) : isValid ? (
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
          <p className="text-muted">To proceed, click the Next button.</p>
        </div>
      ) : (
        <>
          {!generateCode ? (
            <div className="verify-code">
              <button
                className="btn btn-primary"
                onClick={() => handleGenerateVerifyCode(data)}
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
                <span className="fw-bold">{data.email}</span>
              </p>
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
                      handleVerifyOTP({ issued_for, email: data.email, otp });
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
                onClick={() => {
                  handleGenerateVerifyCode(data);
                }}
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
