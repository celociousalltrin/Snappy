import React, { useState } from "react";
import AppInput from "../../app-input";
import useListToggleContent from "../../../custom-hooks/useListToggleContent";
import AppListExpand from "../../app-list-expand";

import "./style.css";
import AppFramerButton from "../../app-framer-button";
import AppPopover from "../../app-popover";
import { navigateToProfile } from "../../../utils/common-function";
import { useNavigate, useParams } from "react-router-dom";
import {
  signupCreateConnector,
  signupDeleteConnector,
} from "../../../services/method";

const ConnectorsList = ({
  MockConnectorsList,
  isMessage,
  isSignup,
  isAllianceList,
  isFansList,
  isDiscoverAlliance,
  length,
  callback = () => {},
  signupConnectedUsers,
}) => {
  const { showMore, showLess, listUniqueId } = useListToggleContent();
  const navigate = useNavigate();
  const { page_id } = useParams();

  const list = isDiscoverAlliance
    ? MockConnectorsList.slice(0, length)
    : MockConnectorsList;

  return (
    <div>
      {!isSignup && (
        <div className="mb-4">
          <AppInput isConnector isDiscoverAlliance />
        </div>
      )}
      <div>
        {list.map((obj, index) => (
          <div
            className={`d-flex row ${
              isSignup
                ? "signup-connectors-list-container ms-0 shadow-sm mb-4 rounded"
                : "connectors-list-container"
            }`}
            key={obj.id}
          >
            <div className="col-1">
              <img
                src={obj.user_image?.secure_url}
                alt="profile_image"
                width="50px"
                height="50px"
                className={`${
                  isSignup
                    ? "signup-connectors_profile--img mt-2 mt-md-3"
                    : "connectors_profile--img"
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
                   : isDiscoverAlliance
                   ? "col-9 ms-5"
                   : "col-10 ms-4 ps-4 ps-md-0 ps-lg-3"
               }`}
            >
              <div className="d-flex justify-content-between mt-2">
                <div className={`${isSignup && "ms-4 ps-2 ms-md-0 ps-md-0"}`}>
                  <AppPopover
                    type={1}
                    isNoPopOver={isSignup || isDiscoverAlliance}
                  >
                    <p
                      className={`fw-bold mb-0 ${
                        !isSignup ? "user-name-style" : ""
                      }`}
                      onClick={(e) =>
                        !isSignup
                          ? navigateToProfile(
                              e,
                              navigate,
                              obj.snappy_username,
                              page_id
                            )
                          : null
                      }
                    >
                      {`${obj.first_name} ${obj.last_name}`}
                    </p>
                  </AppPopover>
                  <p className="text-muted mb-0">
                    {" "}
                    {`@${obj.user_name.toLowerCase().replace(/\s+/g, "_")}`}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <AppFramerButton>
                    <button
                      className={`${isSignup && "text-nowrap"} ${
                        signupConnectedUsers?.includes(obj._id)
                          ? "btn btn-sm btn-danger"
                          : "btn btn-sm btn-primary"
                      }`}
                      onClick={() => {
                        callback(obj._id);
                      }}
                    >
                      {signupConnectedUsers?.includes(obj._id) ? (
                        <span className={`${isSignup && "d-none d-md-block"}`}>
                          {isMessage ? "Send Message" : "Remove Alliance"}{" "}
                        </span>
                      ) : (
                        <span className={`${isSignup && "d-none d-md-block"}`}>
                          {" "}
                          {isMessage ? "Send Message" : "Add Alliance"}{" "}
                        </span>
                      )}

                      <span
                        className={`${
                          isSignup && "signup-addAlliance-button d-md-none"
                        } ${
                          (isMessage ||
                            isAllianceList ||
                            isFansList ||
                            isDiscoverAlliance) &&
                          "d-none"
                        }`}
                      >
                        Add
                      </span>
                    </button>
                  </AppFramerButton>
                </div>
              </div>
              {!isDiscoverAlliance && (
                <div>
                  <p
                    className={`mb-2 ${
                      isSignup && "ms-4 mt-1 ps-1 ms-md-0 mt-md-0 p-md-0"
                    }`}
                  >
                    <AppListExpand
                      content={obj.about}
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

export default ConnectorsList;
