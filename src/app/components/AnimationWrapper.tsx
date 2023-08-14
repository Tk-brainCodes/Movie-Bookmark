import React, { ReactNode } from "react";
import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, x: 10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
};

const AnimatedWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      variants={animations}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedWrapper;
