import { useState } from "react";

const useToggleContent = () => {
  const [isShow, setIsShow] = useState(false);

  const showMore = () => {
    setIsShow(true);
  };

  const showLess = () => {
    setIsShow(false);
  };

  return { isShow, showMore, showLess };
};

export default useToggleContent;
