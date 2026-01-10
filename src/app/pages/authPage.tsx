import { LoginCard } from "@features/auth/components/LoginCard";
import { SignUpCard } from "@features/auth/components/SignUpCard";
import { Wallet } from "@features/auth/components/wallet";
import { useState } from "react";

export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);
  const [animateCard, setAnimateCard] = useState(false);

  const requestToggle = () => {
    if (animateCard) return;
    setAnimateCard(true);
  };

  const handleAnimationEnd = () => {
    setShowLogin(!showLogin);
    setAnimateCard(false);
  };

  return (
    <main className="flex min-h-screen bg-background">
      <div className="flex-1 flex items-center justify-center">
        <Wallet
          placeholder={showLogin ? "signup" : "login"}
          animate={animateCard}
          onAnimationEnd={handleAnimationEnd}
        />
      </div>
      <div className="flex-1 relative flex items-center justify-center">
        {showLogin ? (
          <LoginCard requestToggle={requestToggle} />
        ) : (
          <SignUpCard requestToggle={requestToggle} />
        )}
      </div>
    </main>
  );
}
