import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import "./style.css";

function BasicExample() {
  const [list, setList] = useState([]);
  const [textValue, setTextValue] = useState("");
  return (
    <div>
      <input
        type="text"
        onChange={(e) => setTextValue(e.target.value)}
        value={textValue}
      />

      <button
        onClick={() => {
          setList([...list, textValue]);
          setTextValue("");
        }}
        className="btn btn-success ms-4"
      >
        Add
      </button>
      <AnimatePresence>
        {list.map((obj, i) => (
          <AnimateComponent key={obj}>
            <>
              <p>{obj}</p>
              <button
                onClick={() => {
                  setList(list.filter((o) => o != obj));
                  setTextValue("");
                }}
                className="btn btn-danger"
              >
                Delete
              </button>
            </>
          </AnimateComponent>
        ))}
      </AnimatePresence>
    </div>
  );
}

const AnimateComponent = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [-10, 0], transition: { duration: 1 } }}
      exit={{ opacity: 0, x: [null, -100], transition: { duration: 2 } }}
      key={props.key}
    >
      {props.children}
    </motion.div>
  );
};

export default BasicExample;
