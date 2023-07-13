import React from "react";
import Tabs from "react-bootstrap/esm/Tabs";
import Tab from "react-bootstrap/Tab";
import AllNotifications from "./all-notification";
import FeedNotification from "./feed-notification";
import ConnectionNotification from "./connection-notification";

const Notification = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="all-notifications"
        justify="true"
        variant="underline"
        className="tab-container mb-4"
      >
        <Tab eventKey="all-notifications" title="All">
          <AllNotifications />
        </Tab>
        <Tab eventKey="feed-notifications" title="Feeds">
          <FeedNotification />
        </Tab>
        <Tab eventKey="connection-notifications" title="Connection">
          <ConnectionNotification />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Notification;
