// app/fonts.ts
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: '500',
  subsets: ['latin'],
  display: 'swap',
});
export const fonts = {
  poppins,
};
