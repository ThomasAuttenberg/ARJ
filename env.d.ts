/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Добавь сюда другие переменные окружения, которые используешь
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}