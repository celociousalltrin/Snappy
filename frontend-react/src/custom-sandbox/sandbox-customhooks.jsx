import { AnimatePresence, motion } from "framer-motion";
import useCustomArray from "../custom-hooks/useCustomArray";
import { useState } from "react";

const CheckIcon = ({ isActive }) => {
  const variants = {
    initial: (active) => ({
      pathLength: 0,
      opacity: 0,
    }),
    animate: (active) => {
      return {
        pathLength: active ? 1 : 0,
        opacity: 1,
        transition: {
          duration: 1,
        },
      };
    },
  };

  return (
    <>
      <motion.svg
        viewBox="0 0 24 24"
        width={30}
        height={30}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M5 13L9 17L19 7"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={variants}
          custom={isActive}
          initial="initial"
          animate="animate"
        />
      </motion.svg>
    </>
  );
};

export default CheckIcon;
