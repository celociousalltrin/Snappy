import React, { useEffect, useRef, useState } from "react";
import { mockMentionUsers } from "../../../../utils/mock-common";
import { ReactEditor } from "slate-react";

const EditorPopover = ({
  customNodeData: { customNode, range },
  editor,
  mentionUsers,
  mentionIndex,
}) => {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    const domRange = ReactEditor.toDOMRange(editor, range);
    const rect = domRange.getBoundingClientRect();
    el.style.top = `${rect.top + window.pageYOffset + 24}px`;
    el.style.left = `${rect.left + window.pageXOffset}px`;
  }, [editor, customNode.text]);

  return (
    <div
      ref={ref}
      style={{
        top: "-9999px",
        left: "-9999px",
        position: "absolute",
        zIndex: 1,
        padding: "3px",
        background: "white",
        borderRadius: "4px",
        boxShadow: "0 1px 5px rgba(0,0,0,.2)",
      }}
    >
      {mentionUsers.map((user, i) => {
        return (
          <p
            style={{
              backgroundColor: i === mentionIndex ? "blue" : "transparent",
            }}
          >
            {user}
          </p>
        );
      })}
    </div>
  );
};

export default EditorPopover;
