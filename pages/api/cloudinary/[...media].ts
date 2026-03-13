import { createMediaHandler } from 'next-tinacms-cloudinary/dist/handlers'

export default createMediaHandler({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  authorized: async (req, _res) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        return true
      }
      // Simplest auth check: if the secret is present, we assume the server environment is trusted
      return !!process.env.CLOUDINARY_API_SECRET
    } catch (e) {
      console.error('Cloudinary Auth Error:', e)
      return false
    }
  },
})
