import Button from "react-bootstrap/Button";

const ToolBarButton = (props) => {
  const { icon, isActive, buttonStyleName, activeStyles, ...otherProps } =
    props;

  return (
    <Button
      variant="outline-primary"
      className="toolbar-btn"
      active={activeStyles.includes(buttonStyleName)}
      {...otherProps}
    >
      {icon}
    </Button>
  );
};

export default ToolBarButton;
