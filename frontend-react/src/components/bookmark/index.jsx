import React from "react";
import Feeds from "../feeds";
import { useParams } from "react-router-dom";
import SingleFeed from "../single-feed";
import { feedData, singleFeedData } from "../../utils/mock-common";

const Bookmark = () => {
  const { id } = useParams();

  return (
    <div>{id ? <SingleFeed /> : <Feeds feedData={feedData} type={3} />}</div>
  );
};

export default Bookmark;
