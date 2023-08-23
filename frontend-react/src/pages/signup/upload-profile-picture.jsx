import React from "react";
import "./style.css";
import mutual4 from "../../assets/mock-image/4mutual.jpg";
import { TbCameraPlus } from "react-icons/tb";

const UploadProfilePicture = () => {
  return (
    <div className="text-start p-4 pt-1 pb-0">
      <div>
        <p className="fs-6 text-muted">
          Have a Favourite Selfie? Upload it now
        </p>
        <div className="signup-edit-prof">
          <img
            src={mutual4}
            alt="profile-img"
            width="130px"
            height="130px"
            className="rounded-circle signup-edit-prof-img"
          />
          <TbCameraPlus
            size={50}
            className="signup-edit-prof__camicon1  position-absolute start-50 top-50 translate-middle"
          />
        </div>
      </div>
    </div>
  );
};

export default UploadProfilePicture;
