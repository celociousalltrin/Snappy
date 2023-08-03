import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const components = [
  "Component1",
  "Component2",
  "Component3",
  "Component4",
  "Component5",
  "Component6",
  "Component7",
];

const variants = {
  enter: (direction) => {
    return {
      x: direction === "next" ? "-100%" : "100%",
    };
  },
  visible: {
    x: 0,
  },
  exit: (direction) => ({
    x: direction === "next" ? "100%" : "-100%",
    opacity: 0,
  }),
};

const MyComponent = () => {
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  const handleClickNext = () => {
    setCurrentComponentIndex(
      (prevIndex) => (prevIndex + 1) % components.length
    );
    setDirection("next");
  };

  const handleClickBack = () => {
    setCurrentComponentIndex((prevIndex) =>
      prevIndex === 0 ? components.length - 1 : prevIndex - 1
    );
    setDirection("back");
  };

  return (
    <div>
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={currentComponentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="visible"
          exit="exit"
        >
          {/* Render your current component here, for example: */}
          <div>{components[currentComponentIndex]}</div>
        </motion.div>
      </AnimatePresence>

      <button onClick={handleClickBack}>Back</button>
      <button onClick={handleClickNext}>Next</button>
    </div>
  );
};

export default MyComponent;
