'use client';

import { ThemeProvider } from 'styled-components';
import { useThemeStore } from '@/store/themeStore';
import { lightTheme, darkTheme } from './theme';
import { useEffect, useState } from 'react';

interface CustomThemeProviderProps {
  children: React.ReactNode;
}

export default function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  const { theme: themeMode } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = themeMode === 'light' ? lightTheme : darkTheme;

  if (!mounted) {
    // SSR/SSG 환경이거나, 클라이언트에서 아직 마운트되지 않은 경우
    // 깜빡임 방지를 위해 빈 <></> 또는 로더를 반환할 수 있으나,
    // 이 경우 초기 테마가 적용되기 전까지 스타일이 없는 상태가 될 수 있음.
    // 또는 기본 테마(예: lightTheme)를 제공할 수 있습니다.
    // return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
    // 또는 children을 바로 반환하여 서버에서 렌더링된 초기 HTML을 최대한 유지
     return <>{children}</>;
  }

  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
}
