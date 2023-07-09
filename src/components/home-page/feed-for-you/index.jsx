import React from "react";
import Feeds from "../../feeds";
import { feedData } from "../../../utils/mock-common";

const FeedForYou = () => {
  return (
    <div>
      <Feeds feedData={feedData} />
    </div>
  );
};

export default FeedForYou;
