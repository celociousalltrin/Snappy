import React from "react";
import "./style.css";
import AppPasswordInput from "../../components/app-password-input";

const CreatePassword = () => {
  return (
    <div className="pt-1 pb-0 row d-flex justify-content-center ps-2 ps-md-0">
      <div className="col-12 col-md-10 text-start">
        <label className="ms-1">Create Password</label>
        <AppPasswordInput type="password" name="create_password" />
      </div>
      <div className="mt-4 col-12 col-md-10 text-start">
        <label className="ms-1">Confirm Password</label>
        <AppPasswordInput type="password" name="Confirm_password" />
      </div>
    </div>
  );
};

export default CreatePassword;
