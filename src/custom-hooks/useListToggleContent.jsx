import React, { useState } from "react";

const useListToggleContent = () => {
  const [listIndex, setListIndex] = useState([]);

  const showMore = (index) => {
    setListIndex([...listIndex, index]);
  };

  const showLess = (index) => {
    setListIndex(listIndex.filter((obj) => obj !== index));
  };
  return { showMore, showLess, listIndex };
};

export default useListToggleContent;
