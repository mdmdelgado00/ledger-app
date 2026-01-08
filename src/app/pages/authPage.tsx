import { LoginCard } from "@features/auth/components/LoginCard";
import { SignUpCard } from "@features/auth/components/SignUpCard";
import { Wallet } from "@features/auth/components/wallet";
import { useState } from "react";

export default function AuthPage() {
  const [toggleCard, setToggleCard] = useState(true);

  return (
    <main className="flex min-h-screen bg-background">
      <div className="flex-1 flex items-center justify-center">
        <Wallet cardHidden={toggleCard} />
      </div>
      <div className="flex-1 relative flex items-center justify-center">
        {toggleCard && <LoginCard inWallet={!toggleCard} />}
        {!toggleCard && <SignUpCard inWallet={toggleCard} />}
        <button
          className="absolute bottom-10 px-4 py-2 bg-primary text-white rounded-lg"
          onClick={() => setToggleCard(!toggleCard)}
        >
          {toggleCard ? "Sign In" : "Hide Card"}
        </button>
      </div>
    </main>
  );
}
