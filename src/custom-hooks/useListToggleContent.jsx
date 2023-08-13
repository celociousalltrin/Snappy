import React, { useState } from "react";

const useListToggleContent = () => {
  const [listUniqueId, setListUniqueId] = useState([]);

  const showMore = (id) => {
    setListUniqueId([...listUniqueId, id]);
  };

  const showLess = (id) => {
    setListUniqueId(listUniqueId.filter((obj) => obj !== id));
  };
  return { showMore, showLess, listUniqueId };
};

export default useListToggleContent;
