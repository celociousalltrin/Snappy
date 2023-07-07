import React, { useRef, useState } from "react";
import snappImage from "../../assets/mock-image/5mutual.jpg";
import "./style.css";

import { FiImage } from "react-icons/fi";

const Snapp = () => {
  const elementRef = useRef();
  const handleChange = function (e) {
    elementRef.current.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="d-flex row container pb-2 mb-4 ms-1 border border-1 rounded">
      <div className="col-md-1">
        <img
          src={snappImage}
          alt="snappImage"
          width="40px"
          height="40px"
          className="snapp-profile-image "
        />
      </div>
      <div className="col-md-11">
        <textarea
          ref={elementRef}
          onChange={handleChange}
          className="snapp-text-area border-bottom pt-2"
          placeholder="Share Your Snapps"
        />
        <div className="d-flex mt-1">
          <FiImage
            size={20}
            onClick={() => alert("Image upload button is clkicked")}
            className="cursor-pointer"
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
