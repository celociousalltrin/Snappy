import { useState } from "react";

export const useEditorToolbarActive = (toolbarButtons) => {
  const [activeStyles, setActiveStyles] = useState([]);
  const [currentStyle, setCurrentStyle] = useState();

  const handleApplyStyles = (style) => {
    setCurrentStyle(style);
    setActiveStyles((prev) => {
      const dialogueToolbarButtonStyle = toolbarButtons.find((o) =>
        prev.includes(o)
      );

      if (prev.includes(style) && !!dialogueToolbarButtonStyle) {
        return prev.filter(
          (x) => ![style, dialogueToolbarButtonStyle].includes(x)
        );
      }

      if (prev.includes(style)) {
        return prev.filter((x) => x !== style);
      }

      if (!!dialogueToolbarButtonStyle) {
        return [...prev.filter((x) => x !== dialogueToolbarButtonStyle), style];
      }
      return [...prev, style];
    });
  };

  return { activeStyles, currentStyle, handleApplyStyles, setActiveStyles };
};
