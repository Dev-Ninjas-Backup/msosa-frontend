import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Clock3,
  Globe,
  List,
  Lock,
  Mic,
  Music2,
  Pause,
  Play,
  RotateCcw,
  Save,
  Settings,
  SlidersHorizontal,
  Square,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";
import SettingsPanel from "./SettingsPanel";
import VibePanel from "./VibePanel";
import TypeEditor from "./TypeEditor";
import {
  copy,
  DEFAULT_SETTINGS,
  InputMode,
  Language,
  RoomSettings,
  SessionPhase,
  VibeId,
} from "./types";

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const Waveform = ({
  active,
  color,
}: {
  active: boolean;
  color: string;
}) => (
  <div className="flex items-end justify-center gap-[3px] h-[72px] sm:h-[100px] w-full max-w-md mx-auto">
    {Array.from({ length: 42 }).map((_, i) => {
      const mid = Math.abs(i - 21);
      const base = active
        ? 18 + ((i * 37 + mid * 11) % 55)
        : 10 + (i % 7) * 3;
      return (
        <span
          key={i}
          className={cn(
            "w-[3px] sm:w-1 rounded-full origin-bottom transition-all duration-300",
            active && "animate-pulse"
          )}
          style={{
            height: `${base}px`,
            backgroundColor: color,
            opacity: active ? 0.85 : 0.35,
            animationDelay: `${i * 30}ms`,
          }}
        />
      );
    })}
  </div>
);

const Glass = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "rounded-2xl border border-white/15 bg-black/45 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.35)]",
      className
    )}
  >
    {children}
  </div>
);

