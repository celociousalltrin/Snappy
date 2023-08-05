import React from "react";
import "./style.css";
import { FramerCheckIcon } from "../../utils/framer-svgs";
import { signupStepIconVariants } from "../../utils/framer-variants";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SignupSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="signup-success-parent-container">
      <motion.div
        className="border-none p-4 bg-light rounded"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
      >
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
        <h3 className="mb-2 fw-bold">Congratulations!</h3>
        <h5>You've Successfully Registered on Snappy! </h5>
        <p>Your gateway to seamless connections and unforgettable moments.</p>
        <p>
          Click here to{" "}
          <span
            className="text-decoration-underline text-primary cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Sign in
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupSuccess;
