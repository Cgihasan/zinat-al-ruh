import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Zinat Al Ruh Technical Services LLC',
    short_name: 'Zinat Al Ruh',
    description:
      'Dubai-based interior fit-out, design consultancy and technical services across the UAE.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000d18',
    theme_color: '#001a2b',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
}
