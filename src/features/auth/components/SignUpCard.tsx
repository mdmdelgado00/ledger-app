import { motion } from "motion/react";

export function SignUpCard({
  inWallet,
  animate,
  onAnimationEnd,
}: {
  inWallet?: boolean;
  animate?: boolean;
  onAnimationEnd?: () => void;
}) {
  const className = inWallet
    ? "absolute inset-0 rounded-2xl  bg-primary/65 rotate-[-6deg] translate-x-4"
    : "w-64 h-40 rounded-2xl bg-white shadow-lg";
  return (
    <motion.div
      className={className}
      layoutId="sign-up-card"
      animate={
        inWallet
          ? { y: animate ? -200 : 0, rotate: animate ? [0, 0, 6, 6] : 0 }
          : { y: 0, rotate: 0 }
      }
      onAnimationComplete={() => {
        if (inWallet && animate) onAnimationEnd?.();
      }}
    >
      {inWallet ? null : "Sign Up"}
    </motion.div>
  );
}
