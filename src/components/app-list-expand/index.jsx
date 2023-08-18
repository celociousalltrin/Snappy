import React from "react";
import AppFramerListExpand from "../app-framer-list-expand";
import { isToggleContent, sliceContent } from "../../utils/common-function";
import { BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";

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
            <BiSolidChevronDown
              color="rgb(13, 110, 253)"
              size={23}
              onClick={(e) => showMore(e, contentId)}
            />{" "}
          </span>
        ) : (
          <span>
            {content}
            {isToggleContent(content, isSignupMobileScreen() ? 55 : 105) && (
              <BiSolidChevronUp
                color="rgb(13, 110, 253)"
                className="ms-2"
                size={23}
                onClick={(e) => showLess(e, contentId)}
              />
            )}
          </span>
        )}
      </AppFramerListExpand>
    </div>
  );
};

export default AppListExpand;
