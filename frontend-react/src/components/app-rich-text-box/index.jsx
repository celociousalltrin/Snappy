import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Editable, Slate, withReact } from "slate-react";

import { createEditor } from "slate";
import { withHistory } from "slate-history";

import useEditorConfig from "./hooks/useEditorConfig";
import Toolbar from "./components/toolbar";

import { editorCustomNode, toggleStyle } from "./utils/editorFunction";
import { useRichTextStyle } from "./hooks/useRichTextStyle";
import useEditorSelection from "./hooks/useEditorSelection";
import EditorPopover from "./components/editor-popover";
import { createPortal } from "react-dom";
import { useEditorMention } from "./hooks/useEditorMention";

const AppRichTextBox = ({ data, onChange }) => {
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);

  const [customNodeData, setCustomNodeData] = useState(null);

  const { mentionIndex, mentionUserList, handleMentionKeyDown } =
    useEditorMention(customNodeData);
  const { selectedActiveStyles, getSelectedStyle, selectedTextStyle } =
    useEditorSelection();

  const { setActiveStyles, activeStyles, currentStyle, handleApplyStyles } =
    useRichTextStyle();

  useEffect(() => {
    if (!!selectedActiveStyles) {
      setActiveStyles(selectedActiveStyles);
    }
  }, [selectedActiveStyles]);

  useEffect(() => {
    toggleStyle(editor, currentStyle, activeStyles);
  }, [activeStyles]);

  const { renderElement, renderLeaf, onKeyDown } = useEditorConfig(
    editor,
    handleApplyStyles,
    customNodeData,
    setCustomNodeData,
    handleMentionKeyDown
  );

  const handleChange = useCallback(
    (document) => {
      const nodeData = editorCustomNode(editor);
      setCustomNodeData(nodeData);
      onChange(document);
    },
    [editor.selection, onChange]
  );

  return (
    <div>
      <Slate editor={editor} initialValue={data} onChange={handleChange}>
        <Toolbar
          activeStyles={activeStyles}
          handleApplyStyles={handleApplyStyles}
          editor={editor}
          selectedTextStyle={selectedTextStyle}
        />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={onKeyDown}
          onSelect={() => getSelectedStyle(editor, data)}
        />
        {customNodeData &&
          customNodeData.customNode.type === "mention" &&
          customNodeData.customNode.text?.length > 0 && (
            <Portal>
              <EditorPopover
                customNodeData={customNodeData}
                editor={editor}
                mentionUsers={mentionUserList}
                mentionIndex={mentionIndex}
              />
            </Portal>
          )}
      </Slate>
    </div>
  );
};

export default AppRichTextBox;

//This is used for creating a model or popover in this used to
//create a mention popover
const Portal = ({ children }) => {
  return typeof document === "object"
    ? createPortal(children, document.body)
    : null;
};
