import React from "react";
import AppInput from "../../app-input";

import "./style.css";

const FriendsList = ({ MockFriendsList, isMessage, isSignup }) => {
  return (
    <div>
      {!isSignup && (
        <div className="mb-4">
          <AppInput isFriend />
        </div>
      )}
      <div>
        {MockFriendsList.map((obj) => (
          <div
            className={`d-flex row ${
              isSignup
                ? "signup-friends-list-container shadow-sm mb-4 rounded"
                : "friends-list-container"
            }`}
            key={obj.id}
          >
            <div className="col-1">
              <img
                src={obj.profile_img}
                alt="profile_image"
                width="50px"
                height="50px"
                className="friends_profile--img "
                style={
                  isMessage && obj.connected
                    ? { border: "3px solid green" }
                    : null
                }
              />
            </div>
            <div className="col-10 ms-4 ps-4 ps-md-0 ps-lg-3">
              <div className="d-flex justify-content-between mt-2">
                <div>
                  <p className="fw-bold mb-0">{obj.name}</p>
                  <p className="text-muted mb-0">
                    {" "}
                    {`@${obj.snappy_username}`}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <button className="btn btn-sm btn-primary">
                    {isMessage ? "Send Message" : "Add friend"}
                  </button>
                </div>
              </div>
              <p>{obj.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
