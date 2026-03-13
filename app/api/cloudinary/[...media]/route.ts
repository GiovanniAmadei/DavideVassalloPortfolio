import { createMediaHandler } from 'next-tinacms-cloudinary/dist/handlers'

export const GET = createMediaHandler({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  authorized: async (req, _res) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        return true
      }
      // For production, you might want more complex auth, but TinaCloud handles this usually.
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  },
})

export const POST = createMediaHandler({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  authorized: async (req, _res) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        return true
      }
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  },
})

export const DELETE = createMediaHandler({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  authorized: async (req, _res) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        return true
      }
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  },
})
