"use client";

import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  ChevronDown,
  Eye,
  EyeOff,
  Mail,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";
import Button from "@/ui/Button";
import AuthFooter from "./AuthFooter";
import toplightImg from "@/assets/toplight.png";

type AccountType = "individual" | "enterprise";
type Step = "form" | "verify";

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Other",
];
const orgSizes = ["1-50", "51-200", "201-500", "500-1000", "1000+"];
const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "India",
  "Other",
];

const GoogleIcon = () => (
  <svg className="size-4.5" viewBox="0 0 24 24">
    <path
      fill="#EA4335"
      d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
    />
    <path
      fill="#4285F4"
      d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
    />
    <path
      fill="#FBBC05"
      d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-1.9z"
    />
    <path
      fill="#34A853"
      d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.1 7.5 23 12 23z"
    />
  </svg>
);

const AppleIcon = () => (
  <svg className="size-4.5 fill-current" viewBox="0 0 24 24">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.66-1.06 1.73-.93 2.76 1 .08 2.02-.51 2.63-1.26z" />
  </svg>
);

function getPasswordStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Za-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password) || /[A-Z]/.test(password)) score += 1;
  return Math.min(score, 4);
}

const fieldClass =
  "w-full h-13 px-4 bg-white/10 rounded-xl border border-white/10 text-white text-base outline-none focus:border-primary-brand/60 focus:ring-1 focus:ring-primary-brand/40 transition-all";
const labelClass =
  "text-xs font-semibold uppercase tracking-[0.1em] text-white/60";
const selectClass = `${fieldClass} appearance-none pr-10 text-sm cursor-pointer`;

