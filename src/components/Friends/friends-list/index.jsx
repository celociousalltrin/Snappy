import React, { useState } from "react";
import AppInput from "../../app-input";
import { AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai";
import "./style.css";
import useListToggleContent from "../../../custom-hooks/useListToggleContent";
import { isToggleContent, sliceContent } from "../../../utils/common-function";
import { BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";
import AppListExpand from "../../app-list-expand";

const FriendsList = ({ MockFriendsList, isMessage, isSignup }) => {
  const { showMore, showLess, listUniqueId } = useListToggleContent();

  const isSignupMobileScreen = () => {
    if (isSignup && window.innerWidth < 768) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      {!isSignup && (
        <div className="mb-4">
          <AppInput isFriend />
        </div>
      )}
      <div>
        {MockFriendsList.map((obj, index) => (
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
              col-10 ${
                isSignup ? "ms-md-4 ms-lg-2" : "ms-4 ps-4 ps-md-0 ps-lg-3"
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
                      } ${isMessage && "d-none"}`}
                    >
                      Add
                    </span>
                  </button>
                </div>
              </div>
              <div>
                <p
                  className={`mb-2 ${
                    isSignup && "ms-4 mt-1 ps-1 ms-md-0 mt-md-0 p-md-0"
                  }`}
                >
                  <AppListExpand isExpand={listUniqueId.includes(index)}>
                    {isToggleContent(
                      obj.bio,
                      isSignupMobileScreen() ? 55 : 105
                    ) && !listUniqueId.includes(index) ? (
                      <span>
                        {sliceContent(
                          obj.bio,
                          isSignupMobileScreen() ? 55 : 105
                        )}{" "}
                        <BiSolidChevronDown
                          color="rgb(13, 110, 253)"
                          size={23}
                          onClick={(e) => showMore(e, index)}
                        />{" "}
                      </span>
                    ) : (
                      <span>
                        {obj.bio}
                        {isToggleContent(
                          obj.bio,
                          isSignupMobileScreen() ? 55 : 105
                        ) && (
                          <BiSolidChevronUp
                            color="rgb(13, 110, 253)"
                            className="ms-2"
                            size={23}
                            onClick={(e) => showLess(e, index)}
                          />
                        )}
                      </span>
                    )}
                  </AppListExpand>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
