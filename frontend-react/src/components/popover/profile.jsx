import React, { useRef, useState } from "react";
import { MockProfilePopoverData } from "../../utils/mock-common";
import {
  isToggleContent,
  navigateToProfile,
  sliceContent,
} from "../../utils/common-function";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";

const ProfilePopover = ({ setOpenModal, setShow }) => {
  const navigate = useNavigate();
  const { page_id } = useParams();

  return (
    <>
      <div className="row p-2">
        <div className="col-1">
          <img
            src={MockProfilePopoverData.profile_img}
            alt="profile_popover"
            width={40}
            height={40}
            className="rounded-circle popover-profile-image"
            onClick={(e) =>
              navigateToProfile(
                e,
                navigate,
                MockProfilePopoverData.snappy_username,
                page_id
              )
            }
          />
        </div>
        <div className="col-9 ms-4">
          <div className="d-flex">
            <p
              className="fw-bold mb-0 popover-name "
              onClick={(e) =>
                navigateToProfile(
                  e,
                  navigate,
                  MockProfilePopoverData.snappy_username,
                  page_id
                )
              }
            >
              {MockProfilePopoverData.name}
            </p>
            <p className="text-muted ms-1 mb-0">{`@${MockProfilePopoverData.snappy_username}`}</p>
            <button className="btn btn-sm btn-primary p-0 m-0 ps-1 pe-1 ms-auto">
              Add
            </button>
          </div>
          <div className="d-flex mb-0 mt-1">
            <p className="mb-0">
              <span
                className="fw-bold"
                onClick={(e) =>
                  navigateToProfile(e, navigate, obj.snappy_username, page_id)
                }
              >
                {MockProfilePopoverData.friends}
              </span>
              <span
                className="popover-friends-hover"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenModal({ show: true, open_type: 4 });
                  setShow(false);
                }}
              >
                {" "}
                Friends
              </span>
            </p>
            <p className="mb-0 ms-3">
              {MockProfilePopoverData.mutual_friends ? (
                <>
                  {" "}
                  <span className="fw-bold">
                    {MockProfilePopoverData.mutual_friends}
                  </span>
                  <span
                    className="popover-friends-hover"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpenModal({ show: true, open_type: 5 });
                      setShow(false);
                    }}
                  >
                    {" "}
                    Mutuals
                  </span>
                </>
              ) : (
                "No Mutuals"
              )}
            </p>
          </div>
        </div>
        <p className="mt-2">
          {isToggleContent(MockProfilePopoverData.bio, 100)
            ? sliceContent(MockProfilePopoverData.bio, 100)
            : MockProfilePopoverData.bio}
        </p>
      </div>
    </>
  );
};

export default ProfilePopover;
