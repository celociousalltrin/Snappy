import React, { useState } from "react";

const useListToggleContent = () => {
  const [listUniqueId, setListUniqueId] = useState([]);
  const showMore = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setListUniqueId([...listUniqueId, id]);
  };

  const showLess = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setListUniqueId(listUniqueId.filter((obj) => obj !== id));
  };
  return { showMore, showLess, listUniqueId };
};

export default useListToggleContent;
