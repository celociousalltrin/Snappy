import React from "react";

const PageHeader = ({ id, title }) => {
  const page_info = [
    {
      id: "profile",
      title: "Profile",
    },
    {
      id: "friends",
      title: "Friends",
    },
  ];
  return <div>{title && page_info.find((obj) => obj.id === id).title}</div>;
};

export default PageHeader;
