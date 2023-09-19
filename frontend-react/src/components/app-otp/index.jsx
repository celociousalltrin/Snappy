import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import "./style.css";

const AppOTP = () => {
  const [otp, setOtp] = useState("");
  const [view, setView] = useState(false);

  return (
    <div className="otp-input">
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
        inputType={view ? "text" : "password"}
      />
      <div className="ms-2">
        {view ? (
          <AiFillEye
            size={35}
            onClick={() => setView(false)}
            className="cursor-pointer"
          />
        ) : (
          <AiFillEyeInvisible
            size={35}
            onClick={() => setView(true)}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default AppOTP;
