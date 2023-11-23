import React, { useMemo } from "react";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { renderElement, renderLeaf } from "../hooks/useEditorConfig";
import { useNavigate } from "react-router-dom";
import { mockReadOnlyEditor } from "../../../utils/mock-common";

const ReadOnlyRichTextBox = ({ value }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const navigate = useNavigate();
  return (
    <div>
      <Slate editor={editor} initialValue={value ? value : mockReadOnlyEditor}>
        <Editable
          readOnly
          renderElement={(elementdata) => renderElement(elementdata, navigate)}
          renderLeaf={renderLeaf}
        />
      </Slate>
    </div>
  );
};

export default ReadOnlyRichTextBox;
