import React from "react";
import snappyLogo from "../../assets/logo-transparent.png";
import {
  FaBell,
  FaBookmark,
  FaCog,
  FaSignOutAlt,
  FaUserAlt,
  FaUserFriends,
} from "react-icons/fa";
import { BsFillChatFill } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";

import "./style.css";

const Header = () => {
  return (
    <nav className="navbar navbar-dark bg-primary sticky-top row head">
      <div className="col-md-4 d-flex justify-content-start">
        <a class="navbar-brand ms-5 ps-5" href="/explore">
          <img src={snappyLogo} alt="logo image" width="60" height="54" />
        </a>
      </div>
      <div
        className="col-md-4 d-flex justify-content-center"
        style={{
          fontSize: "1.8rem",
          fontWeight: "bolder",
          color: "white",
        }}
      >
        SNAPPY
      </div>
      <div className="col-md-4">
        <div className="d-flex justify-content-end  pe-3">
          <div className="me-4 align-self-center">
            <a href="/explore" className="head_explore">
              Explore
            </a>
          </div>

          <div className="me-4 align-self-center">
            <FaBell size={30} color="white" className="cursor-pointer" />
          </div>
          <div className="me-4">
            <Dropdown className="acc_dropdown">
              <Dropdown.Toggle className="act_head">
                <span className="profile_meta">
                  <span className="act_fname"> Hi Celocious</span>
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/profile">
                  <FaUserAlt /> Profile
                </Dropdown.Item>
                <Dropdown.Item href="/message">
                  <BsFillChatFill /> Messages
                </Dropdown.Item>
                <Dropdown.Item href="/friends">
                  {" "}
                  <FaUserFriends />
                  Friends
                </Dropdown.Item>
                <Dropdown.Item href="/bookmarks">
                  {" "}
                  <FaBookmark />
                  Bookmarks
                </Dropdown.Item>

                <Dropdown.Item href="/settings">
                  {" "}
                  <FaCog /> Settings
                </Dropdown.Item>
                <Dropdown.Item href="/logout">
                  {" "}
                  <FaSignOutAlt /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
