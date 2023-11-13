import "./style.css";

const ToolBarButton = (props) => {
  const { icon, isActive, buttonStyleName, activeStyles, ...otherProps } =
    props;

  return (
    <button
      className={
        activeStyles.includes(buttonStyleName)
          ? "editor-toolbar-active-style  m-md-3 m-2"
          : "editor-toolbar-button m-md-3 m-2"
      }
      {...otherProps}
    >
      {buttonStyleName === "image" ? (
        <label htmlFor="editor-image-upload">{icon}</label>
      ) : (
        icon
      )}
    </button>
  );
};

export default ToolBarButton;
