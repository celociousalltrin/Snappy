// import React, { useState } from "react";
// import { motion, AnimatePresence, animate } from "framer-motion";

// const Framer = () => {
//   // const myArr = [];
//   // const [data, setData] = useState(myArr);

//   // const ArrayGenratingFunction = ((input) => {
//   //   for (let i = 1; i <= 6; i++) {
//   //     myArr.push(i);
//   //   }
//   // })(6);

//   // const dummyvariants = {
//   //   initial: {
//   //     opacity: 0,
//   //     transition: { duration: 2 },
//   //   },
//   //   animate: { opacity: 1, x: 0, staggerChildren: 5, staggerDirection: 1 },
//   //   exit: { opacity: 0, x: -300, transition: { duration: 6 } },
//   //   customState: {
//   //     scale: 1.5,
//   //   },
//   // };

// const parentVariants = {
//   animate: {
//     transition: {
//       staggerChildren: 1,
//       staggerDirection: -1,
//     },
//   },
// };

// const childVariants = {
//   initial: {
//     opacity: 0,
//     y: -20,
//   },
//   animate: {
//     opacity: 1,
//     y: 0,
//   },
//   exit: {
//     opacity: 0,
//     y: -20,
//   },
// };

//   const items = ["Item 1", "Item 2", "Item 3"];

//   return (
//     <div style={{ height: "1000px" }}>
//       {/* <motion.div
//         initial={{ x: 100, opacity: 1 }}
//         animate={{ x: [null, 100, 25, 0], opacity: 1 }}
//         transition={{
//           ease: "linear",
//           duration: 2,
//           delay: 1,
//           repeat: 2,
//           repeatDelay: 1,
//         }}
//         exit={{ opacity: 0.5 }}
//         style={{ width: "1000px" }}
//       >
//         <div
//           style={{ width: "100px", backgroundColor: "blue", height: "100px" }}
//         ></div>
//         <motion.button
//           whileHover={{
//             x: [0, 10, 0],
//             transition: { duration: 0.1, repeat: 5 },
//             backgroundColor: "red",
//           }}
//           className="btn btn-primary "
//         >
//           Framer Buttoon
//         </motion.button>
//       </motion.div> */}
//       {/* <div>
//         <AnimatePresence>
//           <motion.div
//             variants={dummyvariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//           >
//             {data.map((obj, index) => (
//               <motion.div
//                 key={index}
//                 layout
//                 variants={dummyvariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               >
//                 <motion.p
//                   style={{
//                     width: "400px",
//                     backgroundColor: "rosybrown",
//                     height: "30px",
//                     borderRadius: "4px",
//                   }}
//                 >
//                   {obj}
//                 </motion.p>
//                 <motion.button
//                   variants={dummyvariants}
//                   whileHover="customState"
//                   className="btn btn-outline-dark"
//                   onClick={() => {
//                     setData(data.filter((o) => o !== obj));
//                   }}
//                 >
//                   Deleted Button
//                 </motion.button>
//               </motion.div>
//             ))}
//           </motion.div>
//         </AnimatePresence>
//       </div> */}
//       <motion.div
//         variants={parentVariants}
//         initial="initial"
//         animate="animate"
//         exit="exit"
//       >
//         {items.map((item, index) => (
//           <motion.div key={index} variants={childVariants}>
//             <p>{item}</p>
//             <h1>saascda</h1>
//           </motion.div>
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// export default Framer;

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SandIcon from "./sandbox-customhooks";
import CheckIcon from "./sandbox-customhooks";

const MyComponent = () => {
  const [move, setMove] = useState(false);
  const myVariants = {
    moveleft: {
      x: 500,
      transition: {
        duration: 1,
      },
    },
    moveRight: {
      x: 100,
      transition: {
        duration: 1,
      },
    },
  };
  return (
    <motion.div
      initial={false}
      variants={myVariants}
      animate={move ? "moveleft" : "moveRight"}
      style={{ backgroundColor: "red", height: "10rem", width: "10rem" }}
      onClick={() => setMove(!move)}
    ></motion.div>
  );
};

export default MyComponent;
