import { LoginCard } from "@features/auth/components/LoginCard";
import { motion } from "motion/react";
import { useState } from "react";

export default function AuthPage() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <main className="flex min-h-screen bg-background">
      <div className="flex-1 flex items-center justify-center">
        {showSignUp ? (
          <motion.button
            className="w-24 bg-primary rounded text-white cursor-pointer"
            onClick={() => setShowSignUp(false)}
            layoutId="auth-button"
          >
            Back
          </motion.button>
        ) : (
          <LoginCard />
        )}
      </div>
      <div className="flex-1 relative flex items-center justify-center">
        {showSignUp ? (
          <LoginCard />
        ) : (
          <motion.button
            className="w-24 bg-primary rounded text-white cursor-pointer"
            onClick={() => setShowSignUp(true)}
            layoutId="auth-button"
          >
            Back
          </motion.button>
        )}
      </div>
    </main>
  );
}
