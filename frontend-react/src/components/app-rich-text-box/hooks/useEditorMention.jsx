import { useEffect, useState } from "react";
import { mockMentionUsers } from "../../../utils/mock-common";
import { Transforms } from "slate";
import { insertCustomNode } from "../utils/editorFunction";
import { responseMessage } from "../../../utils/response-message";
import { getuserBasedOnSearch } from "../../../services/method";

export const useEditorMention = (customNodeData) => {
  const [mentionIndex, setMentionIndex] = useState(0);

  const [mentionUserList, setMentionUserList] = useState([]);

  const getList = async (search) => {
    try {
      const response = await getuserBasedOnSearch(search.toLowerCase());
      setMentionUserList(response.data.response_data);
    } catch (err) {
      responseMessage(err.data.code);
      console.log("🚀 ~ file: useEditorMention.jsx:15 ~ getList ~ err:", err);
    }
  };

  useEffect(() => {
    if (
      customNodeData &&
      customNodeData.customNode.type === "mention" &&
      customNodeData.customNode.text?.length > 0
    ) {
      // const mentionUser = mockMentionUsers
      //   .filter((c) =>
      //     c
      //       .toLowerCase()
      //       .startsWith(customNodeData.customNode.text.toLowerCase())
      //   )
      //   .slice(0, 10);
      // setMentionUserList(mentionUser);
      getList(customNodeData.customNode.text);
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
        setMentionUserList((userPrev) => {
          setMentionIndex((prev) =>
            prev >= userPrev.length - 1 ? 0 : prev + 1
          );
          return userPrev;
        });

        break;
      case "ArrowUp":
        event.preventDefault();
        setMentionUserList((userPrev) => {
          setMentionIndex((prev) =>
            prev <= 0 ? userPrev.length - 1 : prev - 1
          );
          return userPrev;
        });

        break;
      case "Enter":
        event.preventDefault();
        setMentionUserList((userPrev) => {
          setMentionIndex((prev) => {
            Transforms.select(editor, customData.range);
            insertCustomNode(editor, {
              ...customData,
              customNode: {
                ...customData.customNode,
                text: userPrev[prev].user_name,
                user_id: userPrev[prev]._id,
              },
            });

            setCustomNodeData(null);
            return 0;
          });
          return userPrev;
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
