import { createMediaHandler } from 'next-tinacms-cloudinary/dist/handlers'
import { isAuthorized } from '@tinacms/auth'

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = createMediaHandler({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  authorized: async (req, _res) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        return true
      }
      
      const user = await isAuthorized(req)
      return !!user && user.verified
    } catch (e) {
      console.error('Cloudinary Auth Error:', e)
      return false
    }
  },
})

export default async function customMediaHandler(req: any, res: any) {
  try {
    // Intercettiamo res.json e res.status per vedere se c'è un errore interno
    const originalJson = res.json.bind(res);
    const originalStatus = res.status.bind(res);
    
    let statusCode = 200;
    res.status = (code: number) => {
      statusCode = code;
      return originalStatus(code);
    };
    
    res.json = (body: any) => {
      // Se c'è un errore (status >= 400 o body.e) che non sia il classico "Unauthorized"
      if ((statusCode >= 400 || body?.e) && statusCode !== 401) {
        const errorMsg = body?.e || body?.message || 'Unknown Error';
        // Ritorniamo 200 e forziamo un finto file d'errore così TinaCMS lo mostra nella UI
        res.status(200);
        return originalJson({
          items: [{
            id: 'debug-error',
            type: 'file',
            filename: `ERROR_LOG: ${typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg)}`,
            directory: '/',
            src: 'https://via.placeholder.com/150?text=ERROR',
            thumbnails: {
              '75x75': 'https://via.placeholder.com/75?text=ERROR',
              '400x400': 'https://via.placeholder.com/400?text=ERROR',
              '1000x1000': 'https://via.placeholder.com/1000?text=ERROR'
            }
          }],
          offset: 0
        });
      }
      return originalJson(body);
    };

    await handler(req, res)
  } catch (err: any) {
    console.error('Unhandled Media Handler Error:', err)
    res.status(200).json({
      items: [{
        id: 'debug-error-catch',
        type: 'file',
        filename: `CATCH_ERROR: ${err?.message || err}`,
        directory: '/',
        src: 'https://via.placeholder.com/150?text=ERROR',
        thumbnails: {
           '75x75': 'https://via.placeholder.com/75?text=ERROR',
           '400x400': 'https://via.placeholder.com/400?text=ERROR',
           '1000x1000': 'https://via.placeholder.com/1000?text=ERROR'
        }
      }],
      offset: 0
    });
  }
}
