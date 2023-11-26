import React, { useState } from "react";
import Tabs from "react-bootstrap/esm/Tabs";
import Tab from "react-bootstrap/Tab";
import AllNotifications from "./all-notification";
import FeedNotification from "./feed-notification";
import ConnectionNotification from "./connection-notification";

const Notification = () => {
  const [activeTab, setActiveTab] = useState("all-notifications");
  return (
    <div>
      <Tabs
        defaultActiveKey="all-notifications"
        justify="true"
        variant="underline"
        className="tab-container mb-4"
        onSelect={(tab) => setActiveTab(tab)}
      >
        <Tab eventKey="all-notifications" title="All">
          <AllNotifications activeTab={activeTab} />
        </Tab>
        <Tab eventKey="feed-notifications" title="Feeds">
          <FeedNotification activeTab={activeTab} />
        </Tab>
        <Tab eventKey="connection-notifications" title="Connection">
          <ConnectionNotification activeTab={activeTab} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Notification;
