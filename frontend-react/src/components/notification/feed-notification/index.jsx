import React, { useEffect, useState } from "react";

import { responseMessage } from "../../../utils/response-message";

import NotificationList from "../notification-list";

import { getNotificationList } from "../../../services/method";

const FeedNotification = ({ activeTab }) => {
  const [list, setList] = useState([]);
  const [isApiExecuted, setApiExecuted] = useState(false);

  const getNotificationData = async () => {
    try {
      const response = await getNotificationList("feeds");
      setList(response.data.response_data);
    } catch (err) {
      responseMessage(err.data.code);
      console.log("🚀 ~ file: index.jsx:12 ~ getNotificationList ~ err:", err);
    } finally {
      setApiExecuted(true);
    }
  };
  useEffect(() => {
    if (activeTab === "feed-notifications") {
      getNotificationData();
    }
  }, [activeTab]);
  return (
    <div>
      <NotificationList list={list} isApiExecuted={isApiExecuted} />
    </div>
  );
};

export default FeedNotification;
