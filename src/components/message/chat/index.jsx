import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { mockChatInfo, mockMessageInfo } from "../../../utils/mock-common";
import { NavigateToProfile } from "../../../utils/common";
import Modal from "react-bootstrap/Modal";
import AppInput from "../../app-input";

import "./style.css";
import { AiOutlineClose } from "react-icons/ai";

const Chat = () => {
  const navigate = useNavigate();
  const { page_id } = useParams();

  const [show, setShow] = useState(false);

  const handleCloseModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShow(false);
  };
  return (
    <div>
      {mockMessageInfo.map((obj) => {
        const lastMessage = obj.convesation[obj.convesation.length - 1];
        const isRead = !lastMessage?.is_read && lastMessage?.from !== "jack";

        return (
          <div
            key={`msg_lst${obj.id}`}
            className="d-flex message-container row"
            onClick={() => setShow(true)}
          >
            <div className="col-md-1 me-3">
              <img
                src={obj.users?.profile_img}
                alt="msg_profile_img"
                width="50px"
                height="50px"
                className="message_users--img "
                style={
                  obj.users.connected
                    ? { border: "3px solid green" }
                    : isRead
                    ? { border: "3px solid blue" }
                    : null
                }
                onClick={(e) =>
                  NavigateToProfile(e, navigate, obj.users.user_name, page_id)
                }
              />
            </div>
            <div className="ms-2 col-md-7 mt-2">
              <div className="d-flex">
                <p
                  className="fw-bold mb-1 cursor-pointer profile__name"
                  onClick={(e) =>
                    NavigateToProfile(e, navigate, obj.users.user_name, page_id)
                  }
                >
                  {obj.users.user_name}
                </p>
                <p className="ms-2 mb-1">{`@${obj.users.snappy_user_name}`}</p>
              </div>
              <div>
                <div className="d-flex">
                  {lastMessage?.from === "jack" && (
                    <FaCheck
                      color={lastMessage?.is_read ? "green" : "grey"}
                      className="mt-1 me-2"
                    />
                  )}{" "}
                  <p className="latest-msg">{lastMessage?.msg}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <p
                className={`${
                  isRead ? "text-primary" : " "
                } mb-2 d-flex justify-content-end`}
              >
                {lastMessage?.created_at}
              </p>
              {isRead && (
                <div className="d-flex justify-content-end">
                  <span className="unread-message__count">3</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        size="lg"
        scrollable={true}
      >
        <Modal.Header className="d-flex position-relative pb-0 pt-1">
          <div>
            <img
              src={mockChatInfo.profile_image}
              alt="chat_profile"
              width="40px"
              height="40px"
              className="chat_profile_img"
            />
          </div>
          <div className="mt-2 ms-1">
            <div className="d-flex ">
              <p className="fw-bold fs-6 me-1 mb-0">{mockChatInfo.user_name}</p>
              <p className="fs-6 mb-0">{`@${mockChatInfo.snappy_user_name}`}</p>
            </div>
            <p
              className={mockChatInfo.connected ? "text-success" : "text-muted"}
            >
              {mockChatInfo.connected
                ? "online"
                : `last seen at ${mockChatInfo.last_seen}`}
            </p>
          </div>
          <div style={{ marginLeft: "auto" }} className="me-4">
            <button type="button" className="btn btn-sm btn-outline-dark">
              Block
            </button>
            <button
              type="button"
              className="btn btn-sm  btn-outline-danger ms-3"
            >
              Remove Friend
            </button>
          </div>
          <div>
            <AiOutlineClose
              className="chat-modal-close__button"
              size={23}
              onClick={(e) => handleCloseModal(e)}
            />
          </div>
        </Modal.Header>
        <Modal.Body>
          <>
            <div className="chat_input">
              <AppInput isSendMessage />
            </div>
            {mockChatInfo.conversation.map((obj) => (
              <div
                className={`d-flex ${
                  obj.from === "jack12422"
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <p
                  className={`${
                    obj.from === "jack12422"
                      ? "msg-send__container"
                      : "msg-recieved__container"
                  }  rounded p-2`}
                >
                  {obj.msg}
                </p>
              </div>
            ))}
          </>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Chat;
