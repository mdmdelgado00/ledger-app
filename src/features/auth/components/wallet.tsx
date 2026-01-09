import { cn } from "@lib/utils";
import { LoginCard } from "./LoginCard";
import { SignUpCard } from "./SignUpCard";

export function Wallet({
  placeholder,
  animate,
  onAnimationEnd,
}: {
  placeholder?: "login" | "signup";
  animate?: boolean;
  onAnimationEnd?: () => void;
}) {
  return (
    <div className={cn("relative w-full max-w-[560px] h-[420px] md:h-[520px]")}>
      {/* Subtle background panel */}
      <div className="absolute inset-0 rounded-3xl border bg-muted/15" />

      {/* Very subtle grid texture */}
      <div
        className="absolute inset-0 rounded-3xl opacity-60 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage:
            "radial-gradient(circle at 30% 35%, black 0%, transparent 65%)",
          WebkitMaskImage:
            "radial-gradient(circle at 30% 35%, black 0%, transparent 65%)",
        }}
      />

      {/* Wallet group */}
      <div className="absolute left-[16%] bottom-[10%] w-[340px] h-[240px] md:w-[380px] md:h-[260px]">
        {/* Wallet body */}
        <div className="absolute inset-0 rounded-3xl bg-[#0E2F2A] border border-black/10 shadow-sm">
          <div className="absolute top-5 inset-0 rounded-b-3xl bg-[#0E2F2A] z-20" />
          {/* Opening */}
          <div className="absolute left-0 right-0 top-0 h-5 rounded-t-3xl bg-muted z-10" />
          <div className="absolute left-0 right-0 top-5 h-6 rounded-b-2xl bg-muted z-40" />
          <div className="absolute left-2 right-0 top-5 rounded h-[2px] w-[360px] bg-black/20 z-40" />
          {/* Clasp */}
          <div className="absolute -right-1 top-[45%] h-10 w-12 border ring-1 ring-black/5 rounded-l-lg bg-background shadow-md shadow-black/20 z-30">
            <div className="absolute inset-0 m-2 w-6 rounded-full bg-yellow-500 shadow-sm" />
          </div>
        </div>
      </div>

      {/* Peeking cards behind wallet */}
      <div className="absolute left-[18.5%] bottom-[32%] w-[300px] h-[170px] md:w-[330px] md:h-[180px] z-10">
        <div className="absolute inset-0 rounded-2xl  bg-primary/55 rotate-[-10deg] translate-x-2" />
        {placeholder === "signup" ? (
          <SignUpCard
            inWallet
            animate={animate}
            onAnimationEnd={onAnimationEnd}
          />
        ) : (
          <LoginCard
            inWallet
            animate={animate}
            onAnimationEnd={onAnimationEnd}
          />
        )}
      </div>
    </div>
  );
}
