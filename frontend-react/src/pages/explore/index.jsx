import React, { useEffect, useState } from "react";
import Feeds from "../../components/feeds";
import { useParams } from "react-router-dom";
import SingleFeed from "../../components/single-feed";
import { feedData, singleFeedData } from "../../utils/mock-common";
import { responseMessage } from "../../utils/response-message";
import { getSnapps } from "../../services/method";

const Explore = () => {
  const { id } = useParams();

  const [feedList, setFeedList] = useState([]);

  useEffect(() => {
    getFeeds();
  }, []);

  const getFeeds = async () => {
    try {
      const response = await getSnapps();
      setFeedList(response.data.response_data);
    } catch (err) {
      console.log("🚀 ~ file: index.jsx:18 ~ getFeeds ~ err:", err);
      responseMessage(err.data.code);
    }
  };
  return <div>{id ? <SingleFeed /> : <Feeds feedData={feedList} />}</div>;
};

export default Explore;
