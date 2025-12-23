interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_CLOUDINARY_CLOUD_NAME: string
  readonly VITE_CLOUDINARY_API_KEY: string
  readonly VITE_CLOUDINARY_API_SECRET: string
  readonly VITE_CLOUDINARY_UPLOAD_PRESET: string
  readonly VITE_IDRIVE_ENDPOINT: string
  readonly VITE_IDRIVE_ACCESS_KEY_ID: string
  readonly VITE_IDRIVE_SECRET_ACCESS_KEY: string
  readonly VITE_IDRIVE_BUCKET: string
  readonly VITE_IDRIVE_PUBLIC_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}