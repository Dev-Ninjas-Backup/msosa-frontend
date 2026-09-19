export type Language = "en" | "es";
export type InputMode = "voice" | "type";
export type SessionPhase =
  | "idle"
  | "recording"
  | "paused"
  | "recorded"
  | "submitted";

export const ROOM_BG =
  "/bg/sunset.png";
export const PRIMARY = "#FBBF24";

export const copy = {
  en: {
    welcome: "Welcome, Michel.",
    prompt: "Take a deep breath. Share what's on your mind.",
    reflect: "Reflect",
    type: "Type",
    stop: "STOP",
    recording: "Recording",
    replay: "REPLAY",
    answer: "Answer",
    rerecord: "RE-RECORD",
    saveContinue: "SAVE & CONTINUE",
    continue: "Continue",
    resume: "RESUME",
    later: "Later",
    restore: "RESTORE",
    sessionWord: "Session",
    submitTitle: "SUBMIT AND FINALIZE",
    submitSub: "PROCESS MY REFLECTION",
    tagline: "YOUR INSIGHTS CREATE A BRIGHTER TOMORROW",
    placeholder: "Share your reflection here...",
    english: "English",
    spanish: "Español",
  },
  es: {
    welcome: "Bienvenido, Michel.",
    prompt: "Respira profundo. Comparte lo que tienes en mente.",
    reflect: "Reflexionar",
    type: "Escribir",
    stop: "DETENER",
    recording: "Grabación",
    replay: "REPETIR",
    answer: "Respuesta",
    rerecord: "REGRABAR",
    saveContinue: "GUARDAR Y CONTINUAR",
    continue: "Continuar",
    resume: "REANUDAR",
    later: "Después",
    restore: "RESTAURAR",
    sessionWord: "Sesión",
    submitTitle: "ENVIAR Y FINALIZAR",
    submitSub: "PROCESAR MI REFLEXIÓN",
    tagline: "TUS INSIGHTS CREAN UN MAÑANA MÁS BRILLANTE",
    placeholder: "Comparte tu reflexión aquí...",
    english: "English",
    spanish: "Español",
  },
} as const;
