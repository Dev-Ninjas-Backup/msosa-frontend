/** Far dashboard theme — scoped CSS vars + localStorage (does not touch landing). */

export const DASHBOARD_THEME_STORAGE_KEY = "far-dashboard-theme";
export const DASHBOARD_THEME_ROOT_ID = "far-dashboard-theme";
export const DASHBOARD_THEME_APPLIED_EVENT = "far:dashboard-theme-applied";

export type DashboardThemeColors = {
  dashboardBackground: string;
  cardBackground: string;
  cardBorder: string;
  titleText: string;
  descriptionText: string;
  buttonBackground: string;
  buttonHover: string;
  buttonText: string;
  accent: string;
};

export type DashboardThemeBranding = {
  title: string;
  subtitle: string;
};

export type DashboardTheme = DashboardThemeColors & DashboardThemeBranding;

export const THEME_COLOR_FIELDS: {
  key: keyof DashboardThemeColors;
  label: string;
  cssVar: string;
  /** Tailwind @theme color token name */
  twColorVar: string;
}[] = [
  {
    key: "dashboardBackground",
    label: "Dashboard Background Color",
    cssVar: "--primary-bg",
    twColorVar: "--color-primary-bg",
  },
  {
    key: "cardBackground",
    label: "Widget/Cards Background Color",
    cssVar: "--card-bg",
    twColorVar: "--color-card",
  },
  {
    key: "cardBorder",
    label: "Widget/Cards Border Color",
    cssVar: "--border-color",
    twColorVar: "--color-border",
  },
  {
    key: "titleText",
    label: "Title Text Color",
    cssVar: "--primary-text",
    twColorVar: "--color-primary-text",
  },
  {
    key: "descriptionText",
    label: "Description Text Color",
    cssVar: "--secondary-text",
    twColorVar: "--color-secondary-text",
  },
  {
    key: "buttonBackground",
    label: "Button Background Color",
    cssVar: "--button-bg",
    twColorVar: "--color-button-bg",
  },
  {
    key: "buttonHover",
    label: "Button Hover Color",
    cssVar: "--button-hover",
    twColorVar: "--color-button-hover",
  },
  {
    key: "buttonText",
    label: "Button Text Color",
    cssVar: "--button-text",
    twColorVar: "--color-button-text",
  },
  {
    key: "accent",
    label: "Accent Color",
    cssVar: "--accent",
    twColorVar: "--color-accent",
  },
];

/** Defaults match index.css :root — landing always uses these. */
export const DEFAULT_DASHBOARD_THEME: DashboardTheme = {
  title: "Dashboard 1",
  subtitle: "FOUNDER OPERATING SYSTEM FOR THE FAR PLATFORM ENGINE™",
  dashboardBackground: "#000307",
  cardBackground: "#0f172a",
  cardBorder: "#FFFFFF1A",
  titleText: "#FFFFFF",
  descriptionText: "#9CA3AF",
  buttonBackground: "#D4AF37",
  buttonHover: "#A57D18",
  buttonText: "#000000",
  accent: "#10b7ba",
};

const EXTRA_VARS = [
  "--light-bg",
  "--color-light-bg",
  "--Greyscale-500",
  "--color-greyscale-500",
  "--bg-stripe-1",
  "--color-stripe-1",
  "--primary-brand",
  "--color-primary-brand",
  "--border-active-color",
  "--color-border-active",
  "--border-secondary-color",
  "--color-border-secondary",
  "--button-gradient",
  "--brand-gradient",
] as const;

function allThemeVarNames(): string[] {
  const names: string[] = [];
  for (const field of THEME_COLOR_FIELDS) {
    names.push(field.cssVar, field.twColorVar);
  }
  names.push(...EXTRA_VARS);
  return names;
}

export function getDashboardThemeRoot(): HTMLElement | null {
  if (typeof document === "undefined") return null;
  return document.getElementById(DASHBOARD_THEME_ROOT_ID);
}

function setVar(el: HTMLElement, name: string, value: string) {
  el.style.setProperty(name, value);
}

