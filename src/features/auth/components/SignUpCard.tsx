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
import { zodResolver } from "@hookform/resolvers/zod";
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
    ? "absolute inset-0 rounded-2xl  bg-primary/55 rotate-[-10deg] translate-x-2"
    : "min-w-[500px] rounded-2xl bg-muted shadow-xl p-8 border border-slate-200";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const SignUpSchema = z.object({
    fullName: z.string().min(2),
    email: z.email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
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

  function onSubmit(data: z.infer<typeof SignUpSchema>) {
    console.log(data);
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
              rotate: animate ? [0, 0, 10, 10] : 0,
              x: animate ? 50 : 0,
            }
          : { y: 0, rotate: 0 }
      }
      onAnimationComplete={() => {
        if (inWallet && animate) onAnimationEnd?.();
      }}
    >
      {inWallet ? null : (
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
                disabled={!agreeToTerms}
              >
                Sign Up
              </Button>
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
