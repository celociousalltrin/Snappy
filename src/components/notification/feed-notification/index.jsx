import React from "react";
import NotificationList from "../notification-list";
import { mockNotifications } from "../../../utils/mock-common";

const FeedNotification = () => {
  return (
    <div>
      <NotificationList list={mockNotifications} />
    </div>
  );
};

export default FeedNotification;
