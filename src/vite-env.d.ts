/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PLUGIN_KEY: string;
  readonly VITE_GOOGLE_ANALYTICS_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
