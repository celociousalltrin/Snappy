import React from "react";
import "./style.css";
import AppPasswordInput from "../../components/app-password-input";

const CreatePassword = () => {
  return (
    <div className="signup-create-password-container pt-1 pb-0">
      <div>
        <label>Create Password</label>
        <AppPasswordInput type="password" name="create_password" />
      </div>
      <div className="mt-4">
        <label>Confirm Password</label>
        <AppPasswordInput type="password" name="Confirm_password" />
      </div>
    </div>
  );
};

export default CreatePassword;
