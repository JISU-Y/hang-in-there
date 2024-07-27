declare global {
  interface Window {
    naver: any;
    Kakao: any;
    gtag: (...args: any[]) => void;
  }
}

export {};
