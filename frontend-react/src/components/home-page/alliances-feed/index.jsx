import React, { useEffect, useState } from "react";
import Feeds from "../../feeds";
import { feedData } from "../../../utils/mock-common";
import { getSnapps } from "../../../services/method";
import { responseMessage } from "../../../utils/response-message";

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
