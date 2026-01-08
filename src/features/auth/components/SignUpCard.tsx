import { motion } from "motion/react";

export function SignUpCard({ inWallet }: { inWallet?: boolean }) {
  const className = inWallet
    ? "absolute inset-0 rounded-2xl  bg-primary/65 rotate-[-6deg] translate-x-4"
    : "w-64 h-40 rounded-2xl bg-white shadow-lg";
  return (
    <motion.div className={className} layoutId="sign-up-card">
      {inWallet ? null : "Sign Up"}
    </motion.div>
  );
}
