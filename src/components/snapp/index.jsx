import React, { useState } from "react";
import snappImage from "../../assets/mock-image/5mutual.jpg";
import "./style.css";

import { FiImage } from "react-icons/fi";
import AppTextArea from "../app-text-area";

const Snapp = () => {
  return (
    <div className="d-flex row border border-1 rounded pb-2 ms-1 me-1 mb-4 pt-2">
      <div className="col-2 col-md-1">
        <img
          src={snappImage}
          alt="snappImage"
          width="40rem"
          height="40rem"
          className="snapp-profile-image"
        />
      </div>
      <div className="col-10">
        <AppTextArea placeholder="Share your Snapps" rows={1} />
        <div className="d-flex mt-1">
          <FiImage
            size={20}
            onClick={() => alert("Image upload button is clkicked")}
            className="cursor-pointer align-self-center"
          />
          <button
            className="btn btn-primary rounded-pill ms-auto"
            onClick={() => alert("Snapp is Added")}
          >
            Snapp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Snapp;
