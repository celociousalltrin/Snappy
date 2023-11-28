import React, { useEffect, useState } from "react";
import NotificationList from "../notification-list";
import { mockNotifications } from "../../../utils/mock-common";
import { responseMessage } from "../../../utils/response-message";
import { getNotificationList } from "../../../services/method";

const AllNotifications = ({ activeTab }) => {
  const [list, setList] = useState([]);
  const [isApiExecuted, setApiExecuted] = useState(false);

  const getNotificationData = async () => {
    try {
      const response = await getNotificationList("all");
      setList(response.data.response_data);
    } catch (err) {
      responseMessage(err.data.code);
      console.log("🚀 ~ file: index.jsx:12 ~ getNotificationList ~ err:", err);
    } finally {
      setApiExecuted(true);
    }
  };
  useEffect(() => {
    if (activeTab === "all-notifications") {
      getNotificationData();
    }
  }, [activeTab]);
  return (
    <div>
      <NotificationList list={list} isApiExecuted={isApiExecuted} />
    </div>
  );
};

export default AllNotifications;
