/// <reference types="svelte" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TARGET: "v2" | "v3"
}
  
interface ImportMeta {
  readonly env: ImportMetaEnv
}