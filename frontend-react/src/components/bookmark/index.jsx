import React, { useEffect, useState } from "react";
import Feeds from "../feeds";
import { useParams } from "react-router-dom";
import SingleFeed from "../single-feed";
import { feedData, singleFeedData } from "../../utils/mock-common";
import { responseMessage } from "../../utils/response-message";
import { getUserFavouritifySnapp } from "../../services/method";

const Bookmark = () => {
  const { id, page_id } = useParams();
  const [list, setList] = useState([]);

  const getList = async () => {
    try {
      const response = await getUserFavouritifySnapp(3);
      setList(response.data.response_data);
    } catch (err) {
      responseMessage(err.data.code);
      console.log("🚀 ~ file: index.jsx:15 ~ getList ~ err:", err);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      {id && id !== "user" ? (
        <SingleFeed />
      ) : (
        <Feeds feedData={list} type={3} />
      )}
    </div>
  );
};

export default Bookmark;
