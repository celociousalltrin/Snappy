import React from "react";
import "./style.css";
import AppPasswordInput from "../../components/app-password-input";
import { Form } from "react-bootstrap";

const CreatePassword = ({
  data: { new_password, confirm_password },
  formik: { handleBlur, errors, touched },
  handleChange,
}) => {
  return (
    <div className="pt-1 pb-0 row d-flex justify-content-center ps-2 ps-md-0">
      <div className="col-12 col-md-10 text-start">
        <label className="ms-1">Create Password</label>
        <AppPasswordInput
          name="new_password"
          value={new_password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.new_password && (
          <span className="mt-1 mb-0 pb-0 text-danger">
            {errors.new_password}
          </span>
        )}
      </div>
      <div className="mt-4 col-12 col-md-10 text-start">
        <label className="ms-1">Confirm Password</label>
        <AppPasswordInput
          name="confirm_password"
          value={confirm_password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.confirm_password && (
          <p className="mt-1 mb-0 pb-0 text-danger">
            {errors.confirm_password}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreatePassword;
