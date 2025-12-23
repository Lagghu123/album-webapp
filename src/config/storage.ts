export interface CloudinaryConfig {
  id: string;
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  uploadPreset: string;
  isActive: boolean;
}

export interface IDriveConfig {
  id: string;
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  publicUrl: string;
  isActive: boolean;
}

export const storageConfig = {
  // Primary Storage: Optimized for image delivery & transformations
  cloudinary: [
    {
      id: 'cloudinary_primary',
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
      apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
      apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
      uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      isActive: true,
    },
    // Add backup/secondary accounts here for load balancing
    // { id: 'cloudinary_backup', ... }
  ] as CloudinaryConfig[],

  // Cold/Large Storage: S3 Compatible for raw files & backups
  idrive: [
    {
      id: 'idrive_primary',
      endpoint: import.meta.env.VITE_IDRIVE_ENDPOINT || 'https://s3.us-west-1.idrivee2-1.com',
      accessKeyId: import.meta.env.VITE_IDRIVE_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_IDRIVE_SECRET_ACCESS_KEY,
      bucket: import.meta.env.VITE_IDRIVE_BUCKET,
      publicUrl: import.meta.env.VITE_IDRIVE_PUBLIC_URL,
      isActive: true,
    },
    // { id: 'idrive_backup', ... }
  ] as IDriveConfig[],
};

// Helper to get an active account (Simple Round-Robin or random picker logic can be implemented here)
export const getActiveStorage = (type: 'cloudinary' | 'idrive') => {
  const accounts = storageConfig[type].filter(acc => acc.isActive);
  if (accounts.length === 0) return null;
  // Simple random load balancer
  return accounts[Math.floor(Math.random() * accounts.length)];
};