import React, { useEffect, useState } from "react";
import AppInput from "../../app-input";
import useListToggleContent from "../../../custom-hooks/useListToggleContent";
import AppListExpand from "../../app-list-expand";

import "./style.css";
import AppFramerButton from "../../app-framer-button";
import AppPopover from "../../app-popover";
import {
  displayUserName,
  navigateToProfile,
} from "../../../utils/common-function";
import { useNavigate, useParams } from "react-router-dom";

import { responseMessage } from "../../../utils/response-message";
import { createConnector, removeConnector } from "../../../services/method";
import AppNoDataFound from "../../app-no-data-found";

import { MdGroups } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { connectorChanged } from "../../../redux/slices/userSlice";
import { BulletList } from "react-content-loader";

const ConnectorsList = ({
  connecteduserList,
  isMessage,
  isSignup,
  isAllianceList,
  isFansList,
  isDiscoverAlliance,
  length,
  callback = () => {},
  signupConnectedUsers,
  allianceCB = () => {},
  isConnectorList,
  allianceIds,
  isApiExecuted,
  isModal,
}) => {
  const { showMore, showLess, listUniqueId } = useListToggleContent();
  const [connectorsIDs, setConnectorsIDs] = useState([]);
  const [connectingIDs, setConnectingIds] = useState([]);

  useEffect(() => {
    if (!!allianceIds) {
      setConnectorsIDs(allianceIds.map((o) => o.alliance_id));
    }
  }, [allianceIds]);

  const dispatch = useDispatch();
  const { isConnectorChnaged } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const { page_id, sec_id } = useParams();

  const list = isDiscoverAlliance
    ? connecteduserList.slice(0, length)
    : connecteduserList;

  const handleCreateConnector = async (id) => {
    setConnectingIds((prev) => [...prev, id]);
    try {
      const response = await createConnector({ alliance_id: id });
      dispatch(connectorChanged(!isConnectorChnaged));
      responseMessage(response.data.code);
      setConnectorsIDs((prev) => [...prev, id]);
    } catch (err) {
      console.log(
        "🚀 ~ file: index.jsx:40 ~ handleCreateConnector ~ err:",
        err
      );
      responseMessage(response.data.code);
    } finally {
      setConnectingIds((prev) => prev.filter((xx) => xx !== id));
    }
  };

  const handleRemoveConnector = async (id) => {
    setConnectingIds((prev) => [...prev, id]);
    try {
      const response = await removeConnector(id);
      dispatch(connectorChanged(!isConnectorChnaged));
      responseMessage(response.data.code);
      allianceCB(id);

      setConnectorsIDs((prev) => prev.filter((o) => o !== id));
    } catch (err) {
      console.log(
        "🚀 ~ file: index.jsx:40 ~ handleCreateConnector ~ err:",
        err
      );
      responseMessage(response.data.code);
    } finally {
      setConnectingIds((prev) => prev.filter((xx) => xx !== id));
    }
  };

  const isDataPrestent =
    list.length > 0 && list[0] && Object.keys(list[0]).length > 0;

  return (
    <>
      {isApiExecuted ? (
        <>
          {isDataPrestent ? (
            <div>
              {/* {!isSignup && (
            <div className="mb-4">
              <AppInput isConnector isDiscoverAlliance />
            </div>
          )} */}
              <div>
                {list
                  .filter(({ user_name }) => !!user_name)
                  .map((obj, index) => (
                    <div
                      className={`d-flex row ${
                        isSignup
                          ? "signup-connectors-list-container ms-0 shadow-sm mb-4 rounded"
                          : "connectors-list-container"
                      }`}
                      key={obj._id}
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
                          <div
                            className={`${
                              isSignup && "ms-4 ps-2 ms-md-0 ps-md-0"
                            }`}
                          >
                            {/* <AppPopover
                    type={1}
                    isNoPopOver={isSignup || isDiscoverAlliance}
                  > */}
                            <p
                              className={`fw-bold mb-0 ${
                                !isSignup ? "user-name-style" : ""
                              }`}
                              onClick={(e) =>
                                !isSignup
                                  ? navigateToProfile(
                                      e,
                                      navigate,
                                      obj._id,
                                      page_id
                                    )
                                  : null
                              }
                            >
                              {`${obj.first_name} ${obj.last_name}`}
                            </p>
                            {/* </AppPopover> */}
                            <p className="text-muted mb-0">
                              {displayUserName(obj.user_name)}
                            </p>
                          </div>
                          <div className="d-flex align-items-center">
                            {!isModal && (
                              <AppFramerButton>
                                <button
                                  className={`${isSignup && "text-nowrap"} ${
                                    signupConnectedUsers?.includes(obj._id) ||
                                    connectorsIDs.includes(obj._id) ||
                                    isAllianceList
                                      ? "btn btn-sm btn-danger"
                                      : "btn btn-sm btn-primary"
                                  }`}
                                  onClick={() => {
                                    if (isSignup) {
                                      callback(obj._id);
                                    } else {
                                      if (
                                        connectorsIDs.includes(obj._id) ||
                                        isAllianceList
                                      ) {
                                        handleRemoveConnector(obj._id);
                                      } else {
                                        handleCreateConnector(obj._id);
                                      }
                                    }
                                  }}
                                >
                                  {signupConnectedUsers?.includes(obj._id) ||
                                  connectorsIDs.includes(obj._id) ||
                                  isAllianceList ? (
                                    <span
                                      className={`${
                                        isSignup && "d-none d-md-block"
                                      }`}
                                    >
                                      {isMessage
                                        ? "Send Message"
                                        : connectingIDs.includes(obj._id)
                                        ? "Removing..."
                                        : "Remove Alliance"}{" "}
                                    </span>
                                  ) : (
                                    <span
                                      className={`${
                                        isSignup && "d-none d-md-block"
                                      }`}
                                    >
                                      {" "}
                                      {isMessage
                                        ? "Send Message"
                                        : connectingIDs.includes(obj._id)
                                        ? "Adding..."
                                        : "Add Alliance"}{" "}
                                    </span>
                                  )}

                                  <span
                                    className={`${
                                      isSignup &&
                                      "signup-addAlliance-button d-md-none"
                                    } ${
                                      (isMessage ||
                                        isAllianceList ||
                                        isFansList ||
                                        isDiscoverAlliance ||
                                        isConnectorList) &&
                                      "d-none"
                                    }`}
                                  >
                                    Add
                                  </span>
                                </button>
                              </AppFramerButton>
                            )}
                          </div>
                        </div>
                        {!isDiscoverAlliance && (
                          <div>
                            <p
                              className={`mb-2 ${
                                isSignup &&
                                "ms-4 mt-1 ps-1 ms-md-0 mt-md-0 p-md-0"
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
          ) : (
            <AppNoDataFound
              icon={<MdGroups size={"180"} />}
              content={"Your journey awaits, keep shining!"}
            />
          )}
        </>
      ) : (
        <>
          {!isDiscoverAlliance ? (
            <>
              <BulletList />
              <BulletList />
            </>
          ) : (
            <BulletList />
          )}
        </>
      )}
    </>
  );
};

export default ConnectorsList;
