import React, { useEffect, useState } from "react";

import { responseMessage } from "../../../utils/response-message";

import Feeds from "../../feeds";

import { getSnapps } from "../../../services/method";

const AlliancesFeed = ({ activeTab }) => {
  const [feedList, setFeedList] = useState([]);
  const [isApiExecuted, setApiExecuted] = useState(false);

  useEffect(() => {
    if (activeTab === "alliance-feeds") {
      getFeeds();
    }
  }, [activeTab]);

  const getFeeds = async () => {
    try {
      const response = await getSnapps("connectors");
      setFeedList(response.data.response_data);
    } catch (err) {
      console.log("🚀 ~ file: index.jsx:18 ~ getFeeds ~ err:", err);
      responseMessage(err.data.code);
    } finally {
      setApiExecuted(true);
    }
  };
  return (
    <div>
      <Feeds feedData={feedList} isApiExecuted={isApiExecuted} />
    </div>
  );
};

export default AlliancesFeed;
