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
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

  const className = inWallet
    ? "absolute inset-0 rounded-2xl bg-primary translate-x-6"
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

  function onSubmit(data: z.infer<typeof LoginSchema>) {
    console.log(data);
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
      {inWallet ? null : (
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
              <Button type="submit" className="w-full mb-4 mt-2">
                Login
              </Button>
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
