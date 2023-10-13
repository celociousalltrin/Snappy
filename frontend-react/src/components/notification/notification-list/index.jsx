import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

import "./style.css";
import { notificationInfo } from "../../../utils/common-data";

const NotificationList = ({ list }) => {
  const navigate = useNavigate();

  const displayNotificationButton = (type) => {
    if ([1, 2, 3].includes(type)) {
      return (
        <button className="btn btn-sm btn-primary mt-2 ms-2" type="button">
          View
        </button>
      );
    } else {
      return (
        <button className="btn btn-sm btn-info mt-2 ms-2" type="button">
          Send Greeting
        </button>
      );
    }
  };
  const notificationMessage = (type, name) => {
    let msg;
    if ([1, 2, 3].includes(type)) {
      msg = `${name} has ${
        notificationInfo.find((o) => o.type === type).value
      } your feed`;
    } else if ([4].includes(type)) {
      msg = `${name} is your newest ${
        notificationInfo.find((o) => o.type === type).value
      }`;
    } else {
      msg = `Your Profile has been viewed by ${name}`;
    }
    return msg;
  };

  const handleCloseNotification = (e) => {
    e.stopPropagation();
    e.preventDefault();
    alert("Notification CLose button is clicked");
  };

  return (
    <div className="container">
      {list.map((obj) => (
        <div
          key={`ntfy_lst${obj.id}`}
          className={`d-flex mb-4 pb-3 rounded notify-container position-relative ${
            obj.viewed ? "" : "notify-container--unread"
          }`}
          //   onClick={() => navigate("/home/single-feed")}
        >
          <div>
            <img
              src={obj.profile_img}
              alt="profile_image"
              width="50px"
              height="50px"
              className="notification_profile--img "
            />
          </div>
          <div>
            <div className="d-flex mt-2 ms-2">
              <p className="fw-bold mb-0">{obj.snappy_user_name}</p>
              <p className="text-muted ms-2 mb-0">{`@${obj.name}`}</p>
            </div>
            <div className="ms-2">
              {notificationMessage(obj.type, obj.name)}
            </div>
            {obj.type !== 5 && <div>{displayNotificationButton(obj.type)}</div>}
          </div>
          <AiOutlineClose
            onClick={(e) => handleCloseNotification(e)}
            size={20}
            className="notification-close__btn"
          />
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
