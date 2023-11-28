import React, { useState } from "react";
import snappyLogo from "../../assets/logo-transparent.png";
import { FaBell, FaCog, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { BsFillChatFill } from "react-icons/bs";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import { bottomNavbarData, sideBarData } from "../../utils/common-data";

import "./style.css";
import AppToolTip from "../app-tooltip";

const Header = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  return (
    <>
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
                <AppToolTip title="Notification" position="bottom">
                  <FaBell size="1.3rem" />
                </AppToolTip>
              </Nav.Link>
              <NavDropdown
                title="Hi Celocious"
                id="basic-nav-dropdown"
                className="ms-2 rounded border border-light"
              >
                <NavDropdown.Item onClick={() => navigate("/profile")}>
                  <FaUserAlt /> Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/setting")}>
                  <FaCog /> Setting
                </NavDropdown.Item>
                {/* <NavDropdown.Item onClick={() => navigate("/messages")}>
                  <BsFillChatFill /> Messages
                </NavDropdown.Item> */}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate("/logout")}>
                  <FaSignOutAlt /> Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Offcanvas.Header closeButton className="canvas-header">
              <Offcanvas.Title id="offcanvasNavbarLabel-expand">
                <p
                  className="fw-bold text-primary fs-4"
                  onClick={() => {
                    navigate("/profile");
                    setShow(false);
                  }}
                >
                  Celocious
                </p>
                <p className="text-muted fs-6">@celo123</p>
                <p className="text-muted  mt-2">
                  <span className="fw-bold me-1 text-black">22</span>Fans
                </p>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-lg-none d-xs-flex">
              <Nav
                className="justify-content-end flex-grow-1 pe-3 nav-select"
                onSelect={() => setShow(false)}
              >
                {sideBarData.map((obj) => (
                  <Nav.Link
                    onClick={() => navigate(`${obj.route}`)}
                    className="fs-4"
                    eventKey={obj.route}
                  >
                    <span>{obj.icon}</span>{" "}
                    <span className="ms-1">{obj.name}</span>
                  </Nav.Link>
                ))}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Navbar
        fixed="bottom"
        bg="light"
        data-bs-theme="light"
        className="d-lg-none"
      >
        <Container>
          {bottomNavbarData.map((obj) => (
            <div key={obj.id} className="ps-4 pe-4 pb-2">
              <span className="fs-3" onClick={() => navigate(obj.route)}>
                {obj.icon}
              </span>
            </div>
          ))}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
