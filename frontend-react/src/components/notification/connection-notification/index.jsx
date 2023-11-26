import React, { useEffect, useState } from "react";
import NotificationList from "../notification-list";
import { mockNotifications } from "../../../utils/mock-common";
import { getNotificationList } from "../../../services/method";
import { responseMessage } from "../../../utils/response-message";

const ConnectionNotification = ({ activeTab }) => {
  const [list, setList] = useState([]);

  const getNotificationData = async () => {
    try {
      const response = await getNotificationList("connections");
      setList(response.data.response_data);
    } catch (err) {
      responseMessage(err.data.code);
      console.log("🚀 ~ file: index.jsx:12 ~ getNotificationList ~ err:", err);
    }
  };
  useEffect(() => {
    if (activeTab === "connection-notifications") {
      getNotificationData();
    }
  }, [activeTab]);
  return (
    <div>
      <NotificationList list={list} />
    </div>
  );
};

export default ConnectionNotification;
