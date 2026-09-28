import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface BlurRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const BlurReveal = ({ children, className, delay = 0 }: BlurRevealProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 12, filter: "blur(8px)" }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};