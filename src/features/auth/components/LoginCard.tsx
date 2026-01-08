import { motion } from "motion/react";

export function LoginCard({ inWallet }: { inWallet?: boolean }) {
  const className = inWallet
    ? "absolute inset-0 rounded-2xl bg-primary translate-x-6"
    : "w-64 h-40 rounded-2xl bg-white shadow-lg";
  return (
    <motion.div className={className} layoutId="auth-card">
      {inWallet ? null : "Login"}
    </motion.div>
  );
}
