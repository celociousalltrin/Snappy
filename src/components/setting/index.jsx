import React from "react";
import AppPasswordInput from "../app-password-input";

const Setting = () => {
  return (
    <div>
      <div className="shadow-none p-3 mb-5 bg-light rounded">
        <h5>Change Password</h5>
        <div className="row mt-3">
          <div className="col-md-8 ">
            <label>Old Password</label>
            <AppPasswordInput
              type="password"
              onChange={(e) => console.log(e.target.value)}
              name="change_password"
            />
          </div>
          <div className="col-md-8  mt-3">
            <label>New Password</label>
            <AppPasswordInput
              type="password"
              onChange={(e) => console.log(e.target.value)}
              name="change_password"
            />
          </div>
        </div>
        <button className="btn btn-outline-dark mt-3 mb-2" type="button">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Setting;
