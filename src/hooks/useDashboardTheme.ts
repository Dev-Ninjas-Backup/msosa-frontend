import { useCallback, useEffect, useState } from "react";
import {
  applyDashboardThemeColors,
  bootDashboardTheme,
  DEFAULT_DASHBOARD_THEME,
  type DashboardTheme,
  type DashboardThemeColors,
  previewDashboardThemeColors,
  readDashboardTheme,
  restoreDashboardThemeFromStorage,
  saveDashboardTheme,
} from "@/lib/dashboardTheme";

export function useDashboardTheme() {
  const [theme, setTheme] = useState<DashboardTheme>(() => readDashboardTheme());

  useEffect(() => {
    bootDashboardTheme();
  }, []);

  const save = useCallback((next: DashboardTheme) => {
    saveDashboardTheme(next);
    setTheme(next);
  }, []);

  const preview = useCallback((colors: DashboardThemeColors) => {
    previewDashboardThemeColors(colors);
  }, []);

  const cancelPreview = useCallback(() => {
    restoreDashboardThemeFromStorage();
    setTheme(readDashboardTheme());
  }, []);

  const resetDefaults = useCallback(() => {
    saveDashboardTheme(DEFAULT_DASHBOARD_THEME);
    setTheme({ ...DEFAULT_DASHBOARD_THEME });
  }, []);

  const applyOnly = useCallback((colors: DashboardThemeColors) => {
    applyDashboardThemeColors(colors);
  }, []);

  return {
    theme,
    setTheme,
    save,
    preview,
    cancelPreview,
    resetDefaults,
    applyOnly,
  };
}
