import { useEffect, useState } from "react";
import { mockMentionUsers } from "../../../utils/mock-common";
import { Transforms } from "slate";
import { insertCustomNode } from "../utils/editorFunction";

export const useEditorMention = (customData) => {
  const [mentionIndex, setMentionIndex] = useState(0);

  const [mentionUserList, setMentionUserList] = useState([]);

  useEffect(() => {
    if (
      customData &&
      customData.customNode.type === "mention" &&
      customData.customNode.text?.length > 0
    ) {
      const mentionUser = mockMentionUsers
        .filter((c) =>
          c.toLowerCase().startsWith(customData.customNode.text.toLowerCase())
        )
        .slice(0, 10);
      setMentionUserList(mentionUser);
    }
  }, [customData?.customNode?.text]);

  const handleMentionKeyDown = (
    event,
    editor,
    customData,
    setCustomNodeData
  ) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setMentionIndex((prev) =>
          prev >= mentionUserList.length - 1 ? 0 : prev + 1
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setMentionIndex((prev) =>
          prev <= 0 ? mentionUserList.length - 1 : prev - 1
        );
        break;
      case "Enter":
        event.preventDefault();
        Transforms.select(editor, customData.range);
        insertCustomNode(editor, {
          ...customData,
          customNode: {
            ...customData.customNode,
            text: mentionUserList[mentionIndex],
          },
        });
        setMentionIndex(0);
        setCustomNodeData(null);
        break;
      case "Escape":
        event.preventDefault();
        setMentionIndex(0);
        setCustomNodeData(null);
        break;
    }
  };

  return {
    mentionIndex,
    setMentionIndex,
    mentionUserList,
    handleMentionKeyDown,
  };
};
