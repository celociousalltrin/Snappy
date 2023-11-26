import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

import "./style.css";
import { notificationInfo } from "../../../utils/common-data";
import { displayUserName } from "../../../utils/common-function";
import { responseMessage } from "../../../utils/response-message";
import {
  clearAllNotification,
  clearSingleNotification,
  readNotification,
} from "../../../services/method";

const NotificationList = ({ list }) => {
  const navigate = useNavigate();

  const [tempReadNotificationIds, setTempReadNotifdicationIds] = useState([]);

  const [notifyList, setnotifyList] = useState([]);

  useEffect(() => {
    setTempReadNotifdicationIds(list.filter((x) => x.is_read))?.map(
      (o) => o._id
    );
    setnotifyList(list);
  }, [list]);

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

  const handleCloseNotification = async (e, notify_id) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      const response = await clearSingleNotification(notify_id);
      setnotifyList((prev) => prev.filter((x) => x._id !== notify_id));
      responseMessage(response.data.code);
    } catch (err) {
      responseMessage(err.data.code);
      console.log(
        "🚀 ~ file: index.jsx:62 ~ handleCloseNotification ~ err:",
        err
      );
    }
  };

  const handlereadNotification = async (notify_id) => {
    try {
      const response = await readNotification({ _id: notify_id });
      setTempReadNotifdicationIds((prev) => [...prev, notify_id]);
      responseMessage(response.data.code);
    } catch (err) {
      responseMessage(err.data.code);
      console.log(
        "🚀 ~ file: index.jsx:53 ~ handlereadNotification ~ err:",
        err
      );
    }
  };

  const handleClearAllNotification = async () => {
    try {
      const response = await clearAllNotification(notifyList.map((o) => o._id));
      setnotifyList([]);
      responseMessage(response.data.code);
    } catch (err) {
      responseMessage(err.data.code);
      console.log(
        "🚀 ~ file: index.jsx:93 ~ handleClearAllNotification ~ err:",
        err
      );
    }
  };

  return (
    <div className="container">
      {notifyList.length > 0 && (
        <button
          className="d-flex ms-auto btn btn-danger btn-sm"
          type="button"
          onClick={handleClearAllNotification}
        >
          Clear All notification
        </button>
      )}
      {notifyList.map((obj) => (
        <div
          key={`ntfy_lst${obj._id}`}
          className={`d-flex mb-4 pb-3 rounded notify-container position-relative ${
            tempReadNotificationIds.includes(obj._id) || obj.is_read
              ? ""
              : "notify-container--unread"
          }`}
          onClick={() => handlereadNotification(obj._id)}
        >
          <div>
            <img
              src={obj.userData.user_image.secure_url}
              alt="profile_image"
              width="50px"
              height="50px"
              className="notification_profile--img "
            />
          </div>
          <div>
            <div className="d-flex mt-2 ms-2">
              <p className="fw-bold mb-0">{`${obj.userData.first_name} ${obj.userData.last_name}`}</p>
              <p className="text-muted ms-2 mb-0">
                {displayUserName(obj.userData.user_name)}
              </p>
            </div>
            <div className="ms-2">
              {notificationMessage(
                obj.notify_type,
                `${obj.userData.first_name} ${obj.userData.last_name}`
              )}
            </div>
            {obj.type !== 5 && <div>{displayNotificationButton(obj.type)}</div>}
          </div>
          <AiOutlineClose
            onClick={(e) => handleCloseNotification(e, obj._id)}
            size={20}
            className="notification-close__btn"
          />
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
