import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from '@/StoreProvider';
import Auth from '@/Auth';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import { Providers } from './provider';
import { fonts } from './fonts';
import { Box } from '@chakra-ui/react';

export const metadata: Metadata = {
  title: 'Dunkirk',
  description: 'Purwadhika Mini Project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fonts.poppins.className}>
      <body className={fonts.poppins.className}>
        <Providers>
          <StoreProvider>
            <Auth>
              <Navbar />
              <Box as="section">{children}</Box>
              <Footer />
            </Auth>
          </StoreProvider>
        </Providers>
      </body>
    </html>
  );
}
