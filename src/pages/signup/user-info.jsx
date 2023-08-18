import React from "react";
import { Form } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import "./style.css";
import AppFramerButton from "../../components/app-framer-button";

const UserInfoForm = () => {
  return (
    <div className="ms-0 ms-md-5">
      <div className="mb-1 position-relative">
        <AppFramerButton>
          <button className="btn btn-primary me-md-5 mb-2">
            <FaGoogle size={23} className="me-2" />
            Signup with Google
          </button>
        </AppFramerButton>
        <hr />
        <span className="or-icon fs-5">or</span>
      </div>
      <div className="signup-user-info-container row">
        <div className="col-12 col-md-6">
          <Form.Label>First Name </Form.Label>
          <Form.Control type="text" placeholder="First Name" />
        </div>
        <div className="col-12 col-md-6">
          <Form.Label>Last Name </Form.Label>
          <Form.Control type="text" placeholder="Last Name" />
        </div>
        <div className="col-12 col-md-6">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" placeholder="User Name" />
        </div>
        <div className="col-12 col-md-6">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="email" />
        </div>
        <div className="col-12 col-md-6">
          <Form.Label>D.O.B</Form.Label>
          <Form.Control type="text" placeholder="DOB" />
        </div>
        <div className="col-12 col-md-6">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" placeholder="Location" />
        </div>
      </div>
    </div>
  );
};

export default UserInfoForm;
