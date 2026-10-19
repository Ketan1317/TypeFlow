
import { motion } from "framer-motion";

const Caret = () => {
  return (
    <motion.span
      aria-hidden="true"
      className="mx-[1px] inline-block h-[1.25em] w-[2px] translate-y-[0.2em] rounded-full bg-yellow-400 align-baseline"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 0.25, 1] }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default Caret;
