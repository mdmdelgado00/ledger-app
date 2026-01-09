import { motion } from "motion/react";

export function LoginCard({
  inWallet,
  animate,
  onAnimationEnd,
}: {
  inWallet?: boolean;
  animate?: boolean;
  onAnimationEnd?: () => void;
}) {
  const className = inWallet
    ? "absolute inset-0 rounded-2xl bg-primary translate-x-6"
    : "w-64 h-40 rounded-2xl bg-white shadow-lg";
  return (
    <motion.div
      className={className}
      layoutId="auth-card"
      animate={inWallet ? { y: animate ? -200 : 0 } : { y: 0 }}
      onAnimationComplete={() => {
        if (inWallet && animate) onAnimationEnd?.();
      }}
    >
      {inWallet ? null : (
        <>
          <div className="p-4">Login</div>
        </>
      )}
    </motion.div>
  );
}
