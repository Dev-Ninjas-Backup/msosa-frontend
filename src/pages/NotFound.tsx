"use client";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Home, SearchX } from "lucide-react";
import toplightImg from "@/assets/toplight.png";
import Button from "@/ui/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-primary-bg p-4 sm:p-6 relative overflow-hidden">
      {/* Dynamic Top Spotlight Beam (same as Login) */}
      <div className="absolute top-0 right-0 w-[55vw] max-w-[850px] h-[55vh] pointer-events-none select-none z-0">
        <img
          src={toplightImg}
          alt=""
          className="w-full h-full object-contain object-top-right opacity-90"
        />
      </div>

      {/* Subtle secondary ambient glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary-brand/10 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-[560px] p-8 sm:p-12 bg-black/40 rounded-3xl shadow-[0px_0px_14px_0px_rgba(255,255,255,0.06)] outline outline-1 outline-offset-[-1px] outline-white/20 backdrop-blur-md flex flex-col items-center gap-8 relative z-10 text-center"
      >
        {/* Icon Badge */}
        <div className="size-16 bg-primary-brand/10 rounded-2xl outline outline-1 outline-offset-[-1px] outline-primary-brand/25 flex items-center justify-center shrink-0">
          <SearchX className="size-7 text-primary-brand" />
        </div>

        {/* 404 Number */}
        <div className="flex flex-col gap-3">
          <h1 className="text-7xl sm:text-8xl font-black text-white/10 tracking-tighter select-none">
            404
          </h1>
          <h2 className="text-3xl sm:text-4xl font-normal font-playfair text-white tracking-tight -mt-4">
            Page not found
          </h2>
          <p className="text-secondary-text text-sm font-normal max-w-xs mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved to another coordinate.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
          <Button
            type="button"
            onClick={() => navigate(-1)}
            variant="secondary"
            className=" h-12! sm:h-13! w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="size-4.5" />
            <span>Go Back</span>
          </Button>

          <Button
              variant="primary"
              size="lg"
              className="text-black! h-12! sm:h-13! w-full sm:w-auto justify-center"
              rightIcon={<ArrowRight size={16} className="text-black stroke-[2.5]" />}
            >
              EXPLORE SOLUTIONS
            </Button>
        </div>

        {/* Optional secondary link */}
        <p className="text-white/50 text-xs font-normal">
          Need help?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-primary-brand hover:underline transition-colors font-medium"
          >
            Go to Login
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;