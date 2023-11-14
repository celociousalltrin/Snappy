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

  return (
    <>
      <AppToolTip title={buttonStyleName}>
        <button
          ref={buttonStyleName === "link" ? target : null}
          className={
            activeStyles.includes(buttonStyleName)
              ? "editor-toolbar-active-style m-md-2 m-2"
              : "editor-toolbar-button m-md-2 m-2"
          }
          {...otherProps}
        >
          {buttonStyleName === "image" ? (
            <label htmlFor="editor-image-upload">{icon}</label>
          ) : (
            icon
          )}
        </button>
      </AppToolTip>
    </>
  );
};

export default ToolBarButton;
