import { motion } from "motion/react";

export function LoginCard() {
  return (
    <motion.div
      className="w-96 h-96 p-6 border rounded-lg shadow-lg"
      layoutId="auth-card"
    ></motion.div>
  );
}
