import { Metadata } from "next";

export const meta: Metadata = {
  // metadataBase: new URL('https://shegertalk.vercel.app/'),
  icons: {
    icon: 'logo.png',
  },
  // themeColor: "#0F4C81",
  title: "Speech to Text AI",
  description: "Speech to Text AI",
  applicationName: 'Next.js',
  keywords: [
    'Speech to Text AI',

  ],
  creator: 'Natnael Engeda',
  authors: [
    {
      name: 'Natnael Engeda',
      url: 'https://natnaelengeda.tech'
    }
  ],
  publisher: "Natnael Engeda",
  openGraph: {
    title: "Speech to Text AI",
    description: "Speech to Text AI",
    // url: 'https://shegertalk.vercel.app/',
    siteName: "Speech to Text AI",
    images: [
      {
        url: "/seo-image.jpg",
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  twitter: {
    card: "summary_large_image",
    title: "Speech to Text AI",
    description: "Speech to Text AI",
    site: "@Sspeechtotextai",
    images: ['/seo-image.jpg'],
    creator: "@natnaelengeda",
  },
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
    other: {
      me: ['nattynengeda@gmail.com', 'https://natnaelengeda.tech']
    }
  },
  appleWebApp: {
    title: "Speech to Text AI",
    statusBarStyle: 'black-translucent',
    startupImage: [
      'logo.png'
    ]
  },
};