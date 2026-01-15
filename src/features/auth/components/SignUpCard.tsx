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
import { Label } from "@components/ui/label";
import { useAuth } from "@features/auth/authProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@lib/dbConnection";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

export function SignUpCard({
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
  const className = inWallet
    ? "absolute left-3 right-3 h-[200px] bg-gradient-to-br from-teal-400 to-teal-500 rounded-2xl shadow-xl translate-y-10 rotate-0"
    : "min-w-[500px] rounded-2xl bg-muted shadow-xl p-8 border border-slate-200";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { signUp } = useAuth();
  const year = new Date().getFullYear();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const SignUpSchema = z
    .object({
      fullName: z.string().min(2),
      email: z.email(),
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
    });

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof SignUpSchema>) {
    if (!agreeToTerms) return;
    setSubmitError(null);
    setSubmitSuccess(null);
    setSubmitting(true);

    try {
      await signUp(data.email, data.password);
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user ?? null;

      if (user) {
        const { error } = await supabase
          .from("profiles")
          .update({ display_name: data.fullName })
          .eq("id", user.id);

        if (error) console.warn("Profile update failed:", error.message);

        return;
      }

      setSubmitSuccess("Account created successfully!");
    } catch (error: any) {
      setSubmitError(error.message || "An error occurred during sign up.");
    } finally {
      setSubmitting(false);
    }
  }

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "", color: "" };
    if (password.length < 6)
      return { strength: 1, label: "Weak", color: "bg-red-500" };
    if (password.length < 10)
      return { strength: 2, label: "Medium", color: "bg-amber-500" };
    if (
      password.length >= 10 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      return { strength: 3, label: "Strong", color: "bg-green-500" };
    }
    return { strength: 2, label: "Medium", color: "bg-amber-500" };
  };

  const passwordStrength = getPasswordStrength(
    useWatch({
      control: form.control,
      name: "password",
    })
  );
  const passwordsMatch =
    useWatch({
      control: form.control,
      name: "password",
    }) ===
    useWatch({
      control: form.control,
      name: "confirmPassword",
    });

  return (
    <motion.div
      className={className}
      layoutId="sign-up-card"
      animate={
        inWallet
          ? {
              y: animate ? -200 : 0,
            }
          : { y: 0 }
      }
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
                    New User
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
            <h1 className="text-3xl mb-2">Create an account</h1>
            <p className="text-muted-foreground">
              Please enter your details to sign up
            </p>
          </header>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
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
                          placeholder="Create a password"
                          className="h-11 pr-10"
                          {...field}
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
                    {field.value && (
                      <div className="space-y-1">
                        <div className="flex gap-1">
                          {[1, 2, 3].map((level) => (
                            <div
                              key={level}
                              className={`h-1 flex-1 rounded-full transition-all ${
                                level <= passwordStrength.strength
                                  ? passwordStrength.color
                                  : "bg-muted-foreground/10"
                              }`}
                            />
                          ))}
                        </div>
                        <p
                          className={`text-sm ${
                            passwordStrength.strength === 1
                              ? "text-red-500"
                              : passwordStrength.strength === 2
                                ? "text-yellow-500"
                                : "text-green-500"
                          }`}
                        >
                          {passwordStrength.label}
                        </p>
                      </div>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Confirm Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className="h-11 pr-10"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                    {field.value && (
                      <p
                        className={`text-xs ${passwordsMatch ? "text-green-600" : "text-red-600"}`}
                      >
                        {passwordsMatch ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Passwords match
                          </span>
                        ) : (
                          "Passwords don't match"
                        )}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) =>
                    setAgreeToTerms(checked as boolean)
                  }
                  className="mt-1"
                />
                <Label
                  htmlFor="terms"
                  className="text-sm cursor-pointer leading-relaxed"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-teal-700 hover:text-teal-800 hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-teal-700 hover:text-teal-800 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </Label>
              </div>
              <Button
                type="submit"
                className="w-full mb-4 mt-2"
                disabled={!agreeToTerms || submitting}
              >
                {submitting ? "Signing Up..." : "Sign Up"}
              </Button>
              {submitError && (
                <p className="text-sm text-red-600">{submitError}</p>
              )}
              {submitSuccess && (
                <p className="text-sm text-green-600">{submitSuccess}</p>
              )}
            </form>
          </Form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted-foreground/50" />
            </div>
          </div>
          <p className="text-center text-sm text-slate-600 mt-10">
            Already have an account?{" "}
            <a
              href="#"
              onClick={requestToggle}
              className="text-primary hover:underline"
            >
              Log in
            </a>
          </p>
        </>
      )}
    </motion.div>
  );
}
