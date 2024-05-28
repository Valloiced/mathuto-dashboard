import { Montserrat, Poppins } from "next/font/google";
import localFont from 'next/font/local';

const montserrat = Montserrat({ 
    subsets: ['latin'], 
    display: 'swap',
    variable: '--font-montserrat'
});

const poppins = Poppins({
    weight: ['300', '400', '500', '600', '700', '800'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins'
})

const torus = localFont({
    src: [
        { path: '../public/assets/fonts/Torus-Light.otf', weight: '200' },
        { path: '../public/assets/fonts/Torus-Regular.otf', weight: '400' },
        { path: '../public/assets/fonts/Torus-Bold.otf', weight: '700' },
    ],
    display: 'swap',
    variable: '--font-torus'
})

export default function getFonts(fonts: { variable: string }[]) {
    return fonts.map(font => font.variable).join(' ');
}

export const fonts = [
    montserrat,
    poppins,
    torus
]