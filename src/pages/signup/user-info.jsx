import React from "react";
import { Form } from "react-bootstrap";
import "./style.css";

const UserInfoForm = () => {
  return (
    <div className="signup-user-info-container row ms-0 ms-md-5">
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
  );
};

export default UserInfoForm;
