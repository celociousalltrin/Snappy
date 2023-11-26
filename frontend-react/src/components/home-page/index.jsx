import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import FeedForYou from "./feed-for-you";
import AlliancesFeed from "./alliances-feed";
import { useParams } from "react-router-dom";
import Snapp from "../snapp";

import "./style.css";
import SingleFeed from "../single-feed";
import { singleFeedData } from "../../utils/mock-common";

const HomePage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("feed-for-you");

  return (
    <>
      {id ? (
        <SingleFeed />
      ) : (
        <Tabs
          defaultActiveKey="feed-for-you"
          className="tab-container mb-4"
          justify="true"
          variant="underline"
          onSelect={(key) => setActiveTab(key)}
        >
          <Tab eventKey="feed-for-you" title="Feed For you">
            <Snapp />
            <FeedForYou activeTab={activeTab} />
          </Tab>
          <Tab eventKey="alliance-feeds" title="Alliance Feeds">
            <Snapp />
            <AlliancesFeed activeTab={activeTab} />
          </Tab>
        </Tabs>
      )}
    </>
  );
};

export default HomePage;
