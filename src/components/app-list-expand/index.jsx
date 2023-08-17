import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { ListExpandVariants } from "../../utils/framer-variants";

const AppListExpand = ({ isExpand, children }) => {
  return (
    <AnimatePresence initial={false} custom={isExpand} mode="wait">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={ListExpandVariants}
        key={isExpand}
        custom={isExpand}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AppListExpand;
