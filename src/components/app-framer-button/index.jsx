import React from "react";
import { motion } from "framer-motion";

const AppFramerButton = ({ children, hover = 1.04, tap = 0.95 }) => {
  return (
    <motion.div whileHover={{ scale: hover }} whileTap={{ scale: tap }}>
      {children}
    </motion.div>
  );
};

export default AppFramerButton;
