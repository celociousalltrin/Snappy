import { useState } from "react";

export const useEditorToolbarActive = (toolbarButtons) => {
  const [activeStyles, setActiveStyles] = useState([]);
  const [currentStyle, setCurrentStyle] = useState();

  const handleActiveStyles = (previousStyles, currentStyle) => {
    const dialogueToolbarButtonStyle = toolbarButtons.find((o) =>
      previousStyles.includes(o)
    );

    if (previousStyles.includes(currentStyle) && !!dialogueToolbarButtonStyle) {
      return previousStyles.filter(
        (x) => ![currentStyle, dialogueToolbarButtonStyle].includes(x)
      );
    }

    if (previousStyles.includes(currentStyle)) {
      return previousStyles.filter((x) => x !== currentStyle);
    }

    if (!!dialogueToolbarButtonStyle) {
      return [
        ...previousStyles.filter((x) => x !== dialogueToolbarButtonStyle),
        currentStyle,
      ];
    }
    return [...previousStyles, currentStyle];
  };

  const handleApplyStyles = (style) => {
    setCurrentStyle(style);
    setActiveStyles((prev) => handleActiveStyles(prev, style));
  };

  return { activeStyles, currentStyle, handleApplyStyles, setActiveStyles };
};
