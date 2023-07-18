import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { mockMessageInfo } from "../../../utils/mock-common";
import { NavigateToProfile } from "../../../utils/common";

import "./style.css";

const Chat = () => {
  const navigate = useNavigate();
  const { page_id } = useParams();
  return (
    <div>
      {mockMessageInfo.map((obj) => {
        const lastMessage = obj.convesation[obj.convesation.length - 1];
        const isRead = !lastMessage?.is_read && lastMessage?.from !== "jack";

        return (
          <div
            key={`msg_lst${obj.id}`}
            className="d-flex message-container row"
          >
            <div className="col-md-1 me-3">
              <img
                src={obj.users?.profile_img}
                alt="msg_profile_img"
                width="50px"
                height="50px"
                className="message_users--img "
                style={isRead ? { border: "2px solid blue" } : null}
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
    </div>
  );
};

export default Chat;
