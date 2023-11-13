import { useCallback, useEffect, useState } from "react";
import {
  getLabelForTextBlock,
  textBlockElement,
} from "../../../../utils/editorFunction";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useSlateStatic } from "slate-react";

const PARAGRAPH_STYLES = [1, 2, 3, 4, 5, 6, 7, 0];

const ToolBarDropDown = ({ selectedTextStyle }) => {
  const editor = useSlateStatic();

  const [label, setlabel] = useState("");

  useEffect(() => {
    if (!!selectedTextStyle.length) {
      if (selectedTextStyle.length > 1) {
        setlabel(0);
      } else {
        setlabel(selectedTextStyle[0]);
      }
    }
  }, [editor.selection]);

  const onTextBlockChange = useCallback(
    (level) => {
      const parsedLevel = parseInt(level);
      if (!parsedLevel) {
        return;
      } else {
        textBlockElement(editor, "text", parsedLevel);
      }
      setlabel(parsedLevel);
    },
    [editor]
  );

  return (
    <DropdownButton
      className={"block-style-dropdown"}
      disabled={label == null}
      id="block-style"
      title={getLabelForTextBlock(label)}
      onSelect={onTextBlockChange}
      onMouseDown={(e) => e.preventDefault()}
    >
      {PARAGRAPH_STYLES.filter((o) => !!o).map((obj) => (
        <Dropdown.Item eventKey={obj} key={obj}>
          {getLabelForTextBlock(obj)}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default ToolBarDropDown;
