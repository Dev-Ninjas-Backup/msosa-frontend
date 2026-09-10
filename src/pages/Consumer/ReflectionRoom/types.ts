export type Language = "en" | "es";
export type VibeId = "focus" | "calm" | "inspire";
export type InputMode = "voice" | "type";
export type SessionPhase =
  | "idle"
  | "recording"
  | "paused"
  | "recorded"
  | "submitted";

export type RoomSettings = {
  productTitle: string;
  subtitle: string;
  mainText: string;
  subText: string;
  instructionText: string;
  wallpaper: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  brightness: number;
  blur: number;
  darkMode: boolean;
};

export const WALLPAPER_PRESETS = [
  {
    id: "cabin",
    label: "Cabin Sunset",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
  },
  {
    id: "lake",
    label: "Mountain Lake",
    url: "https://images.unsplash.com/photo-1469474968028-36623fddb3cd?w=1920&h=1080&fit=crop",
  },
  {
    id: "forest",
    label: "Quiet Forest",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop",
  },
  {
    id: "ocean",
    label: "Calm Ocean",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop",
  },
  {
    id: "aurora",
    label: "Northern Lights",
    url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&h=1080&fit=crop",
  },
  {
    id: "city",
    label: "Night City",
    url: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&h=1080&fit=crop",
  },
] as const;

export const DEFAULT_SETTINGS: RoomSettings = {
  productTitle: "FAR REFLECTION ROOM™",
  subtitle: "1 QUESTION AT A TIME. NORMAL CONVERSATIONAL PACE",
  mainText: "Take your time.",
  subText: "Speak or type your reflection.",
  instructionText: "TAP TO SPEAK",
  wallpaper: WALLPAPER_PRESETS[0].url,
  primaryColor: "#FBB124",
  secondaryColor: "#000000",
  accentColor: "#10B7BA",
  brightness: 65,
  blur: 12,
  darkMode: true,
};

export const VIBES: {
  id: VibeId;
  label: string;
  labelEs: string;
  description: string;
}[] = [
  {
    id: "focus",
    label: "Focus",
    labelEs: "Enfoque",
    description: "Steady ambient tone for deep concentration.",
  },
  {
    id: "calm",
    label: "Calm",
    labelEs: "Calma",
    description: "Soft waves to settle the nervous system.",
  },
  {
    id: "inspire",
    label: "Inspire",
    labelEs: "Inspirar",
    description: "Warm textures that open creative space.",
  },
];

export const copy = {
  en: {
    welcome: "Welcome, Sarah.",
    prompt: "Take a deep breath. Share what's on your mind.",
    session: "Your Session",
    time: "Time",
    focus: "Focus",
    protocol: "Protocol",
    language: "Language",
    music: "Music / Vibe",
    musicHint: "Set the mood: Focus, calm, or inspire.",
    endSession: "End Session",
    type: "Type",
    submit: "Submit Reflection",
    stop: "Stop",
    recording: "Recording",
    replay: "Replay",
    answer: "Answer",
    rerecord: "Re-record",
    saveContinue: "Save & Continue",
    continue: "Continue",
    resume: "Resume",
    later: "Later",
    restore: "Restore",
    sessionWord: "Session",
    privacy: "Your conversation is private, secure, and protected.",
    tagline: "A private space for clarity, insight, and personal growth.",
    general: "General",
    protocolValue: "FuturePath Blueprint™",
    placeholder: "Type what you can't say out loud yet...",
  },
  es: {
    welcome: "Bienvenida, Sarah.",
    prompt: "Respira profundo. Comparte lo que tienes en mente.",
    session: "Tu Sesión",
    time: "Hora",
    focus: "Enfoque",
    protocol: "Protocolo",
    language: "Idioma",
    music: "Música / Ambiente",
    musicHint: "Elige el ánimo: Enfoque, calma o inspirar.",
    endSession: "Terminar Sesión",
    type: "Escribir",
    submit: "Enviar Reflexión",
    stop: "Detener",
    recording: "Grabación",
    replay: "Repetir",
    answer: "Respuesta",
    rerecord: "Regrabar",
    saveContinue: "Guardar y Continuar",
    continue: "Continuar",
    resume: "Reanudar",
    later: "Después",
    restore: "Restaurar",
    sessionWord: "Sesión",
    privacy: "Tu conversación es privada, segura y protegida.",
    tagline: "Un espacio privado para claridad, insight y crecimiento.",
    general: "General",
    protocolValue: "FuturePath Blueprint™",
    placeholder: "Escribe lo que aún no puedes decir en voz alta...",
  },
} as const;
