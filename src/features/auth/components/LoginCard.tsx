import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { Input } from "@components/ui/input";
import { useAuth } from "@features/auth/authProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export function LoginCard({
  inWallet,
  animate,
  onAnimationEnd,
  requestToggle,
}: {
  inWallet?: boolean;
  animate?: boolean;
  onAnimationEnd?: () => void;
  requestToggle?: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const className = inWallet
    ? "absolute left-1 right-1 h-[200px] bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl shadow-2xl translate-y-10"
    : "min-w-[500px] rounded-2xl bg-muted shadow-xl p-8 border border-slate-200";

  const LoginSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    setSubmitting(true);
    setSubmitError(null);

    try {
      await signIn(data.email, data.password);
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      const msg = err?.message ?? "Login failed";
      if (msg.toLowerCase().includes("confirm")) {
        setSubmitError("Please confirm your email first (check your inbox).");
      } else {
        setSubmitError(msg);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      className={className}
      layoutId="auth-card"
      animate={inWallet ? { y: animate ? -200 : 0 } : { y: 0 }}
      onAnimationComplete={() => {
        if (inWallet && animate) onAnimationEnd?.();
      }}
    >
      {inWallet ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/40 rounded-2xl" />
          <div className="relative h-full p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex gap-2">
                <div className="w-10 h-8 bg-amber-400 rounded-md shadow-md" />
              </div>
              <div className="text-white/90 text-xs font-medium tracking-wider">
                LEDGER
              </div>
            </div>

            <div>
              <div className="text-white/90 font-mono text-lg tracking-[0.2em] mb-3">
                **** **** **** {year}
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-white/60 text-[10px] mb-1">
                    CARD HOLDER
                  </div>
                  <div className="text-white/90 text-sm tracking-wide">
                    Welcome Back
                  </div>
                </div>
                <div>
                  <div className="text-white/60 text-[10px] mb-1">EXPIRES</div>
                  <div className="text-white/90 text-sm">12/28</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <header className="mb-8">
            <h1 className="text-3xl mb-2">Welcome back !!</h1>
            <p className="text-muted-foreground">
              Please enter your details to sign in
            </p>
          </header>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter your email"
                        {...field}
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                          className="h-11 pr-10"
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <FormLabel
                    htmlFor="remember-me"
                    className="select-none text-sm"
                  >
                    Remember me
                  </FormLabel>
                </div>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Button
                type="submit"
                className="w-full mb-4 mt-2"
                disabled={submitting}
              >
                {submitting ? "Signing in..." : "Sign In"}
              </Button>
              {submitError && (
                <p className="text-sm text-red-600 text-center">
                  {submitError}
                </p>
              )}
            </form>
          </Form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted-foreground/50" />
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-10">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              onClick={requestToggle}
              className="text-primary hover:underline"
            >
              Sign up
            </a>
          </p>
        </>
      )}
    </motion.div>
  );
}
