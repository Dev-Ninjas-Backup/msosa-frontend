import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Clock3,
  Globe,
  Keyboard,
  Menu,
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
import { useMemberPortalOptional } from "@/pages/shared/member/MemberPortalContext";
import { ToolbarAction } from "./ToolbarAction";

export type ReflectionRoomProps = {
  /** Product-creation mode reuses the same room UI without member portal. */
  variant?: "member" | "product-creation";
  onComplete?: () => void;
  onExit?: () => void;
};

const ReflectionRoom = ({
  variant = "member",
  onComplete,
  onExit,
}: ReflectionRoomProps = {}) => {
  const navigate = useNavigate();
  const portal = useMemberPortalOptional();
  const isProduct = variant === "product-creation";

  const exitTo = () => {
    if (onExit) {
      onExit();
      return;
    }
    if (portal) navigate(portal.path("dashboard"));
    else navigate("/founder/create-product");
  };

  const completeTo = () => {
    if (onComplete) {
      onComplete();
      return;
    }
    exitTo();
  };

  const path = (segment?: string) =>
    portal ? portal.path(segment) : "/founder/dashboard";

  const [language, setLanguage] = useState<Language>("en");
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [inputMode, setInputMode] = useState<InputMode>("voice");
  const [phase, setPhase] = useState<SessionPhase>("idle");
  const [seconds, setSeconds] = useState(0);
  const [notes, setNotes] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const t = copy[language];
  const headline = isProduct
    ? language === "en"
      ? "CREATE NEW PRODUCT"
      : "CREAR NUEVO PRODUCTO"
    : t.welcome;
  const subhead = isProduct
    ? language === "en"
      ? "Describe what product will be"
      : "Describe qué será el producto"
    : t.prompt;

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
        ? isProduct
          ? "Product description captured — continuing setup"
          : "Reflection submitted — continuing journey"
        : "Reflexión enviada"
    );
    window.setTimeout(() => completeTo(), 1200);
  };

  const stage = (
    <div className="w-full max-w-3xl xl:max-w-none flex flex-col items-center text-center">
      <h1 className="text-xl sm:text-3xl lg:text-[34px] xl:text-[40px] font-semibold tracking-tight text-white">
        {headline}
      </h1>
      <p className="mt-1.5 sm:mt-2 xl:mt-3 text-sm sm:text-base xl:text-lg text-white/75">
        {subhead}
      </p>

      {inputMode === "voice" ? (
        <div className="mt-5 sm:mt-8 md:mt-10 xl:mt-11 flex flex-col items-center">
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
            className="relative flex size-[100px] sm:size-[132px] md:size-[148px] xl:size-[152px] items-center justify-center rounded-full border-0 bg-transparent cursor-pointer group"
          >
            <span
              className={cn(
                "absolute inset-[-10px] xl:inset-[-12px] rounded-full border opacity-80 transition-all duration-300",
                phase === "recording" ? "animate-ping" : "animate-pulse"
              )}
              style={{ borderColor: `${PRIMARY}55` }}
            />
            <span
              className="absolute inset-[-22px] xl:inset-[-24px] rounded-full border opacity-60 animate-pulse"
              style={{ borderColor: `${PRIMARY}40` }}
            />
            <span
              className="absolute inset-[-34px] xl:inset-[-36px] rounded-full border opacity-30 animate-pulse hidden sm:block"
              style={{ borderColor: `${PRIMARY}30` }}
            />
            <span
              className="relative flex size-full items-center justify-center rounded-full border-2 xl:border-[2.5px] bg-black/85 backdrop-blur-md shadow-[0_0_40px_rgba(251,191,36,0.35)] xl:shadow-[0_0_48px_rgba(251,191,36,0.4)] transition-transform group-hover:scale-[1.03]"
              style={{ borderColor: PRIMARY }}
            >
              {phase === "recording" ? (
                <Pause className="size-9 sm:size-11 md:size-12 xl:size-12" style={{ color: PRIMARY }} />
              ) : phase === "paused" ? (
                <Play className="size-9 sm:size-11 md:size-12 xl:size-12" style={{ color: PRIMARY }} />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="72"
                  viewBox="0 0 65 94"
                  fill="none"
                  className="sm:w-9 sm:h-[4.5rem] md:w-10 md:h-20 xl:w-[2.65rem] xl:h-[5.25rem]"
                >
                  <path
                    d="M32.5 0C22.7131 0 14.7727 7.89453 14.7727 17.625V47C14.7727 56.7305 22.7131 64.625 32.5 64.625C42.2869 64.625 50.2273 56.7305 50.2273 47V17.625C50.2273 7.89453 42.2869 0 32.5 0ZM8.86364 39.6562C8.86364 37.2145 6.88778 35.25 4.43182 35.25C1.97585 35.25 0 37.2145 0 39.6562V47C0 63.3582 12.2244 76.8707 28.0682 79.0187V85.1875H19.2045C16.7486 85.1875 14.7727 87.152 14.7727 89.5938C14.7727 92.0355 16.7486 94 19.2045 94H32.5H45.7955C48.2514 94 50.2273 92.0355 50.2273 89.5938C50.2273 87.152 48.2514 85.1875 45.7955 85.1875H36.9318V79.0187C52.7756 76.8707 65 63.3582 65 47V39.6562C65 37.2145 63.0241 35.25 60.5682 35.25C58.1122 35.25 56.1364 37.2145 56.1364 39.6562V47C56.1364 59.9801 45.5554 70.5 32.5 70.5C19.4446 70.5 8.86364 59.9801 8.86364 47V39.6562Z"
                    fill="white"
                  />
                </svg>
              )}
            </span>
          </button>

          {(phase === "recording" || phase === "paused" || phase === "recorded") && (
            <p
              className="mt-4 sm:mt-6 xl:mt-7 font-mono text-sm xl:text-base tabular-nums tracking-wider"
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
        <div className="mt-4 sm:mt-6 md:mt-8 xl:mt-6 w-full max-w-2xl">
          <TypeEditor
            value={notes}
            onChange={setNotes}
            primaryColor={PRIMARY}
            onSwitchToVoice={() => setInputMode("voice")}
            placeholder={t.placeholder}
          />
        </div>
      )}

      <div className="mt-5 sm:mt-8 xl:mt-5 flex items-center gap-2 sm:gap-3 xl:gap-4">
        <button
          type="button"
          onClick={() => setInputMode("voice")}
          className={cn(
            "h-10 sm:h-11 xl:h-12 px-5 sm:px-6 xl:px-8 rounded-full text-sm xl:text-base font-medium cursor-pointer transition-colors",
            inputMode === "voice"
              ? "bg-black/50 text-[#FBBF24] border border-[#FBBF24] shadow-[0_0_20px_rgba(251,191,36,0.25)]"
              : "bg-black/40 text-white/80 border border-white/20 hover:bg-black/55"
          )}
        >
          {t.reflect}
        </button>
        <button
          type="button"
          onClick={() => setInputMode("type")}
          className={cn(
            "inline-flex items-center gap-2 h-10 sm:h-11 xl:h-12 px-5 sm:px-6 xl:px-8 rounded-full text-sm xl:text-base font-medium cursor-pointer transition-colors",
            inputMode === "type"
              ? "bg-black/50 text-[#FBBF24] border border-[#FBBF24] shadow-[0_0_20px_rgba(251,191,36,0.25)]"
              : "bg-black/40 text-white/80 border border-white/20 hover:bg-black/55"
          )}
        >
          <Keyboard className="size-3.5 xl:size-4" />
          {t.type}
        </button>
      </div>
    </div>
  );

  const toolbar = (
    <div className="mx-auto w-full max-w-4xl rounded-2xl border border-white/15 xl:border-[#FBBF24]/35 bg-black/50 backdrop-blur-xl px-1 sm:px-2 xl:px-2.5 py-1.5 sm:py-2 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
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
            showToast(language === "en" ? "Replaying answer…" : "Reproduciendo…")
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
            showToast(language === "en" ? "Progress saved" : "Progreso guardado");
            completeTo();
          }}
          className="hidden sm:flex"
        />
        <ToolbarAction
          icon={<Clock3 className="size-4" />}
          title={t.resume}
          subtitle={t.later}
          onClick={() => {
            showToast(
              language === "en" ? "Session paused for later" : "Sesión pausada"
            );
            exitTo();
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
              language === "en" ? "Session restored" : "Sesión restaurada"
            );
          }}
          className="hidden md:flex"
        />
      </div>
    </div>
  );

  const submitBtn = (variant: "mobile" | "desktop") => (
    <button
      type="button"
      onClick={submitReflection}
      className={cn(
        "group relative mx-auto flex w-full items-center justify-between cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99] rounded-full",
        variant === "mobile"
          ? "max-w-lg gap-3 border-2 px-2 py-1.5"
          : "max-w-xl xl:max-w-lg gap-4 xl:gap-5 border-2 xl:border-[3px] px-2.5 sm:px-3 xl:px-4 py-2 sm:py-2.5 xl:py-3"
      )}
      style={{
        borderColor: PRIMARY,
        background:
          variant === "mobile"
            ? "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.55) 100%)"
            : "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.62) 100%)",
        boxShadow:
          variant === "mobile"
            ? "0 0 28px rgba(251,191,36,0.35), inset 0 0 20px rgba(251,191,36,0.08)"
            : "0 0 0 1px rgba(251,191,36,0.25), 0 0 28px rgba(251,191,36,0.45), 0 0 56px rgba(251,191,36,0.22), inset 0 0 24px rgba(251,191,36,0.06)",
      }}
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-full shrink-0 ",
          variant === "mobile"
            ? "size-10 border-transparent"
            : "size-11 sm:size-12 xl:size-14 "
        )}
        style={{
          backgroundColor:
            variant === "mobile" ? `${PRIMARY}22` : "rgba(251,191,36,0.18)",
          color: PRIMARY,
          boxShadow:
            variant === "desktop"
              ? ""
              : undefined,
        }}
      >
        <Send
          className={cn(
            variant === "mobile" ? "size-5 rotate-90" : "size-5 xl:size-7 rotate-120",
            "xl:-rotate-12"
          )}
          strokeWidth={2.25}
        />
      </span>
      <span className="flex-1 text-center min-w-0 space-y-0.5 xl:space-y-1">
        <span
          className={cn(
            "block font-bold uppercase truncate",
            variant === "mobile"
              ? "text-xs tracking-[0.14em]"
              : "text-xs sm:text-sm xl:text-base tracking-[0.14em] xl:tracking-[0.18em]"
          )}
          style={{ color: PRIMARY }}
        >
          {t.submitTitle}
        </span>
        <span
          className={cn(
            "block uppercase truncate opacity-85",
            variant === "mobile"
              ? "text-[10px] tracking-[0.12em]"
              : "text-[10px] sm:text-xs xl:text-[13px] tracking-[0.12em] xl:tracking-[0.16em]"
          )}
          style={{ color: PRIMARY }}
        >
          {t.submitSub}
        </span>
      </span>
      <span
        className={cn(
          "flex items-center justify-center shrink-0",
          variant === "mobile" ? "size-10" : "size-10 sm:size-11 xl:size-12"
        )}
        style={{ color: PRIMARY }}
      >
        <ChevronRight
          className={variant === "mobile" ? "size-5" : "size-6 xl:size-7"}
          strokeWidth={2.5}
        />
      </span>
    </button>
  );

  const tagline = (
    <div className="flex w-full items-center justify-center gap-3 sm:gap-5 xl:gap-6">
      <span className="h-px flex-1 max-w-24 sm:max-w-40 xl:max-w-52 bg-white/25 xl:bg-[#FBBF24]/45" />
      <p className="text-[10px] sm:text-[11px] xl:text-xs tracking-[0.22em] xl:tracking-[0.28em] uppercase text-white/70 xl:text-[#FBBF24]/90 text-center whitespace-nowrap">
        {t.tagline}
      </p>
      <span className="h-px flex-1 max-w-24 sm:max-w-40 xl:max-w-52 bg-white/25 xl:bg-[#FBBF24]/45" />
    </div>
  );

  const bottomStack = (opts: {
    className?: string;
    submit: ReactNode;
    toolbarPadClass: string;
    gapClass?: string;
  }) => (
    <div
      className={cn(
        opts.gapClass ?? "space-y-3 sm:space-y-4 xl:space-y-5",
        opts.className
      )}
    >
      <div className={opts.toolbarPadClass}>{toolbar}</div>
      {opts.submit}
      <div className="pt-1 xl:pt-2">{tagline}</div>
    </div>
  );

  return (
    <div className="relative h-dvh w-full overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${ROOM_BG})`, filter: "brightness(0.95)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />

      <div className="relative z-10 flex h-full flex-col">
        <header className="shrink-0 flex items-center justify-between gap-3 px-4 sm:px-8 lg:px-12 xl:px-16 pt-5 sm:pt-7 xl:pt-8 pb-2">
          {isProduct ? (
            <button
              type="button"
              onClick={exitTo}
              className="flex items-center gap-2.5 shrink-0 border-0 bg-transparent cursor-pointer p-0"
            >
              <img src={logo} alt="FAR Systems" className="size-9 sm:size-10 xl:size-11 object-contain" />
              <span className="hidden sm:flex flex-col items-start text-left">
                <span className="text-sm xl:text-base font-medium text-white tracking-tight">
                  Reflection Room™
                </span>
                <span className="text-[11px] text-white/60 font-light">
                  A private space for clarity, insight, and personal growth.
                </span>
              </span>
            </button>
          ) : (
            <Link to={path("dashboard")} className="flex items-center gap-2.5 shrink-0">
              <img src={logo} alt="FAR Systems" className="size-9 sm:size-10 xl:size-11 object-contain" />
              <span
                className="hidden sm:inline text-sm xl:text-base font-semibold tracking-[0.18em] uppercase"
                style={{ color: PRIMARY }}
              >
                FAR Systems
              </span>
            </Link>
          )}

          <div className="flex items-center gap-2 sm:gap-3 xl:gap-4">
            {isProduct && (
              <button
                type="button"
                onClick={exitTo}
                className="inline-flex items-center gap-2 h-10 xl:h-11 px-3 xl:px-4 rounded-full border border-red-500/60 bg-black/35 backdrop-blur-md text-sm text-white hover:bg-black/50 cursor-pointer"
              >
                <span className="size-2 rounded-full bg-red-500" />
                End Session
              </button>
            )}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLangOpen((o) => !o);
                  setMenuOpen(false);
                }}
                className="inline-flex items-center gap-2 h-10 xl:h-11 px-3 xl:px-4 rounded-full border border-white/20 xl:border-[#FBBF24]/55 bg-black/35 backdrop-blur-md text-sm text-white/90 hover:bg-black/50 cursor-pointer"
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
                className="flex size-10 xl:size-11 items-center justify-center rounded-full border border-white/20 xl:border-[#FBBF24]/55 bg-black/35 backdrop-blur-md text-white/90 hover:bg-black/50 cursor-pointer"
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
                    {isProduct ? (
                      <button
                        type="button"
                        className="block w-full px-4 py-2.5 text-left text-sm text-white/80 hover:bg-white/5 hover:text-white border-0 bg-transparent cursor-pointer"
                        onClick={() => {
                          setMenuOpen(false);
                          exitTo();
                        }}
                      >
                        Exit to Product List
                      </button>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Mobile: mic centered when space allows; toolbar sits under mic */}
        <div className="sm:hidden min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="flex min-h-full flex-col justify-center px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="mx-auto w-full max-w-4xl flex flex-col items-center">
              {stage}
              {bottomStack({
                className: "mt-4 w-full",
                submit: submitBtn("mobile"),
                toolbarPadClass: "pt-[clamp(0.25rem,1.5dvh,0.75rem)]",
              })}
            </div>
          </div>
        </div>

        {/* Tablet / laptop: center stage + bottom-pinned toolbar */}
        <div className="hidden sm:flex xl:hidden min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto px-6 lg:px-10">
            <div className="flex min-h-full flex-col items-center justify-center py-4">
              {stage}
            </div>
          </div>
          {bottomStack({
            className:
              "shrink-0 px-6 lg:px-10 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-6",
            submit: submitBtn("desktop"),
            toolbarPadClass:
              "pt-[clamp(0.5rem,2.5dvh,1.25rem)] md:pt-[clamp(0.75rem,3dvh,1.75rem)] lg:pt-[clamp(0.75rem,3.5dvh,2rem)]",
          })}
        </div>

        {/* XL+: voice centers with height-portion gap mic→toolbar when space allows */}
        <div className="hidden xl:block min-h-0 flex-1 overflow-y-auto overscroll-contain px-12 2xl:px-16">
          {inputMode === "voice" ? (
            <div className="flex min-h-full flex-col items-center py-6 pb-8">
              <div className="flex-1 min-h-2 w-full" aria-hidden />
              <div className="w-full max-w-5xl flex flex-col items-center shrink-0">
                {stage}
              </div>
              {/* Portion of viewport height between stage (mic) and toolbar */}
              <div
                className="w-full shrink-0 h-[clamp(1.25rem,6dvh,3.5rem)] 2xl:h-[clamp(1.5rem,7dvh,4.25rem)]"
                aria-hidden
              />
              <div className="w-full max-w-5xl shrink-0 2xl:mt-12">
                {bottomStack({
                  className: "w-full",
                  submit: submitBtn("desktop"),
                  toolbarPadClass: "pt-0",
                  gapClass: "space-y-[clamp(0.85rem,2dvh,1.25rem)]",
                })}
              </div>
              <div className="flex-1 min-h-2 w-full" aria-hidden />
            </div>
          ) : (
            <div className="flex min-h-full flex-col items-center justify-start py-6 pb-8">
              <div className="w-full max-w-5xl flex flex-col items-center">
                {stage}
                {bottomStack({
                  className: "mt-6 w-full",
                  submit: submitBtn("desktop"),
                  toolbarPadClass: "pt-0",
                  gapClass: "space-y-[clamp(0.85rem,2dvh,1.25rem)]",
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-24 sm:bottom-28 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-white/15 bg-black/80 px-4 py-2 text-xs text-white backdrop-blur">
          {toast}
        </div>
      )}
    </div>
  );
};

export default ReflectionRoom;
