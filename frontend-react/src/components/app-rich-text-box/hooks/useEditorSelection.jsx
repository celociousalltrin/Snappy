import areEqual from "deep-equal";
import { useState } from "react";
import { getSelectedElements } from "../utils/editorFunction";
import { Range } from "slate";

const useEditorSelection = () => {
  const [previousSelection, setPreviousSelection] = useState();
  const [previousStyles, setPreviousStyles] = useState();
  const [selectedActiveStyles, setSelectedActiveStyles] = useState();
  const [selectedTextStyle, setSelectedTextStyle] = useState([]);

  const getSelectedStyle = (editor, data) => {
    setPreviousSelection(editor.selection);
    if (areEqual(previousSelection, editor.selection)) {
      setSelectedActiveStyles(previousStyles);
    } else {
      const [start, end] = Range.edges(editor.selection);

      const selectedElements = getSelectedElements(data, start, end);

      setSelectedTextStyle(selectedElements.map(({ level }) => level));

      const activeStyles = selectedElements.reduce((acc, curr) => {
        curr.children.forEach((o) => {
          Object.keys(o).forEach((key) => {
            if (!acc.includes(key)) {
              acc.push(key);
            }
          });
        });
        return acc;
      }, []);
      const style = activeStyles.filter((o) => o !== "text");
      setSelectedActiveStyles(style);
      setPreviousStyles(style);
    }
  };
  return { selectedActiveStyles, selectedTextStyle, getSelectedStyle };
};

export default useEditorSelection;
