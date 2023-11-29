import React, { useEffect, useState } from "react";
import Feeds from "../feeds";
import { useParams } from "react-router-dom";
import SingleFeed from "../single-feed";
import { feedData, singleFeedData } from "../../utils/mock-common";
import { responseMessage } from "../../utils/response-message";
import { getUserFavouritifySnapp } from "../../services/method";
import { useSelector } from "react-redux";

const Bookmark = () => {
  const { id, page_id } = useParams();
  const [list, setList] = useState([]);
  const [isApiExecuted, setApiExecuted] = useState(false);
  const { user_id } = useSelector((state) => state.user.data);

  const getList = async () => {
    try {
      const response = await getUserFavouritifySnapp(3, user_id);
      setList(response.data.response_data);
    } catch (err) {
      responseMessage(err.data.code);
      console.log("🚀 ~ file: index.jsx:15 ~ getList ~ err:", err);
    } finally {
      setApiExecuted(true);
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
        <Feeds feedData={list} type={3} isApiExecuted={isApiExecuted} />
      )}
    </div>
  );
};

export default Bookmark;
