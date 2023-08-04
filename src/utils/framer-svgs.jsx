import { AnimatePresence, motion } from "framer-motion";

export const FramerCheckIcon = ({
  isActive = "",
  variants,
  width,
  height,
  iconwidth,
  color,
}) => {
  return (
    <>
      <AnimatePresence>
        <motion.svg
          viewBox="0 0 24 24"
          width={width}
          height={height}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M5 13L9 17L19 7"
            stroke={color}
            strokeWidth={iconwidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={variants}
            custom={isActive}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </motion.svg>
      </AnimatePresence>
    </>
  );
};
