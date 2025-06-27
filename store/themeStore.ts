import { create } from 'zustand';

type ThemeState = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
};

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light'; // 기본값은 라이트 모드로 설정 (서버 사이드 렌더링 시)
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitialTheme(),
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
      return { theme: newTheme };
    }),
  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
    set({ theme });
  },
}));

// 클라이언트 사이드에서 초기 테마 설정 동기화
if (typeof window !== 'undefined') {
  const currentTheme = useThemeStore.getState().theme;
  const systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;

  if (!storedTheme && currentTheme !== systemTheme) {
    useThemeStore.getState().setTheme(systemTheme);
  }

  // 시스템 테마 변경 감지
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const newColorScheme = e.matches ? 'dark' : 'light';
    // 사용자가 명시적으로 테마를 선택하지 않은 경우에만 시스템 테마를 따름
    if (!localStorage.getItem('theme')) {
      useThemeStore.getState().setTheme(newColorScheme);
    }
  });
}
