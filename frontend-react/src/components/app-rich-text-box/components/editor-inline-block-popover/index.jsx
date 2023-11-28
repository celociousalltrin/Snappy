import React, { useEffect, useRef, useState } from "react";
import { ReactEditor } from "slate-react";

import "./style.css";

const EditorInlineBlockPopover = ({
  customNodeData: { customNode, range },
  editor,
  mentionUsers,
  mentionIndex,
}) => {
  const popoverRef = useRef();

  useEffect(() => {
    const popoverEl = popoverRef.current;
    const selectedUserIndex = mentionIndex;

    if (popoverEl && selectedUserIndex >= 0) {
      const selectedUserElement = popoverEl.children[selectedUserIndex];
      if (selectedUserElement) {
        selectedUserElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }

    const domRange = ReactEditor.toDOMRange(editor, range);
    const rect = domRange.getBoundingClientRect();
    popoverEl.style.top = `${rect.top + window.pageYOffset + 24}px`;
    popoverEl.style.left = `${rect.left + window.pageXOffset}px`;
  }, [editor, mentionIndex, customNode.text, range]);

  return (
    <div ref={popoverRef} className="editor-inline-block-popover">
      {mentionUsers.map(({ user_name }, i) => {
        return (
          <p
            className={
              i === mentionIndex
                ? "editor-inline-block-selected"
                : "editor-inline-block-not-selected"
            }
          >
            {user_name.toLowerCase().replace(/\s+/g, "_")}
          </p>
        );
      })}
    </div>
  );
};

export default EditorInlineBlockPopover;
