"use client";

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { KeyRound, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import toplightImg from "@/assets/toplight.png";

// Inline SVG for Google logo
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

// Inline SVG for Apple logo
const AppleIcon = () => (
  <svg className="size-4.5 fill-current" viewBox="0 0 24 24">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.66-1.06 1.73-.93 2.76 1 .08 2.02-.51 2.63-1.26z" />
  </svg>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("julian@example.com");
  const [password, setPassword] = useState("password123");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Welcome back! Login successful.");
      navigate("/consumer/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-primary-bg p-4 sm:p-6 relative overflow-hidden">
      {/* Dynamic Top Spotlight Beam matching design */}
      <div className="absolute top-0 right-0 w-[55vw] max-w-[850px] h-[55vh] pointer-events-none select-none z-0">
        <img
          src={toplightImg}
          alt=""
          className="w-full h-full object-contain object-top-right opacity-90"
        />
      </div>

      {/* Subtle secondary ambient glow for backdrop depth */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary-brand/10 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Login Card Modal: Exact 609px width, rounded-3xl, outline, backdrop-blur-md */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-[609px] p-6 sm:p-10 bg-black/40 rounded-3xl shadow-[0px_0px_14px_0px_rgba(255,255,255,0.06)] outline outline-1 outline-offset-[-1px] outline-white/20 backdrop-blur-md flex flex-col gap-8 sm:gap-10 relative z-10"
      >
        {/* Top Key Icon Badge */}
        <div className="size-16 bg-primary-brand/10 rounded-2xl outline outline-1 outline-offset-[-1px] outline-primary-brand/25 flex items-center justify-center shrink-0">
          <KeyRound className="size-6 text-primary-brand border-primary-brand" />
        </div>

        {/* Header Titles */}
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-3xl sm:text-4xl font-normal font-playfair tracking-tight">
            Welcome back
          </h1>
          <p className="text-secondary-text text-sm font-normal">
            Please enter your details to sign in.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-6 w-full">
          {/* Social OAuth Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <button
              type="button"
              className="flex-1 w-full h-13 px-4 py-3 bg-white/10 hover:bg-white/15 rounded-xl border border-white/10 flex items-center justify-center gap-3 text-white text-base font-medium transition-all duration-200 cursor-pointer active:scale-[0.98]"
            >
              <GoogleIcon />
              <span>Google</span>
            </button>
            <button
              type="button"
              className="flex-1 w-full h-13 px-4 py-3 bg-white/10 hover:bg-white/15 rounded-xl border border-white/10 flex items-center justify-center gap-3 text-white text-base font-medium transition-all duration-200 cursor-pointer active:scale-[0.98]"
            >
              <AppleIcon />
              <span>Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="py-2 flex items-center justify-center w-full gap-4">
            <div className="flex-1 h-px bg-white/15" />
            <span className="text-white/60 text-xs font-normal tracking-wider whitespace-nowrap">
              Or continue with
            </span>
            <div className="flex-1 h-px bg-white/15" />
          </div>

          {/* Input Fields Stack */}
          <div className="flex flex-col gap-5 w-full">
            {/* Email Field */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                Email Address
              </label>
              <Input
                type="email"
                variant="auth"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex items-center justify-between">
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-primary-brand text-xs font-medium hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                variant="auth"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="text-white/50 hover:text-white transition-colors cursor-pointer p-1 bg-transparent border-0"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4.5" />
                    ) : (
                      <Eye className="size-4.5" />
                    )}
                  </button>
                }
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2.5 pt-1 select-none">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="custom-checkbox-gold"
              />
              <label
                htmlFor="rememberMe"
                className="text-white/60 text-xs font-normal cursor-pointer hover:text-white/80 transition-colors"
              >
                Remember me
              </label>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="xl"
            fullWidth
            isLoading={isSubmitting}
            className="uppercase tracking-wider rounded-xl!"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Footer Link */}
        <div className="pt-6 border-t border-white/15 flex justify-center items-center w-full">
          <p className="text-white/60 text-xs font-normal">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-white font-medium hover:underline transition-colors ml-1"
            >
              Create an account
            </Link>
          </p>
        </div>
        <p className="text-white/60 text-xs font-normal text-center">
          Joining with a work email?{" "}
          <Link
            to="/employee/signup"
            className="text-white font-medium hover:underline transition-colors"
          >
            Employee sign up
          </Link>
        </p>

        {/* Fast Routing to Dashboards */}
        <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5 w-full">
          <span className="text-[11px] uppercase tracking-wider text-white/50 text-center font-medium">
            Fast Dashboard Access
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
            <button
              type="button"
              onClick={() => navigate("/founder/dashboard")}
              className="h-9 px-3 bg-white/5 hover:bg-primary-brand/15 hover:border-primary-brand/40 border border-white/10 rounded-lg text-xs font-medium text-white/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="size-1.5 rounded-full bg-primary-brand" />
              <span>Founder</span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/consumer/dashboard")}
              className="h-9 px-3 bg-white/5 hover:bg-primary-brand/15 hover:border-primary-brand/40 border border-white/10 rounded-lg text-xs font-medium text-white/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="size-1.5 rounded-full bg-blue-400" />
              <span>Consumer</span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/enterprise/dashboard")}
              className="h-9 px-3 bg-white/5 hover:bg-primary-brand/15 hover:border-primary-brand/40 border border-white/10 rounded-lg text-xs font-medium text-white/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="size-1.5 rounded-full bg-emerald-400" />
              <span>Enterprise</span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/employee/dashboard")}
              className="h-9 px-3 bg-white/5 hover:bg-primary-brand/15 hover:border-primary-brand/40 border border-white/10 rounded-lg text-xs font-medium text-white/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="size-1.5 rounded-full bg-purple-400" />
              <span>Employee</span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/refiner/dashboard")}
              className="h-9 px-3 bg-white/5 hover:bg-primary-brand/15 hover:border-primary-brand/40 border border-white/10 rounded-lg text-xs font-medium text-white/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer col-span-2 sm:col-span-1"
            >
              <span className="size-1.5 rounded-full bg-amber-300" />
              <span>Refiner</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
