"use client";

import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import AuthFooter from "./AuthFooter";
import toplightImg from "@/assets/toplight.png";

type Step = "email" | "inbox" | "password";

const labelClass =
  "text-xs font-semibold uppercase tracking-[0.1em] text-white/60";

const cardClass =
  "w-full max-w-[609px] p-6 sm:p-10 bg-black/40 rounded-[32px] outline outline-1 outline-offset-[-1px] outline-white/15 backdrop-blur-md flex flex-col gap-8 sm:gap-10";

function getPasswordStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Za-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password) || /[A-Z]/.test(password)) score += 1;
  return Math.min(score, 4);
}

function AuthChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh w-full bg-black text-white flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[55vw] max-w-[850px] h-[55vh] pointer-events-none select-none z-0">
        <img
          src={toplightImg}
          alt=""
          className="w-full h-full object-contain object-top-right opacity-90"
        />
      </div>
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-8 lg:px-12 py-10 lg:py-16">
        {children}
      </div>
      <div className="relative z-10 mt-auto">
        <AuthFooter />
      </div>
    </div>
  );
}

export default function EmployeeSignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const strength = getPasswordStrength(password);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Enter a valid work email.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.info("Verification code sent to your work email.");
      setOtp(["", "", "", "", "", ""]);
      setStep("inbox");
    }, 700);
  };

  const handleInboxSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((digit) => !digit)) {
      toast.error("Enter the full 6-digit code.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Code verified.");
      setStep("password");
    }, 700);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Employee account ready.");
      navigate("/employee/dashboard");
    }, 700);
  };

  const handleOtpChange = (index: number, val: string) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = [...otp];
    pasted.split("").forEach((ch, i) => {
      next[i] = ch;
    });
    setOtp(next);
    otpRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleResend = () => {
    toast.success("Verification email resent.");
  };

  const otpFields = (
    <div className="flex gap-2 sm:gap-4 w-full">
      {otp.map((digit, idx) => (
        <Input
          key={idx}
          ref={(el) => {
            otpRefs.current[idx] = el;
          }}
          type="text"
          variant="otp"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={digit}
          onChange={(e) => handleOtpChange(idx, e.target.value)}
          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
          onPaste={idx === 0 ? handleOtpPaste : undefined}
          aria-label={`Digit ${idx + 1}`}
        />
      ))}
    </div>
  );

  return (
    <AuthChrome>
      <AnimatePresence mode="wait">
        {step === "email" && (
          <motion.div
            key="email"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className={cardClass}
          >
            <div className="flex flex-col gap-2 pt-2">
              <h1 className="font-playfair text-3xl sm:text-4xl text-white">
                Employee Sign Up
              </h1>
              <p className="text-sm text-white/60">
                Enter your enterprise credentials to continue.
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-8">
              <div className="flex flex-col gap-1.5">
                <label className={labelClass} htmlFor="work-email">
                  Work Email
                </label>
                <Input
                  id="work-email"
                  type="email"
                  variant="auth"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@organization.com"
                  autoComplete="email"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="xl"
                fullWidth
                isLoading={isSubmitting}
              >
                Sign Up to Console
              </Button>

              <div className="pt-6 border-t border-white/10 text-center text-sm">
                <span className="text-white/60">New to the platform? </span>
                <Link
                  to="/register"
                  className="text-white font-medium hover:underline"
                >
                  Register Organization
                </Link>
              </div>
            </form>
          </motion.div>
        )}

        {step === "password" && (
          <motion.div
            key="password"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className={cardClass}
          >
            <div className="flex flex-col gap-2 pt-2">
              <h1 className="font-playfair text-3xl sm:text-4xl text-white">
                Employee Sign Up
              </h1>
              <p className="text-sm text-white/60">Set your password</p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-8">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className={labelClass} htmlFor="employee-password">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold uppercase tracking-[0.05em] text-primary-brand hover:underline"
                  >
                    Forgot?
                  </Link>
                </div>
                <Input
                  id="employee-password"
                  type={showPassword ? "text" : "password"}
                  variant="auth"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="new-password"
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="text-white/50 hover:text-white cursor-pointer bg-transparent border-0 p-1"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="size-4.5" />
                      ) : (
                        <Eye className="size-4.5" />
                      )}
                    </button>
                  }
                />
                <div className="flex gap-1.5 pt-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`flex-1 h-1.5 rounded-full transition-colors ${
                        i < strength ? "bg-white" : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-white/60">
                  Use 8+ characters with a mix of letters and numbers.
                </p>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="xl"
                fullWidth
                isLoading={isSubmitting}
              >
                Sign Up to Console
              </Button>

              <div className="pt-6 border-t border-white/10 text-center text-sm">
                <button
                  type="button"
                  onClick={() => setStep("inbox")}
                  className="text-white font-medium hover:underline cursor-pointer bg-transparent border-0 p-0"
                >
                  Back
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {step === "inbox" && (
          <motion.div
            key="inbox"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className={cardClass}
          >
            <div className="flex flex-col gap-2 pt-2">
              <h1 className="font-playfair text-3xl sm:text-4xl text-white">
                Employee Sign Up
              </h1>
              <p className="text-sm text-white/60">Check Your Inbox</p>
            </div>

            <form onSubmit={handleInboxSubmit} className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <label className={labelClass}>6-Digit Secure Code</label>
                {otpFields}
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="xl"
                  fullWidth
                  isLoading={isSubmitting}
                >
                  Verify Account
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="lg"
                  fullWidth
                  className="border-0 shadow-none hover:bg-transparent"
                  onClick={handleResend}
                >
                  Resend Verification Email
                </Button>
              </div>

              <div className="pt-6 border-t border-white/10 text-center text-sm">
                <span className="text-white/60">Need to update your email? </span>
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="text-white font-medium hover:underline cursor-pointer bg-transparent border-0 p-0"
                >
                  Change address
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthChrome>
  );
}
