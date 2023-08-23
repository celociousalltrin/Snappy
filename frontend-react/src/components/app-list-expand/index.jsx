import React from "react";
import AppFramerListExpand from "../app-framer-list-expand";
import { isToggleContent, sliceContent } from "../../utils/common-function";
import { BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";
import AppToolTip from "../app-tooltip";

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
    <div>
      <AppFramerListExpand isExpand={isExpand}>
        {isToggleContent(content, isSignupMobileScreen() ? 55 : 105) &&
        !isExpand ? (
          <span>
            {sliceContent(content, isSignupMobileScreen() ? 55 : 105)}{" "}
            <AppToolTip title="Show More">
              <BiSolidChevronDown
                color="rgb(13, 110, 253)"
                size={23}
                onClick={(e) => showMore(e, contentId)}
              />{" "}
            </AppToolTip>
          </span>
        ) : (
          <span>
            {content}
            {isToggleContent(content, isSignupMobileScreen() ? 55 : 105) && (
              <AppToolTip title="Hide">
                <BiSolidChevronUp
                  color="rgb(13, 110, 253)"
                  className="ms-2"
                  size={23}
                  onClick={(e) => showLess(e, contentId)}
                />
              </AppToolTip>
            )}
          </span>
        )}
      </AppFramerListExpand>
    </div>
  );
};

export default AppListExpand;
