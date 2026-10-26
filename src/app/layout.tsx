import React from 'react';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata: Metadata = {
  title: 'A2 TalentBridge | Bridging Talent, Education & Opportunity in Latvia',
  description:
    'A2 TalentBridge connects students, universities, and companies across Latvia and the Baltic region to transform academic learning into verified experience and real employment.',
  keywords: [
    'student opportunities Latvia',
    'student internships Latvia',
    'university industry collaboration Latvia',
    'student projects Latvia',
    'graduate employment Latvia',
    'talent platform Latvia',
    'student talent Latvia',
    'industry student collaboration',
    'Riga Technical University',
    'University of Latvia',
  ],
  authors: [{ name: 'A2 TalentBridge Ecosystem Team' }],
  openGraph: {
    title: 'A2 TalentBridge — Bridging Talent, Education & Opportunity',
    description:
      'Turn academic potential into real-world experience, verified skills, and employment in Latvia.',
    url: 'https://a2talentbridge.lv',
    siteName: 'A2 TalentBridge',
    locale: 'en_LV',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('a2-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.setAttribute('data-theme','dark');}else{document.documentElement.setAttribute('data-theme','light');}}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main style={{ minHeight: 'calc(100vh - 4.5rem)' }}>
              {children}
            </main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