export default function RegisterPage() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<AccountType>("individual");
  const [step, setStep] = useState<Step>("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Individual
  const [fullName, setFullName] = useState("Julian Vane");
  const [email, setEmail] = useState("julian@example.com");
  const [password, setPassword] = useState("");

  // Enterprise
  const [orgName, setOrgName] = useState("Encounters Corp");
  const [adminName, setAdminName] = useState("Alex Rivera");
  const [businessEmail, setBusinessEmail] = useState("admin@organization.com");
  const [industry, setIndustry] = useState("Technology");
  const [orgSize, setOrgSize] = useState("500-1000");
  const [country, setCountry] = useState("United States");

  // Verify
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const strength = getPasswordStrength(password);
  const activeEmail = accountType === "individual" ? email : businessEmail;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.info("Verification code sent to your email.");
      setStep("verify");
      setOtp(["", "", "", "", "", ""]);
    }, 900);
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((d) => !d)) {
      toast.error("Enter the full 6-digit code.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        accountType === "enterprise"
          ? "Organization registered successfully!"
          : "Account created successfully!"
      );
      navigate(
        accountType === "enterprise"
          ? "/enterprise/dashboard"
          : "/consumer/dashboard"
      );
    }, 900);
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

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
        <motion.div
          layout
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-[609px] p-6 sm:p-10 bg-black/40 rounded-3xl outline outline-1 outline-offset-[-1px] outline-white/15 backdrop-blur-md flex flex-col gap-8 sm:gap-10"
        >
          <AnimatePresence mode="wait">
            {step === "form" ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
                className="flex flex-col gap-8 sm:gap-10"
              >
                <div className="flex flex-col gap-2">
                  <h1 className="font-playfair text-3xl sm:text-4xl text-white">
                    Create Account
                  </h1>
                  <p className="text-sm text-[#a3a3a3]">
                    Begin your path to clarity today.
                  </p>
                </div>

                <form
                  onSubmit={handleFormSubmit}
                  className="flex flex-col gap-6 sm:gap-8"
                >
                  {/* Account type */}
                  <div className="flex flex-col gap-3">
                    <p className="text-base sm:text-lg font-medium text-white">
                      I am gonna join as...
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setAccountType("individual")}
                        className={`flex flex-col items-start gap-2.5 px-6 py-7 rounded-2xl bg-white/10 text-left transition-all cursor-pointer border ${
                          accountType === "individual"
                            ? "border-primary-brand"
                            : "border-transparent hover:border-white/20"
                        }`}
                      >
                        <UserPlus
                          className={`size-7 ${
                            accountType === "individual"
                              ? "text-primary-brand"
                              : "text-white"
                          }`}
                          strokeWidth={1.5}
                        />
                        <span
                          className={`font-playfair text-xl sm:text-2xl ${
                            accountType === "individual"
                              ? "text-primary-brand"
                              : "text-white"
                          }`}
                        >
                          Individual
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAccountType("enterprise")}
                        className={`flex flex-col items-start gap-2.5 px-6 py-7 rounded-2xl bg-white/10 text-left transition-all cursor-pointer border ${
                          accountType === "enterprise"
                            ? "border-primary-brand"
                            : "border-transparent hover:border-white/20"
                        }`}
                      >
                        <Building2
                          className={`size-7 ${
                            accountType === "enterprise"
                              ? "text-primary-brand"
                              : "text-white"
                          }`}
                          strokeWidth={1.5}
                        />
                        <span
                          className={`font-playfair text-xl sm:text-2xl ${
                            accountType === "enterprise"
                              ? "text-primary-brand"
                              : "text-white"
                          }`}
                        >
                          Enterprise
                        </span>
                      </button>
                    </div>
                  </div>

                  {accountType === "individual" && (
                    <>
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button
                          type="button"
                          className="flex-1 h-13 px-4 bg-white/10 hover:bg-white/15 rounded-xl border border-white/10 flex items-center justify-center gap-3 text-white text-base font-medium transition-all cursor-pointer active:scale-[0.98]"
                        >
                          <GoogleIcon />
                          <span>Google</span>
                        </button>
                        <button
                          type="button"
                          className="flex-1 h-13 px-4 bg-white/10 hover:bg-white/15 rounded-xl border border-white/10 flex items-center justify-center gap-3 text-white text-base font-medium transition-all cursor-pointer active:scale-[0.98]"
                        >
                          <AppleIcon />
                          <span>Apple</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-white/15" />
                        <span className="text-white/60 text-xs tracking-wider whitespace-nowrap">
                          Or continue with
                        </span>
                        <div className="flex-1 h-px bg-white/15" />
                      </div>

                      <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className={labelClass}>Full Name</label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Julian Vane"
                            className={fieldClass}
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className={labelClass}>Email Address</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="julian@example.com"
                            className={fieldClass}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {accountType === "enterprise" && (
                    <div className="flex flex-col gap-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className={labelClass}>
                            Organization Name
                          </label>
                          <input
                            type="text"
                            required
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                            placeholder="Encounters Corp"
                            className={fieldClass}
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className={labelClass}>
                            Administrator Name
                          </label>
                          <input
                            type="text"
                            required
                            value={adminName}
                            onChange={(e) => setAdminName(e.target.value)}
                            placeholder="Alex Rivera"
                            className={fieldClass}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>
                          Business Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={businessEmail}
                          onChange={(e) => setBusinessEmail(e.target.value)}
                          placeholder="admin@organization.com"
                          className={fieldClass}
                        />
                      </div>
                    </div>
                  )}

                  {/* Password (shared) */}
                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>
                      {accountType === "enterprise"
                        ? "Account Password"
                        : "Password"}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`${fieldClass} pr-12`}
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

                  {accountType === "enterprise" && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="flex flex-col gap-1.5 relative">
                        <label className={labelClass}>Industry</label>
                        <select
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          className={selectClass}
                        >
                          {industries.map((opt) => (
                            <option key={opt} value={opt} className="bg-black">
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 bottom-4 size-3.5 text-white/60" />
                      </div>
                      <div className="flex flex-col gap-1.5 relative">
                        <label className={labelClass}>Org Size</label>
                        <select
                          value={orgSize}
                          onChange={(e) => setOrgSize(e.target.value)}
                          className={selectClass}
                        >
                          {orgSizes.map((opt) => (
                            <option key={opt} value={opt} className="bg-black">
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 bottom-4 size-3.5 text-white/60" />
                      </div>
                      <div className="flex flex-col gap-1.5 relative">
                        <label className={labelClass}>Country</label>
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className={selectClass}
                        >
                          {countries.map((opt) => (
                            <option key={opt} value={opt} className="bg-black">
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 bottom-4 size-3.5 text-white/60" />
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="xl"
                    fullWidth
                    isLoading={isSubmitting}
                    className="rounded-[10px]!"
                  >
                    {accountType === "enterprise"
                      ? "Register Organization"
                      : "Complete Registration"}
                  </Button>
                </form>

                <div className="flex flex-col gap-6">
                  <p className="text-xs text-white/60 text-center leading-relaxed">
                    By signing up, you agree to our{" "}
                    <a href="#" className="text-primary-brand hover:underline">
                      {accountType === "enterprise"
                        ? "Enterprise Terms of Service"
                        : "Terms of Service"}
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary-brand hover:underline">
                      {accountType === "enterprise"
                        ? "Master Privacy Policy"
                        : "Privacy Policy"}
                    </a>
                    .
                  </p>

                  <div className="pt-6 border-t border-white/15 text-center text-sm">
                    <span className="text-white/60">
                      Already have an account?{" "}
                    </span>
                    <Link
                      to="/login"
                      className="text-white font-medium hover:underline"
                    >
                      {accountType === "enterprise"
                        ? "Sign in to Enterprise"
                        : "Log in"}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="verify"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
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
                    <span className="text-white font-medium">{activeEmail}</span>
                  </p>
                </div>

                <form
                  onSubmit={handleVerifySubmit}
                  className="flex flex-col gap-8"
                >
                  <div className="flex flex-col gap-4">
                    <label className={labelClass}>6-Digit Secure Code</label>
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
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
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
                      className="rounded-[10px]!"
                    >
                      Verify Account
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="lg"
                      fullWidth
                      onClick={() =>
                        toast.success("Verification email resent.")
                      }
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
                      onClick={() => setStep("form")}
                      className="text-white font-medium hover:underline cursor-pointer bg-transparent border-0 p-0"
                    >
                      Change address
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="relative z-10 mt-auto">
        <AuthFooter />
      </div>
    </div>
  );
}
