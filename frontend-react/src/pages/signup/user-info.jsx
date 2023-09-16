import React from "react";
import { Form } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import "./style.css";
import AppFramerButton from "../../components/app-framer-button";
import Select from "react-select";
import countries from "../../utils/countries.json";
import ReactDatePicker from "react-datepicker";
import PhoneInput from "react-phone-input-2";

const UserInfoForm = ({
  data: {
    first_name,
    last_name,
    user_name,
    email,
    phone_number,
    dob,
    personal_address,
  },
  handleChange,
  handleSelectChange,
  handleCustomChange,
}) => {
  const locateLocationbyCode = (code) => {
    return countries.find((o) => o.code3 === code);
  };

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
          <Form.Control
            type="text"
            placeholder="First Name"
            name="first_name"
            value={first_name}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-md-6">
          <Form.Label>Last Name </Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            name="last_name"
            value={last_name}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-md-6">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="User Name"
            name="user_name"
            value={user_name}
            onChange={handleChange}
          />
          {user_name && (
            <p className="signup-user-name text-primary">{`@${user_name
              .toLowerCase()
              .replace(/\s+/g, "_")}`}</p>
          )}
        </div>
        <div className="col-12 col-md-6">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-md-6">
          <Form.Label>Phone Number</Form.Label>

          <PhoneInput
            country={"in"}
            value={phone_number}
            onChange={(data) => handleCustomChange("phone_number", data)}
            countryCodeEditable={false}
          />
        </div>
        <div className="col-12 col-md-6">
          <Form.Label>Date Of Birth</Form.Label>
          <ReactDatePicker
            className="signup-date-picker"
            placeholderText="Date Of Birth"
            selected={dob && new Date(dob)}
            onChange={(date) => handleCustomChange("dob", date.toISOString())}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </div>
        <div className="col-12 col-md-6">
          <Form.Label>Country</Form.Label>
          <Select
            className="signup-select"
            placeholder="Select the Country..."
            value={
              personal_address?.country && {
                label: locateLocationbyCode(personal_address?.country).name,
                value: personal_address?.country,
              }
            }
            options={countries.map(({ name, code3 }) => ({
              label: name,
              value: code3,
              name: "country",
            }))}
            onChange={handleSelectChange}
          />
        </div>
        <div className="col-12 col-md-6">
          <Form.Label>State</Form.Label>
          <Select
            className="signup-select"
            placeholder="Select the State..."
            value={
              personal_address?.state && {
                label: locateLocationbyCode(
                  personal_address?.country
                ).states?.find((x) => x.code === personal_address.state)?.name,
                value: personal_address?.state,
              }
            }
            options={
              personal_address?.country &&
              locateLocationbyCode(personal_address?.country).states.map(
                ({ name, code }) => ({
                  label: name,
                  value: code,
                  name: "state",
                })
              )
            }
            onChange={handleSelectChange}
            isDisabled={!personal_address?.country}
          />
        </div>
      </div>
    </div>
  );
};

export default UserInfoForm;
