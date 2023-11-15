import React from "react";
import AppToolTip from "../../../../../app-tooltip";
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

  return (
    <>
      <AppToolTip title={buttonStyleName}>
        <label htmlFor="editor-image-upload" className="editor-toolbar-label">
          <button
            ref={buttonStyleName === "link" ? target : null}
            className={
              activeStyles.includes(buttonStyleName)
                ? "editor-toolbar-active-style m-md-2 m-2"
                : "editor-toolbar-button m-md-2 m-2"
            }
            {...otherProps}
            onClick={() => handleOpenFileUpload(buttonStyleName)}
          >
            {icon}
          </button>
        </label>
      </AppToolTip>
    </>
  );
};

export default ToolBarButton;
