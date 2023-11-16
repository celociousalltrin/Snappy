import React from "react";
import AppToolTip from "../../../../../app-tooltip";
import {
  editorBlockElementsvalidate,
  findIconValidator,
} from "../../../../utils/editorFunction";

import "./style.css";

const ToolBarButton = (props) => {
  const {
    icon,
    isActive,
    buttonStyleName,
    activeStyles,
    showPopover,
    setShowPopover,
    handleApplyStyles,
    target,
    validatorIcons,
    editor: { children },
    ...otherProps
  } = props;

  const handleOpenFileUpload = (styleName) => {
    if (styleName === "image") {
      const fileInput = document.getElementById("editor-image-upload");
      if (fileInput) {
        fileInput.click();
      }
    }
  };

  const isIconDisable = (data, icons, iconName) => {
    const validateIcon = findIconValidator(icons, iconName);
    if (!!validateIcon) {
      return !editorBlockElementsvalidate(data, iconName, validateIcon.length);
    } else {
      return false;
    }
  };

  return (
    <>
      <AppToolTip title={buttonStyleName}>
        <label htmlFor="editor-image-upload" className="editor-toolbar-label">
          <button
            ref={buttonStyleName === "link" ? target : null}
            className={
              isIconDisable(children, validatorIcons, buttonStyleName)
                ? "editor-toolbar-button-disabled m-md-2 m-2"
                : activeStyles.includes(buttonStyleName)
                ? "editor-toolbar-active-style m-md-2 m-2"
                : "editor-toolbar-button m-md-2 m-2"
            }
            {...otherProps}
            onClick={() => handleOpenFileUpload(buttonStyleName)}
            disabled={isIconDisable(children, validatorIcons, buttonStyleName)}
          >
            {icon}
          </button>
        </label>
      </AppToolTip>
    </>
  );
};

export default ToolBarButton;
