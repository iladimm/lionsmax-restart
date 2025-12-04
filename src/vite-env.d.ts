/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GEMINI_API_KEY: string
    readonly VITE_SUPABASE_URL: string
    readonly VITE_SUPABASE_ANON_KEY: string
    readonly VITE_AFFILIATE_ID: string
    readonly VITE_AFFILIATE_COMMISSION_PERCENT: string
    readonly VITE_IHERB_AFFILIATE_REF: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
