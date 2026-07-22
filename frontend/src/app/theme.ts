export type Theme = 'light' | 'dark' | 'system';

export const themes: Theme[] = ['light', 'dark', 'system'];

export const getSystemTheme = (): 'light' | 'dark' =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
