'use client';

import { useThemeStore } from '@/store/themeStore';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

// 아이콘은 예시이며, 실제 프로젝트에 맞는 아이콘으로 교체해야 합니다.
// 또는 CSS로 아이콘을 직접 만들거나, 라이브러리 (e.g., react-icons)를 사용할 수 있습니다.
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props: any) => props.theme.text}; // 테마에 따라 아이콘 색상 변경

  &:hover {
    background-color: ${(props: any) => props.theme.gray200}; // 테마에 따라 호버 배경색 변경
  }

  svg {
    width: 20px; // 아이콘 크기 조절
    height: 20px; // 아이콘 크기 조절
  }
`;

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // SSR 시 버튼 렌더링을 피하거나, 기본 아이콘을 보여줄 수 있음
    return <div style={{ width: '36px', height: '36px' }} />; // Placeholder for SSR
  }

  return (
    <ToggleButton onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </ToggleButton>
  );
}
