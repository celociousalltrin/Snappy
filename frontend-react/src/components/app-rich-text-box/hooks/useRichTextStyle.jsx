import { useState } from "react";

export const useRichTextStyle = () => {
  const [activeStyles, setActiveStyles] = useState([]);
  const [currentStyle, setCurrentStyle] = useState();

  const handleApplyStyles = (style) => {
    setCurrentStyle(style);
    setActiveStyles((prev) => {
      if (!prev.includes(style)) {
        return [...prev, style];
      } else {
        return prev.filter((x) => x !== style);
      }
    });
  };
  return { activeStyles, currentStyle, handleApplyStyles, setActiveStyles };
};
