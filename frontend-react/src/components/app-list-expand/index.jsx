import React from "react";
import { BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";

import { isToggleContent, sliceContent } from "../../utils/common-function";

import AppFramerListExpand from "../app-framer-list-expand";
import AppToolTip from "../app-tooltip";
import ReadOnlyRichTextBox from "../app-rich-text-box/read-only-rich-text-box";

import "./style.css";

const AppListExpand = ({
  content,
  contentId,
  isExpand,
  showMore,
  showLess,
  isSignup,
}) => {
  const isSignupMobileScreen = () => {
    if (isSignup && window.innerWidth < 768) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="app-list-container">
      <AppFramerListExpand isExpand={isExpand}>
        {isToggleContent(content, isSignupMobileScreen() ? 55 : 105) &&
        !isExpand ? (
          <div>
            <ReadOnlyRichTextBox
              value={sliceContent(content, isSignupMobileScreen() ? 55 : 100)}
            />
            <div className="app-list-down-icon">
              <AppToolTip title="Show More">
                <BiSolidChevronDown
                  color="rgb(13, 110, 253)"
                  size={23}
                  onClick={(e) => showMore(e, contentId)}
                />{" "}
              </AppToolTip>
            </div>
          </div>
        ) : (
          <div>
            <ReadOnlyRichTextBox value={content} />
            {isToggleContent(content, isSignupMobileScreen() ? 55 : 105) && (
              <div className="app-list-up-icon">
                <AppToolTip title="Hide">
                  <BiSolidChevronUp
                    color="rgb(13, 110, 253)"
                    className="ms-2"
                    size={23}
                    onClick={(e) => showLess(e, contentId)}
                  />
                </AppToolTip>
              </div>
            )}
          </div>
        )}
      </AppFramerListExpand>
    </div>
  );
};

export default AppListExpand;
