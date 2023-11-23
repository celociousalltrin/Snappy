import React, { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import FeedForYou from "./feed-for-you";
import AlliancesFeed from "./alliances-feed";
import { useParams } from "react-router-dom";
import Snapp from "../snapp";

import "./style.css";
import SingleFeed from "../single-feed";
import { singleFeedData } from "../../utils/mock-common";
import { getSnapp } from "../../services/method";

const HomePage = () => {
  const { id } = useParams();

  useEffect(() => {
    // getSnappData();
  }, []);

  const getSnappData = async () => {
    try {
      const result = await getSnapp();
    } catch (err) {
      console.log("🚀 ~ file: index.jsx:25 ~ getSnappData ~ err:", err);
    }
  };
  return (
    <>
      {id === "single-feed" ? (
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
          <Tab eventKey="Alliances-feed" title="Alliances Feed">
            <Snapp />
            <AlliancesFeed />
          </Tab>
        </Tabs>
      )}
    </>
  );
};

export default HomePage;
