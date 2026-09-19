import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Clock3,
  Globe,
  Keyboard,
  Menu,
  Mic,
  Pause,
  Play,
  RotateCcw,
  Save,
  Send,
  Square,
  X,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";
import TypeEditor from "./TypeEditor";
import {
  copy,
  InputMode,
  Language,
  PRIMARY,
  ROOM_BG,
  SessionPhase,
} from "./types";
import { useMemberPortal } from "@/pages/shared/member/MemberPortalContext";
import { ToolbarAction } from "./ToolbarAction";

const ReflectionRoom = () => {
  const navigate = useNavigate();
  const { path } = useMemberPortal();
  const [language, setLanguage] = useState<Language>("en");
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [inputMode, setInputMode] = useState<InputMode>("voice");
  const [phase, setPhase] = useState<SessionPhase>("idle");
  const [seconds, setSeconds] = useState(0);
  const [notes, setNotes] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const t = copy[language];

  useEffect(() => {
    if (phase !== "recording") return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(id);
  }, [toast]);

  const showToast = (msg: string) => setToast(msg);

  const startRecording = () => {
    setInputMode("voice");
    setPhase("recording");
  };

  const toggleMic = () => {
    if (phase === "idle" || phase === "recorded") {
      startRecording();
      return;
    }
    setPhase((p) => (p === "recording" ? "paused" : "recording"));
  };

  const stopRecording = () => {
    if (phase !== "recording" && phase !== "paused") return;
    setPhase("recorded");
    showToast(language === "en" ? "Recording saved" : "Grabación guardada");
  };

  const rerecord = () => {
    setSeconds(0);
    setNotes("");
    setPhase("recording");
    setInputMode("voice");
  };

  const submitReflection = () => {
    if (phase === "idle" && !notes.trim()) return;
    setPhase("submitted");
    showToast(
      language === "en"
        ? "Reflection submitted — continuing journey"
        : "Reflexión enviada"
    );
    window.setTimeout(() => navigate(path("dashboard")), 1200);
  };

  const canSubmit =
    inputMode === "type" ? notes.trim().length > 0 : phase !== "idle";

  return (
    <div className="relative h-screen w-full overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${ROOM_BG})`, filter: "brightness(0.95)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />

      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <header className="flex items-center justify-between gap-3 px-4 sm:px-8 lg:px-12 pt-5 sm:pt-7 pb-2">
          <Link to={path("dashboard")} className="flex items-center gap-2.5 shrink-0">
            <img src={logo} alt="FAR Systems" className="size-9 sm:size-10 object-contain" />
            <span
              className="hidden sm:inline text-sm font-semibold tracking-[0.18em] uppercase"
              style={{ color: PRIMARY }}
            >
              FAR Systems
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLangOpen((o) => !o);
                  setMenuOpen(false);
                }}
                className="inline-flex items-center gap-2 h-10 px-3 rounded-full border border-white/20 bg-black/35 backdrop-blur-md text-sm text-white/90 hover:bg-black/50 cursor-pointer"
              >
                <Globe className="size-4" style={{ color: PRIMARY }} />
                <span className="hidden xs:inline sm:inline">
                  {language === "en" ? t.english : t.spanish}
                </span>
                <ChevronDown className="size-3.5 opacity-70" />
              </button>
              {langOpen && (
                <>
                  <button
                    type="button"
                    className="fixed inset-0 z-20 border-0 bg-transparent cursor-default"
                    aria-label="Close language menu"
                    onClick={() => setLangOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 z-30 min-w-[140px] overflow-hidden rounded-xl border border-white/15 bg-black/85 backdrop-blur-xl shadow-xl">
                    {(["en", "es"] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => {
                          setLanguage(lang);
                          setLangOpen(false);
                        }}
                        className={cn(
                          "w-full px-4 py-2.5 text-left text-sm cursor-pointer border-0",
                          language === lang
                            ? "bg-white/10 text-white"
                            : "bg-transparent text-white/70 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        {lang === "en" ? t.english : t.spanish}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => {
                  setMenuOpen((o) => !o);
                  setLangOpen(false);
                }}
                className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/35 backdrop-blur-md text-white/90 hover:bg-black/50 cursor-pointer"
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
              {menuOpen && (
                <>
                  <button
                    type="button"
                    className="fixed inset-0 z-20 border-0 bg-transparent cursor-default"
                    aria-label="Close menu"
                    onClick={() => setMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 z-30 min-w-[180px] overflow-hidden rounded-xl border border-white/15 bg-black/85 backdrop-blur-xl shadow-xl">
                    <Link
                      to={path("dashboard")}
                      className="block px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to={path("customer-products")}
                      className="block px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      Products
                    </Link>
                    <Link
                      to={path("profile")}
                      className="block px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Center stage */}
        <div className={` min-h-0 flex flex-col items-center justify-center px-4 sm:px-6 overflow-y-auto 
          ${inputMode === "voice" ? "min-h-140" : "min-h-160"} 
          `}>
          <div className="w-full max-w-3xl flex flex-col items-center text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold tracking-tight text-white">
              {t.welcome}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-white/70">
              {t.prompt}
            </p>

            {inputMode === "voice" ? (
              <div className="mt-8 sm:mt-10 flex flex-col items-center">
                <button
                  type="button"
                  onClick={toggleMic}
                  aria-label={
                    phase === "recording"
                      ? "Pause recording"
                      : phase === "paused"
                        ? "Resume recording"
                        : "Start reflection"
                  }
                  className="relative flex size-[120px] sm:size-[148px] items-center justify-center rounded-full border-0 bg-transparent cursor-pointer group"
                >
                  {/* Ring 1 - Inner Ripple */}
                  <span
                    className={cn(
                      "absolute inset-[-10px] rounded-full border opacity-80 transition-all duration-300",
                      phase === "recording" ? "animate-ping" : "animate-pulse"
                    )}
                    style={{ borderColor: `${PRIMARY}55` }}
                  />

                  {/* Ring 2 - Middle Ripple */}
                  <span
                    className="absolute inset-[-22px] rounded-full border opacity-60 animate-pulse"
                    style={{ borderColor: `${PRIMARY}40` }}
                  />

                  {/* Ring 3 - Outer Ripple */}
                  <span
                    className="absolute inset-[-34px] rounded-full border opacity-30 animate-pulse hidden sm:block"
                    style={{ borderColor: `${PRIMARY}30` }}
                  />

                  {/* Main Button Container */}
                  <span
                    className="relative flex size-full items-center justify-center rounded-full border-2 bg-black/85 backdrop-blur-md shadow-[0_0_40px_rgba(251,191,36,0.35)] transition-transform group-hover:scale-[1.03]"
                    style={{ borderColor: PRIMARY }}
                  >
                    {phase === "recording" ? (
                      <Pause className="size-10 sm:size-12" style={{ color: PRIMARY }} />
                    ) : phase === "paused" ? (
                      <Play className="size-10 sm:size-12" style={{ color: PRIMARY }} />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="80" viewBox="0 0 65 94" fill="none">
                        <path d="M32.5 0C22.7131 0 14.7727 7.89453 14.7727 17.625V47C14.7727 56.7305 22.7131 64.625 32.5 64.625C42.2869 64.625 50.2273 56.7305 50.2273 47V17.625C50.2273 7.89453 42.2869 0 32.5 0ZM8.86364 39.6562C8.86364 37.2145 6.88778 35.25 4.43182 35.25C1.97585 35.25 0 37.2145 0 39.6562V47C0 63.3582 12.2244 76.8707 28.0682 79.0187V85.1875H19.2045C16.7486 85.1875 14.7727 87.152 14.7727 89.5938C14.7727 92.0355 16.7486 94 19.2045 94H32.5H45.7955C48.2514 94 50.2273 92.0355 50.2273 89.5938C50.2273 87.152 48.2514 85.1875 45.7955 85.1875H36.9318V79.0187C52.7756 76.8707 65 63.3582 65 47V39.6562C65 37.2145 63.0241 35.25 60.5682 35.25C58.1122 35.25 56.1364 37.2145 56.1364 39.6562V47C56.1364 59.9801 45.5554 70.5 32.5 70.5C19.4446 70.5 8.86364 59.9801 8.86364 47V39.6562Z" fill="white" />
                      </svg>
                    )}
                  </span>
                </button>

                {(phase === "recording" || phase === "paused" || phase === "recorded") && (
                  <p
                    className="mt-6 font-mono text-sm tabular-nums tracking-wider"
                    style={{ color: PRIMARY }}
                  >
                    {Math.floor(seconds / 60)
                      .toString()
                      .padStart(2, "0")}
                    :{(seconds % 60).toString().padStart(2, "0")}
                  </p>
                )}
              </div>
            ) : (
              <div className="mt-6 sm:mt-8 w-full">
                <TypeEditor
                  value={notes}
                  onChange={setNotes}
                  primaryColor={PRIMARY}
                  onSwitchToVoice={() => setInputMode("voice")}
                  placeholder={t.placeholder}
                />
              </div>
            )}

            {/* Reflect / Type */}
            <div className="mt-8 flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setInputMode("voice")}
                className={cn(
                  "h-10 sm:h-11 px-5 sm:px-6 rounded-full text-sm font-medium cursor-pointer transition-colors",
                  inputMode === "voice"
                    ? "bg-black/50 text-[#FBBF24] border border-[#FBBF24]"
                    : "bg-black/40 text-white/80 border border-white/20 hover:bg-black/55"
                )}
              >
                {t.reflect}
              </button>
              <button
                type="button"
                onClick={() => setInputMode("type")}
                className={cn(
                  "inline-flex items-center gap-2 h-10 sm:h-11 px-5 sm:px-6 rounded-full text-sm font-medium cursor-pointer transition-colors",
                  inputMode === "type"
                    ? "bg-black/50 text-[#FBBF24] border border-[#FBBF24]"
                    : "bg-black/40 text-white/80 border border-white/20 hover:bg-black/55"
                )}
              >
                <Keyboard className="size-3.5" />
                {t.type}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom stack */}
        <div className="flex-1 px-3 sm:px-6 lg:px-10 pb-4 sm:pb-6 pt-2 space-y-3 sm:space-y-4 ">
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/15 bg-black/50 backdrop-blur-xl px-1 sm:px-2 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
            <div className="flex items-stretch justify-between gap-0.5 sm:gap-1 overflow-x-auto">
              <ToolbarAction
                icon={<Square className="size-4 fill-current" />}
                title={t.stop}
                subtitle={t.recording}
                tone="danger"
                onClick={stopRecording}
                disabled={phase !== "recording" && phase !== "paused"}
              />
              <ToolbarAction
                icon={<Play className="size-4 fill-current" />}
                title={t.replay}
                subtitle={t.answer}
                onClick={() =>
                  showToast(
                    language === "en" ? "Replaying answer…" : "Reproduciendo…"
                  )
                }
                disabled={phase === "idle"}
              />
              <ToolbarAction
                icon={<RotateCcw className="size-4" />}
                title={t.rerecord}
                subtitle={t.answer}
                onClick={rerecord}
              />
              <ToolbarAction
                icon={<Save className="size-4" />}
                title={t.saveContinue}
                subtitle={t.continue}
                onClick={() => {
                  showToast(
                    language === "en" ? "Progress saved" : "Progreso guardado"
                  );
                  navigate(path("dashboard"));
                }}
                className="hidden sm:flex"
              />
              <ToolbarAction
                icon={<Clock3 className="size-4" />}
                title={t.resume}
                subtitle={t.later}
                onClick={() => {
                  showToast(
                    language === "en"
                      ? "Session paused for later"
                      : "Sesión pausada"
                  );
                  navigate(path("dashboard"));
                }}
                className="hidden md:flex"
              />
              <ToolbarAction
                icon={<RotateCcw className="size-4" />}
                title={t.restore}
                subtitle={t.sessionWord}
                onClick={() => {
                  setPhase("paused");
                  setSeconds((s) => (s > 0 ? s : 147));
                  showToast(
                    language === "en"
                      ? "Session restored"
                      : "Sesión restaurada"
                  );
                }}
                className="hidden md:flex"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={submitReflection}
            disabled={!canSubmit}
            className="group mx-auto flex w-full max-w-lg  items-center justify-between gap-3 border-3 rounded-full border-2 px-2 sm:px-3 py-2 sm:py-2.5 cursor-pointer disabled:cursor-not-allowed  transition-transform hover:scale-[1.01] active:scale-[0.99]"
            style={{
              borderColor: PRIMARY,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.55) 100%)",
              boxShadow:
                "0 0 28px rgba(251,191,36,0.35), inset 0 0 20px rgba(251,191,36,0.08)",
            }}
          >
            <span
              className="flex size-11 sm:size-16 items-center justify-center rounded-full shrink-0 space-y-1"
              style={{ backgroundColor: `${PRIMARY}22`, color: PRIMARY }}
            >
              <Send className="size-8" />
            </span>
            <span className="flex-1 text-center min-w-0 space-y-1">
              <span
                className="block text-xs sm:text-lg font-bold tracking-[0.14em] uppercase truncate"
                style={{ color: "#FBBF24" }}
              >
                {t.submitTitle}
              </span>
              <span
                className="block text-[10px] sm:text-xs tracking-[0.12em] uppercase opacity-80 truncate"
                style={{ color: PRIMARY }}
              >
                {t.submitSub}
              </span>
            </span>
            <span
              className="flex size-11 sm:size-12 items-center justify-center rounded-full shrink-0"
              style={{ color: PRIMARY }}
            >
              <ChevronRight className="size-6" />
            </span>
          </button>

          <div className="flex md:pt-12 items-center justify-center gap-3 sm:gap-5 pt-1">
            <span className="h-px flex-1 max-w-24 sm:max-w-40 bg-white/25" />
            <p className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-white/70 text-center whitespace-nowrap">
              {t.tagline}
            </p>
            <span className="h-px flex-1 max-w-24 sm:max-w-40 bg-white/25" />
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-28 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-white/15 bg-black/80 px-4 py-2 text-xs text-white backdrop-blur">
          {toast}
        </div>
      )}
    </div>
  );
};

export default ReflectionRoom;