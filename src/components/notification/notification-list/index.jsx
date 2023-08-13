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
        <button className="btn btn-sm btn-link mt-0 ms-0" type="button">
          View
        </button>
      );
    } else if (type === 4) {
      return (
        <button className="btn btn-sm btn-info mt-2 ms-2" type="button">
          Send Hi
        </button>
      );
    } else if (type === 5) {
      return (
        <button className="btn btn-sm btn-primary mt-2 ms-2" type="button">
          Re-Send Request
        </button>
      );
    } else if (type === 6) {
      return (
        <div className="mt-2 ms-2">
          <button className="btn btn-sm btn-success" type="button">
            Accept
          </button>
          <button className="btn btn-sm btn-secondary ms-3" type="button">
            Reject
          </button>
        </div>
      );
    } else {
      return (
        <button className="btn btn-sm btn-primary mt-2 ms-2" type="button">
          Add Friend
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
    } else if ([4, 5].includes(type)) {
      msg = `${name} ${
        notificationInfo.find((o) => o.type === type).value
      } your Friend Request`;
    } else if (type === 6) {
      msg = `${name} sent you a ${
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
            <div>{displayNotificationButton(obj.type)}</div>
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
