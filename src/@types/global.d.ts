declare global {
  interface Window {
    naver: any;
    gtag: (...args: any[]) => void;
  }
}

export {};
