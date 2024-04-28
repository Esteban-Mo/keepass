import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Keepass",
    description: "Secure your password with Keepass !",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
