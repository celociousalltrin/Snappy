import React from "react";
import AppPasswordInput from "../app-password-input";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { changePasswordSchema } from "../../utils/form-validation-schema";
import { responseMessage } from "../../utils/response-message";
import { changeUserPassword } from "../../services/method";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const { is_external_authenticated_user } = useSelector(
    (state) => state.user.data
  );

  const navigate = useNavigate();
  const init = {
    old_password: "",
    new_password: "",
  };

  const onSubmit = async (values) => {
    try {
      const response = await changeUserPassword(values);
      responseMessage(response.data.code, 3500);
      setTimeout(() => {
        navigate("/logout");
      }, 4000);
    } catch (err) {
      console.log("🚀 ~ file: index.jsx:21 ~ onSubmit ~ err:", err);
      responseMessage(err.data.code);
    }
  };

  const formik = useFormik({
    initialValues: init,
    validationSchema: changePasswordSchema,
    onSubmit,
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values: { old_password, new_password },
  } = formik;

  return (
    <div className="container">
      {is_external_authenticated_user ? (
        <div style={{ height: "60vh", display: "flex", alignItems: "center" }}>
          <h2 className="text-center">
            Change Password is not available for Google users
          </h2>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="shadow-none p-3 mb-5 bg-light rounded">
            <h5>
              Change Password <span className="text-danger">*</span>
            </h5>
            <div className="row mt-3">
              <div className="col-md-8 ">
                <label>Old Password</label>
                <AppPasswordInput
                  type="password"
                  onChange={handleChange}
                  name="old_password"
                  value={old_password}
                  onBlur={handleBlur}
                />
                {touched.old_password && (
                  <p className="mt-1 mb-0 pb-0 text-danger">
                    {errors.old_password}
                  </p>
                )}
              </div>
              <div className="col-md-8  mt-3">
                <label>
                  New Password <span className="text-danger">*</span>
                </label>
                <AppPasswordInput
                  type="password"
                  onChange={handleChange}
                  name="new_password"
                  value={new_password}
                  onBlur={handleBlur}
                />
                {touched.new_password && (
                  <p className="mt-1 mb-0 pb-0 text-danger">
                    {errors.new_password}
                  </p>
                )}
              </div>
            </div>
            <button className="btn btn-outline-dark mt-3 mb-2" type="submit">
              Change Password
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Setting;
