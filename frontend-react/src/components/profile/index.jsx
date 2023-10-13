import React, { useState } from "react";
import {
  mockEditProfileInfo,
  mockProfileInfo,
  mockSnappInfo,
  singleFeedData,
} from "../../utils/mock-common";
import { SlCalender } from "react-icons/sl";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SingleFeed from "../single-feed";
import Feeds from "../feeds";
import { MdOutlineArrowBack } from "react-icons/md";
import { TbCameraPlus } from "react-icons/tb";
import Form from "react-bootstrap/Form";
import AppTextArea from "../app-text-area";

import "./style.css";
import AppFramerButton from "../app-framer-button";
import AppModal from "../app-modal";

const Profile = () => {
  const { id, sec_id } = useParams();
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const [show, setShow] = useState(false);

  const init = {
    show: false,
    open_type: "",
  };
  const [openModal, setOpenModal] = useState(init);
  const handleModelClose = () => {
    setOpenModal(init);
  };

  const cond = "1";
  return (
    <div className="container">
      {id === "single-feed" || sec_id ? (
        <SingleFeed singleFeedData={singleFeedData} />
      ) : (
        <>
          <div className="d-flex">
            <MdOutlineArrowBack
              size={20}
              className="me-4 mt-3 cursor-pointer"
              onClick={() =>
                navigate(
                  state
                    ? `/${state.from}`
                    : pathname.substring(0, pathname.indexOf("/", 1))
                )
              }
            />
            <div>
              <h4 className="fw-bold mb-0">{mockProfileInfo.name}</h4>
              <p>{`${mockProfileInfo.snapp_count} Snapp`}</p>
            </div>
          </div>
          <div className="image-container">
            <img
              src={mockProfileInfo.banner_img}
              alt="banner_img"
              className="banner_img"
            />

            <img
              src={mockProfileInfo.profile_img}
              alt="profile__img"
              className="profile_cover--img "
            />
          </div>
          <div>
            {cond ? (
              <div className="d-flex justify-content-end mt-3">
                <button
                  className="btn btn-outline-dark rounded-pill me-3 sm-btn-ctm"
                  type="button"
                >
                  Send Message
                </button>
                <AppFramerButton>
                  <button
                    className="btn btn-primary rounded-pill sm-btn-ctm"
                    type="button"
                  >
                    Add Alliance
                  </button>
                </AppFramerButton>
              </div>
            ) : (
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-outline-secondary rounded-pill mt-3"
                  onClick={() => setShow(true)}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
          <div className="mt-4 ms-2">
            <h4 className="fw-bold mb-0">{mockProfileInfo.name}</h4>
            <p className="text-muted">{`@${mockProfileInfo.snapp_user_name}`}</p>
            <div>
              <SlCalender />{" "}
              <span className="text-muted">{` Joined ${mockProfileInfo.created_at}`}</span>
            </div>
            <div className="d-flex">
              <p className="mt-2">
                <span className="fw-bold">{mockProfileInfo.fans}</span>{" "}
                <span
                  onClick={() => setOpenModal({ show: true, open_type: 4 })}
                  className="profile-connectors-info"
                >
                  Fans
                </span>
              </p>
              <p className="mt-2 ms-3">
                {mockProfileInfo.alliances ? (
                  <>
                    {" "}
                    <span className="fw-bold">
                      {mockProfileInfo.alliances}
                    </span>{" "}
                    <span
                      onClick={() => setOpenModal({ show: true, open_type: 5 })}
                      className="profile-alliances-info"
                    >
                      Alliances
                    </span>{" "}
                  </>
                ) : (
                  "No Mutuals"
                )}
              </p>
            </div>
          </div>
          <div>
            <Tabs
              defaultActiveKey="snapp"
              justify="true"
              variant="underline"
              className="profile-container mb-4"
            >
              <Tab eventKey="snapp" title="Snapps">
                <Feeds feedData={mockSnappInfo} />
              </Tab>
              <Tab eventKey="likes" title="Likes">
                <Feeds feedData={mockSnappInfo} type={1} />
              </Tab>
              <Tab eventKey="comments" title="Comments">
                <Feeds feedData={mockSnappInfo} type={2} />
              </Tab>
            </Tabs>
          </div>
        </>
      )}
      <AppModal openModal={openModal} handleModelClose={handleModelClose} />
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-5">
              <div className="position-relative">
                <div className="position-relative">
                  <img
                    src={mockEditProfileInfo.banner_img}
                    alt="banner_img"
                    width="100%"
                    height="200vh"
                    className="banner_img"
                  />
                  <TbCameraPlus
                    size={45}
                    className="edit-profile__camicon position-absolute top-50 start-50 translate-middle"
                  />
                </div>
              </div>
              <div className="position-absolute edit-prof-container">
                <div className="edit-prof">
                  <img
                    src={mockEditProfileInfo.profile_img}
                    alt="profile-img"
                    width="130px"
                    height="130px"
                    className="rounded-circle edit-profile-img"
                  />
                  <TbCameraPlus
                    size={50}
                    className="edit-profile__camicon1 position-absolute start-50 top-50 translate-middle"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 pt-3">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" />
              </Form.Group>

              <label>Bio</label>
              <AppTextArea
                placeholder="Add Your Bio"
                rows="1"
                cols="80"
                type={1}
              />

              <Form.Group className="mb-3 mt-2">
                <Form.Label>Birth Date</Form.Label>
                <Form.Control type="text" placeholder="DOB" />
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={() => setShow(false)}>
            Close
          </button>
          <button
            className="btn btn-primary ms-3"
            onClick={() => setShow(false)}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
