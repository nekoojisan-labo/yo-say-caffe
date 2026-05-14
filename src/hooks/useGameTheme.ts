import { useEffect } from 'react';

const defaultThemeVars: Record<string, string> = {
  '--theme-bg': 'linear-gradient(180deg, #160c28 0%, #24133e 45%, #11081f 100%)',
  '--theme-text': '#f8ebff',
  '--theme-card-bg': 'rgba(255, 255, 255, 0.1)',
  '--theme-card-border': 'rgba(255, 255, 255, 0.22)',
  '--theme-nav-bg': 'rgba(15, 9, 30, 0.84)',
  '--theme-nav-border': 'rgba(255, 255, 255, 0.14)',
  '--theme-btn-primary-from': '#ec4899',
  '--theme-btn-primary-to': '#8b5cf6',
};

export function useGameTheme() {
  useEffect(() => {
    const root = document.documentElement;

    Object.entries(defaultThemeVars).forEach(([key, value]) => {
      if (!root.style.getPropertyValue(key)) {
        root.style.setProperty(key, value);
      }
    });

    root.classList.add('theme-fairy');

    return () => {
      root.classList.remove('theme-fairy');
    };
  }, []);
}
