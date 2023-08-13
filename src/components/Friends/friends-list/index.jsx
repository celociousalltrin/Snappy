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
                ? "signup-friends-list-container ms-0 shadow-sm mb-4 rounded"
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
                className={`${
                  isSignup
                    ? "signup-friends_profile--img mt-2 mt-md-3"
                    : "friends_profile--img"
                }`}
                style={
                  isMessage && obj.connected
                    ? { border: "3px solid green" }
                    : null
                }
              />
            </div>
            <div
              className={`${
                isSignup
                  ? "col-10 ms-md-4 ms-lg-2 ps-lg-3"
                  : "col-10 ms-4 ps-4 ps-md-0 ps-lg-3"
              }`}
            >
              <div className="d-flex justify-content-between mt-2">
                <div className={`${isSignup && "ms-4 ps-2 ms-md-0 ps-md-0"}`}>
                  <p className="fw-bold mb-0">{obj.name}</p>
                  <p className="text-muted mb-0">
                    {" "}
                    {`@${obj.snappy_username}`}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    className={`${
                      isSignup && "text-nowrap"
                    } btn btn-sm btn-primary`}
                  >
                    <span className={`${isSignup && "d-none d-md-block"}`}>
                      {" "}
                      {isMessage ? "Send Message" : "Add Friend"}{" "}
                    </span>

                    <span
                      className={`${
                        isSignup && "signup-addfriend-button d-md-none"
                      }`}
                    >
                      {" "}
                      {isMessage ? "Send Message" : "Add"}{" "}
                    </span>
                  </button>
                </div>
              </div>
              <p
                className={`${
                  isSignup && "mt-1 ms-4 ps-2 ps-md-0 ms-md-0 mt-md-0"
                }`}
              >
                {obj.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