const ReflectionRoom = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<RoomSettings>(DEFAULT_SETTINGS);
  const [draft, setDraft] = useState<RoomSettings>(DEFAULT_SETTINGS);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [vibeOpen, setVibeOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [vibe, setVibe] = useState<VibeId>("calm");
  const [inputMode, setInputMode] = useState<InputMode>("voice");
  const [phase, setPhase] = useState<SessionPhase>("idle");
  const [seconds, setSeconds] = useState(0);
  const [notes, setNotes] = useState("");
  const [endConfirm, setEndConfirm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const t = copy[language];
  const primary = settings.primaryColor;
  const accent = settings.accentColor;

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
    if (seconds === 0) setSeconds(0);
  };

  const stopRecording = () => {
    setPhase("recorded");
    showToast(language === "en" ? "Recording saved" : "Grabación guardada");
  };

  const pauseRecording = () => {
    setPhase((p) => (p === "recording" ? "paused" : "recording"));
  };

  const rerecord = () => {
    setSeconds(0);
    setPhase("recording");
    setNotes("");
  };

  const submitReflection = () => {
    setPhase("submitted");
    showToast(
      language === "en"
        ? "Reflection submitted — continuing journey"
        : "Reflexión enviada"
    );
    window.setTimeout(() => navigate("/consumer/dashboard"), 1200);
  };

  const saveContinue = () => {
    showToast(language === "en" ? "Progress saved" : "Progreso guardado");
    navigate("/consumer/dashboard");
  };

  const resumeLater = () => {
    showToast(language === "en" ? "Session paused for later" : "Sesión pausada");
    navigate("/consumer/dashboard");
  };

  const restoreSession = () => {
    setPhase("paused");
    setSeconds((s) => (s > 0 ? s : 147));
    showToast(language === "en" ? "Session restored" : "Sesión restaurada");
  };

  const overlayOpacity = useMemo(() => {
    const darkBoost = settings.darkMode ? 0.25 : 0;
    return Math.min(0.75, (100 - settings.brightness) / 120 + darkBoost);
  }, [settings.brightness, settings.darkMode]);

  return (
    <div className="relative h-screen w-full overflow-hidden text-primary-text">
      {/* Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-[filter] duration-500"
        style={{
          backgroundImage: `url(${settings.wallpaper})`,
          filter: `brightness(${settings.brightness / 100}) blur(${settings.blur / 8}px)`,
          transform: settings.blur > 0 ? "scale(1.05)" : undefined,
        }}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <header className="flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-10 py-4 sm:py-5">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/consumer/dashboard" className="shrink-0">
              <img src={logo} alt="FAR" className="size-9 sm:size-10 object-contain" />
            </Link>
            <div className="min-w-0 hidden sm:block">
              <h1 className="text-base sm:text-lg font-semibold text-white truncate">
                Reflection Room
                <sup className="text-[10px] ml-0.5" style={{ color: primary }}>
                  ™
                </sup>
              </h1>
              <p className="text-[11px] sm:text-xs text-white/60 truncate">
                {t.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setEndConfirm(true)}
              className="inline-flex items-center gap-2 h-9 px-3 sm:px-4 rounded-full border border-white/20 bg-black/40 backdrop-blur text-sm text-white hover:bg-black/55 cursor-pointer"
            >
              <span className="size-2.5 rounded-full bg-rose-500" />
              <span className="hidden sm:inline">{t.endSession}</span>
            </button>
            <button
              type="button"
              aria-label="Open settings"
              onClick={() => {
                setDraft(settings);
                setSettingsOpen(true);
              }}
              className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur text-white/80 hover:text-white cursor-pointer"
            >
              <Settings className="size-4" />
            </button>
          </div>
        </header>

        {/* Main grid */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_280px] xl:grid-cols-[320px_minmax(0,1fr)_320px] gap-4 lg:gap-6 px-4 sm:px-6 lg:px-10 pb-2 overflow-y-auto lg:overflow-visible">
          {/* Left panels */}
          <div className="hidden lg:flex flex-col justify-center gap-4">
            <Glass className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="size-4" style={{ color: primary }} />
                <p className="text-sm font-medium">{t.language}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(["en", "es"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={cn(
                      "h-12 rounded-xl text-sm font-medium transition-colors cursor-pointer",
                      language === lang
                        ? "bg-black/40 text-white"
                        : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                    )}
                    style={
                      language === lang
                        ? { border: `1px solid ${primary}` }
                        : undefined
                    }
                  >
                    {lang === "en" ? "English" : "Español"}
                  </button>
                ))}
              </div>
            </Glass>

            <button
              type="button"
              onClick={() => setVibeOpen(true)}
              className="text-left cursor-pointer border-0 p-0 bg-transparent"
            >
              <Glass className="p-5 hover:bg-black/55 transition-colors">
                <div className="flex items-center gap-3">
                  <span
                    className="flex size-12 items-center justify-center rounded-xl shrink-0"
                    style={{ backgroundColor: `${primary}22`, color: primary }}
                  >
                    <Music2 className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{t.music}</p>
                    <p className="text-xs text-white/55 mt-1 leading-snug">
                      {t.musicHint}
                    </p>
                    <p className="text-xs mt-2 capitalize" style={{ color: accent }}>
                      {vibe}
                    </p>
                  </div>
                  <ChevronRight className="size-4 text-white/40 shrink-0" />
                </div>
              </Glass>
            </button>
          </div>

          {/* Center */}
          <div className="flex flex-col items-center justify-center text-center px-2 py-4 lg:py-0 min-w-0">
            {inputMode === "type" ? (
              <>
                <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl text-white max-w-xl leading-tight">
                  {t.welcome}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-white/65 max-w-md">
                  {t.prompt}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm sm:text-base text-white/80">{t.welcome}</p>
                <h2 className="mt-2 font-playfair text-2xl sm:text-3xl lg:text-4xl text-white max-w-xl leading-tight">
                  {settings.mainText || t.prompt}
                </h2>
                <p className="mt-3 text-sm text-white/55 max-w-md">
                  {settings.subText}
                </p>
              </>
            )}

            {inputMode === "voice" ? (
              <div className="mt-8 sm:mt-10 w-full">
                <div className="flex items-center justify-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={
                      phase === "idle" || phase === "recorded"
                        ? startRecording
                        : pauseRecording
                    }
                    className="flex size-12 sm:size-14 items-center justify-center rounded-full shrink-0 cursor-pointer border-0 shadow-lg"
                    style={{ backgroundColor: primary, color: "#111" }}
                    aria-label={phase === "recording" ? "Pause" : "Record"}
                  >
                    {phase === "recording" ? (
                      <Pause className="size-5" />
                    ) : phase === "paused" ? (
                      <Play className="size-5" />
                    ) : (
                      <Mic className="size-5" />
                    )}
                  </button>

                  <div className="flex-1 max-w-lg">
                    <Waveform
                      active={phase === "recording"}
                      color={phase === "recording" ? "#fff" : `${primary}cc`}
                    />
                  </div>

                  <p className="font-mono text-sm sm:text-base text-white/80 tabular-nums w-12 text-left">
                    {formatTime(seconds)}
                  </p>
                </div>

                <p
                  className="mt-4 text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase"
                  style={{ color: primary }}
                >
                  {phase === "recording"
                    ? t.recording
                    : phase === "recorded"
                      ? t.answer
                      : settings.instructionText}
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setInputMode("type")}
                    className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-white/20 bg-black/40 text-sm text-white hover:bg-black/55 cursor-pointer"
                  >
                    {t.type}
                  </button>
                  <button
                    type="button"
                    onClick={submitReflection}
                    disabled={phase === "idle" && !notes.trim()}
                    className="inline-flex items-center gap-2 h-10 px-5 rounded-full text-sm font-semibold text-black border-0 cursor-pointer disabled:opacity-40"
                    style={{ backgroundColor: primary }}
                  >
                    {t.submit}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 sm:mt-8 w-full px-0 sm:px-2">
                <TypeEditor
                  value={notes}
                  onChange={setNotes}
                  primaryColor={primary}
                  onSwitchToVoice={() => setInputMode("voice")}
                  placeholder={t.placeholder}
                />
                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={submitReflection}
                    disabled={!notes.trim()}
                    className="inline-flex items-center gap-2 h-10 px-5 rounded-full text-sm font-semibold text-black border-0 cursor-pointer disabled:opacity-40"
                    style={{ backgroundColor: primary }}
                  >
                    {t.submit}
                  </button>
                </div>
              </div>
            )}

            {/* Mobile language / vibe */}
            <div className="lg:hidden mt-6 flex flex-wrap justify-center gap-2 w-full">
              <button
                type="button"
                onClick={() => setLanguage((l) => (l === "en" ? "es" : "en"))}
                className="h-9 px-3 rounded-full border border-white/20 bg-black/40 text-xs text-white cursor-pointer"
              >
                {language === "en" ? "EN" : "ES"}
              </button>
              <button
                type="button"
                onClick={() => setVibeOpen(true)}
                className="h-9 px-3 rounded-full border border-white/20 bg-black/40 text-xs text-white cursor-pointer inline-flex items-center gap-1.5"
              >
                <Music2 className="size-3.5" style={{ color: primary }} />
                {vibe}
              </button>
            </div>
          </div>

          {/* Right session card */}
          <div className="hidden lg:flex flex-col justify-center">
            <Glass className="p-5 sm:p-6">
              <h3 className="text-lg font-medium mb-6">{t.session}</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-3">
                  <Clock3 className="size-5 mt-0.5 text-white/50" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/45">
                      {t.time}
                    </p>
                    <p className="mt-1 text-sm font-medium" style={{ color: primary }}>
                      04:00 AM
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <SlidersHorizontal className="size-5 mt-0.5 text-white/50" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/45">
                      {t.focus}
                    </p>
                    <p className="mt-1 text-sm font-medium" style={{ color: primary }}>
                      {t.general}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <List className="size-5 mt-0.5 text-white/50" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/45">
                      {t.protocol}
                    </p>
                    <p className="mt-1 text-sm font-medium" style={{ color: primary }}>
                      {t.protocolValue}
                    </p>
                  </div>
                </li>
              </ul>
            </Glass>
          </div>
        </div>

        {/* Footer controls */}
        <div className="px-3 sm:px-6 lg:px-10 pb-4 sm:pb-5 pt-2">
          <Glass className="mx-auto max-w-5xl px-2 sm:px-3 py-2 sm:py-2.5">
            <div className="flex items-stretch justify-between gap-1 sm:gap-2 overflow-x-auto">
              <FooterAction
                icon={<Square className="size-4 fill-current" />}
                title={t.stop}
                subtitle={t.recording}
                tone="danger"
                onClick={stopRecording}
                disabled={phase !== "recording" && phase !== "paused"}
              />
              <Divider />
              <FooterAction
                icon={<Play className="size-4" />}
                title={t.replay}
                subtitle={t.answer}
                color={primary}
                onClick={() =>
                  showToast(
                    language === "en" ? "Replaying answer…" : "Reproduciendo…"
                  )
                }
                disabled={phase === "idle"}
              />
              <FooterAction
                icon={<RotateCcw className="size-4" />}
                title={t.rerecord}
                subtitle={t.answer}
                color={primary}
                onClick={rerecord}
              />
              <Divider className="hidden sm:block" />
              <FooterAction
                icon={<Save className="size-4" />}
                title={t.saveContinue}
                subtitle={t.continue}
                color={primary}
                onClick={saveContinue}
                className="hidden sm:flex"
              />
              <FooterAction
                icon={<Clock3 className="size-4" />}
                title={t.resume}
                subtitle={t.later}
                color={primary}
                onClick={resumeLater}
                className="hidden md:flex"
              />
              <FooterAction
                icon={<RotateCcw className="size-4" />}
                title={t.restore}
                subtitle={t.sessionWord}
                color={primary}
                onClick={restoreSession}
                className="hidden md:flex"
              />
            </div>
          </Glass>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-white/50">
            <Lock className="size-3" />
            {t.privacy}
          </p>
        </div>
      </div>

      <VibePanel
        open={vibeOpen}
        language={language}
        selected={vibe}
        primaryColor={primary}
        onSelect={setVibe}
        onClose={() => setVibeOpen(false)}
      />

      <SettingsPanel
        open={settingsOpen}
        draft={draft}
        onDraftChange={setDraft}
        onClose={() => setSettingsOpen(false)}
        onSave={() => {
          setSettings(draft);
          setSettingsOpen(false);
          showToast(
            language === "en" ? "Settings saved" : "Ajustes guardados"
          );
        }}
        onPreview={() => {
          setSettings(draft);
          showToast(
            language === "en" ? "Preview applied" : "Vista previa aplicada"
          );
        }}
      />

      {/* End session confirm */}
      {endConfirm && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[80] bg-black/70 border-0 cursor-pointer"
            onClick={() => setEndConfirm(false)}
          />
          <div className="fixed left-1/2 top-1/2 z-[90] w-[min(100%-2rem,400px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-[#0d1117] p-6 shadow-2xl">
            <h3 className="font-playfair text-xl text-white">{t.endSession}?</h3>
            <p className="mt-2 text-sm text-secondary-text">
              {language === "en"
                ? "Your progress is auto-saved. You can restore this session later."
                : "Tu progreso se guarda automáticamente."}
            </p>
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => setEndConfirm(false)}
                className="flex-1 h-11 rounded-xl border border-white/15 bg-white/5 text-sm text-white cursor-pointer"
              >
                {language === "en" ? "Stay" : "Quedarme"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/consumer/dashboard")}
                className="flex-1 h-11 rounded-xl bg-rose-500 text-sm font-semibold text-white border-0 cursor-pointer"
              >
                {t.endSession}
              </button>
            </div>
          </div>
        </>
      )}

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-white/15 bg-black/80 px-4 py-2 text-xs text-white backdrop-blur">
          {toast}
        </div>
      )}
    </div>
  );
};

const Divider = ({ className }: { className?: string }) => (
  <div className={cn("w-px self-stretch bg-white/15 mx-1 shrink-0", className)} />
);

const FooterAction = ({
  icon,
  title,
  subtitle,
  onClick,
  disabled,
  tone,
  color,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
  disabled?: boolean;
  tone?: "danger";
  color?: string;
  className?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5 px-2 sm:px-3 py-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border-0 bg-transparent disabled:opacity-35 disabled:cursor-not-allowed min-w-[64px] sm:min-w-0",
      className
    )}
  >
    <span
      className={cn(
        "flex size-9 items-center justify-center rounded-lg shrink-0",
        tone === "danger" ? "bg-rose-500/20 text-rose-400" : "bg-white/5"
      )}
      style={tone !== "danger" && color ? { color } : undefined}
    >
      {icon}
    </span>
    <span className="text-left">
      <span
        className={cn(
          "block text-[10px] sm:text-xs font-semibold uppercase tracking-wide leading-tight",
          tone === "danger" ? "text-rose-400" : "text-white"
        )}
      >
        {title}
      </span>
      <span className="hidden sm:block text-[11px] text-white/45 leading-tight">
        {subtitle}
      </span>
    </span>
  </button>
);

export default ReflectionRoom;
