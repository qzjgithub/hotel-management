import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import './globals.css';
import ThemeProvider from '@/components/ThemeProvider/ThemeProvider';
import { NextAuthProvider } from '@/components/AuthProvider/AuthProvider';
import Toast from '@/components/Toast/Toast';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  style: ['italic', 'normal'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Hotel Management App',
  description: 'Discover the best hotel rooms',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css'
          crossOrigin='anonymous'
        />
      </head>
      <body className={poppins.className}>
        <NextAuthProvider>
          <ThemeProvider>
            <Toast />
            <main className='font-normal h-full w-full flex flex-col'>
              <Header />
              <div className='min-h-96'>
                {children}
              </div>
              <Footer />
            </main>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
