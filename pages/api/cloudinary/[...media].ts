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
      // TinaCloud authentication is handled automatically if the user is logged in
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  },
})
