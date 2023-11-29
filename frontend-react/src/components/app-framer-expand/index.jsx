import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ExpandVariants } from "../../utils/framer-variants";

const AppFramerExpand = ({ isVisible, children, setShowIcon }) => {
  useEffect(() => {
    if (!isVisible) {
      setTimeout(() => {
        setShowIcon(true);
      }, 400);
    } else {
      setShowIcon(false);
    }
  }, [isVisible]);
  return (
    <motion.div
      initial={false}
      animate="visible"
      variants={ExpandVariants}
      custom={isVisible}
    >
      {children}
    </motion.div>
  );
};

export default AppFramerExpand;
