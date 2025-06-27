export const lightTheme = {
  background: '#FFFFFF',
  text: '#191919',
  subText: '#767676',
  accent: '#FF6B00',
  border: '#EEEEEE',
  cardBackground: '#FFFFFF',
  // 기존 colors.ts의 색상들을 여기에 통합하거나 새롭게 정의
  // 예시:
  // primary: '#007bff',
  // secondary: '#6c757d',
  // success: '#28a745',
  // danger: '#dc3545',
  // warning: '#ffc107',
  // info: '#17a2b8',

  // grayScale colors
  gray100: '#F8F9FA', // 매우 밝은 회색 (배경 등)
  gray200: '#E9ECEF', // 밝은 회색 (구분선, 비활성 요소 등)
  gray300: '#DEE2E6', // 중간 밝기 회색
  gray400: '#CED4DA', // 약간 어두운 회색
  gray500: '#ADB5BD', // 중간 회색 (보조 텍스트 등)
  gray600: '#6C757D', // 어두운 회색 (본문 텍스트 대체 등)
  gray700: '#495057', // 매우 어두운 회색
  gray800: '#343A40', // 더 어두운 회색
  gray900: '#212529', // 가장 어두운 회색 (제목 등)

  // Semantic colors
  primary: '#5E2BFF', // 주요 색상 (버튼, 강조 등)
  secondary: '#FFC107', // 보조 색상
  success: '#20C997', // 성공 상태
  danger: '#FA5252', // 위험/에러 상태
  warning: '#FAB005', // 경고 상태
  info: '#1C7ED6',     // 정보 상태
  white: '#FFFFFF', // 흰색 추가
};

export const darkTheme = {
  background: '#121212',
  text: '#E0E0E0',
  subText: '#A0A0A0',
  accent: '#FF8A3C',
  border: '#333333',
  cardBackground: '#1E1E1E',
  // 기존 colors.ts의 색상들을 여기에 통합하거나 새롭게 정의
  // 예시:
  // primary: '#007bff', // 다크모드에 맞는 색상으로 변경
  // secondary: '#6c757d',
  // success: '#28a745',
  // danger: '#dc3545',
  // warning: '#ffc107',
  // info: '#17a2b8',

  // grayScale colors
  gray100: '#212529', // 가장 어두운 회색
  gray200: '#343A40',
  gray300: '#495057',
  gray400: '#6C757D',
  gray500: '#ADB5BD',
  gray600: '#CED4DA',
  gray700: '#DEE2E6',
  gray800: '#E9ECEF',
  gray900: '#F8F9FA', // 매우 밝은 회색

  // Semantic colors
  primary: '#7950FF', // 주요 색상 (다크모드)
  secondary: '#FFD43B', // 보조 색상 (다크모드)
  success: '#32D5A5', // 성공 상태 (다크모드)
  danger: '#FF6B6B', // 위험/에러 상태 (다크모드)
  warning: '#FFC078', // 경고 상태 (다크모ode)
  info: '#4DABF7',     // 정보 상태 (다크모드)
  white: '#FFFFFF', // 흰색 추가 (다크모드에서도 흰색 텍스트가 필요할 수 있음)
};

export type Theme = typeof lightTheme;
