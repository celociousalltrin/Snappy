import React, { useState } from "react";
import snappyLogo from "../../assets/logo-transparent.png";
import {
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaUserAlt,
  FaUserFriends,
} from "react-icons/fa";
import { BsFillChatFill } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";

import "./style.css";
import { sideBarData } from "../../utils/common";

const Header = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  return (
    <Navbar
      as="header"
      expand="lg"
      bg="primary"
      data-bs-theme="dark"
      sticky="top"
    >
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/home")}
          className="cursor-pointer p-0"
        >
          <img
            src={snappyLogo}
            width="50vw"
            height="45vh"
            className="d-inline-block align-top"
            alt="Snappy logo"
          />
        </Navbar.Brand>
        <Navbar.Brand className="fw-bold fs-3 text-light d-lg-none d-xs-flex">
          SNAPPY
        </Navbar.Brand>
        <Navbar.Brand className="fw-bold fs-3 text-light navbar-app-name d-none d-lg-flex">
          SNAPPY
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setShow(true)}
        />
        <Navbar.Offcanvas
          id="basic-navbar-nav"
          show={show}
          onHide={() => setShow(false)}
        >
          <Nav className="ms-auto navbar-items-style d-none d-lg-flex">
            <Nav.Link eventKey="explore" onClick={() => navigate("/explore")}>
              Explore
            </Nav.Link>
            <Nav.Link
              eventKey="notification"
              onClick={() => navigate("/notification")}
            >
              <FaBell size="1.3rem" />
            </Nav.Link>
            <NavDropdown
              title="Hi Celocious"
              id="basic-nav-dropdown"
              className="ms-2 rounded border border-1"
            >
              <NavDropdown.Item onClick={() => navigate("/profile")}>
                <FaUserAlt /> Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/setting")}>
                <FaCog /> Setting
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/messages")}>
                <BsFillChatFill /> Messages
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => navigate("/login")}>
                <FaSignOutAlt /> Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Offcanvas.Header
            closeButton
            className="ms-auto d-lg-none d-xs-flex"
          />
          <Offcanvas.Body className="d-lg-none d-xs-flex">
            <Nav
              className="justify-content-end flex-grow-1 pe-3"
              onSelect={() => setShow(false)}
            >
              {sideBarData.map((obj) => (
                <Nav.Link
                  onClick={() => navigate(`${obj.route}`)}
                  className="fs-3"
                  eventKey={obj.route}
                >
                  {obj.name}
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
