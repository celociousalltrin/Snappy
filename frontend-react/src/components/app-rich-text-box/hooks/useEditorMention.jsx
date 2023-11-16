import { useEffect, useState } from "react";
import { mockMentionUsers } from "../../../utils/mock-common";
import { Transforms } from "slate";
import { insertCustomNode } from "../utils/editorFunction";

export const useEditorMention = (customNodeData) => {
  const [mentionIndex, setMentionIndex] = useState(0);

  const [mentionUserList, setMentionUserList] = useState([]);

  useEffect(() => {
    if (
      customNodeData &&
      customNodeData.customNode.type === "mention" &&
      customNodeData.customNode.text?.length > 0
    ) {
      const mentionUser = mockMentionUsers
        .filter((c) =>
          c
            .toLowerCase()
            .startsWith(customNodeData.customNode.text.toLowerCase())
        )
        .slice(0, 10);
      setMentionUserList(mentionUser);
    }
  }, [customNodeData?.customNode?.text]);

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

        setMentionIndex((prev) => {
          Transforms.select(editor, customData.range);
          insertCustomNode(editor, {
            ...customData,
            customNode: {
              ...customData.customNode,
              text: mentionUserList[prev],
            },
          });

          setCustomNodeData(null);
          return 0;
        });

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
