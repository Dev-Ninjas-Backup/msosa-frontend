"use client";

import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Heart,
  Infinity as InfinityIcon,
  KeyRound,
  Leaf,
  Mail,
  Shield,
} from "lucide-react";
import { toast } from "sonner";
import Button from "@/ui/Button";
import AuthFooter from "./AuthFooter";
import toplightImg from "@/assets/toplight.png";

type Step = "email" | "otp" | "reset";

const trustItems = [
  {
    icon: Shield,
    title: "Private & Secure",
    description:
      "Your reflections are encrypted, protected, and never shared with anyone.",
  },
  {
    icon: Heart,
    title: "Emotionally Intelligent",
    description:
      "Designed to understand your core values with depth and respect.",
  },
  {
    icon: Leaf,
    title: "Built for Growth",
    description:
      "Gain clarity today. Experience deep personal transformation over time.",
  },
  {
    icon: InfinityIcon,
    title: "Always with You",
    description:
      "Your continuity never ends. This sacred space remains open for you.",
  },
];

const leftCopy: Record<
  Step,
  { headline: React.ReactNode; body: string }
> = {
  email: {
    headline: (
      <>
        <span className="text-white italic font-playfair">Restore your</span>
        <br />
        <span className="text-primary-brand italic font-medium">Access</span>
      </>
    ),
    body: "Locked out? Provide your registered organizational email and we'll send you a secure link to reset your credentials.",
  },
  otp: {
    headline: (
      <>
        <span className="text-white italic font-playfair">Confirm your</span>
        <br />
        <span className="text-primary-brand italic font-medium">
          corporate identity
        </span>
      </>
    ),
    body: "To maintain the integrity of your strategic repository, we've sent a 6-digit secure code to your registered work email.",
  },
  reset: {
    headline: (
      <>
        <span className="text-white italic font-playfair">Create a new</span>
        <br />
        <span className="text-primary-brand italic font-medium">Password</span>
      </>
    ),
    body: "Choose a strong password with at least 8 characters, mixing letters and numbers to secure your account.",
  },
};

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("admin@organization.com");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Enter your corporate email address.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.info("Recovery code sent to your email.");
      setStep("otp");
    }, 900);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((d) => !d)) {
      toast.error("Enter the full 6-digit code.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Code verified.");
      setStep("reset");
    }, 900);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Password reset successfully. Please log in.");
      navigate("/login");
    }, 1000);
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
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
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

  const copy = leftCopy[step];

  return (
    <div className="min-h-svh w-full bg-black text-white flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[55vw] max-w-[850px] h-[55vh] pointer-events-none select-none z-0">
        <img
          src={toplightImg}
          alt=""
          className="w-full h-full object-contain object-top-right opacity-90"
        />
      </div>
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary-brand/10 blur-[130px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-8 lg:px-12 py-10 lg:py-16">
        <div className="w-full max-w-[1129px] flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 lg:gap-16">
          {/* Left column */}
          <div className="w-full max-w-[456px] flex flex-col gap-6 lg:gap-8 shrink-0">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full border border-primary-brand/30 bg-primary-brand/5">
              <span className="size-1.5 rounded-full bg-primary-brand" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-brand">
                Verification Step
              </span>
            </div>

            <div>
              <p className="text-lg sm:text-xl text-white tracking-tight">
                MyStrategyBlueprints.com
              </p>
              <p className="text-[10px] uppercase tracking-[0.1em] text-primary-brand/80 mt-0.5">
                Powered by FAR Systems™
              </p>
            </div>

            <h1 className="text-4xl sm:text-5xl leading-[1.15]">{copy.headline}</h1>
            <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-[448px]">
              {copy.body}
            </p>

            <div className="hidden sm:flex flex-col gap-1 pt-2">
              {trustItems.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex gap-4 items-start py-5 border-b border-white/5 last:border-0"
                >
                  <div className="size-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0">
                    <Icon className="size-4 text-white/80" strokeWidth={1.75} />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-sm font-semibold uppercase tracking-[0.08em] text-white">
                      {title}
                    </span>
                    <span className="text-xs text-white/60 leading-relaxed">
                      {description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right card */}
          <motion.div
            layout
            className="w-full max-w-[609px] p-6 sm:p-10 bg-black/40 rounded-[32px] outline outline-1 outline-offset-[-1px] outline-white/15 backdrop-blur-md flex flex-col gap-8 sm:gap-10"
          >
            <AnimatePresence mode="wait">
              {step === "email" && (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-8 sm:gap-10"
                >
                  <div className="flex flex-col gap-2">
                    <div className="size-16 bg-primary-brand/10 rounded-2xl outline outline-1 outline-offset-[-1px] outline-primary-brand/25 flex items-center justify-center">
                      <KeyRound className="size-6 text-primary-brand" />
                    </div>
                    <h2 className="pt-4 font-playfair text-3xl sm:text-4xl text-white">
                      Forgot Password
                    </h2>
                    <p className="text-sm text-[#a3a3a3]">
                      Enter your email to receive recovery instructions.
                    </p>
                  </div>

                  <form
                    onSubmit={handleEmailSubmit}
                    className="flex flex-col gap-8"
                  >
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-[0.1em] text-white/60">
                        Corporate Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@organization.com"
                        className="w-full h-13 px-4 bg-white/10 rounded-[10px] border border-white/10 text-white text-base outline-none focus:border-primary-brand/60 focus:ring-1 focus:ring-primary-brand/40 transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-4">
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
                        onClick={() => navigate("/login")}
                      >
                        Cancel
                      </Button>
                    </div>

                    <div className="pt-5 border-t border-white/10 text-center text-sm">
                      <span className="text-white/60">
                        Remembered your credentials?{" "}
                      </span>
                      <Link
                        to="/login"
                        className="text-white font-medium hover:underline"
                      >
                        Log in here
                      </Link>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === "otp" && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-8 sm:gap-10"
                >
                  <div className="flex flex-col gap-2">
                    <div className="size-16 bg-primary-brand/10 rounded-2xl outline outline-1 outline-offset-[-1px] outline-primary-brand/20 flex items-center justify-center">
                      <Mail className="size-6 text-primary-brand" />
                    </div>
                    <h2 className="pt-4 font-playfair text-3xl sm:text-4xl text-white">
                      Check Your Inbox
                    </h2>
                    <p className="text-sm text-[#a3a3a3]">
                      We sent a code to{" "}
                      <span className="text-white font-medium">{email}</span>
                    </p>
                  </div>

                  <form
                    onSubmit={handleOtpSubmit}
                    className="flex flex-col gap-8"
                  >
                    <div className="flex flex-col gap-4">
                      <label className="text-xs font-semibold uppercase tracking-[0.1em] text-white/60">
                        6-Digit Secure Code
                      </label>
                      <div className="flex gap-2 sm:gap-3 md:gap-4 w-full">
                        {otp.map((digit, idx) => (
                          <input
                            key={idx}
                            ref={(el) => {
                              otpRefs.current[idx] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                              handleOtpChange(idx, e.target.value)
                            }
                            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                            onPaste={idx === 0 ? handleOtpPaste : undefined}
                            className="flex-1 min-w-0 h-12 sm:h-14 md:h-16 rounded-[10px] bg-white/10 border border-white/10 text-center text-lg sm:text-xl font-bold text-white outline-none focus:border-primary-brand/60 focus:ring-1 focus:ring-primary-brand/40 transition-all"
                            aria-label={`Digit ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
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
                        onClick={handleResend}
                      >
                        Resend Verification Email
                      </Button>
                    </div>

                    <div className="pt-5 border-t border-white/10 text-center text-sm">
                      <span className="text-white/60">
                        Need to update your email?{" "}
                      </span>
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

              {step === "reset" && (
                <motion.div
                  key="reset"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-8 sm:gap-10"
                >
                  <div className="flex flex-col gap-2">
                    <div className="size-16 bg-primary-brand/10 rounded-2xl outline outline-1 outline-offset-[-1px] outline-primary-brand/25 flex items-center justify-center">
                      <KeyRound className="size-6 text-primary-brand" />
                    </div>
                    <h2 className="pt-4 font-playfair text-3xl sm:text-4xl text-white">
                      Reset Password
                    </h2>
                    <p className="text-sm text-[#a3a3a3]">
                      Create a new strong password for your account.
                    </p>
                  </div>

                  <form
                    onSubmit={handleResetSubmit}
                    className="flex flex-col gap-5"
                  >
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-[0.1em] text-white/60">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full h-13 px-4 pr-12 bg-white/10 rounded-[10px] border border-white/10 text-white text-base outline-none focus:border-primary-brand/60 focus:ring-1 focus:ring-primary-brand/40 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white cursor-pointer bg-transparent border-0 p-1"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="size-4.5" />
                          ) : (
                            <Eye className="size-4.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-[0.1em] text-white/60">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full h-13 px-4 pr-12 bg-white/10 rounded-[10px] border border-white/10 text-white text-base outline-none focus:border-primary-brand/60 focus:ring-1 focus:ring-primary-brand/40 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((v) => !v)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white cursor-pointer bg-transparent border-0 p-1"
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="size-4.5" />
                          ) : (
                            <Eye className="size-4.5" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-white/50 mt-1">
                        Use 8+ characters with a mix of letters and numbers.
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="xl"
                        fullWidth
                        isLoading={isSubmitting}
                      >
                        Reset Password
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="lg"
                        fullWidth
                        onClick={() => setStep("otp")}
                      >
                        Back
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        <AuthFooter />
      </div>
    </div>
  );
}
