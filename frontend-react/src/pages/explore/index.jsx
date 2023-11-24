import React, { useEffect } from "react";
import Feeds from "../../components/feeds";
import { useParams } from "react-router-dom";
import SingleFeed from "../../components/single-feed";
import { feedData, singleFeedData } from "../../utils/mock-common";
import { responseMessage } from "../../utils/response-message";
import { getSnapps } from "../../services/method";

const Explore = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log("FIREEEEE");
    getFeeds();
  }, []);

  const getFeeds = async () => {
    try {
      const response = await getSnapps("connectors");
    } catch (err) {
      console.log("🚀 ~ file: index.jsx:18 ~ getFeeds ~ err:", err);
      responseMessage(err.data.code);
    }
  };
  return (
    <div>
      {id ? (
        <SingleFeed singleFeedData={singleFeedData} />
      ) : (
        <Feeds feedData={feedData} />
      )}
    </div>
  );
};

export default Explore;
