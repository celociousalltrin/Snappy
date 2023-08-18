import React, { useState } from "react";
import AppInput from "../../app-input";
import useListToggleContent from "../../../custom-hooks/useListToggleContent";
import AppListExpand from "../../app-list-expand";

import "./style.css";
import AppFramerButton from "../../app-framer-button";

const FriendsList = ({
  MockFriendsList,
  isMessage,
  isSignup,
  isFriendList,
  isDiscoverFriend,
  length,
}) => {
  const { showMore, showLess, listUniqueId } = useListToggleContent();

  const list = isDiscoverFriend
    ? MockFriendsList.slice(0, length)
    : MockFriendsList;

  return (
    <div>
      {!isSignup && (
        <div className="mb-4">
          <AppInput isFriend isDiscoverFriend />
        </div>
      )}
      <div>
        {list.map((obj, index) => (
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
              className={`
               ${
                 isSignup
                   ? "col-10 ms-md-4 ms-lg-2"
                   : isDiscoverFriend
                   ? "col-9 ms-5"
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
                  <AppFramerButton>
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
                        } ${
                          (isMessage || isFriendList || isDiscoverFriend) &&
                          "d-none"
                        }`}
                      >
                        Add
                      </span>
                    </button>
                  </AppFramerButton>
                </div>
              </div>
              {!isDiscoverFriend && (
                <div>
                  <p
                    className={`mb-2 ${
                      isSignup && "ms-4 mt-1 ps-1 ms-md-0 mt-md-0 p-md-0"
                    }`}
                  >
                    <AppListExpand
                      content={obj.bio}
                      contentId={index}
                      isExpand={listUniqueId.includes(index)}
                      showMore={showMore}
                      showLess={showLess}
                      isSignup={isSignup}
                    />
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
