import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import FeedForYou from "./feed-for-you";
import FriendsFeed from "./friends-feed";

import "./style.css";

const HomePage = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="feed-for-you"
        className="tab-container mb-4"
        justify="true"
        variant="underline"
      >
        <Tab eventKey="feed-for-you" title="Feed For you">
          <FeedForYou />
        </Tab>
        <Tab eventKey="friends-feed" title="Friends Feed">
          <FriendsFeed />
        </Tab>
      </Tabs>
    </div>
  );
};

export default HomePage;
