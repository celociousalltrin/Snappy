import React, { useEffect, useRef, useState } from "react";
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
import { responseMessage } from "../../utils/response-message";
import {
  getAllianceConnectorList,
  getFanConnectorList,
  getUserDetails,
  getUserFavouritifySnapp,
  getUserSnapps,
  updateUserDetails,
} from "../../services/method";
import {
  convertFileToDataURL,
  displayUserName,
  formatDate,
} from "../../utils/common-function";
import ReactDatePicker from "react-datepicker";
import AppImageDialogueBox from "../app-image-Dialogue-box";
import { useSelector } from "react-redux";
import { staticResponseMessage } from "../../utils/static-response-message";
import { Instagram } from "react-content-loader";

const Profile = () => {
  const { page_id, id, sec_id } = useParams();
  const [activeTab, setActiveTab] = useState("snapp");
  const [list, setList] = useState([]);
  const [userData, setUserData] = useState({});
  const [tempUserData, setTempUserData] = useState({});

  const { user_id } = useSelector((state) => state.user.data);

  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const [show, setShow] = useState(false);
  const [isOpenDialogueBox, setIsOpenDialogueBox] = useState(false);
  const [selectedImageDataURL, setSelectedImageDataURL] = useState();
  const [date, setDate] = useState(new Date());
  const [isBannerImage, setIsBannerImage] = useState(false);
  const [isApiExecuted, setApiExecuted] = useState(false);

  const handleFileChange = async (e, shape) => {
    const selectedFile = e.target.files[0];

    setDate(new Date());

    if (selectedFile) {
      if (!(selectedFile.type && selectedFile.type.startsWith("image/"))) {
        staticResponseMessage("FA013");
        return;
      }
      const maxSizeInBytes = 1024 * 1024;
      if (selectedFile.size > maxSizeInBytes) {
        staticResponseMessage("FA012");
        return;
      }
      // We can Create Like this but it does not support on every browser
      // const imageURL = URL.createObjectURL(selectedFile);
      const imageURL = await convertFileToDataURL(selectedFile);
      setSelectedImageDataURL(imageURL);
      setIsOpenDialogueBox(true);
      if (shape === "round") {
        setIsBannerImage(false);
      } else {
        setIsBannerImage(true);
      }
    }
  };

  const init = {
    show: false,
    open_type: "",
    snapp_id: "",
  };
  const [openModal, setOpenModal] = useState(init);
  const handleModelClose = () => {
    setOpenModal(init);
  };

  const getList = async ({ api, type, id }) => {
    setApiExecuted(false);
    try {
      let response;
      if (!!type) {
        response = await api(type, id);
      } else {
        response = await api(id);
      }
      setList(response.data.response_data);
    } catch (err) {
      console.log("🚀 ~ file: index.jsx:45 ~ getList ~ err:", err);
      responseMessage(err.data.code);
    } finally {
      setApiExecuted(true);
    }
  };

  useEffect(() => {
    getList({
      api: activeTab === "snapp" ? getUserSnapps : getUserFavouritifySnapp,
      type: activeTab === "likes" ? 1 : activeTab === "comments" ? 2 : 0,
      id: sec_id ? sec_id : user_id,
    });
  }, [activeTab, sec_id]);

  const getUserData = async (id) => {
    try {
      const result = await getUserDetails(id);
      setUserData(result.data.response_data);
    } catch (err) {
      console.log("🚀 ~ file: index.jsx:71 ~ getUserDetails ~ err:", err);
      responseMessage(err.data.code);
    }
  };

  useEffect(() => {
    getUserData(sec_id ? sec_id : user_id);
  }, [sec_id]);
  const cond = 0;

  const handleUpdateProfile = async () => {
    try {
      const response = await updateUserDetails(tempUserData);
      setUserData(({ counts }) => ({ ...response.data.response_data, counts }));
      setShow(false);
      responseMessage(response.data.code);
      setTempUserData({});
    } catch (err) {
      responseMessage(err.data.code);
    }
  };

  const handleChangeProfile = ({ value, date, url, name }) => {
    if (name === "first_name" || name == "last_name") {
      setTempUserData((prev) => ({ ...prev, [name]: value }));
    } else if (name === "dob") {
      setTempUserData((prev) => ({ ...prev, [name]: date }));
    } else {
      if (isBannerImage) {
        setTempUserData((prev) => ({ ...prev, user_banner_image_uri: url }));
      } else {
        setTempUserData((prev) => ({ ...prev, user_image_uri: url }));
      }
    }
  };
  return (
    <div className="container">
      {id && id !== "user" ? (
        <SingleFeed />
      ) : userData && Object.keys(userData).length > 0 ? (
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
              <h4 className="fw-bold mb-0">{`${userData.first_name} ${userData.last_name}`}</h4>
              <p>{`${userData.counts.snapp_count} Snapps`}</p>
            </div>
          </div>
          <div className="image-container">
            {userData.user_banner_image ? (
              <img
                src={userData.user_banner_image.secure_url}
                alt="banner_img"
                className="banner_img"
              />
            ) : (
              <div className="banner-no-img"></div>
            )}
            <img
              src={userData.user_image.secure_url}
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
              !sec_id && (
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-outline-secondary rounded-pill mt-3"
                    onClick={() => {
                      setShow(true);
                      setTempUserData({
                        old_user_image_public_id: userData.user_image.public_id,
                        ...(userData.user_banner_image && {
                          old_banner_image_public_id:
                            userData.user_banner_image.public_id,
                        }),
                      });
                    }}
                  >
                    Edit Profile
                  </button>
                </div>
              )
            )}
          </div>
          <div className={`mt-4 ms-2 ${sec_id && "pt-5"}`}>
            <h4 className="fw-bold mb-0">{`${userData.first_name} ${userData.last_name}`}</h4>
            <p className="text-muted">{displayUserName(userData.user_name)}</p>
            <div>
              <SlCalender />{" "}
              <span className="text-muted">{` Joined ${formatDate(
                userData?.createdAt
              )}`}</span>
            </div>
            <div className="d-flex">
              <p className="mt-2">
                <span className="fw-bold">{userData.counts.total_fans}</span>{" "}
                <span
                  onClick={() =>
                    setOpenModal({
                      show: true,
                      open_type: 4,
                      snapp_id: sec_id ? sec_id : user_id,
                    })
                  }
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
                      {userData.counts.total_alliance}
                    </span>{" "}
                    <span
                      onClick={() =>
                        setOpenModal({
                          show: true,
                          open_type: 5,
                          snapp_id: sec_id ? sec_id : user_id,
                        })
                      }
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
              onSelect={(key) => setActiveTab(key)}
            >
              <Tab eventKey="snapp" title="Snapps">
                <Feeds feedData={list} isApiExecuted={isApiExecuted} />
              </Tab>
              <Tab eventKey="likes" title="Likes">
                <Feeds feedData={list} type={1} isApiExecuted={isApiExecuted} />
              </Tab>
              <Tab eventKey="comments" title="Comments">
                <Feeds feedData={list} type={2} isApiExecuted={isApiExecuted} />
              </Tab>
            </Tabs>
          </div>
        </>
      ) : (
        <Instagram />
      )}
      <AppModal
        openModal={openModal}
        handleModelClose={handleModelClose}
        isProfile
        userId={sec_id ? sec_id : user_id}
        api={
          openModal.open_type === 4
            ? getFanConnectorList
            : getAllianceConnectorList
        }
      />
      {userData && (
        <Modal
          show={show}
          onHide={() => {
            setShow(false);
            setTempUserData({});
          }}
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
                    {userData?.user_banner_image ||
                    tempUserData?.user_banner_image_uri ? (
                      <img
                        src={
                          tempUserData?.user_banner_image_uri
                            ? tempUserData?.user_banner_image_uri
                            : userData?.user_banner_image?.secure_url
                        }
                        alt="banner_img"
                        width="100%"
                        height="200vh"
                        className="banner_img"
                      />
                    ) : (
                      <div className="banner-no-img"></div>
                    )}
                    <label htmlFor="fileInput1">
                      <TbCameraPlus
                        size={45}
                        className="edit-profile__camicon position-absolute top-50 start-50 translate-middle"
                      />
                    </label>
                    <input
                      type="file"
                      id="fileInput1"
                      key={date}
                      style={{ display: "none" }}
                      onChange={(e) => handleFileChange(e, "rect")}
                      name="myFile"
                    />
                  </div>
                </div>
                <div className="position-absolute edit-prof-container">
                  <div className="edit-prof">
                    <img
                      src={
                        tempUserData?.user_image_uri
                          ? tempUserData?.user_image_uri
                          : userData?.user_image?.secure_url
                      }
                      alt="profile-img"
                      width="130px"
                      height="130px"
                      className="rounded-circle edit-profile-img"
                    />
                    <label htmlFor="fileInput">
                      <TbCameraPlus
                        size={50}
                        className="edit-profile__camicon1 position-absolute start-50 top-50 translate-middle"
                      />
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      key={date}
                      style={{ display: "none" }}
                      onChange={(e) => handleFileChange(e, "round")}
                      name="myFile"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 p-3 row">
                <div className="col-12 col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      First Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      name="first_name"
                      value={
                        tempUserData?.first_name
                          ? tempUserData?.first_name
                          : userData.first_name
                      }
                      onChange={(e) =>
                        handleChangeProfile({
                          value: e.target.value,
                          name: e.target.name,
                        })
                      }
                    />
                  </Form.Group>
                </div>
                <div className="col-12 col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Last Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      name="last_name"
                      value={
                        tempUserData?.last_name
                          ? tempUserData?.last_name
                          : userData.last_name
                      }
                      onChange={(e) =>
                        handleChangeProfile({
                          value: e.target.value,
                          name: e.target.name,
                        })
                      }
                    />
                  </Form.Group>
                </div>
                <div className="col-12 col-md-6">
                  <Form.Group className="mb-3 mt-2">
                    <Form.Label>Birth Date</Form.Label>
                    <ReactDatePicker
                      className="signup-date-picker"
                      placeholderText="Date Of Birth"
                      selected={
                        tempUserData?.dob
                          ? new Date(tempUserData?.dob)
                          : new Date(userData.dob)
                      }
                      onChange={(date) =>
                        handleChangeProfile({
                          date: date.toISOString(),
                          name: "dob",
                        })
                      }
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      maxDate={new Date(2002, 0, 1)}
                      minDate={new Date(1970, 0, 1)}
                      openToDate={new Date(1970, 0, 1)}
                    />
                  </Form.Group>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-danger"
              onClick={() => {
                setShow(false);
                setTempUserData({});
              }}
            >
              Close
            </button>
            <button
              className="btn btn-primary ms-3"
              onClick={handleUpdateProfile}
            >
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>
      )}
      <AppImageDialogueBox
        show={isOpenDialogueBox}
        setShow={setIsOpenDialogueBox}
        setSelectedImageDataURL={setSelectedImageDataURL}
        selectedImageDataURL={selectedImageDataURL}
        callback={(url) => {
          // setFieldValue("user_data_url", url);
          handleChangeProfile({ url: url });
        }}
        isProfile={isBannerImage ? false : true}
        width={isBannerImage && 16}
        height={isBannerImage && 9}
      />
    </div>
  );
};

export default Profile;
