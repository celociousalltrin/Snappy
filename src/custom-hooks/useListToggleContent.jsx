import React, { useState } from "react";

const useListToggleContent = () => {
  const [listUniqueId, setListUniqueId] = useState([]);
  console.log(
    "🚀 ~ file: useListToggleContent.jsx:5 ~ useListToggleContent ~ listUniqueId:",
    listUniqueId
  );

  const showMore = (id) => {
    setListUniqueId([...listUniqueId, id]);
  };

  const showLess = (id) => {
    setListUniqueId(listUniqueId.filter((obj) => obj !== id));
  };
  return { showMore, showLess, listUniqueId };
};

export default useListToggleContent;