/**
 * Strip any leftover documentElement overrides so landing / public
 * pages keep hardcoded :root colors from index.css.
 */
export function clearGlobalThemeOverrides() {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  for (const name of allThemeVarNames()) {
    root.style.removeProperty(name);
  }
}

/** Apply theme only inside #far-dashboard-theme — never on landing. */
export function applyDashboardThemeColors(colors: DashboardThemeColors) {
  if (typeof document === "undefined") return;

  // Never paint html/body — landing must stay on :root defaults
  clearGlobalThemeOverrides();

  const el = getDashboardThemeRoot();
  if (!el) return;

  for (const field of THEME_COLOR_FIELDS) {
    const value = colors[field.key];
    setVar(el, field.cssVar, value);
    setVar(el, field.twColorVar, value);
  }

  setVar(el, "--light-bg", colors.cardBackground);
  setVar(el, "--color-light-bg", colors.cardBackground);
  setVar(el, "--Greyscale-500", colors.cardBackground);
  setVar(el, "--color-greyscale-500", colors.cardBackground);
  setVar(el, "--bg-stripe-1", colors.cardBackground);
  setVar(el, "--color-stripe-1", colors.cardBackground);

  setVar(el, "--primary-brand", colors.buttonBackground);
  setVar(el, "--color-primary-brand", colors.buttonBackground);
  setVar(el, "--border-active-color", colors.buttonBackground);
  setVar(el, "--color-border-active", colors.buttonBackground);

  setVar(
    el,
    "--border-secondary-color",
    `color-mix(in srgb, ${colors.buttonBackground} 30%, transparent)`
  );
  setVar(
    el,
    "--color-border-secondary",
    `color-mix(in srgb, ${colors.buttonBackground} 30%, transparent)`
  );
  setVar(
    el,
    "--button-gradient",
    `linear-gradient(180deg, ${colors.buttonBackground} 0%, ${colors.buttonHover} 100%)`
  );
  setVar(
    el,
    "--brand-gradient",
    `linear-gradient(180deg, ${colors.buttonBackground} 0%, ${colors.buttonHover} 100%)`
  );

  window.dispatchEvent(new CustomEvent(DASHBOARD_THEME_APPLIED_EVENT));
}

export function readDashboardTheme(): DashboardTheme {
  if (typeof window === "undefined") return { ...DEFAULT_DASHBOARD_THEME };
  try {
    const raw = localStorage.getItem(DASHBOARD_THEME_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_DASHBOARD_THEME };
    const parsed = JSON.parse(raw) as Partial<DashboardTheme>;
    return { ...DEFAULT_DASHBOARD_THEME, ...parsed };
  } catch {
    return { ...DEFAULT_DASHBOARD_THEME };
  }
}

export function saveDashboardTheme(theme: DashboardTheme) {
  localStorage.setItem(DASHBOARD_THEME_STORAGE_KEY, JSON.stringify(theme));
  applyDashboardThemeColors(theme);
}

export function previewDashboardThemeColors(colors: DashboardThemeColors) {
  applyDashboardThemeColors(colors);
}

export function restoreDashboardThemeFromStorage() {
  applyDashboardThemeColors(readDashboardTheme());
}

/** Call when dashboard shell mounts (element must exist). */
export function bootDashboardTheme() {
  clearGlobalThemeOverrides();
  restoreDashboardThemeFromStorage();
}

export function getCssVarValue(name: string, fallback = ""): string {
  if (typeof window === "undefined") return fallback;
  const el = getDashboardThemeRoot() ?? document.documentElement;
  const value = getComputedStyle(el).getPropertyValue(name).trim();
  return value || fallback;
}

export function pickDashboardThemeColors(
  theme: DashboardTheme
): DashboardThemeColors {
  return {
    dashboardBackground: theme.dashboardBackground,
    cardBackground: theme.cardBackground,
    cardBorder: theme.cardBorder,
    titleText: theme.titleText,
    descriptionText: theme.descriptionText,
    buttonBackground: theme.buttonBackground,
    buttonHover: theme.buttonHover,
    buttonText: theme.buttonText,
    accent: theme.accent,
  };
}
