import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import FeedForYou from "./feed-for-you";
import FriendsFeed from "./friends-feed";
import { useParams } from "react-router-dom";
import Snapp from "../snapp";

import "./style.css";
import SingleFeed from "../single-feed";
import { singleFeedData } from "../../utils/mock-common";

const HomePage = () => {
  const { id } = useParams();
  return (
    <>
      {id ? (
        <SingleFeed singleFeedData={singleFeedData} />
      ) : (
        <Tabs
          defaultActiveKey="feed-for-you"
          className="tab-container mb-4"
          justify="true"
          variant="underline"
        >
          <Tab eventKey="feed-for-you" title="Feed For you">
            <Snapp />
            <FeedForYou />
          </Tab>
          <Tab eventKey="friends-feed" title="Friends Feed">
            <Snapp />
            <FriendsFeed />
          </Tab>
        </Tabs>
      )}
    </>
  );
};

export default HomePage;
