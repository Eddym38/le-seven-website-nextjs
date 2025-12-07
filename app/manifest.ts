import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Le Seven Restaurant Grenoble',
    short_name: 'Le Seven',
    description: 'Restaurant Le Seven à Grenoble : cuisine maison aux inspirations franco-libanaises',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF6EF',
    theme_color: '#92C6C4',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
