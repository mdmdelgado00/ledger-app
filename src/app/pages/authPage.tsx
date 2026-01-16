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
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 via-emerald-50 to-teal-100 p-4 md:p-8 overflow-hidden">
      <header className="relative z-10 mb-8">
        <div className="max-w-8xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Ledger
              </h1>
            </div>
          </div>
          <div className="text-sm text-slate-600">
            Need help?{" "}
            <button className="text-emerald-600 hover:text-emerald-700 font-medium">
              Contact us
            </button>
          </div>
        </div>
      </header>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
      </div>
      <div className="flex justify-center items-center">
        <div className="flex-1 flex items-center justify-center">
          <Wallet
            placeholder={showLogin ? "signup" : "login"}
            animate={animateCard}
            onAnimationEnd={handleAnimationEnd}
          />
        </div>
        <div className="flex-1 relative flex items-center justify-center m-8">
          {showLogin ? (
            <LoginCard requestToggle={requestToggle} />
          ) : (
            <SignUpCard requestToggle={requestToggle} />
          )}
        </div>
      </div>
    </main>
  );
}
