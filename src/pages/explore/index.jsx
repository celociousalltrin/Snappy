import React from "react";
import Feeds from "../../components/feeds";
import { useParams } from "react-router-dom";
import SingleFeed from "../../components/single-feed";
import { feedData, singleFeedData } from "../../utils/mock-common";

const Explore = () => {
  const { id } = useParams();
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
